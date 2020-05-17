const puppeteer = require("puppeteer");

const BASE_URL = "https://www.instagram.com/";
const TAG_URL = (tag) => `https://www.instagram.com/explore/tags/${tag}/`;

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

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
    await ig.page.type('input[name="username"]', username, { delay: 50 });
    await ig.page.type('input[name="password"]', password, { delay: 50 });

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
    // Iterate through each tag in tags array and navigate to that tag page
    for (let tag of tags) {
      await ig.page.goto(TAG_URL(tag), { waitUntil: "networkidle2" });
      await ig.page.waitFor(2000);

      let posts = await ig.page.$$(
        'article > div:nth-child(3) img[decoding="auto"]'
      );
      for (let i = 0; i < 3; i++) {
        let randomPost = getRandomInt(posts.length);
        let post = posts[randomPost];
        console.log("Liking post number " + (randomPost + 1));
        // Click on the post and wait to finish loading
        await post.click();
        // let modalOpen = await ig.page.waitFor('svg[aria-label="Close"]');
        await ig.page.waitFor(2000);

        let isLikeable = await post.$x('svg[aria-label="Like"]');
        console.log(isLikeable);
        if (isLikeable) {
          await ig.page.click('svg[aria-label="Like"]');
          await ig.page.waitFor(2000);
        }
        await ig.page.click('svg[aria-label="Close"]');

        // await ig.page.waitFor(2000);
      }
      await ig.page.waitFor(10000);
    }
  },
};

module.exports = ig;
