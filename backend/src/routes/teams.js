const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const controller = require('../controllers/teamController');

router.use(auth);

router.get('/', controller.listTeams);
router.post('/', controller.createTeam);
router.put('/:id', controller.updateTeam);
router.delete('/:id', controller.deleteTeam);

router.post('/:teamId/assign', controller.assign);
router.delete('/:teamId/unassign', controller.unassign);

module.exports = router;
