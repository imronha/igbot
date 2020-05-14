const puppeteer = require("puppeteer");

const BASE_URL = "https://www.instagram.com/";
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const ig = {
  // Initialize puppeteer
  browser: null,
  page: null,

  initialize: async () => {
    ig.browser = await puppeteer.launch({
      headless: false,
    });

    ig.page = await ig.browser.newPage();
  },

  // =====================================================
  // Login function navigates to base url (instagram login page) and then enters user information and logs in
  login: async (username, password) => {
    await ig.page.goto(BASE_URL, { waitUntil: "networkidle2" });

    // Enter in username and password.
    await ig.page.type('input[name="username"]', username, { delay: 500 });
    await ig.page.type('input[name="password"]', password, { delay: 500 });

    // Locate login button and then click
    let loginButton = await ig.page.$x('//div[contains(text(), "Log In")]');
    await loginButton[0].click();

    // Wait until navigation is complete
    await ig.page.waitForNavigation({ waitUntil: "networkidle2" });
    console.log("Successfully logged in.");
  },

  // =====================================================
  // likeTagsProcess function navigates to explore/tags/{tag} and likes the 3 most recent posts (not from top posts)
  likeTagsProcess: async (tags = []) => {
    for (let tag of tags) {
    }
  },
};

module.exports = ig;
