const { detelePersonalInformation } = require('../../services/managements/deletePersonalInformation');

const detelePersonal = async (req, res) => {
    var id = req.query.PERSONAL_ID;
    try {
        detelePersonalInformation(id);
    } catch (err) {
        console.log(err);
    } finally {
        res.redirect(`/Information`);
    }
}

module.exports = { detelePersonal };