// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { TemplateService } from './template.service';
// import { CreateTemplateDto } from './dto/create-template.dto';
// import { UpdateTemplateDto } from './dto/update-template.dto';

// @Controller('template')
// export class TemplateController {
//   constructor(private readonly templateService: TemplateService) {}

//   @Post()
//   create(@Body() createTemplateDto: CreateTemplateDto) {
//     return this.templateService.create(createTemplateDto);
//   }

//   @Get()
//   findAll() {
//     return this.templateService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.templateService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
//     return this.templateService.update(+id, updateTemplateDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.templateService.remove(+id);
//   }
// }


import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  create(@Body() createDto: CreateTemplateDto) {
    return this.templateService.create(createDto);
  }

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateTemplateDto) {
    return this.templateService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateService.remove(id);
  }
}
