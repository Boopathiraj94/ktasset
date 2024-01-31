const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController.js');


router.get("/assetview",assetController.assetview);
router.get("/addasset",assetController.addasset);
router.post("/addasset",assetController.addassetsave);

router.get("/editasset",assetController.editasset);
router.post("/editasset",assetController.editassetsave);

module.exports  = router;