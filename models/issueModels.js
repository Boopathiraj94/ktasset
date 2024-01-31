const sequelize = require('../database/dbcon.js');
const DataTypes = require('sequelize'); 
const employeeModel = require('../models/employeesModels.js');
const assetModel = require('../models/assetModels.js');

const issueModel = sequelize.define("issueassets",{
    employeeId : {
        type: DataTypes.INTEGER,
        // allowNull: false,
    },
    assetmasterId : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        // allowNull: true
    },
    returnstatus:{
        type: DataTypes.STRING,
        // allowNull: true
    },
    reason: {
        type: DataTypes.TEXT,
        // allowNull:true
    },
    addedat: {
        type: DataTypes.DATE,
        // allowNull:true
    }
},{
    timestamps: false,
});

// issueModel.hasMany(employeeModel);


employeeModel.belongsToMany(assetModel, { through: issueModel });
assetModel.belongsToMany(employeeModel, { through: issueModel });


employeeModel.hasMany(issueModel);
issueModel.belongsTo(employeeModel);
assetModel.hasMany(issueModel);
issueModel.belongsTo(assetModel);

module.exports = issueModel;