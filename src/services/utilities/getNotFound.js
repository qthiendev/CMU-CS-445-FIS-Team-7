const getNotFound = (req, res) => {
    res.render("notFound.ejs")
}

module.exports = { getNotFound };