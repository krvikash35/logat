'use strict'
let logger = require('../lib/logger');

logger.setOptions({
    logLevel: 4
})

function getAge(age) {
    logger.debug('Inside Student function');
    if (age < 18) {
        throw new Error('age must be above 18')
    } else {
        logger.info('returned age: ', age);
    }
}

try {
    getAge(15);
} catch (e) {
    logger.error(e);
}
