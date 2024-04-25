const renderHomeView = async (req, res) => {
    try {   
        await res.render("homePage.ejs");
        console.log('[System] homeController.js | Rendered homePage.');
    }
    catch (err) {
        console.log('[System] Error at homeController.js: ', err);
    }
}

module.exports = {renderHomeView};