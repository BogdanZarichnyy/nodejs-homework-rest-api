const bcrypt = require('bcryptjs');
const { createError } = require('../../helpers/createError');
const { randomUUID } = require('crypto');
const User = require('../../models/users');
const gravatar = require('gravatar');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw createError({ status: 409, message: 'Email in use' });
    }

    const bcryptHashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { protocol: 'https' });

    const verificationToken = randomUUID();

    const data = await User.create({ email, password: bcryptHashPassword, avatarURL, verificationToken });

    const message = {
        to: data.email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Thank for your registartion!',
        text: `Please confirm your e-mail address GET ${process.env.HOST_BASE_URL}/api/users/verify/${verificationToken}`,
        html: `Please <a href="${process.env.HOST_BASE_URL}/api/users/verify/${verificationToken}">confirm</a> your E-mail address`,
    };
    await sgMail.send(message)
        .then(() => console.log(`Send mail success on ${data.email}`))
        .catch(console.log);

    res.status(201).json({
        user: {
            email: data.email,
            subscription: data.subscription,
            avatarURL
        }
    });
}

module.exports = registerUser;