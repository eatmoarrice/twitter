let tweetArea = document.getElementById("tweetArea")
let MAX_LETTER = 140;
const countLetter = () => {
    let lengthOfSentence = tweetArea.value.length;
    console.log("length is:", lengthOfSentence);
    let remain = MAX_LETTER - lengthOfSentence;
    document.getElementById("remain").innerHTML = `${remain} characters left`;
    if (remain < 0) {
        document.getElementById("remain").innerHTML = `Remain: ${remain}`;
    }
}
tweetArea.addEventListener("input", countLetter)


let url = `https://api.twitter.com/1.1/trends/place.json?id=1`;

}