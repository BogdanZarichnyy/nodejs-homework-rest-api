const bcrypt = require('bcryptjs');
const { createError } = require('../../helpers/createError');
const User = require('../../models/users');
const gravatar = require('gravatar');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw createError({ status: 409, message: 'Email in use' });
    }

    const bcryptHashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { protocol: 'https' });

    const data = await User.create({ email, password: bcryptHashPassword, avatarURL });

    res.status(201).json({
        user: {
            email: data.email,
            subscription: data.subscription,
            avatarURL
        }
    });
}

module.exports = registerUser;