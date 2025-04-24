const Router = require('express').Router;
const router = new Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router.post('/', userController.createUser);
// router.get('/', userController.getUsers);
// router.get('/:id', userController.getOneUser);
// router.put('/', userController.updateUser);
// router.delete('/:id', userController.deleteUser);


module.exports = router;