let tweetArea = document.getElementById("tweetArea");
let MAX_LETTER = 140;
let tweetList = [{
    id: 4,
    user: "Paul",
    pic: "https://pbs.twimg.com/profile_images/973317536493309952/t92mndrz.jpg",
    handle: "paulthealien",
    contents: "It's Probing time!",
    hasRetweet: false,
    isDirectRT: false,
    parentTweetID: "",
    comments: 0,
    retweets: 260,
    retweeted: false,
    likes: 5,
    liked: false,
    postTime: new Date(2020, 4, 24, 23, 05, 30),
}, {
    id: 3,
    user: "Thor",
    pic: "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/09/1519729389-thor-ragnarok-reviews-big.jpg",
    handle: "blastingrocket",
    contents: "I'D RATHER BE A GOOD MAN THAN A GREAT KING! #teamthor",
    hasRetweet: false,
    isDirectRT: false,
    parentTweetID: "",
    comments: 0,
    retweets: 258,
    retweeted: false,
    likes: 153,
    liked: false,
    postTime: new Date(2020, 4, 22, 22, 33, 30),
}, {
    id: 2,
    user: "Team Rocket",
    pic: "https://pbs.twimg.com/profile_images/1024918363510779904/crN-WG1W_400x400.jpg",
    handle: "blastingrocket",
    contents: "Have you seen @Pikachu? #NoReward #teamrocket",
    hasRetweet: false,
    isDirectRT: false,
    parentTweetID: "",
    comments: 0,
    retweets: 0,
    retweeted: false,
    likes: 3,
    liked: false,
    postTime: new Date(2020, 4, 21, 15, 2, 30),
}, {
    id: 1,
    user: "Zim",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMx-M1akejhvumZkPZ-hjZSgh_C6_ixf_OJw1dpsy_oWB-lFzS&usqp=CAU",
    handle: "zim",
    contents: "Prepare to meet your moosey fate!",
    hasRetweet: false,
    isDirectRT: false,
    parentTweetID: "",
    comments: 0,
    retweets: 10,
    retweeted: false,
    likes: 24,
    liked: false,
    postTime: new Date(2020, 4, 15, 3, 0, 30),
}, {
    id: 0,
    user: "BB-8",
    pic: "https://live.staticflickr.com/7631/17176926866_b369dea575_b.jpg",
    handle: "bb8",
    contents: "Beep beep bop! Beeeeeep!",
    hasRetweet: false,
    isDirectRT: false,
    parentTweetID: "",
    comments: 0,
    retweets: 0,
    retweeted: false,
    likes: 0,
    liked: false,
    postTime: new Date(2020, 4, 24, 10, 33, 0),
}, ];

let num = 5;
let defaultUser = "Smarty Pants";
let defaultPic = "https://i1.sndcdn.com/avatars-000015794340-xs94ao-t500x500.jpg";
document.getElementById("profile-pic").innerHTML = `<img class="profile-pic" src="${defaultPic}"></img>`
let defaultHandle = "iqover9000";
const countLetter = () => {

    // 1. get the length of sentence you type into textarea
    let lengthOfSentence = tweetArea.value.length;

    // 2. MAX_LETTER - the length
    let remain = MAX_LETTER - lengthOfSentence;
    // 3. show the remain number of char
    if (remain < 0) {
        document.getElementById("remain").style.color = "red";
    } else {
        document.getElementById("remain").style.color = "black";
    }
    document.getElementById("remain").innerHTML = `${remain} left`;
};

const post = () => {
    let tweet = {
        id: num,
        user: defaultUser,
        pic: defaultPic,
        handle: defaultHandle,
        contents: document.getElementById("tweetArea").value,
        hasRetweet: false,
        isDirectRT: false,
        parentTweetID: "",
        comments: 0,
        retweets: 0,
        retweeted: false,
        likes: 0,
        liked: false,
        removed: false,
    };
    tweetList.unshift(tweet);
    num++;
    render(tweetList);
};

