var express = require("express"),
  path = require("path"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;

app.post("/contact_form_submit", function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: "cp-wc42.syd02.ds.network",
    port: 465,
    secure: true,
    auth: {
      user: "admin@fifomatch.com",
      pass: "admin!@123",
    },
  });

  let mailOptions = {
    from: '"FIFO Match" <admin@fifomatch.com>', // sender address
    to: "roda.oma2022@gmail.com", // list of receivers
    subject: "FIFO Match contact us form request", // Subject line
    text: "FIFO Match contact us form request", // plain text body
    html: `Full Name : ${req.body.name} ${req.body.lname} <br> Email : ${req.body.email} <br> Location : ${req.body.location} <br> Contact No : ${req.body.contact_no} <br> Message : ${req.body.message}`, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(200).json({
        status: true,
        msg: "success",
        message: error,
        data: {},
      });
      // return console.log(error);
    }
    // console.log("Message %s sent: %s", info.messageId, info.response);
  });
  res.status(200).json({
    status: true,
    msg: "success",
    message: "Email send successfully",
    data: {},
  });
});

app.post("/newsletter_submit", function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: "cp-wc42.syd02.ds.network",
    port: 465,
    secure: true,
    auth: {
      user: "admin@fifomatch.com",
      pass: "admin!@123",
    },
  });

  let mailOptions = {
    from: '"FIFO Match" <admin@fifomatch.com>', // sender address
    to: "roda.oma2022@gmail.com", // list of receivers
    subject: "FIFO Match Email Subscribe request", // Subject line
    text: "FIFO Match Email Subscribe request", // plain text body
    html: `Hello, Following email is requested to subscribe list. <br/> Email: <b>${req.body.email}</b>`, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      res.status(200).json({
        status: true,
        msg: "success",
        message: error,
        data: {},
      });
      // return console.log(error);
    }
    // console.log("Message %s sent: %s", info.messageId, info.response);
  });
  res.status(200).json({
    status: true,
    msg: "success",
    message: "Email send successfully",
    data: {},
  });
});
app.listen(port, function () {
  console.log("Server is running at port: ", port);
});
