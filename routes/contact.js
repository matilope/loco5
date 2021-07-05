var express = require("express");
var router = express.Router();
const validator = require("validator");
const nodemailer = require("nodemailer");
// var JSAlert = require("js-alert");


// const rateLimit = require("express-rate-limit");

// Limit request on form

/* const accountLimiter = rateLimit({
  windowMs: 60 * 60 * 24000, // 24 hour window
  max: 3, // start blocking after 3 requests
  message:
    "We received too many forms from this IP, please try again after an hour"
});
*/

// Contact section

router.post("/formulario", (req, res) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '*********@*****.com',
      pass: '*********'
    }
  });

  if (!validator.isEmpty(req.body.email && req.body.asunto && req.body.consulta)) {
    const mailOptions = {
      from: `"Loco 5" <********@******.com>`,
      to: `"*********@*****.com"`,
      subject: `${req.body.asunto}`,
      html: `<ul style="line-height:30px;"><li><strong>Email: </strong>${req.body.email}</li><li><strong>Asunto: </strong>${req.body.asunto}</li><li><strong>Consulta: </strong>${req.body.consulta}</li></ul>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(400).render('index', { alerterror : true });
      } else {
        console.log('Email enviado: ' + info.response);
        res.status(200).render('index', { alert : true });
      }
    });
  } else {
    res.status(400).render('index', { alertconsultavacia : true });
  }
}
);

module.exports = router;
