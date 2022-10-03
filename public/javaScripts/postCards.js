//converting JSON data into usable object for display
let postArray = [];
function studentNameFunc(students, postText) {
    let finalStudents = [];
    for (student of students) {
        let studentNameSpace = `${student.instaName} `
        let studentNamePeriod = `${student.instaName}.`
        let studentNameComma = `${student.instaName},`
        if (postText.includes(studentNameSpace || studentNamePeriod || studentNameComma)) {
            finalStudents.push({
                firstName: `${student.firstName}`,
                lastName: `${student.lastName}`,
                instaName: `${student.instaName}`
            })
        } else if (postText.includes(studentNamePeriod)) {
            finalStudents.push({
                firstName: `${student.firstName}`,
                lastName: `${student.lastName}`,
                instaName: `${student.instaName}`
            })
        } else if (postText.includes(studentNameComma)) {
            finalStudents.push({
                firstName: `${student.firstName}`,
                lastName: `${student.lastName}`,
                instaName: `${student.instaName}`
            })
        };
    }
    return(finalStudents)
}

function projectGroupHashtagFunc(text) {
    const projectGroups= [{hashtag:'acidvsplants', projectName:'The Acid vs Plants Project'}, {hashtag:'adviceforvampires', projectName:'The Advice for Vampires Project'}, {hashtag:'capturetheseagull', projectName: 'The Capture the Seagull Project'}, {hashtag:'plantanimaldecay', projectName: 'The Plant and Animal Decay Project'}, {hashtag:'deadoralive', projectName:'The Dead or Alive Project'},{hashtag:'fishdissection', projectName: 'The Fish Dissection Project'},{hashtag:'crabdissection', projectName:'The Crab Dissection Project'}, {hashtag:'floweranatomy', projectName:'The Flower Anatomy Project'},{hashtag:'planktonvstide', projectName: 'The Plankton vs Tide Project'},{hashtag:'fishdecay', projectName: 'The Fish Decay Project'},{hashtag:'necrospectus', projectName: 'The Necrospectus Project'},{hashtag:'decompositionoffish', projectName: 'The Decomposition of Fish Project'}, {hashtag:'krustykrab', projectName:'The Krusty Krab Project'}, {hashtag:'stemdye', projectName: "The Stem-Dye Project"},{hashtag:'planktondiversitybylocation', projectName: 'The Plankton Diversity By Location Project'}, {hashtag:'chumbucket',projectName:'The Chumbucket Project'},{hashtag:'crabbagultima', projectName:'The Crab Bag Ultima Project'},{hashtag:'findingthesecretformula', projectName: 'The Finding the Secret Formula Project'}, {hashtag:'mushroomdecay', projectName: 'The Mushroom Decay Project'}, {hashtag:'planktontyperesearch', projectName:'The Plankton Type Research Project'}]
    for (group of projectGroups) {
        if (text.includes(group.hashtag)) {
            return group.hashtag
        }
    }
};

function projectGroupNameFunc(text) {
    const projectGroups= [{hashtag:'acidvsplants', projectName:'Acid vs Plants Project'}, {hashtag:'adviceforvampires', projectName:'Advice for Vampires Project'}, {hashtag:'capturetheseagull', projectName: 'Capture the Seagull Project'}, {hashtag:'plantanimaldecay', projectName: 'Plant and Animal Decay Project'}, {hashtag:'deadoralive', projectName:'Dead or Alive Project'},{hashtag:'fishdissection', projectName: 'Fish Dissection Project'},{hashtag:'crabdissection', projectName:'Crab Dissection Project'}, {hashtag:'floweranatomy', projectName:'Flower Anatomy Project'},{hashtag:'planktonvstide', projectName: 'Plankton vs Tide Project'},{hashtag:'fishdecay', projectName: 'Fish Decay Project'},{hashtag:'necrospectus', projectName: 'Necrospectus Project'},{hashtag:'decompositionoffish', projectName: 'Decomposition of Fish Project'}, {hashtag:'krustykrab', projectName:'Krusty Krab Project'}, {hashtag:'stemdye', projectName: "Stem-Dye Project"},{hashtag:'planktondiversitybylocation', projectName: 'Plankton Diversity By Location Project'}, {hashtag:'chumbucket',projectName:'Chumbucket Project'},{hashtag:'crabbagultima', projectName:'Crab Bag Ultima Project'},{hashtag:'findingthesecretformula', projectName: 'Finding the Secret Formula Project'}, {hashtag:'mushroomdecay', projectName: 'Mushroom Decay Project'}, {hashtag:'planktontyperesearch', projectName:'Plankton Type Research Project'}]
    for (group of projectGroups) {
        if (text.includes(group.hashtag)) {
            return group.projectName;
        }
    }
};

