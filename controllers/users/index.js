const registrationUser = require('./registrationUser');
const verificationUser = require('./verificationUser');
const reVerificationUser = require('./reVerificationUser');
const loginUser = require('./loginUser');
const getCurrentUser = require('./currentUser');
const updateUserSubscription = require('./updateUserSubscription');
const updateUserAvatar = require('./updateUserAvatar');
const logoutUser = require('./logoutUser');

module.exports = {
    registrationUser,
    verificationUser,
    reVerificationUser,
    loginUser,
    getCurrentUser,
    updateUserSubscription,
    updateUserAvatar,
    logoutUser
}