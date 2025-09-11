import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { TemplateService } from './template.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  @UseInterceptors(FileInterceptor('value'))
  async createTemplate(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    const createdTemplate = await this.templateService.createTemplate(
      name,
      file,
    );
    console.log('saved', createdTemplate);

    return createdTemplate;
  }

  @Get()
  getTemplates(@Query('name') name: string) {
    return this.templateService.getTemplates(name);
  }

  @Get(':id')
  getOneTemplate(@Param('id') id: string) {
    console.log('getOneTemplate id', id);
    
    return this.templateService.getOneTemplate(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('value'))
  async updateTemplate(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    const updatedTemplate = await this.templateService.updateTemplate(
      id,
      name,
      file,
    );
    return updatedTemplate;
  }

  @Delete(':id')
  removeTemplate(@Param('id') id: string) {
    return this.templateService.removeTemplate(id);
  }
}
