let tweetArea = document.getElementById("tweetArea")
let MAX_LETTER = 140;
const countLetter = () => {
    let lengthOfSentence = tweetArea.value.length;
    console.log("length is:", lengthOfSentence);
    let remain = MAX_LETTER - lengthOfSentence;
    document.getElementById("remain").innerHTML = `${remain} characters left`;
    if (remain < 0) {
        document.getElementById("remain").style.color = 'red';
    }
    else {
        document.getElementById("remain").style.color = 'black';
    }
}
tweetArea.addEventListener("input",countLetter)

$(function () {
  $('[data-toggle="popover"]').popover()
})
