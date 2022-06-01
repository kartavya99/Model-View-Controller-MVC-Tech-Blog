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

// creat post
router.post("/", withAuth, async (req, res) => {
  try {
    // console.log(req.body);
    await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json({ message: `New Post is created now` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updatedPost) {
      res.status(404).json({ message: " No post found with this id" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({
        message: `No post owned by user_id = ${req.session.user_id} found with id = ${req.params.id}`,
      });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
