
//Using npm inquirer && chalk
var readlineSync = require('readline-sync');
var inquirer = require('inquirer');
var log = console.log;
// var answerArray = [];
// var mKey, scaleDegree;
// var correctAnswer;


//Solfredge Dictionary [Major, ]
// let solfrege = [{
//     'C': "Do",
//     'C#': "Di",
//     'Db': "Ra",
//     'D': "Re",
//     'D#': "Ri",
//     'Eb': "Me",
//     'E': "Mi",
//     'F': "Fa",
//     'Fb': "Fo",
//     'F#': "Fi",
//     'Gb': "Sal",
//     'G': "Sol",
//     'G#': "Si",
//     'Ab': "Le",
//     'A': "La",
//     'A#': "Li",
//     'Bb': "Ta",
//     'B': "Ti",
// },
// {
//     minor: ['A', 'E', 'B', 'F', 'F#', 'C#', 'G#', 'Bb'],
// }
// ]
//Scale = Major | Minor | Harmonic Minor Scale Degree
// let scale = {
//     allNotes: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
//     Major: {
//         'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
//         'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
//         'D': ['D', 'E', 'F#', 'G#', 'A', 'B', 'C#'],
//         'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
//         'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
//         'B': ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
//         'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', ' E'],
//         'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
//     },
//     Minor:{} //Should be based on it's relative Major Scale
// }
//Easy Lvl || Major Scale Randomizer || Add Minor Randomizer 
function easyDegreeRandomizer(){ 
    
    let feel = Math.floor(Math.random());
    switch(feel){
        case 0:
            key = Math.floor(Math.random() * 7) ;
            mKey = (Object.keys(scale.Major)[key]);
            break;
        case 1: 
            key = Math.floor(Math.random() * 7) ;
            mKey = (Object.keys(scale.Major)[key]);
            break;
    }
    //Returns the Major [Key]
    key = Math.floor(Math.random() * 7) ;
    mKey = (Object.keys(scale.Major)[key]);
    //log(`Major Key: ${mKey}`);
    
    //Return a random scale degree
    scaleDegree = Math.floor(Math.random() * 6 );
    scaleDegree = (scale.Major[mKey][scaleDegree]);
    //log(`Scale Degree: ${scaleDegree}`);
    
    //Return the Solfrege Syllable by looking at the dictionary
    soul = solfrege[0];
    answerArray[0] = solfrege[0][scaleDegree];
    //log(`Solfrege: ${answerArray[0]}`);
}
//Populate Minor Key Table 
function populateMinor(){
    let i =0; 
    for (let [key, value] of Object.entries(scale.Major)){
        //Using Major Key to set to create Minor Table. Using Circle 5th Major/Min Relationship
        scale.Minor[solfrege[1].minor[i] ] = value
        i++;
    }
}
//Function to generate 'wrong answers'
function possibleAnswers(){
    for(let i = 1; i < 4;){
        //log('\n')
        let possibleGuess = Math.floor(Math.random() * scale.allNotes.length-1);
        possibleGuess = (scale.allNotes[possibleGuess]);

        //Determine if the 'wrong answer' goes into the array by comparing 
        //rolled item to the items in the array
        if(answerArray[i] == possibleGuess){
            //console.log("rerolling");
        }
        else{
            answerArray[i] = solfrege[0][possibleGuess];     
            i++;
        }
    }
    correctAnswer = answerArray[0];
    //answerArray = answerArray.sort();
}
function returnAnswerArray(){
    return answerArray;
}

var gameStart =[{
    type:'confirm',
    name: 'title',
    message: 'Welcome to FiMiTi! \nAre you ready to guess the Solfrege Syllable?',
    default: true
},];

var staticDo =[{
    type: 'list',
    name: 'What is the Solfrege Syllable?',
    message: 'Name the Syllable!',
    choices: returnAnswerArray(),
    default: answerArray[0],
    },{
    type: 'confirm',
    name: 'right',
    message: 'Hell Yeah you got it! Would you like to play again?',
    default: true,
    when: function (answers){ 
        return Boolean(answers["What is the Solfrege Syllable?"] === correctAnswer)
        }
    },{
    type: 'confirm',
    name: 'wrong',
    message: 'Incorrect! Would you like to try again?',
    default: true,
    when: function (answers){ 
        return Boolean(answers["What is the Solfrege Syllable?"] != correctAnswer)
        }
    },
];

function startGame(){
    inquirer.prompt(gameStart).then(answers => {
        log(`Key Signature: ${mKey} \nScale Degree: ${scaleDegree}`);
        startGame1();
    })
}
function gameBreak(){
    easyDegreeRandomizer(); 
    possibleAnswers();
    log(`Key Signature: ${mKey} \nScale Degree: ${scaleDegree}`);
    startGame1();
}


function startGame1() {
    inquirer.prompt(staticDo).then(answers => {
        if(answers['right']){
            gameBreak();
        }
        else if(answers['wrong']){
            startGame1();
        }
        else{
            log("Thanks for playing Bye!");
        }
    })
    .catch(error => {
        if(error.isTtyError){
            console.log('TTY Error\n')
        }
        else {
            log('broke2');
            initializeGame();
        }
    })
}
function initializeGame(){
     startGame();
     easyDegreeRandomizer(); 
     possibleAnswers();
 }

populateMinor();
initializeGame();