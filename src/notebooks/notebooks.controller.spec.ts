import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

describe('NotebooksController', () => {
  let controller: NotebooksController;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        {
          provide: NotebooksService,
          useValue: mockService,
        },
        {
          provide: getRepositoryToken(Notebook),
          useValue: mockRepo,
        },
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
  });

  it('debe ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una notebook', async () => {
    const dto: CreateNotebookDto = { title: 'Test', content: 'Content' };
    const result = { id: 1, ...dto };

    const spy = jest.spyOn(mockService, 'create').mockResolvedValue(result);

    const response = await controller.create(dto);
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith(dto);
  });

  it('debería retornar todas las notebooks', async () => {
    const result = [{ id: 1, title: 'A', content: 'B' }];

    const spy = jest.spyOn(mockService, 'findAll').mockResolvedValue(result);

    const response = await controller.findAll();
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalled();
  });

  it('debería retornar una notebook', async () => {
    const result = { id: 1, title: 'A', content: 'B' };

    const spy = jest.spyOn(mockService, 'findOne').mockResolvedValue(result);

    const response = await controller.findOne('1');
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('debería actualizar una notebook', async () => {
    const dto: UpdateNotebookDto = { title: 'Updated', content: 'Updated content' };
    const result = { id: 1, ...dto };
   
    const spy = jest.spyOn(mockService, 'update').mockResolvedValue(result);

    const response = await controller.update('1', dto);
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith(1, dto);
  });

  it('debería borrar una notebook', async () => {
    const result = { deleted: true };

    const spy = jest.spyOn(mockService, 'remove').mockResolvedValue(result);

    const response = await controller.remove('1');
    expect(response).toEqual(result);
    expect(spy).toHaveBeenCalledWith(1);
  });
});