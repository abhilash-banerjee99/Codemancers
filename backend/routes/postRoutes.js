const express = require('express')
const router = express.Router()

const {setPost, getPosts, deletePost} = require('../controllers/postController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getPosts).post(protect,setPost)
router.route('/:id').delete(protect,deletePost)

module.exports = router