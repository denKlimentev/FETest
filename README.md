# FETest
1. Clone the repo - https://github.com/denKlimentev/FETest.git
2. cd into FETest
3. npm install

Running Tests Locally
Run individual file: 'npm run testSaucedemoPortal -- --spec=./test/saucedemoPortal/purchaseFlowTest.js'

RESULT : 
> testSaucedemoPortal
> cross-env HOST=https://www.saucedemo.com/ testDirectory=saucedemoPortal ./node_modules/.bin/wdio wdio.conf.js "--spec=./test/saucedemoPortal/
purchaseFlowTest.js"


Execution of 1 spec files started at 2022-01-15T00:08:42.946Z

Failed to connect to selenium. Attempts left: 25
connect ECONNREFUSED 127.0.0.1:4444
[0-0] RUNNING in chrome - C:\Users\d.klimentev\Desktop\test\sd\FETest\test\saucedemoPortal\purchaseFlowTest.js
[0-0]   √ Purchase flow - pass
[0-0] PASSED in chrome - C:\Users\d.klimentev\Desktop\test\sd\FETest\test\saucedemoPortal\purchaseFlowTest.js

Spec Files:      1 passed, 1 total (100% completed) in 00:00:28

