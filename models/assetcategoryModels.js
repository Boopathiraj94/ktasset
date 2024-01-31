const sequelize = require('../database/dbcon.js');
const DataTypes = require('sequelize'); 

const categoryModel = sequelize.define("categories",{
    categoryname : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isactive: {
        type: DataTypes.INTEGER
    },
},{
    timestamps: false,
});



module.exports = categoryModel;