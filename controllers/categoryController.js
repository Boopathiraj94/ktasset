const category = require('../models/assetcategoryModels');

exports.categoryview = async (req, res) => {
    const categories = await category.findAll();
    res.render('categoryview.pug',{categories});
};


exports.addcategory = async (req, res) => { 
    res.render('addcategory.pug');
};

exports.addcategorysave = async (req, res)=>{ 
    const isSuccess = await category.create({
        categoryname:req.body.categoryname,
    });

    if(isSuccess){
        res.render('addcategory.pug',{msg:'Category is Added Successfully'});
    }else{
        res.render('addcategory.pug',{msg:'Category is not Added Successfully'});
    }
};


exports.editcategory = async (req, res) => {
    const datas = await category.findOne({where:{id:req.query.id}}); 
    res.render('editcategory.pug',{datas});
};

exports.editcategorysave = async (req, res)=>{ 
    const isSuccess = await category.update({
        categoryname:req.body.categoryname,
    },{
        where: { id:req.query.id}
    });
    let datas = await category.findOne({where:{id:req.query.id}});
    if(isSuccess){
        
        // console.log(datas)
        res.render('editcategory.pug',{msg:'Category is Updated Successfully',datas});
    }else{
        res.render('editcategory.pug',{msg:'Category is not Updated Successfully'});
    }
};