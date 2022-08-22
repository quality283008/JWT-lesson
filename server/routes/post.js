const router = require("express").Router();
const { publicPosts, privatePosts } = require("../db/post");
const checkAuth = require("../../middleware/checkJWT");

router.get("/public", (req, res) => {
  res.json(publicPosts);
});


router.get("/private", checkAuth, (req, res) => {
  res.json(privatePosts);
});


module.exports = router;