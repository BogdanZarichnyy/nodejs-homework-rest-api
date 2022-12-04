const { isValidObjectId } = require('mongoose');
const Contact = require('../../models/contact');
const { createError } = require('../../helpers/createError');

async function deleteContactByID(req, res) {
    const { contactId: id } = req.params;

    if (!isValidObjectId(id)) {
        throw createError({ status: 422, message: "Contact ID is not valid for MongoDB documents, please enter correct 'contactId' -> [ .../api/contacts/{:contactId} ]" });
    }

    const data = await Contact.findByIdAndRemove(id);

    if (!data) {
        throw createError({status: 404, message: 'Not Found'});
    }

    res.status(200).json({ message: "contact deleted" });
}

module.exports = deleteContactByID;