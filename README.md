# FETest
1. Clone the repo - https://github.com/denKlimentev/FETest.git
2. cd into FETest
3. npm install

Running Tests Locally
Run individual file: 'npm run testSaucedemoPortal -- --spec=./test/saucedemoPortal/purchaseFlowTest.js'

RESULT : 
> cross-env HOST=https://www.saucedemo.com/ testDirectory=saucedemoPortal ./node_modules/.bin/wdio wdio.conf.js "--spec=./test/saucedemoPortal/purchaseFlowTest.js"


Execution of 1 spec files started at 2022-01-16T13:52:06.684Z

[0-0] RUNNING in chrome - C:\Users\d.klimentev\Desktop\QF\New folder\FETest\test\saucedemoPortal\purchaseFlowTest.js
[0-0] Test.allTheThings() T-Shirt (Red)
[0-0]   √ Purchase flow - pass
[0-0] PASSED in chrome - C:\Users\d.klimentev\Desktop\QF\New folder\FETest\test\saucedemoPortal\purchaseFlowTest.js

Spec Files:      1 passed, 1 total (100% completed) in 00:00:22


Process finished with exit code 0


