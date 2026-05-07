
const buttons =
  document.querySelectorAll(".btn");



const userChoiceDisplay =
  document.getElementById("user-choice");

const computerChoiceDisplay =
  document.getElementById("computer-choice");

const result =
  document.getElementById("result");

const countdown =
  document.getElementById("countdown");



const userScoreEl =
  document.getElementById("user-score");

const computerScoreEl =
  document.getElementById("computer-score");

const streakEl =
  document.getElementById("streak");

const coinsEl =
  document.getElementById("coins");

const highScoreEl =
  document.getElementById("high-score");



const resetBtn =
  document.getElementById("reset-btn");

const difficulty =
  document.getElementById("difficulty");

const modeBtn =
  document.getElementById("mode-btn");

const buyTheme =
  document.getElementById("buy-theme");

const themeToggle =
  document.getElementById("theme-toggle");

const logoutBtn =
  document.getElementById("logout-btn");



const playerName =
  document.getElementById("player-name");

const avatarButtons =
  document.querySelectorAll(".avatar-btn");

const userReaction =
  document.getElementById("user-reaction");

const computerReaction =
  document.getElementById("computer-reaction");



const userProfile =
  document.getElementById("user-profile");

const emailStatus =
  document.getElementById("email-status");



const badgeList =
  document.getElementById("badge-list");



const totalMatchesEl =
  document.getElementById("total-matches");

const winsEl =
  document.getElementById("wins");

const lossesEl =
  document.getElementById("losses");

const drawsEl =
  document.getElementById("draws");



const clickSound =
  new Audio("sounds/click.mp3");

const winSound =
  new Audio("sounds/win.mp3");

const loseSound =
  new Audio("sounds/lose.wav");

const drawSound =
  new Audio("sounds/draw.mp3");



const bgMusic =
  new Audio("sounds/bg-music.mp3");

bgMusic.loop = true;

bgMusic.volume = 0.2;



document.body.addEventListener(
  "click",
  () => {

    bgMusic.play();

  },
  { once: true }
);



let userScore = 0;

let computerScore = 0;

let streak = 0;

let coins = 0;

let totalMatches = 0;

let wins = 0;

let losses = 0;

let draws = 0;

let multiplayer = false;

/* HIGH SCORE */

let highScore =
  localStorage.getItem(
    "highScore"
  ) || 0;

highScoreEl.innerText =
  highScore;



const savedPic =
  localStorage.getItem(
    "profilePic"
  );

if(savedPic) {

  userProfile.src =
    savedPic;

}



const verified =
  localStorage.getItem(
    "emailVerified"
  );

if(verified) {

  emailStatus.innerText =
    "✅ Email Verified";

}



const emojis = {

  rock: "🪨",

  paper: "📄",

  scissors: "✂️",

  fire: "🔥",

  water: "🌊",

  lightning: "⚡"
};



themeToggle.addEventListener(
  "click",
  () => {

    document.body.classList.toggle(
      "light"
    );

  }
);



modeBtn.addEventListener(
  "click",
  () => {

    multiplayer =
      !multiplayer;

    modeBtn.innerText =
      multiplayer
      ? "👥 Multiplayer ON"
      : "🎮 Multiplayer OFF";

  }
);



avatarButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const avatar =
        button.dataset.avatar;

      playerName.innerText =
        `${avatar} You`;

    }
  );

});



buttons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      clickSound.play();

      const userChoice =
        button.dataset.choice;

      startBattle(
        userChoice
      );

    }
  );

});



function startBattle(
  userChoice
) {

  let count = 3;

  countdown.innerText =
    count;

  const interval =
    setInterval(() => {

      count--;

      if(count > 0) {

        countdown.innerText =
          count;

      }

      else if(count === 0) {

        countdown.innerText =
          "FIGHT ⚔️";

      }

      else {

        clearInterval(
          interval
        );

        playGame(
          userChoice
        );

      }

    }, 500);

}



