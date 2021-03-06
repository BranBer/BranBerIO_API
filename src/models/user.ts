import { Model, DataTypes, Optional } from "sequelize";
import dbConnection from "../db/getDb";
import { User } from "../types/generated/graphql";
import bcrypt from "bcryptjs";

class UserModel extends Model<User, Optional<User, "id">> implements User {
  public id!: number;
  public email!: string;
  public password!: string;
  public displayName!: string;
  public description!: string;
  public isAdmin!: boolean;
  public isActive!: boolean;
  public picture!: string;
  public accountType!: string;
  public comparePassword = async (password: string) => {
    return await bcrypt.compare(password, this.password);
  };
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    accountType: {
      type: DataTypes.STRING,
      defaultValue: "regular",
    },
  },
  {
    sequelize: dbConnection,
    tableName: "users",
    underscored: true,
    timestamps: false,
    hooks: {
      beforeValidate: (instance) => {
        if (instance.accountType === "regular") {
          let hash = bcrypt.hashSync(instance.password);
          instance.password = hash;
        }

        instance.email = instance.email.toLowerCase();
      },
    },
  }
);
UserModel.sync();

export default UserModel;
