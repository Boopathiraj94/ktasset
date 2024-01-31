const sequelize = require("../database/dbcon");
const assetmasters = require("../models/assetModels"); 
const employeeModel = require("../models/employeesModels");
const issueModel = require('../models/issueModels');
const Sequelize = require('sequelize');


exports.issueview = async (req, res)=> {
    const issues = await issueModel.findAll({
        where: { status: ["ISSUE"] },
        attributes: { include: ['id'] }, 
        include: [
            {
                model: assetmasters,  
                where: { status: ["ISSUE"] },
            },
            {
                model: employeeModel,  
            },
        ]
      });
//   console.log(issues);
    res.render("issueview.pug",{issues});
}

exports.addissue = async (req, res)=> {
    const employees = await employeeModel.findAll({where: {role:"USER"}});
    const assets = await assetmasters.findAll({where:{status:["CREATED","RETURN"]}});
    res.render("addissue.pug",{employees,assets});
};

exports.editissue = async (req, res)=> {
    const employees = await employeeModel.findAll();
    const assets = await assetmasters.findAll({where:{status:["CREATED","ISSUE"]}});
    const datas = await issueModel.findOne({where:{id: req.query.id},attributes: { include: ['id'] }});
    // console.log(datas)
    res.render("editissue.pug",{employees,assets,datas});
};

exports.addissuesave = async (req, res)=>{ 
    const isSuccess = await issueModel.create({
        employeeId:req.body.employeeId,
        assetmasterId:req.body.assetId,
        status:"ISSUE",
        returnstatus: "-",
        reason: "-",
    });
    const isUpdate = await assetmasters.update({
        status : "ISSUE",
        employeeId : req.body.employeeId
    },
    { where: { id : req.body.assetId}
    });
    const employees = await employeeModel.findAll();
    const assets = await assetmasters.findAll({where:{status:"CREATED"}});
    if(isSuccess){
        
        res.render('addissue.pug',{employees,assets,msg:'Issue is Added Successfully'});
    }else{
        res.render('addissue.pug',{employees,assets,msg:'Issue is not Added Successfully'});
    }
};

exports.editissuesave = async (req, res)=>{ 
    const isSuccess = await issueModel.update({
        employeeId:req.body.employeeId,
        assetmasterId:req.body.assetId,
        status: "ISSUE",
        returnstatus: "-",
        reason: "-",
    },{
        where:{ id: req.query.id}
    });
    const isUpdate = await assetmasters.update({status:"ISSUE" ,employeeId : req.body.employeeId},{where:{id:req.body.assetId}});
    const employees = await employeeModel.findAll();
    const assets = await assetmasters.findAll({where:{status:"CREATED"}});
    if(isSuccess){
        const datas = await issueModel.findOne({where:{id: req.query.id},attributes: { include: ['id'] }});
        res.render('editissue.pug',{employees,assets,datas,msg:'Issue is Updated Successfully'});
    }else{
        res.render('editissue.pug',{employees,assets,msg:'Issue is not Updated Successfully'});
    }
};

// start return view

exports.returnview = async (req, res)=> {
    const returns = await assetmasters.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: sequelize.literal(
                    '(SELECT "employeeId" FROM "assetmasters" where "status"=\'ISSUE\' )'
                ),
            },
        },
        attributes: { include: ['id'] }, 
        include: [
             
            {
                model: employeeModel,  
            },
        ]
    });
  // console.log(assets);
    res.render("returnview.pug",{returns});
}

exports.addreturn = async (req, res)=> {
    const employees = await employeeModel.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: sequelize.literal(
                    '(SELECT "employeeId" FROM "assetmasters" where "status"=\'ISSUE\' )'
                ),
            },
        },
    });
    const assets = await assetmasters.findAll({where:{status:"ISSUE"}},);
    res.render("addreturn.pug",{employees,assets});
};

exports.fetchdata = async (req, res) => {
    const responseData = await assetmasters.findAll({where:{employeeId: req.query.id}});
    res.send(responseData);
};

exports.editreturn = async (req, res)=> {
    const employees = await employeeModel.findAll();
    const assets = await assetmasters.findAll({where:{status:"RETURN"}});
    const datas = await issueModel.findOne({where:{id: req.query.id},attributes: { include: ['id'] }});
    // console.log(datas)
    res.render("editreturn.pug",{employees,assets,datas});
};

exports.addreturnsave = async (req, res)=>{ 
    const isSuccess = await issueModel.create({
        employeeId:req.body.employeeId,
        assetmasterId:req.body.assetId,
        status:"RETURN",
        returnstatus: req.body.returnstatus,
        reason: req.body.reason,
    });
    const isUpdate = await assetmasters.update({
        status:"RETURN",
        returnstatus: req.body.returnstatus,
        employeeId:req.body.employeeId,
    },
    {where:{id:req.body.assetId}
});
    const employees = await employeeModel.findAll();
    const assets = await assetmasters.findAll({where:{status:"ISSUE"}});
    if(isSuccess){
        
        res.render('addreturn.pug',{employees,assets,msg:'Return is Added Successfully'});
    }else{
        res.render('addreturn.pug',{employees,assets,msg:'Return is not Added Successfully'});
    }
};

exports.editreturnsave = async (req, res)=>{ 
    const isSuccess = await issueModel.update({ 
        employeeId:req.body.employeeId,
        assetmasterId:req.body.assetId,
        status: "RETURN",
        returnstatus: req.body.returnstatus,
        reason: req.body.reason,
    },{
        where:{ id: req.query.id}
    });
    const isUpdate = await assetmasters.update({
        status:"RETURN",
        returnstatus: req.body.returnstatus,
        employeeId:req.body.employeeId,
    },
    {
        where:{id : req.body.assetId}
    });
    const employees = await employeeModel.findAll();
    const assets = await assetmasters.findAll({where:{status:"ISSUE"}});
    if(isSuccess){
        const datas = await issueModel.findOne({where:{id: req.query.id},attributes: { include: ['id'] }});
        res.render('editreturn.pug',{employees,assets,datas,msg:'Return is Updated Successfully'});
    }else{
        res.render('editreturn.pug',{employees,assets,msg:'Return is not Updated Successfully'});
    }
};



exports.scrapview = async (req, res)=> {
    const issues = await assetmasters.findAll({
        where: { status: ["ISSUE","RETURN"] },
        attributes: { include: ['id'] }, 
        include: [
            {
                model: employeeModel,  
            },
        ],
        order: [
            ['id', 'ASC'],
        ],
      });
    res.render("scrapview.pug",{issues});
}

exports.setscrap = async (req, res) => {
    const isSuccess = await issueModel.create({
        employeeId:req.query.employeeId,
        assetmasterId:req.query.assetmasterId,
        status:"SCRAP",
        returnstatus: "-",
        reason: "-",
    });
    const isUpdate = await assetmasters.update({
        status:"SCRAP",isscrap:1,
        employeeId:req.body.employeeId,
    },
        {where:{id:req.query.assetmasterId}});

    res.redirect('/scrapview');
};


exports.assethistory = async (req, res)=> { 
    const assets = await issueModel.findAll({
        
        attributes: { include: ['id'] },
        attributes: { include: ['addedat'] }, 
        include: [
            {
                model: assetmasters,
            },
            {
                model: employeeModel,  
            },
        ],
        order: [
            ['id', 'DESC'],
        ],
      });
    //   console.log(assets);
    res.render("assethistory.pug",{assets});
};
