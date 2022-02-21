const delay = require("delay");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const randomstring = require('randomstring');
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
const UserAgent = require("user-agents");
const fs = require('fs-extra');
const fetch =require('node-fetch');
const moment = require('moment');
const { ConsoleMessage } = require("puppeteer");
var keyOtp = ''; // api key sms active
const password = '721886ASU' // set Passwordnya disini
var LamatungguOTP = 300;
var pathBrave = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'

const functionGetNumber = () => new Promise((resolve, reject) => {
  // fetch(`https://sms-activate.org/stubs/handler_api.php?api_key=${keyOtp}&action=getNumber&service=hx&operator=&country=0`, { 
    fetch(`https://sms-activate.org/stubs/handler_api.php?action=getNumber&api_key=${keyOtp}&service=go&country=6&forward=0&owner=site&operator=any`,{
      method: 'GET'
  })
  .then(res => res.text())
  .then(result => {
      resolve(result);
  })
  .catch(err => reject(err))
});
const generateIndoName = () => new Promise((resolve, reject) => {
  fetch('https://swappery.site/data.php?qty=1', {
      method: 'GET'
  })
      .then(res => res.json())
      .then(res => {
          resolve(res)
      })
      .catch(err => {
          reject(err)
      })
});
const functionChangeConfirm = (idOrder) => new Promise((resolve, reject) => {
  fetch(`https://sms-activate.org/stubs/handler_api.php?action=setStatus&api_key=${keyOtp}&id=${idOrder}&status=3`, { 
      method: 'GET'
  })
  .then(res => res.text())
  .then(result => {
      resolve(result);
  })
  .catch(err => reject(err))
});

const functionChangeCancel = (idOrder) => new Promise((resolve, reject) => {
  fetch(`https://sms-activate.org/stubs/handler_api.php?api_key=${keyOtp}&action=setStatus&status=8&id=${idOrder}`, { 
      method: 'GET'
  })
  .then(res => res.text())
  .then(result => {
      resolve(result);
  })
  .catch(err => reject(err))
});

const functionGetOtp = (idOrder) => new Promise((resolve, reject) => {
  fetch(`https://sms-activate.org/stubs/handler_api.php?api_key=${keyOtp}&action=getStatus&id=${idOrder}`, { 
      method: 'GET'
  })
  .then(res => res.text())
  .then(result => {
      resolve(result);
  })
  .catch(err => reject(err))
});

const functionGetBalance = () => new Promise((resolve, reject) => {
  fetch(`https://sms-activate.org/stubs/handler_api.php?api_key=${keyOtp}&action=getBalance`, { 
      method: 'GET'
  })
  .then(res => res.text())
  .then(result => {
      resolve(result);
  })
  .catch(err => reject(err))
});

