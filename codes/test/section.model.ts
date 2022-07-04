import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Category} from "./category.model";

interface SectionCreationAttrs {
    title: string;
}

@Table({tableName: 'sections'})
export class Section extends Model<Section, SectionCreationAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    title: string;

    @HasMany(() => Category,{onDelete:'CASCADE'})
    categories:Category[];
}
