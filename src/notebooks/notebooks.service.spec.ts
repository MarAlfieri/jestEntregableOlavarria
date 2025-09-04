import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

describe('NotebooksService', () => {
  let service: NotebooksService;

  beforeEach(() => {
    // Create a mock repository object
    const mockRepo = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    service = new NotebooksService(mockRepo);
  });

  it('debería crear una notebook', async () => {
    const dto: CreateNotebookDto = { title: 'Test', content: 'Content' };
    const result = await service.create(dto);
    expect(result).toMatchObject(dto);
    expect(result).toHaveProperty('id');
  });

  it('debería devolver todas las notebooks', async () => {
    await service.create({ title: 'A', content: 'B' });
    const result = await service.findAll();
    expect(result.length).toBeGreaterThan(0);
  });

  it('debería devolver una notebook', async () => {
    const created = await service.create({ title: 'A', content: 'B' });
    const result = await service.findOne(created.id);
    expect(result).toEqual(created);
  });

  it('should update a notebook', async () => {
    const created = await service.create({ title: 'A', content: 'B' });
    await service.update(created.id, { title: 'New', content: 'New' });
    const updated = await service.findOne(created.id);
    expect(updated.title).toBe('New');
  });

  it('debería borrar una notebook', async () => {
    const created = await service.create({ title: 'A', content: 'B' });
    const result = await service.remove(created.id);
    expect(result).toEqual({ deleted: true });
  });
});