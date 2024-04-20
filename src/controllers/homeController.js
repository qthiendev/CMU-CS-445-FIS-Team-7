const renderHomeView = async (req, res) => {
    try {   
        await res.render("homePage.ejs",);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {renderHomeView};