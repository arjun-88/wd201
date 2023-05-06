/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static async getTodos() {
      return this.findAll();
    }

    static async getToday() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          },
          completed: {
            [Op.eq]: false,
          },
        },
      });
    }

    static async getOverdue() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date(),
          },
          completed: {
            [Op.eq]: false,
          },
        },
      });
    }

    static async getdueLater() {
      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date(),
          },
        },
        completed: {
          [Op.eq]: false,
        },
      });
    }

    static async getcompleted() {
      return this.findAll({
        where: {
          completed: {
            [Op.eq]: true,
          },
        },
      });
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    setCompletionStatus(status) {
      const st = !status;
      return this.update({ completed: st });
    }

    //   delete_value() {
    //     return this.destroy();
    //   }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
