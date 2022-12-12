const express = require('express');

const { userAuthenticate } = require('../../middlewares/authenticateMiddleware');
const { addContactValidation, putContactValidation } = require('../../middlewares/contactValidationMiddleware');
const controllerWrraper = require('../../helpers/controllerWrraper');
const { getAllContacts, getContactByID, addContact, updateContactByID, updateStatusContact, deleteContactByID } = require('../../controllers/contacts');

const router = express.Router();

router.use(userAuthenticate);

router.get('/', controllerWrraper(getAllContacts));

router.get('/:contactId', controllerWrraper(getContactByID));

router.post('/', addContactValidation, controllerWrraper(addContact));

router.put('/:contactId', putContactValidation, controllerWrraper(updateContactByID));

router.patch('/:contactId/favorite', putContactValidation, controllerWrraper(updateStatusContact));

router.delete('/:contactId', controllerWrraper(deleteContactByID));

module.exports = router;
