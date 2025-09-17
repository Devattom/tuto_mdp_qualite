function isValidPhoneNumber(phone) {
    const phoneNumberRegex = /^(?:00|0|\+\d{2,3}|\+\d{2,3}\s+\(0\))(?=(?:\D*\d){4,15}$)[\d\s\-.]+$/;

    return phoneNumberRegex.test(phone);
}

function isValidEmail(phone) {
    const phoneEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return phoneEmailRegex.test(phone);
}

function sanitizePhone(phone) {
    let sanitizedNumber = phone.replace(/[\s\-\.]|\(0\)/g, '');

    if (sanitizedNumber.startsWith('00')) {
        return sanitizedNumber;
    }

    
    if (sanitizedNumber.startsWith('+')) {
        sanitizedNumber = sanitizedNumber.replace('+', '00');
    } else if (/^0\d{9}/.test(sanitizedNumber)) {
        sanitizedNumber = sanitizedNumber.replace(/^0/, '0033')
    }

    return sanitizedNumber;
}

module.exports = { isValidPhoneNumber, isValidEmail, sanitizePhone };