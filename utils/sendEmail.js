const mailer = require("../core/mailer");

const sendEmail = ({ from, to, subject, html }) => {
  return mailer.sendMail(
    {
      from,
      to,
      subject,
      html,
    },
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  );
};
module.exports = sendEmail;
