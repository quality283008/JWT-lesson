const express = require('express');
const app = express();
const auth = require('./routes/routes.js');
const post =require('./routes/post');

const cors = require("cors");
app.options('*', cors());
app.use(cors({ origin: /http:\/\/localhost/ }));

app.use(express.json());
app.use('/auth', auth);
app.use('/post', post)



app.listen('3100', () => {
  console.log("ポート番号起動中")
})