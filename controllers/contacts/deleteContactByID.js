const { isValidObjectId } = require('mongoose');
const Contact = require('../../models/contact');
const { createError } = require('../../helpers/createError');

async function deleteContactByID(req, res) {
    const { _id } = req.user;
    const { contactId: id } = req.params;

    if (!isValidObjectId(id)) {
        throw createError({ status: 422, message: "Contact ID is not valid for MongoDB documents, please enter correct 'contactId' -> [ .../api/contacts/{:contactId} ]" });
    }

    const data = await Contact.findOneAndRemove({ _id: id, owner: _id });

    if (!data) {
        throw createError({status: 404, message: 'Not Found'});
    }

    res.status(200).json({ message: "Contact deleted" });
}

module.exports = deleteContactByID;