const retweet = (parentID) => {
    console.log(parentID)
    let index = tweetList.map(x => x.id).indexOf(parentID);
    let tweet = {
        id: num,
        user: defaultUser,
        pic: defaultPic,
        handle: defaultHandle,
        contents: document.getElementById("retweet-box").value,
        hasRetweet: true,
        isDirectRT: false,
        parentTweetID: parentID,
        comments: 0,
        retweets: 0,
        retweeted: false,
        likes: 0,
        liked: false,
        removed: false,
    };
    retweetclick(parentID);
    if (document.getElementById('retweet-box').value.length > 0) {
        tweet.isDirectRT = false;
        tweetList.unshift(tweet);
    } else if (defaultHandle != tweetList[index].handle) {
        tweet.isDirectRT = true;
        tweetList.unshift(tweet);
    }

    // tweetList[index].retweets += 1;
    console.log(tweetList)
    closePopUp();
    num++;
    render(tweetList);
};

let convertText = (string) => {
    // let words = string.split(/[ ,.-]+/);
    let words = string.split(" ");
    let wholeText = words.map(word => {
        if (word.charAt(0) == "@") {
            return `<a class="" href="#">${word}</a>`
        }
        else if (word.charAt(0) == "#") {
            return `<a class="" href="#" onclick="displayfilter('${word}')">${word}</a>`
        }
        else return word;
    }).join(' ');
    return wholeText;
}

let displayfilter = (hashtag) => {
    let filteredList = tweetList.filter(twit => twit.contents.includes(hashtag))
    render(filteredList);
}

const showPopUp = (parentID) => {
    document.getElementById("popup-region").innerHTML = `
             <div id="dark-bg">
                <div class="retweet-pop-up">
                    <div class="modal-content">
                        <div class="close" onclick="closePopUp()">+</div>
                            <textarea class="input-retweet" id="retweet-box" rows="4" maxlength="140" placeholder="Add a comment" style="resize: none;"></textarea>
                            <button class="retweet-button" onclick="retweet(${parentID})">Rezap!</button>
                    </div>
                </div>
            </div>
    `
}

const closePopUp = () => {
    document.getElementById("popup-region").innerHTML = "";
}

