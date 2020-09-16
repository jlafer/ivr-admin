var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  console.log(`got request at /auth`);
  const users = [
    {username: "a", password: "a", email: "a@acme.com"},
    {username: "b", password: "b", email: "b@acme.com"},
    {username: "c", password: "c", email: "c@acme.com"}
  ];

  const {username, password} = req.body;
  const user = users.find(emp => emp.username === username && emp.password === password);
  if (user) {
    res.status(200).send({authData: {token: 'AUTHORIZED', user}});
  }
  else {
    res.status(403).send(
      {error: {message: 'Invalid username or password', sysMessage: ''}}
    );
  }
});

module.exports = router;
