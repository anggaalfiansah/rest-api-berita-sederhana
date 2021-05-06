var express = require("express");
const { addComment, updateCommentById, deleteCommentById, getComment } = require("../controllers/comment.controller");
const { authentication } = require("../middleware/token.validation");
var router = express.Router();

// Membuat komentar baru
router.post("/add_comment", authentication, addComment);

// Mengupdate komentar berdasarkan id
router.put("/update_comment/:id", authentication, updateCommentById);

// Menghapus komentar berdasarkan id
router.delete("/delete_comment/:id", authentication, deleteCommentById);

// Mendapatkan komentar berita
router.get("/", getComment);

module.exports = router;
