 const DataTypes = require('sequelize');
 const sequelize = require('../database/dbcon.js'); 

const employeeModel =  sequelize.define("employees", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },
        email: {
             type: DataTypes.STRING,
             allowNull: false,
        },
        phone: {
             type: DataTypes.STRING,
             allowNull: false,
        },
        isactive: {
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING
        }
        
    }, {
        timestamps: false,
    });


module.exports = employeeModel