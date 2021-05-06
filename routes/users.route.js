var express = require("express");
const {
  register,
  getUserById,
  updateUserbyId,
  login,
  updatePhotoUserbyId,
} = require("../controllers/user.controller");
const { UploadFotoProfil } = require("../middleware/file.validation");
const { authentication } = require("../middleware/token.validation");
var router = express.Router();

// Register
router.post("/register", UploadFotoProfil, register);

// Login
router.post("/login", login);

// Mengupdate data user
router.put("/:id",authentication, updateUserbyId);

// Mengupdate data user
router.put("/foto/:id",authentication, UploadFotoProfil, updatePhotoUserbyId);

// Mengambil data user
router.get("/:id",authentication, getUserById);

module.exports = router;