function identifyAllHashtags(string) {
    const regexHashtags = /(\#\w+)/g;
    const hashtagArray = string.match(regexHashtags)
    return hashtagArray;
};

function removeAllHashtags(string) {
    const regexHashtags = /(\#\w+)/g;
    return string.replace(regexHashtags, '')
}

function removeAuthorSentence(string) {
    const regexAuthors = /Sample prepared and photographed by[A-Za-z," ]+\./g;
    return string.replace(regexAuthors, '');
}

/*function oldParseInstaJSON(instaJSON, students) {
    for (let post in instaJSON) {
        if (instaJSON[post].title) {
            const postImgSource = instaJSON[post].media[0].uri;
            const postIsPhoto = postIsPhotoFunc(postImgSource);
            const post_timestamp = instaJSON[post].media[0].creation_timestamp;
            const timestamp = new Date(post_timestamp * 1000)
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const monthName = months[timestamp.getMonth()]
            const postText = instaJSON[post].title;
            let finalText = ''
            const hashtagArray = identifyAllHashtags(postText)
            finalText = removeAllHashtags(postText);
            finalText = removeAuthorSentence(finalText);
            const studentName = studentNameFunc(students, postText);
            const profilePic = `./media/icons/${studentName}.png`;
            
            let postObject = {
                imgSource: postImgSource,
                isPhoto: postIsPhoto,
                date: monthName + " " + timestamp.getDate() + ", " + timestamp.getFullYear(),
                text: finalText,
                hashtags: hashtagArray,
                studentNames: studentName,
                profilePic: profilePic,
            };
            postArray.push(postObject);
        } else {
            const postImgSource = instaJSON[post].media[0].uri;
            const postIsPhoto = postIsPhotoFunc(postImgSource);
            const post_timestamp = instaJSON[post].media[0].creation_timestamp;
            const timestamp = new Date(post_timestamp * 1000)
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const monthName = months[timestamp.getMonth()]
            const postText = instaJSON[post].media[0].title;
            let finalText = ''
            const hashtagArray = identifyAllHashtags(postText)
            finalText = removeAllHashtags(postText);
            finalText = removeAuthorSentence(finalText);
            let studentName = studentNameFunc(students, postText)
            let profilePic = `./media/icons/${studentName}.png`;

            let postObject = {
                imgSource: postImgSource,
                isPhoto: postIsPhoto,
                date: monthName + " " + timestamp.getDate() + ", " + timestamp.getFullYear(),
                text: finalText,
                hashtags: hashtagArray,
                studentNames: studentName,
                profilePic: profilePic,
            };
            postArray.push(postObject);
        };
    };
}*/

function parseFinalInstaData(data, students) {
    for (let post of data) {
        const postId = post.id
        const postMediaType = post.media_type;
        const postImgSource = post.media_url;
        const postTimestamp = post.timestamp;
        const timestamp = new Date(postTimestamp)
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthName = months[timestamp.getMonth()]
        const postText = post.caption;
        let finalText = ''
        const projectGroupName = projectGroupNameFunc(postText);
        const projectGroupHashtag = projectGroupHashtagFunc(postText)
        const hashtagArray = identifyAllHashtags(postText);
        finalText = removeAllHashtags(postText);
        finalText = removeAuthorSentence(finalText);
        let studentName = studentNameFunc(students, postText)

        let postObject = {
            id: postId,
            mediaType: postMediaType,
            imgSource: postImgSource,
            date: monthName + " " + timestamp.getDate() + ", " + timestamp.getFullYear(),
            text: finalText,
            hashtags: hashtagArray,
            projectName: projectGroupName,
            projectHashtag: projectGroupHashtag,
            studentNames: studentName,
            spotlight: false,
        };
        postArray.push(postObject);
    };
};

// modifying "postArray" to desired display as "displayArray"
let displayArray = []

function addSpotlightImg(hashtag) {
    
}

function hashtagFilter(hashtag, objectArray) {
    for (let post of objectArray) {
        if (post.hashtags !== null) {
            if (post.hashtags.includes(hashtag)) {
                displayArray.push(post)
            }
        }
    }
}

function divisibleByTwo(displayArray) {
    if ((displayArray.length % 2) === 1) {
        displayArray.push({
            id: '',
            mediaType: 'IMAGE',
            imgSource: '/media/studentHeadshots/CraniumFossil.jpg',
            date: '',
            text: 'This is a blank card.  You have reached the end of the posts for this filter.  Either select a new filter or wait for the cards to repeat.',
            hashtags: '',
            studentNames: [{
                firstName: 'Cranium',
                lastName: 'Fossil',
                instaName: 'Nobody'
            }],
        });
    };
};

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

//separate posts into groups of 6 for cards
let finalDisplayArray = [];

function parseSixDisplay(displayArray) {
    let groupOfSix = [];
    let counter = 0;
    for (let post of displayArray) {
        if (counter < 5) {
            groupOfSix.push(post)
            counter ++
        }
        else {
            groupOfSix.push(post)
            finalDisplayArray.push(groupOfSix)
            counter = 0;
            groupOfSix = [];
        }
    }
    if (groupOfSix.length != 0) {
        finalDisplayArray.push(groupOfSix)
    }
}


//function to display all specified posts
function runDisplayArray(data, students, hashtags) {
    postArray = [];
    displayArray = [];
    finalDisplayArray = [];
    parseFinalInstaData(data, students);
    hashtagFilter(hashtags, postArray);
    //displayArray = shuffle(displayArray);
    divisibleByTwo(displayArray);
    console.log('Total Images: ', displayArray.length);
    parseSixDisplay(displayArray);
    return finalDisplayArray;
    
}

function runSpotlightArray(hashtag) {
    //this varible below is just seed data
    const spotlightsArray = [
        SpotlightImgTest = {
            mediaType: 'img',
            imgSource: './media/studentHeadshots/Annia.jpg',
            text: "lorem ipsum",
            hashtags: ['#hthibiologyfall2021q2', '#hthivitaminccrystalizationq2'],
            studentNames: 'Annia',
            spotlight: true,
        },
        SpotlightImgTest2 = {
            mediaType: 'img',
            imgSource: './media/studentHeadshots/Riley L.jpg',
            text: "lorem ipsum",
            hashtags: ['hthibiologyfall2021q2','#hthiplantcsq2'],
            studentNames: 'Riley L',
            spotlight: true,
        }
    ]
    let finalSpotlightArray = [];
    for (let post of spotlightsArray) {
        if (post.hashtags.includes(hashtag)) {
            finalSpotlightArray.push(post)
        }
    }
    return finalSpotlightArray;
}

module.exports.runDisplayArray = runDisplayArray;
module.exports.runSpotlightArray = runSpotlightArray;