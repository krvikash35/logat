# logat
a simple nodejs module for logging, provide many feature by default yet its coustomizable.

**Available Features**
- Can log to FILE or CONSOLE.
- Can print log name, date.
- Can print lineNo, fileName and functionName for where the log method was called.
- You can pass just string or object or any number of argument to log method.
- All the object passed to log method will be stringify and will be prefix with Object{index}
- If the object passed to error method is instance of error, then method will automatically print trace of that error, showing where the actuall error happend.
- Will emit event if any error occured like wrong options or file read error etc, we can attach the event listener after importing the module

###### Please Note:
line number where log was called is different from line number where error object got instantianted. i.e
```
line1: var userError = new Error('user name is Invalid'); //line1 is where error got created
line2: logger.error(userError);     //line2 is where the one of the logger method was called
```

**How to install**
```
npm install logat
```

**Basic Usages**
```
let logger = require('logat')
```



**Deatail Usages(example)**
```
'use strict'
let logger = require('logat');

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

```

**Deatail Usages(output of above example)**

[]https://github.com/krvikash35/logger/blob/master/example/logat2.png
