const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) errors.email = 'Must not be empty';
    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;
    else return false;
}

exports.validateSignUpData = (data) => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.mail = "Write please"
    } else if (!isEmail(data.email)) {
        errors.email = "Write you email";
    }

    if (isEmpty(data.firstName)) errors.firstName = "Write your first name";
    if (isEmpty(data.lastName)) errors.lastName = "Write your Surname";
    if (isEmpty(data.phoneNumber)) errors.phoneNumber = "What is your number?";
    if (isEmpty(data.country)) errors.country = "Where are your from";

    if (isEmpty(data.password)) errors.password = "Please! Write your password";
    if (data.password !== data.confirmPassword) errors.confirmPassword = "Please, write the same password";
    if (isEmpty(data.username)) errors.username = "Please write your user name";

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
}