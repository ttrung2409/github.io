export default {
  formatNumber(numberIn, { allowDecimal = false } = {}) {
    if (numberIn === undefined || numberIn === null || numberIn === '') return '';

    try {
      let isNegative = numberIn < 0;
      let matches = numberIn.toString().match(/^([-\d,]+)(\.?\d*)$/);
      let number = matches[1];
      let decimal = parseFloat(`0${matches[2]}`) > 0 ? matches[2] : null;
      let thousandSeparator = ',';
      let decimalSeparator = '.';
      let numberString = !!number ? number.toString().replace(/[^.\d]/g, '') : '';
      let split = numberString.split(decimalSeparator);
      let rest = split[0].length % 3;
      let result = split[0].substr(0, rest);
      let thousands = split[0].substr(rest).match(/\d{3}/g);

      if (thousands) {
        let separator = rest ? thousandSeparator : '';
        result += separator + thousands.join(thousandSeparator);
      }

      result = split[1] != undefined ? result + decimalSeparator + split[1] : result;
      result = allowDecimal ? `${result}${decimal || ''}` : result;
      return isNegative ? `-${result}` : result;
    }
    catch {
      return numberIn;
    }
  }
}

