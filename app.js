var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users.route");
var newsRouter = require("./routes/news.route");
var commentRouter = require("./routes/comments.route");

var app = express();

// Membuat koneksi ke mongodb - start ==================================================================>

// Pertama, kita import dahulu dotenv untuk meload kode koneksi yang kita simpan di config.env
const dotenv = require("dotenv");

// Kedua, kita import dulu mongoose untuk melakukan koneksi ke mongodb
// disini namanya kita deklarasikan menjadi mongodb
const mongodb = require("mongoose");

// Ketiga, kita load dulu kode koneksi dari file config.env

// Untuk Menentukan path file .env mana yang akan digunakan
dotenv.config({ path: "./config.env" });
// Untuk Mengambil kode koneksi mongodb dari config.env dan dimasukan kedalam variabel koneksi
const koneksi = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

// Keempat, kita langsung buat koneksi menggunakan mongoose yang kita deklarasikan dengan nama mongodb

// Untuk koneksi ke mongodb dengan variabel koneksi yang sudah kita buat
mongodb
  .connect(koneksi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    // Jika koneksi berhasil maka kita akan mengirim pesan konsole "Koneksi Berhasil"
    console.log("Koneksi Berhasil");
  })
  .catch((err) => {
    // Jika koneksi gagal maka kita akan mengirim pesan konsole "MONGOERROR" serta errornya
    console.log("MONGOERROR", err);
  });

// Membuat koneksi ke mongodb - end ==================================================================>

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/news", newsRouter);
app.use("/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
