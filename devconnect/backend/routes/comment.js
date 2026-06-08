const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const {
    createComment,
    getComment,
    deleteComment
} = require('../controllers/commentController')


router.post('/',protect, createComment)
router.get('/:projectId',getComment)
router.delete('/:id',protect,deleteComment)

module.exports = router