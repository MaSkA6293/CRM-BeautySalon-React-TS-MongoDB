function errorHandler(err, req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        // res.status(err.status || 500);
        //  res.render('error', { error: err, message: err.message })
        console.log(err)
    } else {
        console.log(err)
        //res.render('error', { error: {}, message: 'Ошибка сервера' })
    }
}
module.exports = errorHandler