const render = (list) => {
    // list = list.reduce((filteredList, item) =>
    //     (!(item.hasText == false && item.hasRetweet == true && list.includes(parent => (parent.id != item.parentTweetID))) && filteredList.push(item),filteredList),[]); //remove twits with no comments and parents
    let html = list.map(
            (item) => {
                let tempLikes = item.likes;
                if (tempLikes == 0) tempLikes = "";
                let tempRetweets = item.retweets;
                if (tempRetweets == 0) tempRetweets = "";
                if (item.hasRetweet == false) { // new tweet
                    return `
                <div class="tweetcontent twit-card">     
                <div class="close" onclick="deleteTweet(${item.id})">+</div>                 
                    <div class="row">
                        <div class="col-sm-2 col-3">
                            <img class="profile-pic" src="${item.pic}">
                        </div>
                        <div class="col-sm-10 col-9">
                            <div class="row content-row">
                                <div class="twit-name">${item.user}</div>
                                <div class="twit-handle">@${item.handle}</div>
                                <div class="twit-handle">&middot;</div>
                                <div class="post-date">${moment(item.postTime).fromNow(true)}</div>
                            </div>
                            <div class="twit-text content-row" id="content-${item.id}">${convertText(item.contents)}</div>
                            <div class="twit-navi-buttons">
                                <div class="row">
                                    <span class="col-3"><i class="far fa-comment twit-icon twit-comment"></i></span>
                                    <span class="col-3" onclick="showPopUp(${item.id})"><i class="fas fa-retweet twit-icon twit-retweet" id="retweeted-${item.id}"></i></i><span id="retweets-${item.id}">${tempRetweets}</span></span>
                                    <span class="col-3"><i class="far fa-heart twit-icon twit-like" id="liked-${item.id}" onclick="like(${item.id})"></i><span id="likes-${item.id}">${tempLikes}</span></span>
                                    <span class="col-3"><i class="fas fa-upload twit-icon twit-share"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
                } else {
                    let index = tweetList.map(x => x.id).indexOf(item.parentTweetID);
                    // if OG twit exists
                    if (tweetList[index] != undefined && item.isDirectRT == false) { //retweet with quote content & comment
                        return `
                    <div class="tweetcontent twit-card">
                    <div class="close" onclick="deleteTweet(${item.id})">+</div>
                        <div class="row">
                            <div class="col-sm-2 col-3">
                                <img class="profile-pic" src="${item.pic}">
                            </div>
                            <div class="col-sm-10 col-9">
                                <div class="row content-row">
                                    <div class="twit-name">${item.user}</div>
                                    <div class="twit-handle">@${item.handle}</div>
                                    <div class="twit-handle">&middot;</div>
                                    <div class="post-date">${moment(item.postTime).fromNow(true)}</div>
                                </div>
                                <div class="twit-text content-row" id="content-${item.id}">${item.contents}</div>
                                    <div class="retweet">
                                        <div class="row">
                                            <div class="col-sm-2 col-3">
                                                <img class="profile-pic-retweet img-fluid" src="${tweetList[index].pic}">
                                            </div>
                                            <div class="col-sm-10 col-9">
                                                <div class="row content-row">
                                                    <div class="twit-name">${tweetList[index].user}</div>
                                                    <div class="twit-handle">@${tweetList[index].handle}</div>
                                                    <div class="twit-handle">&middot;</div>
                                                    <div class="post-date">${moment(item.postTime).fromNow(true)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="retweet-text content-row">${convertText(tweetList[index].contents)}</div>
                                    </div>
                                <div class="twit-navi-buttons">
                                    <div class="row">
                                    <span class="col-3"><i class="col-3 far fa-comment twit-icon twit-comment"></i></span>
                                    <span class="col-3" onclick="showPopUp(${item.id})"><i class="fas fa-retweet twit-icon twit-retweet" id="retweeted-${item.id}"></i></i><span id="retweets-${item.id}">${tempRetweets}</span></span>
                                        <span class="col-3"><i class="far fa-heart twit-icon twit-like" id="liked-${item.id}" onclick="like(${item.id})"></i><span id="likes-${item.id}">${tempLikes}</span></span>
                                        <span class="col-3"><i class="col-3 fas fa-upload twit-icon twit-share"></i></span>
                                        <!-- <i class="col-3 far fa-chart-bar twit-icon"></i> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          `
                    } else if (item.isDirectRT == true) { //direct retweet
                        let index = tweetList.map(x => x.id).indexOf(item.parentTweetID);
                        tempLikes = tweetList[index].likes;
                        if (tempLikes == 0) tempLikes = "";
                        tempRetweets = tweetList[index].retweets;
                        if (tempRetweets == 0) tempRetweets = "";
                        return `
                            <div class="tweetcontent twit-card"> 
                            <i class="fas fa-retweet twit-icon twit-retweet fa-xs"></i><span>You Retweeted</span>    
                                <div class="close" onclick="deleteTweet(${item.id})">+</div>                 
                                    <div class="row">
                                        <div class="col-sm-2 col-3">
                                            <img class="profile-pic" src="${tweetList[index].pic}">
                                        </div>
                                        <div class="col-sm-10 col-9">
                                            <div class="row content-row">
                                                <div class="twit-name">${tweetList[index].user}</div>
                                                <div class="twit-handle">@${tweetList[index].handle}</div>
                                                <div class="twit-handle">&middot;</div>
                                                <div class="post-date">${moment(item.postTime).fromNow(true)}</div>
                                            </div>
                                            <div class="twit-text content-row" id="content-${tweetList[index].id}">${convertText(tweetList[index].contents)}</div>
                                            <div class="twit-navi-buttons">
                                                <div class="row">
                                                    <span class="col-3"><i class="far fa-comment twit-icon twit-comment"></i></span>
                                                    <span class="col-3" onclick="showPopUp(${tweetList[index].id})"><i class="fas fa-retweet twit-icon twit-retweet" id="retweeted-${tweetList[index].id}"></i></i><span id="retweets-${tweetList[index].id}">${tempRetweets}</span></span>
                                                    <span class="col-3"><i class="far fa-heart twit-icon twit-like" id="liked-${tweetList[index].id}" onclick="like(${tweetList[index].id})"></i><span id="likes-${tweetList[index].id}">${tempLikes}</span></span>
                                                    <span class="col-3"><i class="fas fa-upload twit-icon twit-share"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
                    } else if (tweetList[index] == undefined) { //retweet with comment, but OG is deleted
                        return `
                        <div class="tweetcontent twit-card">
                        <div class="close" onclick="deleteTweet(${item.id})">+</div>
                            <div class="row">
                                <div class="col-sm-2 col-3">
                                    <img class="profile-pic" src="${item.pic}">
                                </div>
                                <div class="col-sm-10 col-9">
                                    <div class="row content-row">
                                        <div class="twit-name">${item.user}</div>
                                        <div class="twit-handle">@${item.handle}</div>
                                        <div class="twit-handle">&middot;</div>
                                        <div class="post-date">${moment(item.postTime).fromNow(true)}</div>
                                    </div>
                                    <div class="twit-text content-row" id="content-${item.id}">${item.contents}</div>
                                    <div class="retweet-disable">
                                    This Tweet is unavailable.
                                </div>
                                    <div class="twit-navi-buttons">
                                        <div class="row">
                                        <span class="col-3"><i class="col-3 far fa-comment twit-icon twit-comment"></i></span>
                                        <span class="col-3" onclick="showPopUp(${item.id})"><i class="fas fa-retweet twit-icon twit-retweet" id="retweeted-${item.id}"></i></i><span id="retweets-${item.id}">${tempRetweets}</span></span>
                                            <span class="col-3"><i class="far fa-heart twit-icon twit-like" id="liked-${item.id}" onclick="like(${item.id})"></i><span id="likes-${item.id}">${tempLikes}</span></span>
                                            <span class="col-3"><i class="col-3 fas fa-upload twit-icon twit-share"></i></span>
                                            <!-- <i class="col-3 far fa-chart-bar twit-icon"></i> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
              `
                    }
                }
            }
        )
        .join("");

    document.getElementById("tweetListArea").innerHTML = html;
};

