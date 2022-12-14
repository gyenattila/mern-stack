# MERN Stack

**M** - MongoDB -> A NoSQL Database which stores "Documents" in "Collections". Enforces no Data Schema or Relations. Easily connected to Node / Express (NOT to React!).

**E** - Express -> NodeJS Framework which simplifies writing Server-side Code and Logic. Middleware-based, includes Routing, View-rendering & More. Middleware-focused approach.

**R** - ReactJS -> A Client-Side (Browser) Library which allows to build highly reactive user interfaces.

**N** - NodeJS -> A Server-side Runtime: JavaScript on the server-side. JS outside of the browser. A host Environment for JS.

## Client (React)

Presentation / UI, Single-Page-Application (SAP).

## Server (NodeJS, MongoDB, ExpressJS)

Business logic, persistent Data Storage, Authentication Logic.

Request-response communication typically with JSON Format.

## Install React

```shell
$ npx create-react-app <app-name>
```

## Install React Routing

```shell
npm install react-router-dom
```

## Presentation Vs. Stateful Components

### Presentational Components

Only outputs the data, render HTML.

### Stateful Components

Communicates w/ backend, fetching data (not directly), managing state.

## Portals in React

They're a concept that allows us to project or render a React component in a different place that it normally would be rendered.
