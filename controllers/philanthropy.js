const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /philanthropy
 * philanthropy form page.
 */
exports.getphilanthropy = (req, res) => {
  const unknownUser = !(req.user);

  res.render('philanthropy', {
    title: 'philanthropy',
    unknownUser,
  });
};

/**
 * POST /philanthropy
 * Send a philanthropy form via Nodemailer.
 */
exports.postphilanthropy = (req, res) => {
  let fromName;
  let fromEmail;
  if (!req.user) {
    req.assert('name', 'Name cannot be blank').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
  }
  req.assert('message', 'Message cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/philanthropy');
  }

  if (!req.user) {
    fromName = req.body.name;
    fromEmail = req.body.email;
  } else {
    fromName = req.user.profile.name || '';
    fromEmail = req.user.email;
  }

  const mailOptions = {
    to: 'your@email.com',
    from: `${fromName} <${fromEmail}>`,
    subject: 'philanthropy Form | Hackathon Starter',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/philanthropy');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/philanthropy');
  });
};
