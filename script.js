// Variables
const userBox = document.querySelector(".game-box__self")
const computerBox = document.querySelector(".game-box__computer")
const finalResults = document.querySelector(".results")
const refreshBtn = document.querySelector(".btn")


let selectedWeapon;
let computerWeapon;
let weapons = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock']

let computerScores = 0;
let userScores = 0;


// Functions
// Assigning weapons
function startBattle(e) {
    // Stop Confetti animation if it is active
    if(document.getElementById("confetti-canvas")) {
        import('./confetti.js')
        .then((module) => {
            // Do something with the module.
            module.removeConfetti();
        });
    }

    // Changin icons color to their default outline
    const allIcons = document.querySelectorAll('.game-box .far');
    allIcons.forEach(icon => {
        icon.classList.remove("selected")
    })
    

    // Assigning user's weapon
    selectedWeapon = e.title; 
    userBox.querySelector(".result").textContent = `---${selectedWeapon}`;
    // Make the selected icon in Black
    userBox.querySelector(`i[title = '${selectedWeapon}']`).classList.add("selected")

    // Selecting a random weapon from weapons array for computer
    let guess = Math.floor(Math.random() * 5);
    computerWeapon = weapons[guess]
    computerBox.querySelector(".result").textContent = `---${computerWeapon}`;
    // Make the selected icon in Black for computer selection
    computerBox.querySelector(`i[title = '${computerWeapon}']`).classList.add("selected")

    // compare weapons
    compareWeapons(selectedWeapon,computerWeapon)
}

window.startBattle = startBattle;

// Comparing Logic
function compareWeapons(userWeapon,computerWeapon) {
    switch (userWeapon) {
        case 'Rock':
            if(computerWeapon == 'Paper') checkResults('computer')
            if(computerWeapon == 'Scissors') checkResults('user')
            if(computerWeapon == 'Lizard') checkResults('user')
            if(computerWeapon == 'Spock') checkResults('computer')
            if(computerWeapon == 'Rock') checkResults('tie')
        break;

        case 'Paper':
            if(computerWeapon == 'Rock') checkResults('user')
            if(computerWeapon == 'Scissors') checkResults('computer')
            if(computerWeapon == 'Lizard') checkResults('computer')
            if(computerWeapon == 'Spock') checkResults('user')
            if(computerWeapon == 'Paper') checkResults('tie')
        break;

        case 'Scissors':
            if(computerWeapon == 'Rock') checkResults('computer')
            if(computerWeapon == 'Paper') checkResults('user')
            if(computerWeapon == 'Lizard') checkResults('user')
            if(computerWeapon == 'Spock') checkResults('computer')
            if(computerWeapon == 'Scissors') checkResults('tie')
        break;

        case 'Lizard':
            if(computerWeapon == 'Rock') checkResults('computer')
            if(computerWeapon == 'Paper') checkResults('user')
            if(computerWeapon == 'Scissors') checkResults('computer')
            if(computerWeapon == 'Spock') checkResults('user')
            if(computerWeapon == 'Lizard') checkResults('tie')
        break;
            
        case 'Spock':
            if(computerWeapon == 'Rock') checkResults('user')
            if(computerWeapon == 'Paper') checkResults('computer')
            if(computerWeapon == 'Scissors') checkResults('user')
            if(computerWeapon == 'Lizard') checkResults('computer')
            if(computerWeapon == 'Spock') checkResults('tie')
        break;

    }
}


// Check Results based on the Game Logic - The winner is the function argument except for the time being tie
function checkResults(winner) {
    if(winner == 'computer' || winner == 'user'){
        if(winner == 'computer') {
            // When the computer is the winner
            computerScores += 1;
            computerBox.querySelector(".score").textContent = computerScores
            finalResults.textContent = 'You Lost'
            // Stop Confetti animation if it is active
            if(document.getElementById("confetti-canvas")) {
                import('./confetti.js')
                .then((module) => {
                    // Do something with the module.
                    module.removeConfetti();
                });
            }
        } else {
            // When user is the winner
            userScores += 1;
            userBox.querySelector(".score").textContent = userScores
            finalResults.textContent = 'You Won!'

            // Start Confetti Animation
            import('./confetti.js')
            .then((module) => {
                // Do something with the module.
                module.startConfetti();
            });

        }

    }  else {
        // When it is a tie
        finalResults.textContent = 'It is a tie 😮😮'

        // Stop Confetti animation if it is active
        if(document.getElementById("confetti-canvas")) {
            import('./confetti.js')
            .then((module) => {
                // Do something with the module.
                module.removeConfetti();
            });
        }
    }
}


// reset everything
function reset() {
    computerScores = 0;
    userScores = 0;
    userBox.querySelector(".score").textContent = 0;
    computerBox.querySelector(".score").textContent = 0;
    userBox.querySelector(".result").textContent = '';
    computerBox.querySelector(".result").textContent = '';
    finalResults.textContent = '';
}

// Events
refreshBtn.addEventListener("click",reset)