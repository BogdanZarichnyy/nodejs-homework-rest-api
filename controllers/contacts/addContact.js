const Contact = require('../../models/contact');
const { createError } = require('../../helpers/createError');

const addContact = async (req, res) => {
    const { _id } = req.user;
    const { name } = req.body;

    const [ contact ] = await Contact.find({ name });

    if (!contact) {
        const data = await Contact.create({ ...req.body, owner: _id });
        res.status(201).json(data);
    } else if (name === contact.name) {
        throw createError({ status: 400, message: `Сontact with such name [ ${name} ] already exists` });
    } else {
        throw createError();
    }
}

module.exports = addContact;