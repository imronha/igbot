const puppeteer = require("puppeteer");

const BASE_URL = "https://www.instagram.com/";

const ig = {
  browser: null,
  page: null,

  initialize: async () => {
    ig.browser = await puppeteer.launch({
      headless: false,
    });

    ig.page = await ig.browser.newPage();

    await ig.page.goto(BASE_URL, { waitUntil: "networkidle2" });
  },
};

module.exports = ig;
