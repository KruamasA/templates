// import { Injectable } from '@nestjs/common';
// import { CreateTemplateDto } from './dto/create-template.dto';
// import { UpdateTemplateDto } from './dto/update-template.dto';

// @Injectable()
// export class TemplateService {
//   create(createTemplateDto: CreateTemplateDto) {
//     return 'This action adds a new template';
//   }

//   findAll() {
//     return `This action returns all template`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} template`;
//   }

//   update(id: number, updateTemplateDto: UpdateTemplateDto) {
//     return `This action updates a #${id} template`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} template`;
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async create(createDto: CreateTemplateDto): Promise<Template> {
    const created = new this.templateModel(createDto);
    return created.save();
  }

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateModel.findById(id).exec();
    if (!template) throw new NotFoundException(`Template ${id} not found`);
    return template;
  }

  async update(id: string, updateDto: UpdateTemplateDto): Promise<Template> {
    const updated = await this.templateModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Template ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<Template> {
    const deleted = await this.templateModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`Template ${id} not found`);
    return deleted;
  }
}
