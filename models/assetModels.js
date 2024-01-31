const DataTypes = require('sequelize');
const sequelize = require('../database/dbcon.js');
const categoryModel = require('../models/assetcategoryModels.js');
const employeeModel = require('../models/employeesModels.js');

const assetModel = sequelize.define('assetmasters',{
    serialno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    make: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    purchasecost: {
        type: DataTypes.FLOAT,
        allowNull:false,
    },
    purchasedate: {
        type: DataTypes.DATE,
        allowNull:false,
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    isactive: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },
    returnstatus: {
        type: DataTypes.STRING
    }, 
    isscrap: {
        type: DataTypes.INTEGER
    },
    employeeId :{
        type: DataTypes.INTEGER
    }
},{
    timestamps: false,
});

categoryModel.hasMany(assetModel);
assetModel.belongsTo(categoryModel);

employeeModel.hasMany(assetModel);
assetModel.belongsTo(employeeModel);

module.exports = assetModel;