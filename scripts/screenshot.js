// Simple Puppeteer based screenshot script
// Usage: npm install puppeteer --save-dev
//        node scripts/screenshot.js

const puppeteer = require('puppeteer');
const pages = [
  {url: 'http://localhost:5500/index.html', name: 'index'},
  {url: 'http://localhost:5500/about.html', name: 'about'},
  {url: 'http://localhost:5500/services.html', name: 'services'},
  {url: 'http://localhost:5500/contact.html', name: 'contact'},
];

(async ()=>{
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width:1280, height:800});

  for(const p of pages){
    try{
      await page.goto(p.url, {waitUntil:'networkidle2'});
      await page.screenshot({path:`previews/${p.name}-desktop.png`, fullPage:true});
      await page.setViewport({width:375, height:800});
      await page.screenshot({path:`previews/${p.name}-mobile.png`, fullPage:true});
      await page.setViewport({width:1280, height:800});
      console.log('Saved screenshots for', p.name);
    } catch(err){
      console.error('Failed to capture', p.url, err.message);
    }
  }

  await browser.close();
})();