import { Sequelize, DataTypes, ModelCtor, Optional } from "sequelize";
import dbConnection from "../db/getDb";
import { Project } from "../graphql/generated/types/graphql";
import { Model } from "sequelize";

interface ProjectsCreationAttributes extends Optional<Project, "id"> {}

class ProjectModel
  extends Model<Project, ProjectsCreationAttributes>
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
      type: DataTypes.ARRAY(DataTypes.BLOB),
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
