const fs = require('fs')
const path = require("path");
const openingBrowerWithUrls = ({
    url,
    browser,
    browserName
}) => {
    // Step 1 - Opening the tanyacare web pages
    let tabToOpen = browser.get(url);
    const dir_browser = `./${browserName}`
    let _date = new Date()
    let day = _date.getDay()
    let month = _date.getMonth()
    let year = _date.getFullYear()
    let hours = _date.getHours()
    let minutes = _date.getMinutes()
    let seconds = _date.getSeconds()
    let _time = `${hours}_${minutes}_${seconds}`

    const dir_date = `${day}_${month}_${year}___time_${_time}`
    let _url = url.split('/')
    _url = _url[_url.length - 1]
    const fileName_url = `${_url}.png`
    tabToOpen
        .then(function() {

            // Timeout to wait if connection is slow
            let findTimeOutP =
                browser.manage().setTimeouts({
                    implicit: 10000, // 10 seconds
                });
            return findTimeOutP;
        })

        .then(function() {
            browser.takeScreenshot()
                .then(
                    function(image, err) {
                        // Check browser folder exists
                        if (!fs.existsSync(path.join(__dirname, dir_browser))) {
                            // Create the brower folder
                            fs.mkdirSync(path.join(__dirname, dir_browser))
                            // Check test running folder dateTime exists
                            if (!fs.existsSync(path.join(__dirname.concat(`/${browserName}`, "/"), dir_date))) {
                                // Check test running folder dateTime exists
                                // Create the date folder
                                fs.mkdirSync(path.join(__dirname.concat(`/${browserName}`, "/"), dir_date))
                                fs.writeFile(path.join(__dirname.concat(`/${browserName}`).concat("/").concat(dir_date), `/${fileName_url}`), image, 'base64', function(err) {
                                    console.log(err);
                                })
                            } else {
                                fs.writeFile(path.join(__dirname.concat(`/${browserName}`).concat("/").concat(dir_date), `/${fileName_url}`), image, 'base64', function(err) {
                                    console.log(err);
                                })
                            }
                        } else {
                            if (!fs.existsSync(path.join(__dirname.concat(`/${browserName}`).concat("/"), dir_date))) {
                                // Check test running folder dateTime exists
                                // Create the date folder
                                fs.mkdirSync(path.join(__dirname.concat(`/${browserName}`).concat("/"), dir_date))
                                fs.writeFile(path.join(__dirname.concat(`/${browserName}`).concat("/").concat(dir_date), `/${fileName_url}`), image, 'base64', function(err) {
                                    console.log(err);
                                })
                            } else {
                                console.log(fileName_url, "fileName_urlfileName_url---")
                                fs.writeFile(path.join(__dirname.concat(`/${browserName}`).concat("/").concat(dir_date), `/${fileName_url}`), image, 'base64', function(err) {
                                    console.log(err);
                                })
                            }

                        }
                    }
                );
            console.log("Successfully tested!");
        })
        .catch(function(err) {
            console.log("Error ", err, " occurred!");
        });
    return tabToOpen
}


export {
    openingBrowerWithUrls
}