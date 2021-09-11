# Open Graph Card Generator

Generate Open Graph Card with specify title. 

## Installation 

### Run with docker-compose

1. Create `docker-compose.yml` : 

```docker-compose.yml
version: "3.8"

services:
  opengraph:
    build: .
    container_name: og-card-generator
    restart: always
    ports: 
      - 3000:3000
    environment:
      - HOST=0.0.0.0
```

2. Run docker-compose : 
```shell
docker-compose up -d
```

### Run with node 

1. Install dependencies : 
```shell
npm ci
```
2. Start : 
```shell
npm start
```

## How to use it ? 

### Generate Card: 

You can call the endpoint :
`/cards/{title-you-want-to-add-to-your-template}`

### Change template: 

You can directly change `card-template.png`, or you can add Base64 Encoded image with 
`BASE64_CARD_IMAGE` environment variable. 
