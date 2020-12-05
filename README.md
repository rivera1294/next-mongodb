This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

- [Roadmap](#roadmap)
- [API](#api)
- [Getting Started](#getting-started)
  - [PM2](#pm2)
- [Environments](#envs)
  - [dev](#development)
  - [prod](#production)
- [Extra info (MongoDB)](#mongodb-extra-info)
- [Learn More](#learn-more)
- [Deploy on ZEIT Now](#deploy-on-zeit-now)

## roadmap

- [x] markdown syntax support
- [ ] auth
  - [ ] context; provider
  - [ ] express session?
  - [ ] https? Auth0?
- [ ] login page
- [ ] pubic page
- [ ] prod
  - [ ] quick deploy

## api

_TODO_

## getting-started

```bash
npm i
# or
yarn
```

### pm2

```bash
pm2 start ecosystem.dev.config.js
```

_Sample:_
```js
module.exports = {
  apps : [{
    name: 'notes-2020-next-mongoose-dev',
    cwd: __dirname + '/.',
    script: 'yarn',
    args: 'dev',
    interpreter: 'none',
    env: {
      MONGO_URI: '<YOUR>',
      NEXT_APP_API_ENDPOINT: 'http://localhost:9000',
    }
  }],
};
```

## envs

### development

`.env.dev`

```bash
MONGO_URI=<YOUR>
NEXT_APP_API_ENDPOINT=http://localhost:9000
```

### production

`.env.prod`

```bash
MONGO_URI=<YOUR>
NEXT_APP_API_ENDPOINT=http://localhost:9000
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:9000](http://localhost:9000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


## mongodb-extra-info

Mongoose allows you to query your collections in different ways like: [Official Documentation](https://mongoosejs.com/docs/api.html#model_Model.find)

```js
// named john and at least 18
MyModel.find({ name: 'john', age: { $gte: 18 }});

// executes, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// executes, name LIKE john and only selecting the "name" and "friends" fields
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) { })

// passing options
MyModel.find({ name: /john/i }, null, { skip: 10 })

// passing options and executes
MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {});

// executing a query explicitly
var query = MyModel.find({ name: /john/i }, null, { skip: 10 })
query.exec(function (err, docs) {});

// using the promise returned from executing a query
var query = MyModel.find({ name: /john/i }, null, { skip: 10 });
var promise = query.exec();
promise.addBack(function (err, docs) {});
```

## learn-more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## deploy-on-zeit-now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
