var express = require("express");
var router = express.Router();
const {
  create,
  getArticleId,
  getAllArticle,
  getUpdate,
  getDelete,
} = require("../controllers/article.controllers");

router.post("/", create);
router.get("/:id", getArticleId);
router.get("/", getAllArticle);
router.put("/:id", getUpdate);
router.delete("/:id", getDelete);

module.exports = router;
