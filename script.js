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
  render(tweetList);

  // 5. increase the num for next id
  num++;
};

const render = (list) => {
  let html = list
    .map(
      (item) =>
        `<div>${item.contents} <a href="#" onclick="retweet(${item.id})">retweet</a></div>`
    )
    .join("");

  document.getElementById("tweetListArea").innerHTML = html;
};

tweetArea.addEventListener("input", countLetter);

let like = (id) => {
    let tempLike = document.getElementById(id)
    if (tempLike.classList.contains("far")) {
        tempLike.classList.remove("far");
        tempLike.classList.add("fas");
        tempLike.classList.add("red");
    }
    else {
        tempLike.classList.remove("red");
        tempLike.classList.remove("fas");
        tempLike.classList.add("far");
    }
    
}
