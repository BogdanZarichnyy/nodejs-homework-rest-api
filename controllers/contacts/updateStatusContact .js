const { isValidObjectId } = require('mongoose');
const Contact = require('../../models/contact');
const { createError } = require('../../helpers/createError');

const updateStatusContact  = async (req, res) => {
    const { contactId: id } = req.params;

    if (!isValidObjectId(id)) {
        throw createError({ status: 422, message: "Contact ID is not valid for MongoDB documents, please enter correct 'contactId' -> [ .../api/contacts/{:contactId} ]" });
    }

    if (req.body.favorite === undefined) {
        throw createError({ status: 400, message: 'Missing field: { "favorite" }' });
    }

    const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
        throw createError({ status: 404, message: 'Not Found' });
    }

    res.status(200).json(data);
}

module.exports = updateStatusContact ;