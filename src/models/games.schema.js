'use strict';

module.exports = (sequelizeDatabase, DataTypes) => sequelizeDatabase.define('games', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genre: {
    type: DataTypes.ENUM,
    values: ['shooter','strategy','sports'],
    allowNull: true,
  },
});
