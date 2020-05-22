let tweetArea = document.getElementById("tweetArea")
let MAX_LETTER = 140;
const countLetter = () => {
    let lengthOfSentence = tweetArea.value.length;
    console.log("length is:", lengthOfSentence);
    let remain = MAX_LETTER - lengthOfSentence;
    document.getElementById("remain").innerHTML = `${remain} characters left`;
    if (remain < 0) {
        document.getElementById("remain").style.color = 'red';
    } else {
        document.getElementById("remain").style.color = 'black';
    }
}
tweetArea.addEventListener("input", countLetter)



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
    console.log(randomNumbers)
}

const loadCharacters = async() => {
    let url = `https://rickandmortyapi.com/api/character/?page=1`;
    let data = await fetch(url);
    let output = await data.json();
    console.log(output);
    charactersList = output.results;
    console.log(charactersList);
    randomize(5);
    updateCharacters();
}

function updateCharacters() {
    let html = "";
    let tempHtml = "";

    for (let i = 0; i < 5; i++) {
        let item = charactersList[randomNumbers[i]];
        tempHtml += `<div>${item.name}</div>`
        tempHtml += `<div>${item.species}</div>`
        tempHtml += `<img src="${item.image}" width = "50px"/>`
        html += tempHtml;
    }

    // document.getElementById("charactersArea").innerHTML += html;
}

loadCharacters();

// --- Linh End ---