const router = require("express").Router();
const path = require("path");
const postSchema = require("./../schema/post");
router.route("/add").post(async (req, res) => {
  // const dir = path.join(__dirname, "../public/images");
  const name = req.body.data.name;
  const postIMG = req.body.data.postIMG;
  const description = req.body.data.description;
  const features = req.body.data.feature;
  const thumbIMG = req.body.data.thumbImg;

  const nameGE = req.body.dataGE.nameGE;
  const featuresGE = req.body.dataGE.featureGE;
  const descriptionGE = req.body.dataGE.descriptionGE;

  // Product Thumb image upload

  let thumbIGMURL = "";
  let base64Data = thumbIMG.replace(/^data:image\/\w+;base64,/, "");
  thumbIGMURL = `${name.replace(/\s/g, "").split("/").join("_") + "_main"}.${
    thumbIMG.split("/")[1].split(";")[0]
  }`;
  require("fs").writeFile(
    `${__dirname}/${name.replace(/\s/g, "").split("/").join("_") + "_main"}.${
      thumbIMG.split("/")[1].split(";")[0]
    }`,
    base64Data,
    "base64",
    function (err) {
      console.log(err);
    }
  );
  console.log(req.body.type);

  let imgARR = [];
  postIMG.map((IMGURL, i) => {
    let base64Data = IMGURL.replace(/^data:image\/\w+;base64,/, "");
    imgARR.push({
      url: `${name.replace(/\s/g, "").split("/").join("_") + i}.${
        IMGURL.split("/")[1].split(";")[0]
      }`,
    });
    require("fs").writeFile(
      `${__dirname}/${name.replace(/\s/g, "").split("/").join("_") + i}.${
        IMGURL.split("/")[1].split(";")[0]
      }`,
      base64Data,
      "base64",
      function (err) {
        console.log(err);
      }
    );
  });

  const obj = {
    name: name,
    description: description,
    properties: features,
    nameGE: nameGE,
    descriptionGE: descriptionGE,
    propertiesGE: featuresGE,
    mainImage: thumbIGMURL,
    images: imgARR,
  };
  let cond = "postType";
  let value = req.body.type;
  let query = {};
  query[cond] = value;
  postSchema.findOne(query).then((re) => {
    if (re) {
      re.products.push(obj);
      re.save();
    } else {
      const postSchema = new postSchema({
        postType: req.body.type,
        products: obj,
      }).save();
    }
  });

  res.json({ success: true });
});
module.exports = router;
