const cron = require("node-cron");
const querystring = require("querystring");
const { json } = require("body-parser");
const cheerio = require("cheerio");
const config = require("../config");
const request = require("request");
let rp = require("request-promise").defaults({ jar: true });
// const cookieJar = rp.jar();
// rp = rp.defaults({jar : cookieJar});

// var options = {
//   method: "POST",
//   uri: "https://thestoryks.com/wp-login.php",
//   form: {
//     log: config.WP_USERNAME,
//     pwd: config.WP_PASSWORD,
//     "wp-submit": "Log In",
//     redirect_to: "https://thestoryks.com/wp-admin/",
//   },
//   headers: {},
//   simple: false,
// };
module.exports = {
  getAccess: async (req, res, next) => {
    const result = await rp.post("https://www.blognone.com/");
    const $ = cheerio.load(result);
    console.log($);
    var options = {
      method: "POST",
      uri: "https://www.blognone.com//node?destination=node",
      form: {
        name: "kittipan",
        pass: "0800393608",
        op: "Log In",
        form_id: "user_login_block",
        form_build_id: $("#user-login > input[type=hidden]:nth-child(5)").val(),
      },
      headers: {},
      simple: false,
    };
    rp(options)
      .then(function (response) {
        console.log(response);
        rp("https://www.blognone.com/", function (err, res, body) {
          console.log(res.headers);
        });
      })
      .catch(function (e) {
        console.log(e);
      });
    //   const index = await rp.get("https://thestoryks.com/")
    //   console.log(cookieJar.getCookieString("https://thestoryks.com/"))
    // await rp({
    //   uri: "https://thestoryks.com/wp-login",
    //   transform: body => {
    //     return cheerio.load(body)
    //   },
    // })
    //   .then($ => {
    //     document.getElementById('user_login').value = config.WP_USERNAME;
    //     document.getElementById('user_pass').value = config.WP_USERNAME;
    //     document.getElementById("wp-submit").click();
    //     console.log($('#post-604 > header > h2 > a').attr('href'))
    //   })
    //   .catch(e => {
    //     console.error(e)
    //   })
  },
};
