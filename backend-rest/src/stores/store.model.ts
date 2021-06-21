// user.model.ts
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { CategoryModel } from '../categorys/category.model';

@Table({
    tableName: 'store',
})
export class StoreModel extends Model {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID
    })
    id: string;
    
    @Column
    name: string;

    @Column
    description: string;

    @Column
    rating: number;

    @HasMany(()=> CategoryModel)
    category: CategoryModel[]

}