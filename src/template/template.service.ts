import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Template, TemplateDocument } from './schemas/template.schema';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { UtilService } from '@eqxjs/stub';
@Injectable()
export class TemplateService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}
  async createTemplate(
    name: string,
    file: Express.Multer.File,
  ): Promise<Template> {
    try {
      if (file?.mimetype !== 'text/html') {
        throw new BadRequestException('Only .html files are allowed!');
      }
      const htmlContent = file.buffer.toString('utf-8');
      name = name.trim();
      const createDto: CreateTemplateDto = {
        name,
        value: htmlContent,
      };

      const created = new this.templateModel(createDto);
      const templateCreated = await created.save();
      return templateCreated;
    } catch (error) {
      if (error?.code === 11000) {
        throw new BadRequestException(
          `Template name "${name}" already exists. Please use a different name.`,
        );
      } else {
        throw new BadRequestException(
          `Failed to created template. ${error.message}`,
        );
      }
    }
  }

  async getTemplates(@Query('name') name: string) {
    try {
      const template = await this.templateModel
        .findOne({
          name,
          deletedAt: null,
        })
        .exec();
      return template ?? { message: `Template name "${name}" not found` };
    } catch (error) {
      throw new BadRequestException('Failed to fetch templates');
    }
  }

  async getOneTemplate(id: string): Promise<Template> {
    try {
      const template = await this.templateModel
        .findOne({ _id: id, deletedAt: null })
        .exec();

      if (!template) throw new BadRequestException(`Template ${id} not found`);
      return template;
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch template. ${error.message}`,
      );
    }
  }

  async updateTemplate(
    id: string,
    name: string,
    file: Express.Multer.File,
  ): Promise<Template> {
    try {
      const template = await this.getOneTemplate(id);

      if (file?.mimetype !== 'text/html')
        throw new BadRequestException('Only .html files are allowed!');

      const htmlContent = file.buffer.toString('utf-8');
      name = name.trim();
      const updateDto: UpdateTemplateDto = {
        name,
        value: htmlContent,
      };
      const updated = await this.templateModel
        .findByIdAndUpdate(id, updateDto, { new: true })
        .exec();
      if (!updated) throw new BadRequestException(`Template ${id} not found`);

      return updated;
    } catch (error) {
      if (error?.code === 11000)
        throw new BadRequestException(
          `Template name "${name}" already exists. Please use a different name.`,
        );
      else {
        console.error('error', error);
        throw new BadRequestException(
          `Failed to updated template. ${error.message}`,
        );
      }
    }
  }

  async removeTemplate(id: string): Promise<Template> {
    try {
      const deleted = await this.templateModel
        .findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true })
        .exec();
      if (!deleted) throw new BadRequestException(`Template ${id} not found`);
      return deleted;
    } catch (error) {
      throw new BadRequestException(
        `Failed to delete template. ${error.message}`,
      );
    }
  }
}
