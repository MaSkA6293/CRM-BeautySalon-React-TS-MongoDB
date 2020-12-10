function errorHandler(err, req, res) {
  // if (process.env.NODE_ENV === "development") {
  //   res.status(err.status || 500);
  //   // return res.render("error", { error: err, message: err.message });
  //   // console.log(err);
  // }
  // console.log(err);
  // return res.render("error", { error: {}, message: "Ошибка сервера" });
}
module.exports = errorHandler;
