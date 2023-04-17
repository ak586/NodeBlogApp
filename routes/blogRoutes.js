
const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blogController");
//blog routes
router.get("/", blogController.blog_index)
router.post("/", blogController.blog_create_post)
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details);
router.get("/update/:id",blogController.blog_update_get);
//delete
router.delete('/:id', blogController.blog_delete);
router.put('/:id', blogController.blog_update_put);


module.exports = router;