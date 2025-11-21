const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/employeeController');

router.use(auth);

router.get('/', controller.listEmployees);
router.get('/:id', controller.getEmployee);
router.post('/', controller.createEmployee);
router.put('/:id', controller.updateEmployee);
router.delete('/:id', controller.deleteEmployee);

module.exports = router;
