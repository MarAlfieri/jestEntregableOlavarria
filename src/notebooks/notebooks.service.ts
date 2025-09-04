import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notebook } from './entities/notebook.entity';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private readonly notebookRepo: Repository<Notebook>,
  ) {}

  async create(dto: CreateNotebookDto): Promise<Notebook> {
    const notebook = this.notebookRepo.create(dto);
    return this.notebookRepo.save(notebook);
  }

  async findAll(): Promise<Notebook[]> {
    return this.notebookRepo.find();
  }

  async findOne(id: number): Promise<Notebook> {
    const notebook = await this.notebookRepo.findOne({ where: { id } });
    if (!notebook) {
      throw new NotFoundException(`Notebook con ID ${id} no se encontró`);
    }
    return notebook;
  }

  async update(id: number, dto: UpdateNotebookDto): Promise<Notebook> {
    const notebook = await this.findOne(id);
    const updated = Object.assign(notebook, dto);
    return this.notebookRepo.save(updated);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    const result = await this.notebookRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Notebook con ID ${id} no se encontró`);
    }
    return { deleted: true };
  }
}