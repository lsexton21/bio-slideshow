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

router.get("/", (req, res, next) => {
  res.redirect("/hthi");
});

const DUMMY_DATA = [
  {
    id: "17981275174524157",
    media_type: "IMAGE",
    media_url:
      "https://www.gardenia.net/storage/app/public/uploads/images/detail/botanikfoto-449024-L.webp",
    caption:
      "This is the flower and pollen of an Orange Daylily. The pollen is oval shaped and has a yellow-greenish color with little circles inside of it that are kind of webbed together. The outline is also pretty thick and seems durable. Sample prepared and photographed by Dasha, Tehani, and Noah. #hthibiologyspring2022q4 #hthiforensicshairq4 #microscopy #microscope #pollen #plants #daylily",
    timestamp: "2022-05-28T15:15:11+0000",
  },
  {
    id: "17953373950847194",
    media_type: "IMAGE",
    media_url:
      "https://gardenerspath.com/wp-content/uploads/2021/03/Globe-Amaranth-Gomphrena-Growing-in-the-Garden.jpg.webp",
    caption:
      "This is the pollen we collected from the flower of a globe amaranth that we found near our school. We noticed that each grain has a very small and spikey texture. This helps it to attach to pollinators when they visit. Sample prepared and photographed by Robert, Riley L., and Tehani. #hthibiologyspring2022q4 #hthiforensicshairq4",
    timestamp: "2022-05-28T13:28:49+0000",
  },
  {
    id: "17966495911620763",
    media_type: "IMAGE",
    media_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3e5ll1yh8to5b2FxugL9EzqioaWyQRk373ABC0M9gn55Jz9OshdP9Bzehy23V3JPLcXw&usqp=CAU",
    caption:
      "These were both different parts of the hair shaft but you can still see the broken, darker medulla line in both.  The medulla has little purpose for humans; for other animals, it is a way to release heat. Sample prepared and photographed by Sebas and Luke J. #hthibiologyspring2022q4 #hthiforensicsq4 #hthiforensicshairq4",
    timestamp: "2022-05-16T01:14:00+0000",
  },
  {
    id: "18019535563386978",
    media_type: "IMAGE",
    media_url:
      "https://www.whitehouse.gov/wp-content/uploads/2021/01/01_george_washington.jpg?resize=640,640",
    caption:
      "I ask students to sketch what they see on their lab report, in this case a hair follicle.  This is what I call accuracy. Sample prepared and photographed by Angel R.#hthiforensicsq4 #hthiforensicshairq4 #hthibiologyspring2022q4",
    timestamp: "2022-05-15T22:33:28+0000",
  },
  {
    id: "17933487578179716",
    media_type: "IMAGE",
    media_url:
      "https://www.ufaw.org.uk/images/animal-welfare/peruvianguineapig-main-photo.jpg",
    caption:
      "We went to look at a few hairs from this Guinea pig sample (top) and wound up finding a cat hair in the mix (bottom). Here you can see the more bumpy edges of the Guinea pig\u2019s medulla versus the striped, cut-like shape of the cat\u2019s. Sample prepared and photographed by Santiago and Angel R. #hthiforensicsq4 #hthiforensicshairq4 #hthibiologyspring2022q4",
    timestamp: "2022-05-15T22:25:10+0000",
  },
  {
    id: "17903431910595503",
    media_type: "IMAGE",
    media_url:
      "https://www.monasteriumlab.com/wp-content/uploads/2020/02/Monasterium-laboratory-hair-and-skin-research-hair-follicle-organ-culture-macroscopic-image-microdissected-anagen-1.jpg",
    caption:
      "The first shows the hair follicle of Annia\u2019s hair. We couldn\u2019t see the medulla pattern of her hair but we were able to see it on Tehani\u2019s hair in the second picture. Sample prepared and photographed by Annia and Tehani. #hthiforensicshairq4 #hthiforensicsq4 #hthibiologyspring2022q4",
    timestamp: "2022-05-15T21:46:43+0000",
  },
];

router.get(
  "/biology/:hashtagFilter",
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

    function pushInstaData(data) {
      for (let post of data) {
        instaData.push(post);
      }
    }

    let instaData = [];
    const page1 =
      "https://graph.instagram.com/v12.0/17841403931536376/media?access_token=IGQVJWQ0hpRnVTZAUkyTlAwVnZA4MWtjckRiR1BvVDM5MVA0SEFhaDlEUE50Y2xmdjNibm5mdjJWTmdjc2lTcFRiV1NPUDhCODJHU0pra1VVU0ZASQ0VvdjJ3bERMUmtuTTlLRWVwVkt1cnZA6MC10VlBFMAZDZD&pretty=1&fields=id,media_type,media_url,caption,timestamp&limit=100";
    const page2 = await fetchInstaPagination(page1);
    const page3 = await fetchInstaPagination(page2);
    const page4 = await fetchInstaPagination(page3);
    //let page5 = await fetchInstaPagination(page4)

    let data1 = await fetchInstaData(page1);
    let data2 = await fetchInstaData(page2);
    let data3 = await fetchInstaData(page3);
    let data4 = await fetchInstaData(page4);
    //let data5 = await fetchInstaData(page5)

    pushInstaData(data1);
    pushInstaData(data2);
    pushInstaData(data3);
    pushInstaData(data4);

    let finalDisplayArray = [];
    finalDisplayArray = postCards.runDisplayArray(
      instaData,
      students,
      `#${hashtagFilter}`
    );
    res.render("pages/instafeed", {
      finalDisplayArray,
      loggedIn,
    });
  })
);

router.get(
  "/forensics/:hashtagFilter",
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

    function pushInstaData(data) {
      for (let post of data) {
        instaData.push(post);
      }
    }

    let instaData = [];

    const page1 =
      "https://graph.instagram.com/v12.0/17841403931536376/media?access_token=IGQVJWQ0hpRnVTZAUkyTlAwVnZA4MWtjckRiR1BvVDM5MVA0SEFhaDlEUE50Y2xmdjNibm5mdjJWTmdjc2lTcFRiV1NPUDhCODJHU0pra1VVU0ZASQ0VvdjJ3bERMUmtuTTlLRWVwVkt1cnZA6MC10VlBFMAZDZD&pretty=1&fields=id,media_type,media_url,caption,timestamp&limit=100";
    const page2 = await fetchInstaPagination(page1);
    const page3 = await fetchInstaPagination(page2);
    const page4 = await fetchInstaPagination(page3);

    let data1 = await fetchInstaData(page1);
    let data2 = await fetchInstaData(page2);
    let data3 = await fetchInstaData(page3);
    let data4 = await fetchInstaData(page4);

    pushInstaData(data1);
    pushInstaData(data2);
    pushInstaData(data3);
    pushInstaData(data4);

    //pushInstaData(DUMMY_DATA); //DUMMY_DATA for development
    let finalDisplayArray = [];
    finalDisplayArray = postCards.runDisplayArray(
      instaData,
      students,
      `#${hashtagFilter}`
    );
    res.render("pages/instafeed", {
      finalDisplayArray,
      loggedIn,
    });
  })
);

module.exports = router;
