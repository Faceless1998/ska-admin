const router = require("express").Router();
const PosttSchema = require("../schema/post");
const fs = require("fs");
const path = require("path");
router.route("/123").get(async (req, res) => {
  let dirE = path.join(__dirname, "../public/images/");
  fs.unlinkSync(`${dirE}${`1080PIPCAMERA_main.jpeg`}`);
  res.json("success");
});



router.route("/getallpost").get(async (req, res) => {
  PosttSchema.find({}).then((post) => {
    res.json(post);
  });
});

router.route("/getconcretpost/:id").get(async (req, res) => {
  PosttSchema.findById(req.params.id).then((result) => {
          res.json({ post: result });
      });
  });
module.exports = router;
