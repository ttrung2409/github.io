import { Pipe, PipeTransform } from '@angular/core';
import UtilsService from '../services/utils.service';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  constructor(private utils: UtilsService) {  
  }

  transform(val) {    
    return this.utils.formatNumber(val, '');
  }  
}
