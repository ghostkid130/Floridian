//Easy Degree Randomizer
//  randomizes key signature
//Possible Answer: 
//  Populates answer index with possible answers
let answerArray = [];
let mKey, scaleDegree;
let correctAnswer;
let keySignature;

let solfrege = [{
    'C': "Do",
    'C#': "Di",
    'Db': "Ra",
    'D': "Re",
    'D#': "Ri",
    'Eb': "Me",
    'E': "Mi",
    'F': "Fa",
    'Fb': "Fo",
    'F#': "Fi",
    'Gb': "Sal",
    'G': "Sol",
    'G#': "Si",
    'Ab': "Le",
    'A': "La",
    'A#': "Li",
    'Bb': "Ta",
    'B': "Ti",
},{
    minor: ['A', 'E', 'B', 'F', 'F#', 'C#', 'G#', 'Bb'],
}];
let scale = {
    allNotes: ['Ab', 'A', 'A#', 'B', 'Bb', 'C', 'C#', 'D', 'D#', 'Eb','E', 'F', 'F#', 'Gb', 'G', 'G#'],
    Major: {
        'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
        'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
        'D': ['D', 'E', 'F#', 'G#', 'A', 'B', 'C#'],
        'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
        'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
        'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
        'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', ' E'],
        'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
    },
    Minor:{} //Should be based on it's relative Major Scale
}



const beginGame = () => {
    event.preventDefault();

    easyDegreeRandomizer();
    possibleAnswers();
    
    //Set's Key Signature
    let parent = document.querySelectorAll(".prompt-detail h2");
    parent[0].innerHTML = `Key Signature: ${mKey} Major \&emsp;\&emsp;\&emsp; Scale Degree: ${scaleDegree}`;
    
    //Sets the User's choice
    let child = document.querySelectorAll(".user-choice h1");
  
    for(let i = 0; i < answerArray.length; i++){
        child[i].style.backgroundColor = "";
        child[i].innerText = answerArray[i]
        child[i].onclick = function(){ checkValue(child[i]) };
    }

    //Shows Game Element
    document.getElementById("gameContainer").style.display = "flex"
}

const checkValue = (guess) => {
    console.log(guess.innerText);
    let userStatus = document.getElementById("userStatus");
    if(guess.innerText === correctAnswer){
        guess.style.backgroundColor = "green";
        userStatus.innerHTML = "You Did it!";
    }else {
        guess.style.backgroundColor = "red";
        userStatus.innerHTML = "Try Again!"
    }
}

