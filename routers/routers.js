const { Router } = require('express');
const authController = require('../controllers/authControllers');
// import authControllers from ('../controllers/authControllers');
var {requireAuth} = require('.././middleware/authMiddleware');

const router = Router();

router.get('/', authController.login_get);
router.post('/', authController.login_post);
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/todo', requireAuth, authController.todo_get);
router.get('/todo/create-task', requireAuth, authController.create_task_get);
router.post('/todo/create-task', requireAuth, authController.create_task_post);
router.get('/todo/edit-task/:id', requireAuth, authController.edit_task_get);
router.post('/todo/edit-task/:id', requireAuth, authController.edit_task_post);
router.get('/delete', requireAuth, authController.delete_get);
router.get('/logout', requireAuth, authController.logout_get);

module.exports = router;