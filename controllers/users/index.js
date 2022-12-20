const registrationUser = require('./registrationUser');
const loginUser = require('./loginUser');
const getCurrentUser = require('./currentUser');
const updateUserSubscription = require('./updateUserSubscription');
const updateUserAvatar = require('./updateUserAvatar');
const logoutUser = require('./logoutUser');

module.exports = {
    registrationUser,
    loginUser,
    getCurrentUser,
    updateUserSubscription,
    updateUserAvatar,
    logoutUser
}