(async () => {

    puppeteer.use(StealthPlugin());
    process.setMaxListeners(0);
    const userAgent = new UserAgent({
      deviceCategory: "mobile",
      platform: "Linux x86_64",
    });
    const userAgent1 = new UserAgent({
      deviceCategory: "desktop",
      platform: "Linux x86_64",
    });
    while(true){
      try {

          do {
              var getBalance = await functionGetBalance()
          } while(!getBalance.includes('ACCESS_BALANCE'))

          const balance = getBalance.split(':')[1]

          if(balance >= 7){
             
              do{
                  var getNumber = await functionGetNumber()
              } while(!getNumber.includes('ACCESS_NUMBER'))

             
             
                const idOrder = getNumber.split(':')[1]
                const nomor = getNumber.split(':')[2].slice(2)
              console.log(`[${(moment().format('HH:mm:ss'))}]Berhasil Mendapatkan Nomor 62${nomor}`)
              
              const browser = await puppeteer.launch({
                setTimeout: 9999999,
                executablePath: pathBrave,
                headless: false, 
                devtools: false,
                defaultViewport: null,
                
                args: [`--user-agent=${userAgent}`,
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--ignore-certifcate-errors',
                '--ignore-certifcate-errors-spki-list',
                '--disable-accelerated-2d-canvas',
                '--no-zygote',
                '--no-first-run',
                '--disable-dev-shm-usage',
                 `--window-size=1200,900`],
              });
              const [page] = await browser.pages({setTimeout: 9999999});
              var usrAgen = userAgent.toString().replace(/\r?\n|\r/, "");
              await page.setUserAgent(usrAgen);
              await page.setViewport({ width: 1200, height: 900 });
              await page.setDefaultNavigationTimeout(0);
           
           try{   
            await page.goto('https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&flowEntry=SignUp',{waituntil:'load'})
            await delay(2000)
            await page.waitForSelector('#firstName')
            const indoName = await generateIndoName();
            const { result } = indoName;
            await delay(2000)
             const namaAwal = result[0].firstname
             const namaAkhir =  result[0].lastname
             const emailAkun = namaAkhir+namaAwal+'1404'

             const randomDay = randomstring.generate({length: 1,charset: '123456789'})
             const randomYears = randomstring.generate({length: 1,charset: '123456789'})
             const randomMonth = randomstring.generate({length: 1,charset: '1234566789'})
             const randomGender = randomstring.generate({length: 1,charset: '12'})
            await page.type('#firstName',namaAwal)
            await page.type('#lastName',namaAkhir)
            await page.type('#username',emailAkun)
            await page.type('#passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input',password)
            await page.type('#confirm-passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input',password)
            await delay(500)
            await page.click('#accountDetailsNext > div > button > span')
            await delay(2000)
            await page.type('#phoneNumberId',nomor)
            await delay(1000)
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')
            await delay(300)
            

              let countGetOtp = 0;
              let statusOtp = false;

              console.log(`[${(moment().format('HH:mm:ss'))}]Sedang menunggu OTP`)

              do{
                  countGetOtp++   
                  var getOtp = await functionGetOtp(idOrder)
                  if(!getOtp.includes('STATUS_OK')) {
                      statusOtp = true;
                  }
                  delay(1000)
              } while(!getOtp.includes('STATUS_OK') && countGetOtp <= LamatungguOTP)
              if (statusOtp == true){
                const otp = getOtp.match(/\d+/)[0]
                
                console.log(`[${(moment().format('HH:mm:ss'))}]OTP ${otp}`)
                await delay(1000)
            await page.waitForSelector('input[class="whsOnd zHQkBf"]')
            await page.type('input[class="whsOnd zHQkBf"]',otp)
            await delay(1000)
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.qhFLie > div > div > button > span')
            await delay(1000)

            await page.type('#view_container > div > div > div.pwWryf.bxPAYd > div > div.WEQkZc > div > form > span > section > div > div > div.akwVEf.OcVpRe > div.d2CFce.cDSmF.OcVpRe > div > div.aCsJod.oJeWuf > div > div.Xb9hP > input','duranggox@gmail.com')
             await page.type('#day',randomDay)
            await delay(500)
            await page.click('#month')
            await delay(1000)
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('Tab')
            await delay(1000)
            await page.type('#year',`199${randomYears}`)
            await delay(1000)
            await page.click('#gender')
            await delay(300)
            await delay(1000)
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('ArrowDown')
            await page.keyboard.press('Tab')
            await delay(1000)
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')
            await delay(1000)
            

            await page.waitForSelector('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.qhFLie > div > div > button > span')

            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')
            await delay(2000)
            
           
           try{ await page.waitForSelector('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')
             await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')
              await delay(2000)}catch{}
              try{
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button') 
            await delay(2000)}catch{}
            await delay(5000)
            await delay(2000)
            await page.goto('https://m.youtube.com/channel/UCs_qMFR0-drgIV3rNW6dJRQ?reload=9&skip_registered_account_check=true&noapp=1',{waitUntil :'load'})
            await page.waitForSelector(`#app > div.page-container > ytm-browse > ytm-c4-tabbed-header-renderer > div.c4-tabbed-header-channel.cbox > div > div > ytm-subscribe-button-renderer > div > c3-material-button > button > div > div`)
            await page.click('#app > div.page-container > ytm-browse > ytm-c4-tabbed-header-renderer > div.c4-tabbed-header-channel.cbox > div > div > ytm-subscribe-button-renderer > div > c3-material-button > button > div > div')
            console.log(`Sukses Register=> ${emailAkun} + '|' + ${passwordAkun}`)    
            await delay(2000)
            fs.appendFileSync("SuccessRegisterGoogle.txt", emailAkun + '|' + passwordAkun + '\n'.split(' ').join(''));
            console.log('==========================================================')
           
            
            
              }
              else
              {
                console.log(`[${(moment().format('HH:mm:ss'))}]OTP gagal didapatkan\n`)
                            for(var i = 0; i < 2; i++){
                                var done = await functionChangeCancel(idOrder)
                                await browser.close()
                            }
              }
              
                        }
             catch(e){
               console.log(e)
               for(var i = 0; i < 2; i++){
                                var done = await functionChangeCancel(idOrder)
                                await browser.close()
                            }
               console.log(`[${(moment().format('HH:mm:ss'))}]Gagal Mendapatkan OTP`)
             }
             await browser.close()

             //dari sini
             
            

             
            

          } else {
              console.log(`[${(moment().format('HH:mm:ss'))}]Saldo abis !`)
              break;
          }
      } catch (e) {
          console.log(e)
      }
  }
   
    
  })();
  