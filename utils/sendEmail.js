const mailer = require("../core/mailer");

const sendEmail = ({ from, to, subject, html }) => {
    return mailer.sendMail(
        {
            from,
            to,
            subject,
            html,
        },
        function (err, info) {
            if (err) {
                console.log(err);
            }
        }
    )
}
module.exports = sendEmail