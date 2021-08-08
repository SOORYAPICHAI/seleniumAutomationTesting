// lambdatest.com/blog/automation-testing-with-selenium-javascript/
// https://www.browserstack.com/guide/automation-using-selenium-javascript
// https://www.browserstack.com/guide/ui-testing-with-selenium

// setting es6 configuration
// https://www.javascripttutorial.net/es6/setting-es6-project-using-babel/

// BABEL CONFIG FILES
require("babel-core/register");
require("babel-polyfill");


// Include selenium webdriver
let swd = require("selenium-webdriver");
require('chromedriver');
require('geckodriver');
require('selenium-webdriver/safari')
let browser = new swd.Builder();
let chromeBuild = browser.forBrowser("chrome").build();
let firefoxBuild = browser.forBrowser("firefox").build();
// *IMPORTANT: to test safari browser we need mac pc*
// let safariBuild = browser.forBrowser("safari").build();

// import testing script
const {
    openingBrowerWithUrls
} = require('./onlyUITestingWithDiffenentBrowers/index')

// urls to test
let urls = ['https://tanyacare.dev.ainqaplatform.in/login', 'https://tanyacare.dev.ainqaplatform.in/dashboard', 'https://tanyacare.dev.ainqaplatform.in/management/partner_management/provider/']
// browsers to test
let browsers = [{
    value: chromeBuild,
    label: "chrome"
}, {
    value: firefoxBuild,
    label: "firefox"
}]

try {
    browsers.map(async browser => {
        return await urls.map(async url => {
            return await openingBrowerWithUrls({
                url: url,
                browser: browser.value,
                browserName: browser.label
            })
        })
    })

} catch (error) {
    console.log(error)
}