import { DataTypes, Optional } from "sequelize";
import dbConnection from "../db/getDb";
import { Project } from "../types/generated/graphql";
import { Model } from "sequelize";

class ProjectModel
  extends Model<Project, Optional<Project, "id">>
  implements Project
{
  public id!: number;
  public name!: string;
  public description!: string;
  public dateCreated!: Date;
  public repoLink!: string;
  public projectLink!: string;
  public images!: string[];
}

ProjectModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateCreated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    repoLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    projectLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
  },
  {
    sequelize: dbConnection,
    tableName: "projects",
    underscored: true,
    timestamps: false,
  }
);

export default ProjectModel;
