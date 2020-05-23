let tweetArea = document.getElementById("tweetArea");
let MAX_LETTER = 140;
let tweetList = [];
let num = 0;
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
        contents: document.getElementById("tweetArea").value,
        isRetweet: false,
        parents: null,
    };
    tweetList.push(tweet);
    num++;
    render(tweetList);
};

// if (item.isRetweet == false) {
// }
// if (item.isRetweet == true) {
//   tweetList.filter((tweet) => tweet.parents != item.id);
// }

const retweet = (id) => {
    //1. get original tweet (the tweet you clicked)
    const original = tweetList.find((item) => item.id == id);

    //2. copy that tweet
    const retweetObj = {
        id: num,
        contents: original.contents,
        isRetweet: true,
        parents: original.id,
    };
    // original.children.push(num) this is for parents reference
    original.isRetweet = true;
    //3. add to tweet list
    tweetList.push(retweetObj);

    // 4. render
    renderRetweet(retweetObj);

    // 5. increase the num for next id
    num++;
};

const render = (list) => {
    let html = list
        .map(
            (item) =>
            `
        <div class="tweetcontent twit-card">
                       
        <div class="row">
            <div class="col-sm-2 col-3">
                <img class="profile-pic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png">
            </div>
            <div class="col-sm-10 col-9">
                <div class="row content-row">
                    <div class="twit-name">Daniel</div>
                    <div class="twit-handle">@danielhallow</div>
                    <div class="twit-handle">&middot;</div>
                    <div class="post-date">53m</div>
                </div>
                <div class="twit-text content-row">${item.contents}</div>
                <div class="twit-navi-buttons">
                    <div class="row justify-content-around">
                        <i class="far fa-comment twit-icon twit-comment"></i>
                        <span onclick="retweet(${item.id})"><i class="fas fa-retweet twit-icon twit-retweet"></i></span>
                        <i class="far fa-heart twit-icon twit-like"></i>
                        <i class="fas fa-upload twit-icon twit-share"></i>
                        <!-- <i class="far fa-chart-bar twit-icon"></i> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        )
        .join("");

    document.getElementById("tweetListArea").innerHTML = html;
};

const renderRetweet = (list) => {
    let html = list
      .map(
        (item) =>
          `
          <div class="tweetcontent twit-card">
                        <div class="row">
                            <div class="col-sm-2 col-3">
                                <img class="profile-pic" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png">
                            </div>
                            <div class="col-sm-10 col-9">
                                <div class="row content-row">
                                    <div class="twit-name">Daniel</div>
                                    <div class="twit-handle">@danielhallow</div>
                                    <div class="twit-handle">&middot;</div>
                                    <div class="post-date">53m</div>
                                </div>
                                <div class="twit-text content-row">I retweet this:</div>
                                    <div class="retweet">
                                        <div class="row">
                                            <div class="col-sm-2 col-3">
                                                <img class="profile-pic-retweet img-fluid" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png">
                                            </div>
                                            <div class="col-sm-10 col-9">
                                                <div class="row content-row">
                                                    <div class="twit-name">Daniel</div>
                                                    <div class="twit-handle">@danielhallow</div>
                                                    <div class="twit-handle">&middot;</div>
                                                    <div class="post-date">53m</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="twit-text content-row">Some random stuff haha. Some random stuff haha. Some random stuff haha. Some random stuff haha. Some random stuff haha. Some random stuff haha.</div>
                                    </div>
                                <div class="twit-navi-buttons">
                                    <div class="row justify-content-around">
                                        <i class="far fa-comment twit-icon twit-comment"></i>
                                        <i class="fas fa-retweet twit-icon twit-retweet"></i>
                                        <i class="far fa-heart twit-icon twit-like" id="like-1" onclick='like("like-1")'></i>
                                        <i class="fas fa-upload twit-icon twit-share"></i>
                                        <!-- <i class="far fa-chart-bar twit-icon"></i> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          `
      )
      .join("");
      document.getElementById("tweetListArea").innerHTML = html
      }

tweetArea.addEventListener("input", countLetter);

let like = (id) => {
    let tempLike = document.getElementById(id)
    if (tempLike.classList.contains("far")) {
        tempLike.classList.remove("far");
        tempLike.classList.add("fas");
        tempLike.classList.add("red");
    } else {
        tempLike.classList.remove("red");
        tempLike.classList.remove("fas");
        tempLike.classList.add("far");
    }

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
    // console.log("Random Numbers", randomNumbers);
}

const loadCharacters = async() => {
    let url = `https://rickandmortyapi.com/api/character/?page=1`;
    let data = await fetch(url);
    let output = await data.json();
    // console.log(output);
    charactersList = output.results.map(c => {
        c.isFollowing = false;
        return c;
    });
    // console.log("Characters List", charactersList);
    randomize(5);
    updateCharacters();
}

function updateCharacters() {
    let html = "";
    console.log(randomNumbers);

    for (let i = 0; i < 5; i++) {
        let index = randomNumbers[i];
        let item = charactersList[index];

        let tempHtml = `<li class="list-group-item linlin-list-group-item">
                            <div class="avatar-img-part">
                                <img src="${item.image}" alt="Avatar" class="linlin-avatar">
                            </div>
                            <div class="linlin-following-style">
                                <div class="linlin-follow-center-info ml-2">
                                    <h5 class="mb-1">${item.name}</h5>
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

        html += tempHtml + `</div></div></li>\n`;
    }

    document.getElementById("charactersArea").innerHTML = html;
}

loadCharacters();

function toggleFollowTrending(index) {
    charactersList[index].isFollowing = !charactersList[index].isFollowing;
    updateCharacters();
}

// --- Linh End ---
