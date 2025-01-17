FROM node:14
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN echo 'deb http://ftp.de.debian.org/debian stretch main contrib' >> /etc/apt/sources.list && \
    apt-get update && \
    apt autoremove && \
    apt-key update && \
    apt-get update && \
    apt-get install -yq --allow-unauthenticated ttf-mscorefonts-installer

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production
COPY . .
ARG PORT=3002
ENV PORT $PORT
EXPOSE $PORT
CMD [ "npm", "start" ]
