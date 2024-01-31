const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');


router.get("/categoryview",categoryController.categoryview);
router.get("/addcategory",categoryController.addcategory);
router.post("/addcategory",categoryController.addcategorysave);

router.get("/editcategory",categoryController.editcategory);
router.post("/editcategory",categoryController.editcategorysave);

module.exports  = router;