render(tweetList);


let deleteTweet = (tweetID) => {
    let tweetIDArray = tweetList.map(x => x.id);
    let tempList = tweetList;
    let tweetindex = tweetIDArray.indexOf(tweetID);
    // when removing a retweet, the OG tweet's retweet number is reduced by 1
    if (tweetList[tweetindex].parentTweetID != "") {
        let parenttweetindex = tweetIDArray.indexOf(tweetList[tweetindex].parentTweetID);
        if (tweetList[parenttweetindex] != undefined) {
            tweetList[parenttweetindex].retweets -= 1;
            tweetList[parenttweetindex].retweeted = false;
        };
    }

    //mark the exact tweet
    tweetindex = tweetIDArray.indexOf(tweetID);
    tweetList[tweetindex].removed = true;

    // mark all direct children
    for (let i = 0; i < tweetList.length; i++) {
        if (tweetID == tweetList[i].parentTweetID && tweetList[i].isDirectRT == true) { tweetList[i].removed = true }
    }

    //remove marked items
    for (let i = (tweetList.length - 1); i >= 0; i--) {
        if (tweetList[i].removed == true) { tempList.splice(i, 1) }
    }
    tweetList = tempList;
    console.log(tempList)
    render(tweetList);
}

tweetArea.addEventListener("input", countLetter);

