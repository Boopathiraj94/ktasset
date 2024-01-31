const sequelize = require("../database/dbcon");
const assetmasters = require("../models/assetModels"); 
const employee = require("../models/employeesModels");
const assetcategoryModels = require("../models/assetcategoryModels");
const Sequelize = require('sequelize');

exports.login = async (req, res) => {
    res.render('index.pug');
};

exports.dashboard = async (req, res) => {

    const issues = await assetmasters.findAll({
        where:{ status: ["CREATED","RETURN"]},
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('assetmasters.id')), 'count'],
            [sequelize.literal('"category"."categoryname"'), 'categoryname'],
        ],
        include: [
            {
                model: assetcategoryModels,
                attributes: [], // Include only the necessary columns from categories
                required: false,
            },
        ],
        group: ['assetmasters.categoryId', 'category.categoryname'],
        raw: true, // Make sure to include raw: true to get plain JSON results
    });
    
    

    
    // console.log(issues);
    res.render('dashboard.pug',{issues});
};

exports.logout = async (req, res) => {
    res.redirect('/login');
};

exports.addemployee = async (req, res) => {
    res.render('addemployee.pug');
};

exports.editemployee = async (req, res) => {
    // console.log(req.query.id);
    const datas = await employee.findOne({where: {id:req.query.id}});
    // console.log(datas);
    res.render('editemployee.pug',{datas});
};


exports.loginProcess = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    // employee.create({email:email,password:password,isActive:1});
    isSuccess = await employee.findOne({where: {email:email,password:password}});

    if(isSuccess){
        res.redirect('/dashboard');
    }else{
        res.render('index.pug',{msg: "Invalid username or password"});
    }

    
};

exports.employeeview = async (req, res) => {
     employees = await employee.findAll();

     res.render('employee.pug',{employees});
};

exports.addemployeesave = async (req, res) => { 
    isSuccess = await employee.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isactive:1,
        // password:req.body.password
        role: 'USER'
    });

    if(isSuccess){
        res.render('addemployee.pug',{msg:'Employee is added Successfully'});
    }else{
        res.render('addemployee.pug',{msg:'Employee is not added Successfully'});
    }
};

exports.editemployeesave = async (req, res) => {

    isSuccess = await employee.update({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isactive:1,
        // password:req.body.password
    },{where:{
        id: req.query.id
    }});
    
    if(isSuccess){
        const datas = await employee.findOne({where: {id:req.query.id}});
        res.render('editemployee.pug',{msg:'Employee is Edited Successfully',datas});
    }else{
        res.render('editemployee.pug',{msg:'Employee is not Edited Successfully',datas});
    }
};