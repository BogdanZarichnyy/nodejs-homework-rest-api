const User = require('../../models/users');

const updateUserSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body

    await User.findByIdAndUpdate(_id, { subscription });

    res.status(200).json({ message: 'Subscription update' });
}

module.exports = updateUserSubscription;