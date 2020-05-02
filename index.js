//Using npm inquirer && chalk

var readlineSync = require('readline-sync');
var inquirer = require('inquirer');
var questionInt = readlineSync.questionInt;
var log = console.log;
var answer = [];


//Solfredge Dictionary [Major, ]
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
},
{
    minor: ['A', 'E', 'B', 'F', 'F#', 'C#', 'G#', 'Bb'],
}
]
//Scale = Major | Minor | Harmonic Minor Scale Degree
let scale = {
    allNotes: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#', 'G', 'G#'],
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
//Easy Lvl || Major Scale Randomizer || Add Minor Randomizer 
const easyDegreeRandomizer = () => { 
    //Returns the Major [Key]
    key = Math.floor(Math.random() * 7) ;
    lKey = (Object.keys(scale.Major)[key]);
    log(`Major Key: ${lKey}`);
    
    //Return a random scale degree
    scaleDegree = Math.floor(Math.random() * 6 );
    scaleDegree = (scale.Major[lKey][scaleDegree]);
    log(`Scale Degree: ${scaleDegree}`);
    
    //Return the Solfrege Syllable by looking at the dictionary
    soul = solfrege[0];
    answer[0] = solfrege[0][scaleDegree];
    log(`Solfrege: ${answer[0]}`);
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
function possibleAnswers() {
    for(let i = 1; i < 4;){
        log('\n')
        let possibleGuess = Math.floor(Math.random() * scale.allNotes.length--);
        log(possibleGuess)
        possibleGuess = (scale.allNotes[possibleGuess]);
        log(`Current Possible Guess Value: ${possibleGuess}`)

        //Determine if the 'wrong answer' goes into the array by comparing 
        //rolled item to the items in the array

        if(answer[i] == possibleGuess){
            console.log("rerolling");
        }
        else{
            answer[i] = solfrege[0][possibleGuess];    
            // log(answer);      
            log(`Possible Item iteration: ${i}`);
            log(`Not the same, placing  ${possibleGuess} into Answer Array`);    
            i++;
        }
    }

}







// Prompt User for Answer
const answerPrompt = () => {
    let realAnswer = answer[0];
    answer = answer.sort();
    log('\n \nSelect your answer')
    let userGuess = questionInt(`1. ${answer[0]}   2. ${answer[1]}  \n3. ${answer[2]}  4. ${answer[3]}\n`)
    console.log(`users answer ${answer[userGuess--]}`)
    log(realAnswer)
    if(realAnswer === answer[userGuess--]){
        log(realAnswer)

    } else { 
        log('Wrong Answer Try Again')
        answerPrompt();
    }
    
}
const startGame = () =>{
    let gameState = true;
    log('Welcome to FiMiTi')
    play = questionInt('Are you ready to play? \n 1. Yes \n 2. No \n: ')
    log(play)

    do{
        switch(Number(play)){
            case 1:
                easyDegreeRandomizer(); 
                possibleAnswers();
                answerPrompt();
                startGame();
                break;
            case 2:
                gameState = false;
                break;
            default:
                startGame();
                break;
        }
    }while(gameState)
}





    populateMinor();
    startGame()

//log(scale.Minor);