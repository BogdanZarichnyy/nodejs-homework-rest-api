const Contact = require('../../models/contact');

const getAllContact = async (req, res) => {
    const { _id } = req.user;
    const { favorite, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const params = {
        owner: _id
    }

    if (favorite !== undefined) {
        params.favorite = favorite;
    }

    const data = await Contact.find(params)
        .select({ __v: 0 })
        .skip(skip)
        .limit(limit);

    res.status(200).json(data);
}

module.exports = getAllContact;