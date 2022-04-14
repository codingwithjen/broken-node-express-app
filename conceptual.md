
### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - Callbacks
  - Promises
  - Async/Await

- What is a Promise?
  - A Promise is a value that will be returned at some point in the future. Promises simplify deferred and asynchronous computations. A Promise represents an operation that hasn't completed yet.

- What are the differences between an async function and a regular function?
  - An async function will execute code asynchronously and return a Promise (without *await* keyword), which will pause the run of the code and wait for the Promise to return a *real* value. A regular function executes its code sequentially.

- What is the difference between Node.js and Express.js?
  - Express.js is a framework based on Node.js for which it is used for building web-applications using approaches and principles of Node.js. In the last few units, we worked with Python and Flask. Think of Express.js as Flask, as Flask is to Python.

- What is the error-first callback pattern?
  - Error-first callback is to pass an error and data to a function. The error is always the first argument of the function.

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
  - First glance, it looks like the function is not reusable, due to the callbacks not being handled with a loop. Second, *Promise.all* is not being used to resolve every promise, if there was an array to be solved. Third, this will slow down the application because every request would need to wait for the previous request to complete first. And lastly, error handling should be used to refactor to handle simultaneous requests and catch errors.

`
  let users = ['elie', 'joel', 'matt']
  let promiseArr =[];

  function getPromises(users) {
    for (let user of users) {
      promiseArr.push(axios.get(`https://api.github.com/users/${user}`));
    }
  }

  function resolve(promiseArr) {
    Promise.all(promiseArr).then((data) =>
      data.forEach((res) => console.log(res.data));
  }
  getPromises(users);
  resolve(promiseArr);
`