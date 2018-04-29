// 第一次写加减乘除，在以后的日子慢慢优化吧…
// 大数相乘的本质回归到加法
// 大数相除的本质回归到减法
function add(a, b) {
    let res = "", c = 0;
    a = a.split(``);
    b = b.split(``);
    while (a.length || b.length || c) {
        c += ~~a.pop() + ~~b.pop();
        res = c % 10 + res;
        c = c > 9;
    }
    res = res.replace(/^0+/, "");
    return res === `` ? `0` : res;
}
function subtract(a, b) {
    let res = "", flag = false;
    a = a.split(``);
    b = b.split(``);
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
function multiply(a, b) {
    if (a === `0` || b === `0`) {
        return `0`;
    }
    const zeroA = a.match(/0+$/);
    const zeroB = b.match(/0+$/);
    const powerA = zeroA ? zeroA[0].length : 0;
    const powerB = zeroB ? zeroB[0].length : 0;
    a = a.replace(/0+$/, "").split(``);
    b = b.replace(/0+$/, "").split(``);
    const multiplyAry = [];
    let res = "", result = "", c = 0, power = 0;
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
function divide(dividend, divisor) {
    dividend = dividend.split(``);
    let temp = dividend.splice(0, divisor.length - 1).join(``) || `0`;
    let remainder = ``;
    let result = ``;
    while (dividend.length || isGreaterOrEqual(temp, divisor)) {
        temp =
            temp !== `0`
                ? temp.concat(dividend.splice(0, 1).join(``))
                : dividend.splice(0, 1).join(``);
        if (isGreaterOrEqual(temp, divisor)) {
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
        }
        else {
            result !== `` ? (result += 0 + "") : null;
        }
    }
    return result === `` ? `0` : result;
}
const isGreater = (num1, num2) => {
    if (num1.length > num2.length) {
        return true;
    }
    if (num1.length < num2.length) {
        return false;
    }
    for (let i = 0; i < num1.length; i++) {
        if (num1[i] > num2[i]) {
            return true;
        }
        else if (num1[i] < num2[i]) {
            return false;
        }
    }
    return false;
};
const isGreaterOrEqual = (num1, num2) => {
    if (num1.length > num2.length) {
        return true;
    }
    if (num1.length < num2.length) {
        return false;
    }
    for (let i = 0; i < num1.length; i++) {
        if (num1[i] > num2[i]) {
            return true;
        }
        else if (num1[i] < num2[i]) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=kata.js.map