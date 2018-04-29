// 第一次写加减乘除，在以后的日子慢慢优化吧…
// 大数相乘的本质回归到加法
// 大数相除的本质回归到减法

function add(a: string | string[], b: string | string[]): string {
  let res: string = "",
    c: number | boolean = 0;
  a = (<string>a).split(``);
  b = (<string>b).split(``);

  while (a.length || b.length || c) {
    (<number>c) += ~~a.pop() + ~~b.pop();
    res = <number>c % 10 + res;
    c = c > 9;
  }

  res = res.replace(/^0+/, "");

  return res === `` ? `0` : res;
}

function subtract(a: string | string[], b: string | string[]): string {
  let res: string = "",
    flag: boolean = false;
  a = (<string>a).split(``);
  b = (<string>b).split(``);

  while (a.length || b.length) {
    let num1 = ~~a.pop();
    const num2 = ~~b.pop();
    let tempFlag = false;

    if (num1 < num2) {
      num1 += 10;
      tempFlag = true;
    }

    if (num1 === num2 && flag === true) {
      res = "9" + res;
      flag = true;
      continue;
    }

    res = num1 - num2 - Number(flag) + res;
    flag = tempFlag;
  }

  res = res.replace(/^0+/, ``);

  return res === `` ? `0` : res;
}

function multiply(a: string | string[], b: string | string[]): string {
  if (a === `0` || b === `0`) {
    return `0`;
  }

  const zeroA = (<string>a).match(/0+$/);
  const zeroB = (<string>b).match(/0+$/);
  const powerA = zeroA ? zeroA[0].length : 0;
  const powerB = zeroB ? zeroB[0].length : 0;
  a = (<string>a).replace(/0+$/, "").split(``);
  b = (<string>b).replace(/0+$/, "").split(``);

  const multiplyAry = [];

  let res = "",
    result = "",
    c = 0,
    power = 0;

  while (b.length) {
    const numB = ~~b.pop();
    c = 0;
    res = "";

    for (let i = a.length - 1; i >= 0; i--) {
      c += ~~a[i] * numB;
      res = c % 10 + res;
      c = ~~(c / 10);
    }
    if (c) {
      res = c + res;
    }

    multiplyAry.push(res + "0".repeat(power));
    power++;
  }

  result = multiplyAry.reduce((acc, x) => add(acc, x), "0");

  return result + "0".repeat(powerA + powerB);
}

function divide(dividend: string | string[], divisor: string): string {
  dividend = (<string>dividend).split(``);
  let temp = dividend.splice(0, divisor.length - 1).join(``) || `0`;
  let remainder = ``;
  let result = ``;
  while (dividend.length || isGreaterOrEqual(temp, divisor)) {
    temp =
      temp !== `0`
        ? temp.concat(dividend.splice(0, 1).join(``))
        : dividend.splice(0, 1).join(``);

    if (isGreaterOrEqual(temp, <string>divisor)) {
      let lastMul = ``;
      let mul = divisor;
      let i;
      for (i = 2; i <= 10; i++) {
        lastMul = mul;
        mul = multiply(divisor, i + "");
        if (isGreater(mul, temp)) {
          break;
        }
      }
      result += `${i - 1}`;
      remainder = subtract(temp, lastMul);
      temp = remainder;
    } else {
      result !== `` ? (result += 0 + "") : null;
    }
  }

  return result === `` ? `0` : result;
}

const isGreater = (num1: string, num2: string) => {
  if (num1.length > num2.length) {
    return true;
  }
  if (num1.length < num2.length) {
    return false;
  }
  for (let i = 0; i < num1.length; i++) {
    if (num1[i] > num2[i]) {
      return true;
    } else if (num1[i] < num2[i]) {
      return false;
    }
  }
  return false;
};

const isGreaterOrEqual = (num1: string, num2: string) => {
  if (num1.length > num2.length) {
    return true;
  }
  if (num1.length < num2.length) {
    return false;
  }
  for (let i = 0; i < num1.length; i++) {
    if (num1[i] > num2[i]) {
      return true;
    } else if (num1[i] < num2[i]) {
      return false;
    }
  }
  return true;
};
