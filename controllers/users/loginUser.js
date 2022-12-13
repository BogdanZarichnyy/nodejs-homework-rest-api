const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createError} = require('../../helpers/createError');
const User = require('../../models/users');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        throw createError({ status: 401, message: 'Email or password is wrong' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw createError({ status: 401, message: 'Email or password is wrong' });
    }

    const userId = {
        id: user._id
    };

    const token = jwt.sign(userId, process.env.JWT_SECRET_KEY);

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });
}

module.exports = loginUser;