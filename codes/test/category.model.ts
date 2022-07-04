import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Section} from "./section.model";

interface CategoryCreationAttrs {
    title: string;
}

@Table({tableName: 'categories'})
export class Category extends Model<Category, CategoryCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    title: string;

    @ForeignKey(() => Section)
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    sectionId: number;
}
