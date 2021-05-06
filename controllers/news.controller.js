const NewsData = require("../models/news.model");

// Untuk membuat berita baru
exports.addNews = async (req, res) => {
  const { Judul, Author, Category, Content } = req.body;
  const Poster = `images/poster/${req.file.filename}`;
  try {
    const data = new NewsData({
      Judul,
      Author,
      Category,
      Content,
      Poster,
    });

    const News = await data.save();
    res.status(200).json({
      message: "Berita berhasil dipublish",
      News,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk update berita berdasarkan id
exports.updateNewsById = async (req, res) => {
  const id = req.params.id;
  const { Judul, Category, Content } = req.body;
  try {
    const update = {
      Judul,
      Category,
      Content,
    };

    await NewsData.findOneAndUpdate({ _id: id }, update);
    const News = await NewsData.findById(id);
    res.status(200).json({
      message: `Berita dengan id : ${id} berhasil diedit`,
      News,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mengupdate poster berita berdasarkan id
exports.updatePosterById = async (req, res) => {
  const id = req.params.id;
  const Poster = `images/poster/${req.file.filename}`;
  try {
    const update = {
      Poster,
    };
    await NewsData.findOneAndUpdate({ _id: id }, update);
    const News = await News.findById(id);
    res.status(200).json({
      message: `Berhasil Update Poster Berita Dengan ID : ${id}`,
      News,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk hapus berita berdasarkan id
exports.deleteNewsById = async (req, res) => {
  const id = req.params.id;
  try {
    await NewsData.findOneAndRemove({ _id: id });
    res.status(200).json({
      message: `Berita dengan id : ${id} berhasil dihapus`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mendapatkan semua berita
exports.getNews = async (req, res) => {
  try {
    const News = await NewsData.find();
    res.status(200).json({
      message: "Berhasil mendapatkan semua berita",
      News,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mendapatkan berita berdasarkan id
exports.getNewsById = async (req, res) => {
  const id = req.params.id;
  try {
    const News = await NewsData.findById(id);
    res.status(200).json({
      message: `Berhasil mendapatkan berita dengan id : ${id}`,
      News,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mendapatkan berita berdasarkan kategori
exports.getNewsByCategory = async (req, res) => {
  const Category = req.params.category;
  try {
    const News = await NewsData.find({ Category });
    res.status(200).json({
      message: `Berhasil mendapatkan semua berita berdasarkan kategori ${Category}`,
      News,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mendapatkan berita berdasarkan kata kunci
exports.getNewsByKeyword = async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const News = await NewsData.find({
      $or: [
        { Judul: { $regex: keyword, $options: "i" } },
        { Content: { $regex: keyword, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: `Berhasil mendapatkan semua berita berdasarkan kata kunci ${keyword}`,
      News,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};
