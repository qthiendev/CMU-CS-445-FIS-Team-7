const express = require('express');
const router = express.Router();
const upload=require('../config/multer.js').upload;
const {
  getLoginpage,
  getHomepage,
  getHelloWorld,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser, 
  postRemoveUser
} = require('../controllers/homeController');

router.get('/', getLoginpage);
router.get('/homepage',  getHomepage); 
router.get('/create', getCreatePage); 
router.get('/update/:userId',getUpdatePage); 
router.get('/helloWorld', getHelloWorld);
router.post('/create-user', upload.single('form-control'), postCreateUser);
router.post('/update-user', postUpdateUser);
router.post('/delete-user/:userId', postDeleteUser);
router.post('/delete-user', postRemoveUser);
router.get('/logout', (req, res) => {
      res.redirect('/');
});

module.exports = router;
