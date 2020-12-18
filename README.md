This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

- [Roadmap](#roadmap)
- [API](#api)
- [Getting Started](#getting-started)
  - [PM2 ecosystem config](#pm2)
- [Environments](#envs)
  - [Development](#envs-development)
  - [Production](#envs-production)
- [Extra info (MongoDB)](#mongodb-extra-info)
- [Learn More](#learn-more)
- [Deploy on ZEIT Now](#deploy-on-zeit-now)

> https://github.com/typicode/husky/issues/326#issuecomment-692317612

## roadmap

- [ ] **backend**
  - [ ] socket
    - [ ] set filter settings to params? (\*)
    - [ ] req for update list on connection
    - [x] webhooks: create/update/delete
    - [x] connection support
  - [x] jwt auth
- [ ] **frontend**
  - [ ] **UI**
    - [ ] **@material-ui/core** instead of react-semantic-ui?
    - [ ] socket
      - [ ] on connect
        - [ ] update list on connection
          - [ ] by global filters
            - [ ] build-url
          - [x] default settings
      - [ ] subscribers for webhooks
        - [ ] create
          - [ ] add if validated by current filter settings?
          - [x] add to list
        - [x] detete: remove from list
          - [x] **useFreshNote** hook
            - [x] is `activeNote` on /notes page
            - [x] update state on /notes/[id] (Empty template)
          - [x] inactive on /notes page
        - [x] update: refresh note when:
          - [x] **useFreshNote** hook
            - [x] is `activeNote` on /notes page (useFreshNote hook)
            - [x] update state on /notes/[id]
          - [x] inactive on /notes page
      - [x] notifs: [react-notifications-component](https://github.com/teodosii/react-notifications-component) create/delete/update
      - [x] connection support
    - [x] progress line for page loading
    - [x] priority stars
    - [x] auth
      - [x] context; provider
      - [x] signup; signin
  - [ ] **UX**
    - [ ] set filter settings to params (\*)
    - [ ] mobile: fullscreen modal for `activeNote` on main pg
    - [ ] scroll top btn
    - [x] markdown syntax support
- [ ] **project DX**
  - [ ] typescript?
  - [ ] qucik deploy
    - [ ] deploy-app?
  - [x] git hooks
  - [x] eslint; prettier
  - [x] could be started by pm2

## api

_TODO_

## getting-started

```bash
npm i
# or
yarn
```

### pm2

### `pm2 start ecosystem.dev.config.js`

```js
module.exports = {
  apps: [
    {
      name: 'notes-2020-next-mongoose-dev',
      cwd: __dirname + '/.',
      script: 'yarn',
      args: 'dev',
      interpreter: 'none',
      env: {
        MONGO_URI: '<YOUR>',
        JWT_SECRET: '<RANDOM_STRING>',
        EXPRESS_JWT_MAXAGE_IN_DAYS: 3,
      },
    },
  ],
}
```

### `pm2 start ecosystem.prod.config.js`

```js
module.exports = {
  apps: [
    {
      name: 'notes-2020-next-mongoose',
      cwd: __dirname + '/.',
      script: 'yarn',
      args: 'start:prod',
      interpreter: 'none',
      env: {
        MONGO_URI: '<YOUR>',
        JWT_SECRET: '<RANDOM_STRING>',
        EXPRESS_JWT_MAXAGE_IN_DAYS: 3,
      },
    },
  ],
}
```

## envs

### envs-development

`.env.dev`

```bash
MONGO_URI=<YOUR>
NEXT_APP_API_ENDPOINT=http://localhost:9000
NEXT_APP_SOCKET_API_ENDPOINT=http://localhost:9000
NEXT_APP_EXPRESS_API_ENDPOINT=http://localhost:9000/e-api
NEXT_APP_COOKIE_MAXAGE_IN_DAYS=2
```

### envs-production

`.env.prod`

```bash
MONGO_URI=<YOUR>
NEXT_APP_API_ENDPOINT=http://<DOMAIN>
NEXT_APP_SOCKET_API_ENDPOINT=http://<DOMAIN>
NEXT_APP_EXPRESS_API_ENDPOINT=http://<DOMAIN>/e-api
NEXT_APP_COOKIE_MAXAGE_IN_DAYS=2
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
MyModel.find({ name: 'john', age: { $gte: 18 } })

// executes, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 } }, function (err, docs) {})

// executes, name LIKE john and only selecting the "name" and "friends" fields
MyModel.find({ name: /john/i }, 'name friends', function (err, docs) {})

// passing options
MyModel.find({ name: /john/i }, null, { skip: 10 })

// passing options and executes
MyModel.find({ name: /john/i }, null, { skip: 10 }, function (err, docs) {})

// executing a query explicitly
var query = MyModel.find({ name: /john/i }, null, { skip: 10 })
query.exec(function (err, docs) {})

// using the promise returned from executing a query
var query = MyModel.find({ name: /john/i }, null, { skip: 10 })
var promise = query.exec()
promise.addBack(function (err, docs) {})
```

## learn-more

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## deploy-on-zeit-now

The easiest way to deploy your Next.js app is to use the [ZEIT Now Platform](https://zeit.co/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