let like = (id) => {
    let index = tweetList.map(item => item.id).indexOf(id);
    let tempLiked = document.getElementById(`liked-${id}`)
    if (tweetList[index].liked == false) {
        tweetList[index].liked = true;
        tweetList[index].likes += 1;
        tempLiked.classList.remove("far");
        tempLiked.classList.add("fas");
        tempLiked.classList.add("red");
    } else {
        tweetList[index].liked = false;
        tweetList[index].likes -= 1;
        tempLiked.classList.remove("red");
        tempLiked.classList.remove("fas");
        tempLiked.classList.add("far");
    }
    let tempLike = tweetList[index].likes;
    if (tempLike == 0) tempLike = "";
    document.getElementById(`likes-${id}`).innerHTML = tempLike;
}

let retweetclick = (id) => {
    let index = tweetList.map(item => item.id).indexOf(id);
    let tempTweeted = document.getElementById(`retweeted-${id}`)
    if (tweetList[index].retweeted == false) {
        tweetList[index].retweeted = true;
        tweetList[index].retweets += 1;
        tempTweeted.classList.add("blue");
        console.log(tempTweeted.classList)
    } else {
        tweetList[index].retweeted = false;
        tweetList[index].retweets -= 1;
        tempTweeted.classList.remove("blue");
    }
    let tempRetweet = tweetList[index].retweets;
    if (tempRetweet == 0) tempRetweet = "";
    document.getElementById(`retweets-${id}`).innerHTML = tempRetweet;
}

// --- Linh Start ----

let charactersList = [];
let randomNumbers = [];

let randomize = (number) => {
    let tempNumber = 0;
    randomNumbers.push(Math.floor(Math.random() * 20));
    while (randomNumbers.length < number) {
        tempNumber = Math.floor(Math.random() * 20);
        for (let i = 0; i < randomNumbers.length; i++) {
            if (tempNumber == randomNumbers[i]) break;
            else {
                if (i == randomNumbers.length - 1)
                    randomNumbers.push(tempNumber);
            }
        }
    }
}

const loadCharacters = async() => {
    let url = `https://rickandmortyapi.com/api/character/?page=1`;
    let data = await fetch(url);
    let output = await data.json();
    charactersList = output.results.map(c => {
        c.isFollowing = false;
        return c;
    });
    randomize(5);
    updateCharacters();
}

function updateCharacters() {
    let html = randomNumbers.reduce((preVal, index) => {
        let item = charactersList[index];
        let fakehandle = (item.name.toLowerCase()).replace(/([^a-z0-9]+)/gi, '');
        let tempHtml = "";

        tempHtml += `<li class="list-group-item linlin-list-group-item">
                        <div class="avatar-img-part">
                            <img src="${item.image}" alt="Avatar" class="linlin-avatar">
                        </div>
                        <div class="linlin-following-style">
                            <div class="linlin-follow-center-info ml-2">
                                <h5 class="mb-1">${item.name}</h5>
                                <small>@${fakehandle}</small>
                                <small>${item.species}</small>
                            </div>
                        <div class="linlin-follow-right-control">`;

        if (!item.isFollowing) {
            // not follow yet / already unfollow -> Follow
            tempHtml += `<button class="linlin-follow-button" 
                            onclick="toggleFollowTrending(${index})">
                            Follow
                        </button>`;

            // following -> hover button to show Unfollow
        } else {
            tempHtml += `<button class="linlin-follow-button linlin-following-button" 
                            onclick="toggleFollowTrending(${index})">
                            <span>
                                Following
                            </span>
                        </button>`;
        }

        tempHtml += `</div></div></li>\n`;

        return preVal + tempHtml;
    }, "");

    document.getElementById("charactersArea").innerHTML = html;
}

loadCharacters();

function toggleFollowTrending(index) {
    charactersList[index].isFollowing = !charactersList[index].isFollowing;
    updateCharacters();
}

// --- Linh End ---