function playGame(
  userChoice
) {

  totalMatches++;

  let computerChoice;

  const level =
    difficulty.value;

  const options = [

    "rock",

    "paper",

    "scissors",

    "fire",

    "water",

    "lightning"

  ];



  if(level === "easy") {

    computerChoice =
      options[
        Math.floor(
          Math.random() *
          options.length
        )
      ];

  }

  

  else if(
    level === "medium"
  ) {

    if(Math.random() > 0.5) {

      computerChoice =
        counterMove(
          userChoice
        );

    }

    else {

      computerChoice =
        options[
          Math.floor(
            Math.random() *
            options.length
          )
        ];

    }

  }

 

  else {

    if(Math.random() > 0.2) {

      computerChoice =
        counterMove(
          userChoice
        );

    }

    else {

      computerChoice =
        options[
          Math.floor(
            Math.random() *
            options.length
          )
        ];

    }

  }



  userChoiceDisplay.innerText =
    emojis[userChoice];

  computerChoiceDisplay.innerText =
    emojis[computerChoice];

  /* DRAW */

  if(
    userChoice ===
    computerChoice
  ) {

    result.innerText =
      "🤝 Draw Match!";

    drawSound.play();

    draws++;

    streak = 0;

    userReaction.innerText =
      "😐";

    computerReaction.innerText =
      "😐";

  }

  

  else if(
    isWinner(
      userChoice,
      computerChoice
    )
  ) {

    result.innerText =
      "🎉 You Won!";

    winSound.play();

    confetti();

    userScore++;

    wins++;

    streak++;

    coins += 10;

    userReaction.innerText =
      "😎";

    computerReaction.innerText =
      "😭";

    userChoiceDisplay.classList.add(
      "win-animation"
    );

    setTimeout(() => {

      userChoiceDisplay.classList.remove(
        "win-animation"
      );

    }, 1000);

    

    if(wins === 1) {

      badgeList.innerHTML +=
        "<p>🥉 First Win</p>";

    }

    if(wins === 5) {

      badgeList.innerHTML +=
        "<p>🥈 Pro Player</p>";

    }

    if(wins === 10) {

      badgeList.innerHTML +=
        "<p>🥇 Champion</p>";

    }

    

    if(
      userScore >
      highScore
    ) {

      highScore =
        userScore;

      localStorage.setItem(
        "highScore",
        highScore
      );

      highScoreEl.innerText =
        highScore;

    }


    if(userScore === 5) {

      setTimeout(() => {

        alert(
          "🏆 YOU WON TOURNAMENT!"
        );

      }, 300);

    }

  }

 

  else {

    result.innerText =
      "😈 Computer Won!";

    loseSound.play();

    computerScore++;

    losses++;

    streak = 0;

    userReaction.innerText =
      "😵";

    computerReaction.innerText =
      "😈";

    computerChoiceDisplay.classList.add(
      "win-animation"
    );

    setTimeout(() => {

      computerChoiceDisplay.classList.remove(
        "win-animation"
      );

    }, 1000);

  }

  

  updateUI();

}



function updateUI() {

  userScoreEl.innerText =
    userScore;

  computerScoreEl.innerText =
    computerScore;

  streakEl.innerText =
    streak;

  coinsEl.innerText =
    coins;

  totalMatchesEl.innerText =
    totalMatches;

  winsEl.innerText =
    wins;

  lossesEl.innerText =
    losses;

  drawsEl.innerText =
    draws;

}



function counterMove(
  choice
) {

  if(choice === "rock")
    return "paper";

  if(choice === "paper")
    return "scissors";

  if(choice === "scissors")
    return "rock";

  if(choice === "fire")
    return "water";

  if(choice === "water")
    return "lightning";

  return "rock";

}



function isWinner(
  user,
  computer
) {

  return (

    (user === "rock" &&
      computer === "scissors")

    ||

    (user === "paper" &&
      computer === "rock")

    ||

    (user === "scissors" &&
      computer === "paper")

    ||

    (user === "fire" &&
      computer === "paper")

    ||

    (user === "water" &&
      computer === "fire")

    ||

    (user === "lightning" &&
      computer === "water")

  );

}



buyTheme.addEventListener(
  "click",
  () => {

    if(coins >= 50) {

      coins -= 50;

      coinsEl.innerText =
        coins;

      document.body.style.background =
        "linear-gradient(135deg,#FFD700,#FFB700)";

      alert(
        "✨ Golden Theme Unlocked!"
      );

    }

    else {

      alert(
        "❌ Not Enough Coins!"
      );

    }

  }
);



logoutBtn.addEventListener(
  "click",
  () => {

    alert(
      "🚪 Logged Out!"
    );

    window.location.href =
      "index.html";

  }
);



resetBtn.addEventListener(
  "click",
  () => {

    userScore = 0;

    computerScore = 0;

    streak = 0;

    totalMatches = 0;

    wins = 0;

    losses = 0;

    draws = 0;

    coins = 0;

    badgeList.innerHTML =
      "";

    userChoiceDisplay.innerText =
      "❔";

    computerChoiceDisplay.innerText =
      "❔";

    result.innerText =
      "Choose Your Weapon ⚔️";

    countdown.innerText =
      "READY?";

    userReaction.innerText =
      "😐";

    computerReaction.innerText =
      "😐";

    updateUI();

  }
);