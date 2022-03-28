### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - Callbacks
  - Promises
  - Async/Await

- What is a Promise?
  - A Promise is a value that will be returned at some point in the future.

- What are the differences between an async function and a regular function?
  - An async function will execute code asynchronously and return a Promise (without *await* keyword), which will pause the run of the code and wait for the Promise to return a *real* value. A regular function executes its code sequentially.

- What is the difference between Node.js and Express.js?
  - Express.js is a framework based on Node.js for which is used for building web-application using approaches and principles of Node.js. In the last few units, we worked with Python and Flask. Think of Express.js as Flask, as Flask is to Python.

- What is the error-first callback pattern?
  - Error-first callback is to pass error and data to a function. The error is always the first argument of the function.

- What is middleware?
  - Middleware is the code that runs between the request and response cycle. It acts like the connective tissue between applications, data, and users.

- What does the `next` function do?
  - The *next* function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
  - First, the function is not reusable. Second, each request is independent making it so that the application slows down... since every request needs to wait for the previous request to complete. Third, there's no error handling involved. 