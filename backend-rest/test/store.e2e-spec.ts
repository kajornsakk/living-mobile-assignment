import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { StoreModule } from '../src/stores/stores.module';
import { StoresService } from '../src/stores/stores.service';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';


describe('StoresController (e2e)', () => {
    let app: INestApplication;
    let service: StoresService;
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot({
                    dialect: 'sqlite',
                    autoLoadModels: true,
                    synchronize: true,
                    logging: false,
                }),
                StoreModule,
            ],
            providers: [StoreModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        service = module.get<StoresService>(StoresService);
    });

    describe('StoresController (e2e)', () => {
        // ...
        describe('Find all stores', () => {
            it('When there is one store, then return that store', async () => {
                const createStoreInput = {
                    name: 'FoodStory',
                    description: 'Marketplace',
                    rating: 10,
                };
                await service.create(createStoreInput);
    
                return request(app.getHttpServer())
                    .get('/store')
                    .expect(200)
                    .then((response) => {
                        expect(response.body[0]).toEqual(
                            expect.objectContaining(createStoreInput),
                        );
                    });
            });
        });

        describe('Find one store', () => {
            it('When there is one store, then return that store', async () => {
                const createStoreInput = {
                    name: 'FoodStory',
                    description: 'Marketplace',
                    rating: 10,
                };
                await service.create(createStoreInput);
    
                return request(app.getHttpServer())
                    .get('/store')
                    .expect(200)
                    .then((response) => {
                        expect(response.body[0]).toEqual(
                            expect.objectContaining(createStoreInput),
                        );
                    });
            });
        });

        describe('Create stores', () => {
            it('When store with valid input, then response 200 (OK) with created stores', async () => {
                const createStoreInput = {
                    name: 'Mo-Mo-Paradise',
                    description: 'Japanese restaurant',
                    rating: 5,
                };
                return request(app.getHttpServer())
                    .post('/store')
                    .send(createStoreInput)
                    .expect(201)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining(createStoreInput),
                        );
                });
            });
        });

        describe('Update stores', () => {
            it('When store with valid input, then response 200 (OK) with update stores', async () => {
                
                const createStoreInput = {
                    name: 'MK Restaurant',
                    description: 'restaurant',
                    rating: 10,
                };
                const createStore = await service.create(createStoreInput);
                
                const updateStoreInput = {
                    id: createStore.id,
                    name: 'FoodStory',
                    description: 'Marketplace',
                    rating: 4,
                };
                // console.log(updateStoreInput.id);
                return request(app.getHttpServer())
                    .put('/store/{updateStoreInput.id}')
                    .send(updateStoreInput)
                    .expect(200)
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        });
                });
        });

        describe('Delete stores', () => {
            it('When store with valid input, then response 200 (OK) with deleted stores', async () => {
                const createStoreInput = {
                    name: 'FoodStory',
                    description: 'Marketplace',
                    rating: 10,
                };
                const deleteStoreInput = await service.create(createStoreInput);

                // console.log(deleteStoreInput.id);
                // return;
                
                return request(app.getHttpServer())
                    .delete('/store/{deleteStoreInput.id}')
                    .send(deleteStoreInput)
                    .expect(200)
                    .then((response) => {
                        expect(response.statusCode).toEqual(200);
                        });
                });
        });
        // ...
    });

    afterAll(async () => {
        await app.close();
    });
});