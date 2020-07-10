const puppeteer = require('puppeteer');
const say = require('say')

function step0 (page) {
  return new Promise((resolve, reject) => {
    say.speak("Go to poll everywhere dot com.", null, 1.0, async (err) => {
      if (err) {
        return reject(err)
      }

      const navigationPromise = page.waitForNavigation()
      await page.goto('https://www.polleverywhere.com/')
      await navigationPromise
      resolve()
    })
  })
}

function step1 (page) {
  return new Promise ((resolve, reject) => {
    say.speak("Click support articles", null, 1.0, async (err) => {
      if (err) {
        return reject(err)
      }
    
      const navigationPromise = page.waitForNavigation()
      await page.waitForSelector('.site-page > .pe-site-header > .pe-site-header__nav > .pe-site-header__content > .pe-site-header__item:nth-child(3)')
      await page.click('.site-page > .pe-site-header > .pe-site-header__nav > .pe-site-header__content > .pe-site-header__item:nth-child(3)')
      
      await navigationPromise
      resolve()
    });
  })
}

function step2 (page) {
  return new Promise ((resolve, reject) => {
    say.speak("Click Installing Poll Everywhere for Google Slides", null, 1.0, async (err) => {
      if (err) {
        return reject(err)
      }
    
      const navigationPromise = page.waitForNavigation()
      await page.waitForSelector('.col-xs-12 > .img-text__content > ol > li:nth-child(9) > a')
      await page.click('.col-xs-12 > .img-text__content > ol > li:nth-child(9) > a')
      await navigationPromise
      resolve()
    });
  })
}

function step3 (page) {
  return new Promise ((resolve, reject) => {
    say.speak("Click the provided link", null, 1.0, async (err) => {
      if (err) {
        return reject(err)
      }
    
      const navigationPromise = page.waitForNavigation()
      await page.waitForSelector('.row > .col-xs-12 > .markdown > p:nth-child(3) > a')
      await page.click('.row > .col-xs-12 > .markdown > p:nth-child(3) > a')
      
      await navigationPromise
      resolve()
    });
  })
}

function step4 (page, browser) {
  return new Promise ((resolve, reject) => {
    say.speak("Click add to chrome. Now you have access to poll everywhere in Google Slides!", null, 1.0, async (err) => {
      if (err) {
        return reject(err)
      }
    
      await browser.close()

      
      resolve()
    });
  })
}


exports.puppeteerScript = async function () {
  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1800, height: 931 })

  await step0(page)
  await step1(page)
  await step2(page)
  await step3(page)
  await step4(page, browser)
}
