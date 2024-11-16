function convert() {
    const numberInput = document.getElementById("numberInput").value.trim();
    const baseInput = parseInt(document.getElementById("baseInput").value);
    const baseOutput = parseInt(document.getElementById("baseOutput").value);

    if (numberInput === "") {
        document.getElementById("output").innerText = "দয়া করে একটি সংখ্যা লিখুন!";
        return;
    }

    // রেডিক্স পয়েন্টের মাধ্যমে সংখ্যাটিকে ভাগ করা
    const [integerPart, fractionalPart] = numberInput.split(".");

    // ইনপুট সংখ্যার পূর্ণসংখ্যা অংশ দশমিক (Decimal) এ কনভার্ট করা
    let decimalInteger;
    try {
        decimalInteger = parseInt(integerPart, baseInput);
        if (isNaN(decimalInteger)) {
            throw new Error("input Error,Please try again and input correct Number!");
        }
    } catch (error) {
        document.getElementById("output").innerText = "input Error,Please try again and input correct Number!";
        return;
    }

    // দশমিক সংখ্যা পদ্ধতিতে ফ্র্যাকশনাল অংশে রূপান্তর
    let decimalFraction = 0;
    if (fractionalPart) {
        for (let i = 0; i < fractionalPart.length; i++) {
            const digit = parseInt(fractionalPart[i], baseInput);
            if (isNaN(digit)) {
                document.getElementById("output").innerText = "অবৈধ ফ্র্যাকশনাল অংশ!";
                return;
            }
            decimalFraction += digit / Math.pow(baseInput, i + 1);
        }
    }

    // পূর্ণ সংখ্যা এবং ফ্র্যাকশনাল অংশকে একত্রিত করা
    const decimalNumber = decimalInteger + decimalFraction;

    // আউটপুট বেস অনুযায়ী পূর্ণসংখ্যা অংশ কনভার্ট করা
    const convertedInteger = Math.floor(decimalNumber).toString(baseOutput).toUpperCase();

    // ফ্র্যাকশনাল অংশের কনভার্ট করা
    let convertedFraction = "";
    let fraction = decimalFraction;
    for (let i = 0; i < 10 && fraction !== 0; i++) {
        fraction *= baseOutput;
        const integerPart = Math.floor(fraction);
        convertedFraction += integerPart.toString(baseOutput).toUpperCase();
        fraction -= integerPart;
    }

    // পূর্ণসংখ্যা এবং ফ্র্যাকশনাল অংশকে একত্রিত করা
    const convertedNumber = convertedFraction ?
        `${convertedInteger}.${convertedFraction}` :
        convertedInteger;

    document.getElementById("output").innerText = `ফলাফল: ${convertedNumber}`;
}