'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('pets', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  species: {
    type: DataTypes.ENUM,
    values: ['dog','cat','fish'],
    allowNull: true,
  },
});
