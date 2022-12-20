const express = require('express');

const { registerUserSchemaValidation, loginUserSchemaValidation, updateUserSubscriptionSchemaValidation } = require('../../middlewares/userValidationMiddleware');
const { userAuthenticate } = require('../../middlewares/authenticateMiddleware');
const controllerWrraper = require('../../helpers/controllerWrraper');
const upload = require('../../middlewares/uploadUserAvatarMiddlware');
const { registrationUser, loginUser, getCurrentUser, updateUserSubscription, updateUserAvatar, logoutUser } = require('../../controllers/users');

const router = express.Router();

router.post('/register', registerUserSchemaValidation, controllerWrraper(registrationUser));

router.post('/login', loginUserSchemaValidation, controllerWrraper(loginUser));

router.post('/current', userAuthenticate, controllerWrraper(getCurrentUser));

router.patch('/', userAuthenticate, updateUserSubscriptionSchemaValidation, controllerWrraper(updateUserSubscription));

router.patch('/avatars', userAuthenticate, upload.single('avatar'), controllerWrraper(updateUserAvatar));

router.post('/logout', userAuthenticate, controllerWrraper(logoutUser));

module.exports = router;