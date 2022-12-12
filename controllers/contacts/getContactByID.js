const { isValidObjectId } = require('mongoose');
const Contact = require('../../models/contact');
const { createError } = require('../../helpers/createError');

const getContactByID = async (req, res) => {
    const { contactId: id } = req.params;
    const { _id } = req.user;

    if (!isValidObjectId(id)) {
        throw createError({ status: 422, message: "Contact ID is not valid for MongoDB documents, please enter correct 'contactId' -> [ .../api/contacts/{:contactId} ]" });
    }

    const data = await Contact.findOne({ _id: id, owner: _id });

    if (!data) {
        throw createError({ status: 404, message: 'Not found' });
    }

    res.status(200).json(data);
}

module.exports = getContactByID;