const { createError } = require('../../helpers/createError');
const { randomUUID } = require('crypto');
const User = require('../../models/users');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const reVerificationUser = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw createError({ status: 400, message: 'missing required field email' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw createError({ status: 404, message: 'User not found' });
    }

    if (user.verify) {
        throw createError({ status: 400, message: 'Verification has already been passed' });
    }

    const verificationToken = randomUUID();

    await User.findByIdAndUpdate(user._id, { verificationToken });

    const message = {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Verification email sent',
        text: `Please confirm your e-mail address GET ${process.env.HOST_BASE_URL}/api/users/verify/${verificationToken}`,
        html: `Please <a href="${process.env.HOST_BASE_URL}/api/users/verify/${verificationToken}">confirm</a> your E-mail address`,
    };
    await sgMail.send(message)
        .then(() => console.log(`Send mail success on ${user.email} for re-verification`))
        .catch(console.log);

    res.status(200).json({ message: 'Verification email sent' });
}

module.exports = reVerificationUser;