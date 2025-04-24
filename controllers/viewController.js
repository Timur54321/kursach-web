exports.getOverview = (req, res) => {
    res.status(200).render('overview', {
        title: "Главная страница"
    });
};

exports.getLoginPage = (req, res) => {
    res.status(200).render('loginPage', {
        title: "Login"
    });
};