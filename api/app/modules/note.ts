import sequelize from "./sequelize";
import {DataTypes, Model, Optional} from "sequelize";

interface NoteAttributes {
    id: number;
    text: string;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, "id"> {}

class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
    public id!: number;
    public text!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Note.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "notes",
        sequelize: sequelize.getInstance(),
    }
);

export default Note;
