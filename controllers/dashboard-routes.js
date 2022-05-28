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

    res.render("dashboard", {
      posts,
      logged_in: true,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
