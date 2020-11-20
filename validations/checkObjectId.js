const objectID = require('mongodb').ObjectID

const checkId = (id) => {
    return objectID.isValid(id)
}

module.exports = checkId