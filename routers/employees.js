const express = require('express');
const router = express.Router(); 

const employeesController = require('../controllers/employeeController');

router.get("/",employeesController.login);
router.get("/login",employeesController.login);
router.get("/logout",employeesController.logout);
router.get("/dashboard",employeesController.dashboard);

router.get("/employeeview",employeesController.employeeview);

router.get("/addemployee",employeesController.addemployee);
router.post("/addemployee",employeesController.addemployeesave);
router.get("/editemployee",employeesController.editemployee);
router.post("/editemployee",employeesController.editemployeesave);

router.post("/loginProcess", employeesController.loginProcess);
 
module.exports = router;