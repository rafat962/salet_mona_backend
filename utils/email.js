const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Sallet Elmona`;
}

newTransport() {


    return nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'salletalmunahku@gmail.com',
        pass: 'pgpb rwvm jxal ikej'
    }
    });
}

  // Send the actual email
async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
    firstName: this.firstName,
    url: this.url,
    subject
    });

    // 2) Define email options
    const mailOptions = {
    from: this.from,
    to: this.to,
    subject,
    html
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
}

async sendWelcome() {
    await this.send('welcome', 'Welcome to the Salet Elmona Family!');
}

async sendPasswordReset() {
    await this.send(
    'passwordReset',
    'Your password reset token (valid for only 10 minutes)'
    );
}
};
