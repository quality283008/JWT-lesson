const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { User } = require("../db/user");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.get('/', (req,res) => {
  return res.send(User)
});

// サインインの処理
router.post('/signin',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    // リクエストされたものを取得
    const { email, password } = req.body;

    // bcryptのエラー処理
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() })
    };

    // リクエストされたメールアドレスが既に登録されているか判定
    const user = User.find((user) => user.email === email);
    if(user) {
      return res.status(400).json({ massage: "すでに存在するユーザーです。" })
    }

    // パスワードをハッシュ化
    let hashedPassword = await bcrypt.hash(password, 10)

    // userリストに追加する
    User.push({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign(
      {
        email,
      },
      "SECRET_KEY",
      {
        expiresIn: "24h",
      },
    );

    return res.json({
      token: token,
    });

    // return res.send("成功");
  },
);

// ログインの処理
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = User.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ massage: "そのユーザーは存在しないユーザーです。" })
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ massage: "パスワードが違います。" })
  }

  const token = await JWT.sign(
    {
      email,
    },
    "SECRET_KEY",
    {
      expiresIn: "24h",
    },
  );

  return res.json({
    token: token,
  });

})

module.exports = router;