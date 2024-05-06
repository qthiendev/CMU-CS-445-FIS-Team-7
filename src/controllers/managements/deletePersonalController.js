const { detelePersonalInformation } = require('../../services/managements/deletePersonalInformation');

const detelePersonal = async (req, res) => {
    try {
        detelePersonalInformation(req.query.PERSONAL_ID);
    } catch(err) {
        console.log('', err);
    } finally {
        res.redirect(`/Information`);
    }
}

module.exports = { detelePersonal };