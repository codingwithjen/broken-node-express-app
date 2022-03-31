const fs = require('fs');
const axios = require('axios');
const process = require('process ');

const fileName = process.argv[2];

const read = (fileName) => {
    fs.readFile(fileName, "utf8", function (err, data) {
      if (err) {
        // Handle Error
        console.error(err);
        // Kill the Process
        process.exit(1);
      }
      // Otherwise, success
      const urls = getUrls(data);
      console.log(urls);
      for (let url of urls) {
        sendRequest(url);
      }
    });
  };
  
  const getUrls = (data) => {
    let dataArr = data.split("\n");
    return dataArr.slice(0, 4);
  };
  
  function sendRequest(url) {
    axios
      .get(url)
      .then(function (response) {
        // Handle Success
        let fileName = getFileName(url);
        makeFile(fileName, response);
      })
      .catch(function (error) {
        // Handle Error
        console.log("Coulnd't access URL: ", error);
      });
  }
  
  const getFileName = (url) => {
    return url.split("/")[2];
  };
  
  const makeFile = (fileName, response) => {
    fs.writeFile(fileName, response.data, "utf8", function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log("Successfully wrote to file!");
    });
  };
  
  read(fileName);