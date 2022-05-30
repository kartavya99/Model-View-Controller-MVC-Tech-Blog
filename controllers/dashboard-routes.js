const router = require("express").Router();
const { Post, User, Comment } = require("../models");

//find all post of users
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attribute: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_text",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: { model: User, attribute: ["username"] },
        },
      ],
    });

    const posts = postData.map((postData) => postData.get({ plain: true }));
    // console.log(postData);
    console.log(posts);

    res.render("dashboard", {
      posts,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// find post based on id

// to create new post for user
// creat post route already in postRote
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.session.title,
      content: req.session.content,
      user_id: req.session.user_id,
    });
    res.status(200).json({ message: `New post is created now` });
  } catch (err) {
    res.status(500), json(err);
  }
});

module.exports = router;
