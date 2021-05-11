var multer = require("multer");

// Konfigurasi Folder Untuk Foto Profil
const multerStorageProfil = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/profile");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `foto-${req.body.Nama}-${req.body.Telpon}-${Date.now()}.${ext}`
    );
  },
});

// Konfigurasi Folder Untuk Poster
const multerStoragePoster = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/poster");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `foto-${req.body.Judul}-${req.body.Author}-${Date.now()}.${ext}`
    );
  },
});

// konfigurasi tipe file
const multerFilterImage = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Untuk Upload Foto Profil
exports.UploadFotoProfil = multer({
  storage: multerStorageProfil,
  fileFilter: multerFilterImage,
}).single("FotoProfil");

// Untuk Upload Poster
exports.UploadPoster = multer({
  storage: multerStoragePoster,
  fileFilter: multerFilterImage,
}).single("Poster");
