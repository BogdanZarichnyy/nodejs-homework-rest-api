const getCurrentUser = async (req, res) => {
    const { email, subscription, avatarURL } = req.user;

    res.status(200).json({ email, subscription, avatarURL });
}

module.exports = getCurrentUser;