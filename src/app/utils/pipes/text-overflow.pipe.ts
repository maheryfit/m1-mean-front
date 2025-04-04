import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textOverflow'
})
export class TextOverflowPipe implements PipeTransform {
  maxStringLength=20;
  transform(value: string, ...args: unknown[]): string {
    if(value.length<=this.maxStringLength){
      return value;
    }
    return value.substring(0,this.maxStringLength)+'...';
  }

}
