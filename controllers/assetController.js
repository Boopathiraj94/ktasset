const assetmasters = require("../models/assetModels");
const assetcategory = require("../models/assetcategoryModels");
const issueModel = require("../models/issueModels");


exports.assetview = async (req, res)=> {
    const assets = await assetmasters.findAll({
      where:{isscrap:0},
      include: {
      model: assetcategory
  }});
  // console.log(assets);
    res.render("assetview.pug",{assets});
}

exports.addasset = async (req, res) => {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      let randomInt = getRandomInt(100000, 9999999);

      const categories = await assetcategory.findAll();
    res.render("addasset.pug",{serialno:randomInt,categories});
};


exports.editasset = async (req, res) => {

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomInt = getRandomInt(100000, 9999999);
 

  const categories = await assetcategory.findAll();


  const datas = await assetmasters.findOne({where:{id:req.query.id}}); 
  res.render('editasset.pug',{serialno:randomInt,categories,datas});
};



exports.addassetsave = async (req, res) => {
     const isSuccess = await assetmasters.create({
        serialno: req.body.serialno,
        make: req.body.make,
        model: req.body.model,
        purchasecost: req.body.purchasecost,
        purchasedate: req.body.purchasedate,
        supplier: req.body.suppliername,
        categoryId: req.body.categoryid,
        status: "CREATED",
     });

     const datas = await assetmasters.findOne({where:{serialno:req.body.serialno}}); 

     const issemodel = await issueModel.create({
      employeeId: 6,
      assetmasterId: datas.id,
      status: "CREATED",
      returnstatus: "-",
      reason: "-",
     });
     function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      let randomInt = getRandomInt(100000, 9999999);

      const categories = await assetcategory.findAll();

     if(isSuccess){
       res.render("addasset.pug",{serialno:randomInt,categories,msg:"Asset Added Successfully"});
     }else{
        res.render("addasset.pug",{serialno:randomInt,categories,msg:"Asset not Added Successfully"});
     }
};


exports.editassetsave = async (req, res) => {
  const isSuccess = await assetmasters.update({
     serialno: req.body.serialno,
     make: req.body.make,
     model: req.body.model,
     purchasecost: req.body.purchasecost,
     purchasedate: req.body.purchasedate,
     supplier: req.body.suppliername,
     categoryId: req.body.categoryid,
     status: "CREATED",
  },{
    where:{
        id: req.query.id
    }
  }); 

   const categories = await assetcategory.findAll();
   let datas = await assetmasters.findOne({where:{id:req.query.id}});
  if(isSuccess){
    res.render("editasset.pug",{categories,datas,msg:"Asset Updated Successfully"});
  }else{
     res.render("editasset.pug",{categories,datas,msg:"Asset not Updated Successfully"});
  }
};