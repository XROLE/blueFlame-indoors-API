const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({
   'message': 'Hello Xrole, you are a super developer'
  })
})

app.listen(3000, () => {
  console.log('App is running on port 3000 .....');
});
