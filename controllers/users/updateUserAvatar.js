const path = require('path');
const fs = require('fs/promises');
const User = require('../../models/users');
const Jimp = require('jimp');

const AVATAR_DIR_PATH = path.join(__dirname, '..', '..', 'public', 'avatars');

const updateUserAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: userAvatarTempPath, originalname } = req.file;

    const extension = path.extname(originalname);
    const filename = `${_id}${extension}`;

    const userAvatarPath = path.join(AVATAR_DIR_PATH, filename);

    const userAvatar = await Jimp.read(userAvatarTempPath);
    userAvatar.resize(250, 250).write(userAvatarTempPath);

    await fs.rename(userAvatarTempPath, userAvatarPath);

    const avatarURL = path.join('avatars', filename);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(200).json({ avatarURL });
}

module.exports = updateUserAvatar;
