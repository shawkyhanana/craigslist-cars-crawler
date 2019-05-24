const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const searchString ='https://vancouver.craigslist.org/search/cta?';

  //const searchString = 'https://vancouver.craigslist.org/search/cta?query=2007+Mercedes-Benz+S65+AMG+4dr+6.0L+V12%21604+HP%21ONLY+117K%21BLACK%26BLACK%21&sort=pricedsc';

  await page.goto(searchString, {waitUntil: 'networkidle2'});

  const LIST_SELECTOR = "#sortable-results > ul > li > a";
  
  const pgSelection = await page.$$(LIST_SELECTOR);
  
  liCounts = await page.$$eval(LIST_SELECTOR, e => {
      let sim =[]
      let last = '';
      for (let x of e) {
        sim.push(x.href);
        last = x;
      }
      return sim;
  });

  for (let i = 0; i < liCounts.length; i++) {
    let itemUrl = liCounts[i];
    await page.goto(itemUrl, {waitUntil: 'networkidle2'});
    let title = await page.title();
    console.log(title);
  }


  await browser.close();
})();