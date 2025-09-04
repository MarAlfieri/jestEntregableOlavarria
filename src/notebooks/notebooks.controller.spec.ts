// import { Test, TestingModule } from '@nestjs/testing';
// import { NotebooksController } from './notebooks.controller';
// import { NotebooksService } from './notebooks.service';
// import { CreateNotebookDto } from './dto/create-notebook.dto';
// import { UpdateNotebookDto } from './dto/update-notebook.dto';

// describe('NotebooksController', () => {
//   let controller: NotebooksController;
//   let service: NotebooksService;

//   const mockService = {
//     create: jest.fn(),
//     findAll: jest.fn(),
//     findOne: jest.fn(),
//     update: jest.fn(),
//     remove: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [NotebooksController],
//       providers: [
//         {
//           provide: NotebooksService,
//           useValue: mockService,
//         },
//       ],
//     }).compile();

//     controller = module.get<NotebooksController>(NotebooksController);
//     service = module.get<NotebooksService>(NotebooksService);
//   });

//   it('debe ser definido', () => {
//     expect(controller).toBeDefined();
//   });

//   it('debería crear una notebook', async () => {
//     const dto: CreateNotebookDto = {title: 'Test', content: 'Content' };
//     const result = { id: 1, ...dto };
//     mockService.create.mockResolvedValue(result);

//     expect(await controller.create(dto)).toEqual(result);
//   });

//   it('debería retornar todas las notebooks', async () => {
//     const result = [{ id: 1, title: 'A', content: 'B' }];
//     mockService.findAll.mockResolvedValue(result);

//     expect(await controller.findAll()).toEqual(result);
//   });

//   it('debería retornar una notebook', async () => {
//     const result = { id: 1, title: 'A', content: 'B' };
//     mockService.findOne.mockResolvedValue(result);

//     expect(await controller.findOne('1')).toEqual(result);
//   });

//   it('debería actualizar una notebook', async () => {
//     const dto: UpdateNotebookDto = { title: 'Updated', content: 'Updated content' };
//     const result = { id: 1, ...dto };
//     mockService.update.mockResolvedValue(result);

//     expect(await controller.update('1', dto)).toEqual(result);
//   });

//   it('debería borrar una notebook', async () => {
//     const result = { deleted: true };
//     mockService.remove.mockResolvedValue(result);

//     expect(await controller.remove('1')).toEqual(result);
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

describe('NotebooksController', () => {
  let controller: NotebooksController;
  let service: NotebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [NotebooksService],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
    service = module.get<NotebooksService>(NotebooksService);
  });

  it('debe ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una notebook', async () => {
    const dto: CreateNotebookDto = { title: 'Test', content: 'Content' };
    const result = { id: 1, ...dto };

    const spy = jest.spyOn(service, 'create').mockResolvedValue(result);

    const response = await controller.create(dto);
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith(dto);
  });

  it('debería retornar todas las notebooks', async () => {
    const result = [{ id: 1, title: 'A', content: 'B' }];

    const spy = jest.spyOn(service, 'findAll').mockResolvedValue(result);

    const response = await controller.findAll();
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalled();
  });

  it('debería retornar una notebook', async () => {
    const result = { id: 1, title: 'A', content: 'B' };

    const spy = jest.spyOn(service, 'findOne').mockResolvedValue(result);

    const response = await controller.findOne('1');
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('debería actualizar una notebook', async () => {
    const dto: UpdateNotebookDto = { title: 'Updated', content: 'Updated content' };
    const result = { id: 1, ...dto };

    const spy = jest.spyOn(service, 'update').mockResolvedValue(result);

    const response = await controller.update('1', dto);
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith('1', dto);
  });

  it('debería borrar una notebook', async () => {
    const result = { deleted: true };

    const spy = jest.spyOn(service, 'remove').mockResolvedValue(result);

    const response = await controller.remove('1');
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith('1');
  });
});