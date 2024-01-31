const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController.js');


router.get("/issueview",issueController.issueview);
router.get("/addissue",issueController.addissue);
router.post("/addissue",issueController.addissuesave);

router.get("/editissue",issueController.editissue);
router.post("/editissue",issueController.editissuesave);


router.get("/returnview",issueController.returnview);
router.get("/addreturn",issueController.addreturn);
router.post("/addreturn",issueController.addreturnsave);

router.get("/editreturn",issueController.editreturn);
router.post("/editreturn",issueController.editreturnsave);

router.get("/scrapview",issueController.scrapview);
router.get("/setscrap",issueController.setscrap);


router.get("/assethistory",issueController.assethistory);

router.get("/fetchdata",issueController.fetchdata);

module.exports  = router;