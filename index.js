const ig = require("./ig");
require("dotenv").config();

const username = process.env.IG_USERNAME;
const password = process.env.IG_PASSWORD;
// console.log(username, password);

(async () => {
  await ig.initialize();

  await ig.login(username, password);

  await ig.likeTagsProcess(["volleyballspikes", "volleyball"]);

  debugger;
})();
