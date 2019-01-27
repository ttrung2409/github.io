import { Injectable } from "@angular/core";
import * as _ from 'lodash'

@Injectable()
export default class UtilsService {
  formatNumber(numberIn, prefix = '') {
    if (!numberIn) return '';

    let number = numberIn.toString().replace(/\.\d\d$/, '');
    let thousandSeparator = ',';
    let decimalSeparator = '.';
    let regex = new RegExp('[^' + decimalSeparator + '\\d]', 'g');
    let numberString = !!number ? number.toString().replace(regex, '') : '';
    let split = numberString.split(decimalSeparator);
    let rest = split[0].length % 3;
    let result = split[0].substr(0, rest);
    let thousands = split[0].substr(rest).match(/\d{3}/g);

    if (thousands) {
      let separator = rest ? thousandSeparator : '';
      result += separator + thousands.join(thousandSeparator);
    }

    result = split[1] != undefined ? result + decimalSeparator + split[1] : result;
    return prefix == undefined ? result : (result ? prefix + result : '');
  };

  random(min: number = 0, max: number = Math.pow(2, 31) - 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;    
  }

  empty(obj) {
    if (_.isArray(obj)) {
      return [];
    }

    for (let prop of Object.keys(obj)) {
      if (_.isDate(obj[prop])) {
        obj[prop] = null;
      }
      else if (_.isArray(obj[prop])) {
        obj[prop] = [];
      }
      else if (_.isString(obj[prop])) {
        obj[prop] = '';
      }
      else if (_.isBoolean(obj[prop])) {
        obj[prop] = false;
      }
      else if (_.isObject(obj[prop])) {
        obj[prop] = this.empty(obj[prop]);
      }
      else {
        obj[prop] = null;
      }
    }

    return obj;
  }
}

