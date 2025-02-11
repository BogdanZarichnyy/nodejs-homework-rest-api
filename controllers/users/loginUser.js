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

    if (!user.verify) {
        throw createError({ status: 400, message: 'User is not already verified' });
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
            subscription: user.subscription,
            avatarURL: user.avatarURL
        }
    });
}

module.exports = loginUser;