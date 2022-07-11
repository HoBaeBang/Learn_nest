import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from "../board-status.enum";
import any = jasmine.any;

export class BoardStatusValidationPipe implements PipeTransform {

  readonly StatusOption = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC
  ];

  transform(value: any): any {
    console.log(value);
    value = value.toUpperCase();
    if (!this.isStateValid(value)) {
      throw new BadRequestException(`${value} isn't int the status options`);
    }
  }

  private isStateValid(status: any) {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}