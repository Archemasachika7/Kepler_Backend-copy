export const generateReferralCode = (emailId, nameLetter, mobileNumberDigit) => {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    let result = '';
    for (let i = 0; i < 4; i++) {
        result += letters[Math.floor(Math.random() * letters.length)];
    }
    result += emailId;
    result += nameLetter;
    const digits = Array.from({ length: 10 }, (_, i) => i);
    for (let i = 0; i < 4; i++) {
        result += digits[Math.floor(Math.random() * digits.length)];
    }
    result += mobileNumberDigit;
    return result;
};
