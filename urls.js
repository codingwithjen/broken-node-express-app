const fs = require('fs');
const axios = require('axios');

const fileName = process.argv[2];

const read = (fileName) => {
    fs.readFile(fileName, "utf8", function (err, data) {
      if (err) {
        // handle possible error
        console.error(err);
        // kill the process and tell the shell it errored
        process.exit(1);
      }
      // otherwise, success...
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
        // handle success
        let fileName = getFileName(url);
        makeFile(fileName, response);
      })
      .catch(function (error) {
        // handle possible error
        console.log("Could not download:", error);
      });
  }

  const getFileName = (url) => {  
    return url.split("/")[2];
  };

  const makeFile = (fileName, response) => {
    fs.writeFile(fileName, response.data, "utf8", function (err) {
      if (err) {
        // handle possible error
        console.error(err);
        // kill the process and tell the shell it errored
        process.exit(1);
      }
      console.log("Wrote to");
    });
  };

  read(fileName);

