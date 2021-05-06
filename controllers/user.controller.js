const UserData = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Untuk register
exports.register = async (req, res) => {
  const { Nama, Email, Telpon, TanggalLahir, Password } = req.body;
  const FotoProfil = `images/profile/${req.file.filename}`;
  try {
    const email = await UserData.findOne({ Email });
    const telpon = await UserData.findOne({ Telpon });
    if (telpon || email) {
      return res.status(200).json({
        message: "NIK/Email Sudah Terdaftar",
      });
    } else {
      const data = new UserData({
        Nama,
        Email,
        Telpon,
        Password,
        FotoProfil,
      });

      // Mengenkripsi password
      const salt = await bcrypt.genSalt(10);
      data.Password = await bcrypt.hash(Password, salt);

      // Submit data
      const user = await data.save();

      // Membuat token untuk autentikasi
      const payload = {
        id: user.id,
      };
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 86400,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            message: "Pendaftaran Berhasil",
            userID: user.id,
            token,
            expiresIn: 86400,
          });
        }
      );
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk login dengan email / nomor telpon
exports.login = async (req, res) => {
  const { Email, Telpon, Password } = req.body;
  const Key = Telpon ? { Telpon: Telpon } : { Email: Email };
  try {
    // Mengecek user dengan email / nomor telpon
    const user = await UserData.findOne(Key);
    console.log(user);
    if (!user)
      return res.status(400).json({
        message: "User Tidak Ada",
      });

    // Mengecek apakah password sesuai atau tidak
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch)
      return res.status(400).json({
        message: "Password Salah",
      });

    // Membuat token untuk autentikasi
    const payload = {
      id: user.id,
    };
    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          userID: user.id,
          token,
          expiresIn: 86400,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Untuk mengupdate data user berdasarkan id
exports.updateUserbyId = async (req, res) => {
  const id = req.params.id;
  const { Nama, Email, Telpon, Password } = req.body;
  try {
    const update = {
      Nama,
      Email,
      Telpon,
      Password,
    };

    // Mengenkripsi password
    const salt = await bcrypt.genSalt(10);
    update.Password = await bcrypt.hash(Password, salt);

    await UserData.findOneAndUpdate({ _id: id }, update);
    const data = await UserData.findById(id);
    res.status(200).json({
      message: `Berhasil Update Data User Dengan ID : ${id}`,
      data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mengupdate foto profil user berdasarkan id
exports.updatePhotoUserbyId = async (req, res) => {
  const id = req.params.id;
  const FotoProfil = `images/profile/${req.file.filename}`;
  try {
    const update = {
      FotoProfil
    };
    await UserData.findOneAndUpdate({ _id: id }, update);
    const data = await UserData.findById(id);
    res.status(200).json({
      message: `Berhasil Update Foto Profil User Dengan ID : ${id}`,
      data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mendapatkan data user berdasarkan id
exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await UserData.findById(id);
    res.status(200).json({
      message: `Berhasil Mendapatkan Data User Dengan ID : ${id}`,
      data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};