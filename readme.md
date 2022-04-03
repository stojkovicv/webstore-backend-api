# DevStore API

> Backend API for Bootcamp stores.

## Usage

Remvove one .env exstension from "config/config.env.env" and set the values.

## Install dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Database Seeder

To seed the database with users, bootcamps, courses and reviews with data from the "\_data" folder, run

```
# Remove all data
node seeder -d

# Import all data
node seeder -i
```

## Documentation

Enable index.html file and locate it in "./public" folder, for requests documented with Postman.

- Version: 1.0.0
- Author: Vuk Stojkovic & Traversy Media
