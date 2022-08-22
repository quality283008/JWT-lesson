const express = require('express');
const app = express();
const auth = require('./routes/routes.js');
const post =require('./routes/post');



app.use(express.json());
app.use('/auth', auth);
app.use('/post', post)



app.listen('3100', () => {
  console.log("ポート番号起動中")
})