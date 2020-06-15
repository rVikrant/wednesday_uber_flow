const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const SequelizeMock = require('sequelize-mock');

// aliases for operators
const Op = Sequelize.Op;
const operatorsAliases = {
  $gt: Op.gt,
  $ne: Op.ne,
  $in: Op.in,
  $lte: Op.lte,
  $and: Op.and
}

let sequelize;
if (process.env.NODE_ENV === 'test') {
    sequelize = new SequelizeMock();
} else {
    sequelize = new Sequelize(
        process.env.DB_URI,
        {
            dialect: "mysql",
            logging: true,
            timezone: "+00:00",
            pool: {
                "min": 0,
                "max": 10,
                "idle": 10000
            },
            define: {
                "userscored": true,
                "timestamps": false
            },
            operatorsAliases
        }
    );
}

fs.readdirSync(__dirname)
    .filter(
        file =>
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
    )
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
