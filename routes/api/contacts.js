const express = require('express');

const { getAllContacts, getContactByID, addContact, updateContactByID, updateStatusContact, deleteContactByID } = require('../../controllers/contacts');
const { addContactValidation, putContactValidation } = require('../../middlewares/validationMiddleware');
const controllerWrraper = require('../../helpers/controllerWrraper');

const router = express.Router();

router.get('/', controllerWrraper(getAllContacts));

router.get('/:contactId', controllerWrraper(getContactByID));

router.post('/', addContactValidation, controllerWrraper(addContact));

router.put('/:contactId', putContactValidation, controllerWrraper(updateContactByID));

router.patch('/:contactId/favorite', putContactValidation, controllerWrraper(updateStatusContact));

router.delete('/:contactId', controllerWrraper(deleteContactByID));

module.exports = router;
