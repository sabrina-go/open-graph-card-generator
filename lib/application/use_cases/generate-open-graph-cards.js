const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const environment = require('../../../config/environment');

function getHtml(fontBase64, imgBase64, text) {
  return `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Cards</title>
  <style>
    @font-face {
      font-family: 'Roboto';
      src: url("data:application/font-ttf;charset=utf-8;base64,${fontBase64}"),
      font-weight: normal;
      font-style: normal;
    }

    body {
      margin: 0;
    }
    
    .background {
        background-image: url("data:image/png;base64,${imgBase64}");
        background-repeat: no-repeat;
        width: 1200px;
        height: 630px;
    }

    .container {
        width: 1016px;
        height: 351px;
        padding: 56px 92px 0;
     }

    .text {
        text-align: center;
        font-size: 100px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        color: #6B6880;
        font-family: 'Roboto', arial, sans-serif;
        font-weight: 300;
    }
  </style>
</head>
<body>
  <div class='background'>
    <div class='container'>
      <div class='text'>${text}</div>
    </div>
  </div>
</body>
</html>
`;
}

function getFileInBase64(filename) {
  const filePath = path.join(__dirname, filename);
  return fs.readFileSync(filePath, 'base64');
}

async function getPage({ width = 1200, height = 630 } = {}) {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=none',
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  return { browser, page };
}

module.exports = async (text) => {
  const { browser, page } = await getPage();
  const img =
    environment.card.base64Image ||
    getFileInBase64('../../../static/card-template.png');
  const font = getFileInBase64('../../../static/Roboto-Light.ttf');
  const html = getHtml(font, img, text);
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'));
    await Promise.all([
      document.fonts.ready,
      ...selectors.map((img) => {
        // Image has already finished loading, let’s see if it worked
        if (img.complete) {
          // Image loaded and has presence
          if (img.naturalHeight !== 0) return;
          // Image failed, so it has no height
          throw new Error('Image failed to load');
        }
        // Image hasn’t loaded yet, added an event listener to know when it does
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve);
          img.addEventListener('error', reject);
        });
      }),
    ]);
  });
  await page.evaluateHandle('document.fonts.ready');
  const screenshotBuffer = await page.screenshot({
    fullPage: false,
    type: 'png',
  });
  await page.close();
  await browser.close();

  return screenshotBuffer;
};
