const addContact = require('./addContact');
const getAllContacts = require('./getAllContacts');
const getContactByID = require('./getContactByID');
const updateContactByID = require('./updateContactByID');
const updateStatusContact  = require('./updateStatusContact ');
const deleteContactByID = require('./deleteContactByID');

module.exports = {
    addContact,
    getAllContacts,
    getContactByID,
    updateContactByID,
    updateStatusContact,
    deleteContactByID
}