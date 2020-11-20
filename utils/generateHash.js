const crypto = require('crypto');

const generateMD5 = (value) => {
    return crypto.createHash('md5').update(value).digest('hex')
}

module.exports = generateMD5