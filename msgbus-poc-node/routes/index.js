var express = require('express');
var router = express.Router();
var { sendMessage } = require('../service-bus');

/* GET home page. */
router.get('/', (req, res, next) => res.json({ response: "Hello!" }));
router.get('/send-message', async(req, res) => {
  await sendMessage({ Message: "Sending my message!" });
  res.send({ response: "Message sent!" });
});

module.exports = router;
