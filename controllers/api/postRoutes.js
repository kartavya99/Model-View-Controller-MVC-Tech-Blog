const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all Post
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attribute: ["id", "comment_text", "post_id", "user_id", "created_at"],
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get post by id
router.get("/;id", async (req, res) => {
  try {
    const postData = await Post.findByPk({
      where: { id: req.params.id },
      attribute: ["id", "title", "content", "created_at"],
      order: [["created_at", "DEC"]],
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attribute: ["id", "comment_text", "post_id", "user_id", "created_at"],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: `no posts with id ${req.params.id}` });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update post

//delete post

module.exports = router;
