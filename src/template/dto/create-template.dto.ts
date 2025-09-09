// create-template.dto.ts
export class CreateTemplateDto {
  name: string;
  value: string;
}

// update-template.dto.ts
export class UpdateTemplateDto {
  name?: string;
  value?: string;
}
