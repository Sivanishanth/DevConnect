const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')

const { createProject,      
    getAllProject,
    getProjectById,
    updateProject,
    deleteProjects,
    likeProject } = require('../controllers/projectControll')

router.get('/',getAllProject)
router.post('/', protect ,createProject)
router.get('/:id',getProjectById)
router.put('/:id', protect ,updateProject)
router.delete('/:id', protect ,deleteProjects)
router.patch('/:id/like', protect ,likeProject)

module.exports = router