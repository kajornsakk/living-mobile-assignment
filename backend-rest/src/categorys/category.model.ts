import { Column, Model, Table, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { StoreModel } from '../stores/store.model';
import { MenuModel } from '../menus/menu.model';

@Table({
    tableName: 'category',
})
export class CategoryModel extends Model {
    
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
        type: DataType.UUID
    })
    id: string;

    @Column
    name: string;

    @ForeignKey(()=> StoreModel)
    storeId: string;

    @HasMany(()=> MenuModel)
    menu: MenuModel[]
}