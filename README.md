# Automation
You can find Required Information below.
Tests was launched on Win10x64. Jenkins version:2.138.3.

# Getting started with automation
1. Install Node.js v8.11.3+
2. Install Java v10.0.2 2018-07-17+

## Install/Update:
Use ```npm install ``` to install all components from package.json

# To run protractor tests:
1. Open console and Run webdriver using "webdriver-manager start"
2. Open another console window and run script using "protractor conf.js" (conf.js is default name)

# Allure Reporting:
Run report from "automation" folder. 
Type ```allure generate``` in console to generate report.

# Troubleshooting guide
If attempt to run protractor instance have failed then:
* Update Chrome browser.
* Update protractor
* Use ```npm update --save-dev``` to update all components.
