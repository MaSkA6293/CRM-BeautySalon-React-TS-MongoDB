const nodemailer = require('nodemailer');
const options = {
    host: process.env.NODEMAILER_HOST,
    port: process.env.PORT,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
};

const transport = nodemailer.createTransport(options);

module.exports = transport;