const bcrypt = require('bcryptjs');
const { createError } = require('../../helpers/createError');
const User = require('../../models/users');

const registerUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw createError({ status: 409, message: 'Email in use' });
    }

    const bcryptHashPassword = await bcrypt.hash(password, 10);

    const data = await User.create({ email, password: bcryptHashPassword });

    res.status(201).json({
        user: {
            email: data.email,
            subscription: data.subscription
        }
    });
}

module.exports = registerUser;