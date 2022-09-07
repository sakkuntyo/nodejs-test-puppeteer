const puppeteer = require('puppeteer');
const { setTimeout } = require('timers/promises');

(async () => {
	  const browser = await puppeteer.launch({
            args: ['--no-sandbox']
	  });
	  const page = await browser.newPage();
	  await page.goto('https://hiroyuki.coefont.cloud/');
	  client = await page.target().createCDPSession();
	  client.send('Page.setDownloadBehavior', {
            behavior: 'allow', // ダウンロードを許可
            downloadPath: './', // ダウンロード先のフォルダを指定
          });
	  await Promise.all([
		  await setTimeout(3000)
	  ]);
	  await page.setViewport({
		    width: 1000,
		    height: 2000,
		    deviceScaleFactor: 1,
	  });
          await page.$eval('div[class="FlexTextarea__dummy"]', element => element.value = '');
	  await page.type('div[class="FlexTextarea__dummy"]',"testtest")
	  await page.screenshot({path: 'example.png'});
	  await page.click('button[type="button"]');
	  await Promise.all([
		  await setTimeout(10000)
	  ]);
	  await page.screenshot({path: 'example2.png'});
	  await page.click('button[class="share-button__contents__tweet share-button__contents__content share-button__contents download"]');
	  await Promise.all([
		  await setTimeout(3000)
	  ]);
	  await page.screenshot({path: 'example3.png'});
	  await page.pdf({path: 'example.pdf', format: 'a4'});

	  await browser.close();
})();
