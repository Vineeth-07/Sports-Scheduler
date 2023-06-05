"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.belongsTo(models.Sport, {
        foreignKey: "sportId",
      });
    }

    static createSession({
      time,
      venue,
      participants,
      playersNeeded,
      sportId,
    }) {
      return this.create({
        time,
        venue,
        participants,
        playersNeeded,
        sportId,
      });
    }

    static deleteSession(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    static getSessions(sportId) {
      return this.findAll({
        where: {
          sportId,
        },
      });
    }

    static joinSession(participants, id) {
      return this.update(
        {
          participants,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    static removePlayer(participants, id) {
      return this.update(
        {
          participants,
        },
        {
          where: {
            id,
          },
        }
      );
    }
  }

  Session.init(
    {
      time: DataTypes.DATE,
      venue: DataTypes.STRING,
      participants: DataTypes.ARRAY(DataTypes.STRING),
      playersNeeded: DataTypes.INTEGER,
      sportId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
