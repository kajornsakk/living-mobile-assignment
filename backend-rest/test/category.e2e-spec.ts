import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { CategoryModule } from '../src/categorys/category.module';
import { StoreModule } from '../src/stores/stores.module';
import { StoresService } from '../src/stores/stores.service';
import { CategorysService } from '../src/categorys/categorys.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

describe('CategorysController (e2e)', () => {
    let app: INestApplication;
    let storesService: StoresService;
    let serviceStore : StoresService;
    let service: CategorysService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                CategoryModule,
                StoreModule
            ],
            providers: [CategorysService],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<CategorysService>(CategorysService);
        serviceStore = module.get<StoresService>(StoresService);
    });

    describe('Find all stores', () => {
        it('When there is one store, then return that store', async () => {

            const storeInput ={
                name: 'FoodStory',
                description: 'Marketplace',
                rating: 10,
            }
            const createStoreInput = await serviceStore.create(storeInput);
            // console.log(createStoreInput.id);

            const createCategoryInput = {
                name: 'Marketplace',
                storeId: createStoreInput.id,
            };
            console.log(createCategoryInput)
            const test = await service.create(createCategoryInput);
            // console.log('test data' + " " + test);

            return request(app.getHttpServer())
                .get('/categorys')
                .expect(200)
                .then((response) => {
                    expect(response.body[0]).toEqual(
                        expect.objectContaining(createCategoryInput),
                    );
                });
        });
    });

    describe('Create category', () => {
        it('When store with valid input, then response 200 (OK) with created stores', async () => {

            const storeInput = {
                name: 'MK retaurant',
                description: 'retaurant',
                rating: 10,
            }
            const createStoreInput2 = await serviceStore.create(storeInput);
            console.log(createStoreInput2);

            const createCategoryInput = {
                name: 'Marketplace',
                storeId: createStoreInput2.id,
            };

            return request(app.getHttpServer())
                .post('/categorys')
                .send(createCategoryInput)
                .expect(201)
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining(createCategoryInput),
                    );
            });
        });
    });

    describe('Update stores', () => {
        it('When store with valid input, then response 200 (OK) with update stores', async () => {
            
            const createCategoryforUpdate = {
                name: 'MK Restaurant',
                description: 'restaurant',
                rating: 10,
            };
            const createStoreToUpdate = await serviceStore.create(createCategoryforUpdate);
            
            const updateCategoryInput = {
                name:'FoodStory',
                id: createStoreToUpdate.id
            };
            // console.log(updateStoreInput.id);
            return request(app.getHttpServer())
                .put('/store/{updateStoreInput.id}')
                .send(updateCategoryInput)
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                    });
            });
    });

    describe('Delete stores', () => {
        it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
            const createStoreforDelete = {
                name: 'FoodStory',
                description: 'Marketplace',
                rating: 10,
            };
            const deleteStoreInput = await serviceStore.create(createStoreforDelete);

            const createCategoryforDelete = {
                name: 'Marketplace',
                storeId: deleteStoreInput.id,
            };
            const categoryforDelete = await service.create(createCategoryforDelete);
            console.log(categoryforDelete);

            // console.log(deleteStoreInput.id);
            // return;
            
            return request(app.getHttpServer())
                .delete('/categorys/{categoryforDelete.id}')
                .send(createCategoryforDelete)
                .expect(200)
                .then((response) => {
                    expect(response.statusCode).toEqual(200);
                    });
            });
    });



    afterAll(async () => {
        await app.close();
    });

});