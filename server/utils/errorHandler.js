const errorHandler = (err) => {
    let required = false;
    let message = '';
    let status = 500;
    if (err.name === 'ValidationError') {
        for (field in err.errors) {
            if (err.errors[field].kind == 'required') {
                required = true;
            }
        }
        message = required ? 'requiredError' : 'invalidError'
        status = 400;
    } else if (err.name === 'MongoError' && err.code === 11000) {
        message = 'duplicateError'
        status = 409;
    } else if (err.name === 'SyntaxError') {
        message = 'syntaxError'
        status = 400;
    }
    else {
        message = 'serverError'
    }
    return {status, message};
}

module.exports = errorHandler;