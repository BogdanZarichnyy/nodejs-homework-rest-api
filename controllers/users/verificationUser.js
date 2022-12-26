require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { createError} = require('../../helpers/createError');
const User = require('../../models/users');

const verificationUser = async (req, res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw createError({ status: 404, message: 'User not found' });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null});

    const message = {
        to: user.email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Verification successful',
        text: `Verification successful`,
        html: `Verification successful`,
    };
    await sgMail.send(message)
        .then(() => console.log(`Send mail success on ${process.env.SENDGRID_EMAIL}`))
        .catch(console.log);

    res.status(200).json({ message: 'Verification successful' });
}

module.exports = verificationUser;