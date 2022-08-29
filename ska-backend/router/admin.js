const router = require("express").Router();
const PosttSchema = require("../schema/post");
const fs = require("fs");
const path = require("path");
const PostTypeSchema = require("./../schema/PostType");
router.route("/123").get(async (req, res) => {
  let dirE = path.join(__dirname, "../public/images/");
  fs.unlinkSync(`${dirE}${`1080PIPCAMERA_main.jpeg`}`);
  res.json("success");
});
router.route("/deletepost/:type/:id").get(async (req, res) => {
  let dirE = path.join(__dirname, "../public/images/");

  PosttSchema.findOne({ PostType: req.params.type }).then((prod) => {
    prod.products.map((sProd) => {
      if (sProd._id == req.params.id) {
        console.log(sProd._id);
        fs.unlinkSync(`${dirE}${sProd.mainImage}`);
        sProd.images.map((img) => {
          fs.unlinkSync(`${dirE}${img.url}`);
        });
      }
    });
  });
  await PostSchema.findOneAndUpdate(
    { PostType: req.params.type },
    { $pull: { products: { _id: req.params.id } } },
    { new: true },
    function (err, result) {
      if (err) {
        console.log(err);
      }
      res.json("success");
    }
  );
});
router.route("/addposttype/:id").get(async (req, res) => {
  PostTypeSchema.findOne({}).then((result) => {
    result.PostType.push(req.params.id);
    result.save((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        res.json(doc);
      }
    });
  });
});
router.route("/getallposttype").get(async (req, res) => {
  PostTypeSchema.findOne({}).then((result) => {
    res.json({ success: true, data: result.PostType });
  });
});
router.route("/getallpost").get(async (req, res) => {
  let post = [];
  PosttSchema.find({}).then((result) => {
    result.map((item) => {
      post = [...post, ...item.post];
    });
    res.json(post);
  });
});

router.route("/getconcrettypepost/:type").get(async (req, res) => {

    PosttSchema
      .find({ PostType: req.params.type })
      .then(async (result) => {
        await res.json(result);
      });
  
});
router.route("/getconcretpost/:id").get(async (req, res) => {
  PosttSchema.find({}).then((result) => {
    console.log(result);
    result.map((Ptype) => {
      Ptype.post.map((prod) => {
        if (prod._id.toString() == req.params.id.toString()) {
          res.json({ product: prod, PostType: Ptype.PostType });
        }
      });
    });
  });
});
module.exports = router;
