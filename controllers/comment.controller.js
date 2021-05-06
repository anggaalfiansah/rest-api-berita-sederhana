const CommentData = require("../models/comment.model");

// Untuk membuat komentar baru
exports.addComment = async (req, res) => {
  const { NewsId, Author, Comment } = req.body;
  try {
    const data = new CommentData({
      NewsId,
      Author,
      Comment,
    });

    const comment = await data.save();
    res.status(200).json({
      message: "Komentar berhasil ditambahkan",
      comment,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk update komentar berdasarkan id
exports.updateCommentById = async (req, res) => {
  const id = req.params.id;
  const { Comment } = req.body;
  try {
    const update = { Comment };

    await CommentData.findOneAndUpdate({ _id: id }, update);
    const comment = await CommentData.findById(id);
    res.status(200).json({
      message: `Komentar dengan id : ${id} berhasil diedit`,
      comment,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk hapus komentar berdasarkan id
exports.deleteCommentById = async (req, res) => {
  const id = req.params.id;
  try {
    await CommentData.findOneAndRemove({ _id: id });
    res.status(200).json({
      message: `Berita dengan id : ${id} berhasil dihapus`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};

// Untuk mendapatkan komentar suatu berita
exports.getComment = async (req, res) => {
  const { NewsId } = req.body;
  try {
    const comment = await CommentData.find({ NewsId });
    res.status(200).json({
      message: `Berhasil mendapatkan semua komentar berita dengan id : ${NewsId}`,
      comment,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error");
  }
};
