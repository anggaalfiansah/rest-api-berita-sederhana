var express = require("express");
const {
  addNews,
  updateNewsById,
  deleteNewsById,
  getNews,
  getNewsByCategory,
  getNewsByKeyword,
  getNewsById,
  updatePosterById,
} = require("../controllers/news.controller");
const { UploadPoster } = require("../middleware/file.validation");
const { authentication } = require("../middleware/token.validation");
var router = express.Router();

// Membuat berita baru
router.post("/add_news", authentication, UploadPoster, addNews);

// Mengupdate berita berdasarkan id
router.put("/update_news/:id", authentication, updateNewsById);

// Mengupdate poster berita berdasarkan id
router.put("/poster/:id",authentication, UploadPoster, updatePosterById);

// Menghapus berita berdasarkan id
router.delete("/delete_news/:id", authentication, deleteNewsById);

// Mendapatkan semua berita
router.get("/", getNews);

// Mendapatkan berita berdasarkan id
router.get("/:id", getNewsById);

// Mendapatkan berita berdasarkan kategori
router.get("/:category", getNewsByCategory);

// Mendapatkan berita berdasarkan kata kunci
router.get("/search/:keyword", getNewsByKeyword);

module.exports = router;
