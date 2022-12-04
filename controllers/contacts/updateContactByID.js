const { isValidObjectId } = require('mongoose');
const Contact = require('../../models/contact');
const { createError } = require('../../helpers/createError');

const updateContactById = async (req, res) => {
    const { contactId: id } = req.params;
    const { name, email, phone } = req.body;

    if (!isValidObjectId(id)) {
        throw createError({ status: 422, message: "Contact ID is not valid for MongoDB documents, please enter correct 'contactId' -> [ .../api/contacts/{:contactId} ]" });
    }

    if (!name || !email || !phone) {
        throw createError({ status: 400, message: `Missing fields: { ${name ? '' : '"name" '}${email ? '' : '"email" '}${phone ? '' : '"phone" '}}` });
    }

    const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
        throw createError({ status: 404, message: 'Not Found' });
    }

    res.status(200).json(data);
}

module.exports = updateContactById;