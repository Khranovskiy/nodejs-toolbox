const express = require('express');
const app = express();

app.post('/user', (req, res) => {
  // This function is called once the headers have been received

  let body = '';

  req.on('data', (data) => {
    // This function is called as chunks of body are received
    body += data;
  });

  req.on('end', () => {
    // This function is called once the body has been fully received
    let parsed;

    try {
      parsed = JSON.parse(body);
    } catch (e) {
      res.statusCode = 400;
      res.json({
        error: 'CANNOT_PARSE'
      });
    }

    res.json({
      error: false,
      username: parsed.username
    });
  });

});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});