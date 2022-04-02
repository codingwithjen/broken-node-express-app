const express = require('express');
const axios = require('axios');
const app = express();
const ExpressError = require("./expressError")

app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    if (!req.body.developers){
      throw new ExpressError('User information required.' , 400);
    }

    const response = req.body.developers.map(async d => {
      if (d.trim() === "") {
        return null;
      }

      try {
        return await axios.get(`https://api.github.com/users/${d}`);
      } catch (err) {
        if (err.response.status === 404){
          throw new ExpressError(`${d} not found.` , 404);
        }
        throw new ExpressError(`Error retrieving info on: ${d}`, 500);
      }
    });

    const results = await Promise.all(response);
    const developers = results.map(r => (r ? { name: r.data.name, bio: r.data.bio } : {}));

    return res.json(developers);
  } catch (err) {
    next(err);
  }
});


// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
      error: { message, status }
  });
});
// end generic handler
app.listen(3000, function () {
  console.log('Server is listening on port 3000');
});