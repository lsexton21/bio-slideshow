const express = require("express");
const router = express.Router();
const BiologyStudents = require("../models/biologyStudents");
const AppError = require("../public/utilities/AppError");
const catchAsync = require("../public/utilities/catchAsyncErrors");
const axios = require("axios");

//fetching instaData from Instagram
const fetchInstaData = async (url) => {
  const response = await axios.get(url);
  return response.data.data;
};
const fetchInstaPagination = async (url) => {
  if (url !== undefined) {
    const response = await axios.get(url);
    return response.data.paging.next;
  } else {
    return undefined;
  }
};

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const students = await BiologyStudents.find({});
    console.log(students);
    const postCards = await require("../public/javaScripts/postCards");
    const finalInstaData = await fetchInstaData(
      "https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,timestamp&access_token=IGQVJVNVdCMGxyMVg5Rll1MlJkZAENSd2dfclBYMnRyaHFNV2YyRHN6UExrczhXM0ZA0MmRrclVRbzJONDV0aXA0akhWVVBzMzFWUHJfRlVkVmgxQTZAKTzZAUTllILTFqUWF0T3ZAUWjZAaeVR4NXJwaDFtRwZDZD&limit=1000"
    );
    let finalDisplayArray = [];
    finalDisplayArray = postCards.runFullDisplayArray(finalInstaData, students);
    res.render("instafeed", { finalDisplayArray });
  })
);

router.get(
  "/:hashtagFilter",
  catchAsync(async (req, res, next) => {
    let loggedIn = false;
    if (req.session.user_id) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    const { hashtagFilter } = req.params;
    const students = await BiologyStudents.find({});
    const postCards = await require("../public/javaScripts/postCards");

    let instaData = [];
    const page1 =
      "https://graph.instagram.com/v12.0/17841403931536376/media?access_token=IGQVJVNVdCMGxyMVg5Rll1MlJkZAENSd2dfclBYMnRyaHFNV2YyRHN6UExrczhXM0ZA0MmRrclVRbzJONDV0aXA0akhWVVBzMzFWUHJfRlVkVmgxQTZAKTzZAUTllILTFqUWF0T3ZAUWjZAaeVR4NXJwaDFtRwZDZD&pretty=1&fields=id,media_type,media_url,caption,timestamp&limit=100";
    const page2 = await fetchInstaPagination(page1);
    const page3 = await fetchInstaPagination(page2);
    const page4 = await fetchInstaPagination(page3);
    //let page5 = await fetchInstaPagination(page4)

    let data1 = await fetchInstaData(page1);
    let data2 = await fetchInstaData(page2);
    let data3 = await fetchInstaData(page3);
    let data4 = await fetchInstaData(page4);
    //let data5 = await fetchInstaData(page5)

    function pushInstaData(data) {
      for (let post of data) {
        instaData.push(post);
      }
    }
    pushInstaData(data1);
    pushInstaData(data2);
    pushInstaData(data3);
    pushInstaData(data4);

    let finalDisplayArray = [];
    let finalSpotlightArray = [];
    finalDisplayArray = postCards.runDisplayArray(
      instaData,
      students,
      `#${hashtagFilter}`
    );
    finalSpotlightArray = postCards.runSpotlightArray(`#${hashtagFilter}`);
    res.render("instafeed", {
      finalDisplayArray,
      finalSpotlightArray,
      loggedIn,
    });
  })
);

module.exports = router;
