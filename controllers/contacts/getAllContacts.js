const Contact = require('../../models/contact');

const getAllContact = async (req, res) => {
    const data = await Contact.find({});

    res.status(200).json(data);
}

module.exports = getAllContact;