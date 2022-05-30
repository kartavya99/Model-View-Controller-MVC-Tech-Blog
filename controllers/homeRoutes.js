const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    // get all the Post and comment JOIN
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],

          include: { model: User, attributes: ["username"] },
        },
      ],
    });

    //Serialize data so the template can read it
    const posts = postData.map((postData) => postData.get({ plain: true }));

    // Pass serialized data
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get Post by id
router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });

    //Serialize data so the template can read it
    const posts = postData.get({ plain: true });

    res.redirect("single-post");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
