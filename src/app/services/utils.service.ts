import { Injectable } from "@angular/core";

@Injectable()
export default class UtilsService {
  formatNumber(number, prefix = '') {
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
}
