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
    const posts = postData.map((posts) => postData.get({ plain: true }));

    // Pass serialized data
    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
