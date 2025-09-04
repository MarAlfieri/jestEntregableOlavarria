// import { NotebooksService } from './notebooks.service';
// import { CreateNotebookDto } from './dto/create-notebook.dto';
// import { UpdateNotebookDto } from './dto/update-notebook.dto';

// describe('NotebooksService', () => {
//   let service: NotebooksService;

//   beforeEach(() => {
//     // Create a mock repository object
//     const mockRepo = {
//       create: jest.fn(),
//       find: jest.fn(),
//       findOne: jest.fn(),
//       save: jest.fn(),
//       update: jest.fn(),
//       delete: jest.fn(),
//     } as any;
//     service = new NotebooksService(mockRepo);
//   });

//   it('debería crear una notebook', async () => {
//     const dto: CreateNotebookDto = { title: 'Test', content: 'Content' };
//     const result = await service.create(dto);
//     expect(result).toMatchObject(dto);
//     expect(result).toHaveProperty('id');
//   });

//   it('debería devolver todas las notebooks', async () => {
//     await service.create({ title: 'A', content: 'B' });
//     const result = await service.findAll();
//     expect(result.length).toBeGreaterThan(0);
//   });

//   it('debería devolver una notebook', async () => {
//     const created = await service.create({ title: 'A', content: 'B' });
//     const result = await service.findOne(created.id);
//     expect(result).toEqual(created);
//   });

//   it('should update a notebook', async () => {
//     const created = await service.create({ title: 'A', content: 'B' });
//     await service.update(created.id, { title: 'New', content: 'New' });
//     const updated = await service.findOne(created.id);
//     expect(updated.title).toBe('New');
//   });

//   it('debería borrar una notebook', async () => {
//     const created = await service.create({ title: 'A', content: 'B' });
//     const result = await service.remove(created.id);
//     expect(result).toEqual({ deleted: true });
//   });
// });
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

describe('NotebooksService', () => {
  let service: NotebooksService;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new NotebooksService(mockRepo);
  });

  it('debería crear una notebook', async () => {
    const dto: CreateNotebookDto = { title: 'Test', content: 'Content' };
    const createdNotebook = { id: 1, ...dto };

    jest.spyOn(mockRepo, 'create').mockReturnValue(createdNotebook);
    jest.spyOn(mockRepo, 'save').mockResolvedValue(createdNotebook);

    const result = await service.create(dto);

    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockRepo.save).toHaveBeenCalledWith(createdNotebook);
    expect(result).toEqual(createdNotebook);
  });

  it('debería devolver todas las notebooks', async () => {
    const notebooks = [{ id: 1, title: 'A', content: 'B' }];

    jest.spyOn(mockRepo, 'find').mockResolvedValue(notebooks);

    const result = await service.findAll();

    expect(mockRepo.find).toHaveBeenCalled();
    expect(result).toEqual(notebooks);
  });

  it('debería devolver una notebook', async () => {
    const notebook = { id: 1, title: 'A', content: 'B' };

    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(notebook);

    const result = await service.findOne(1);

    expect(mockRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(notebook);
  });

  it('debería actualizar una notebook', async () => {
    const dto: UpdateNotebookDto = { title: 'New', content: 'New' };
    const updatedNotebook = { id: 1, ...dto };

    jest.spyOn(mockRepo, 'update').mockResolvedValue({ affected: 1 });
    jest.spyOn(mockRepo, 'findOne').mockResolvedValue(updatedNotebook);

    await service.update(1, dto);
    const result = await service.findOne(1);

    expect(mockRepo.update).toHaveBeenCalledWith(1, dto);
    expect(result).toEqual(updatedNotebook);
  });

  it('debería borrar una notebook', async () => {
    jest.spyOn(mockRepo, 'delete').mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);

    expect(mockRepo.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });
});