/*
      let score = {
        wins: 0,
        losses: 0,
        ties: 0
      };

      const savedScore = JSON.parse(localStorage.getItem('score'));
      if (savedScore) {
        score = savedScore;
      }

      updateScoreElement();

      function makeMove(playerMove) {
        const computerMove = pickComputerMove();
        const resultElement = document.querySelector('.js-result');

        if (playerMove === computerMove) {
          resultElement.innerHTML = `Tie.`;
          score.ties += 1;

        } else if (
          (playerMove === 'rock' && computerMove === 'scissors') ||
          (playerMove === 'paper' && computerMove === 'rock') ||
          (playerMove === 'scissors' && computerMove === 'paper')
        ) {
          resultElement.innerHTML = `You win.`;
          score.wins += 1;

        } else {
          resultElement.innerHTML = `You lose.`;
          score.losses += 1;
        }

        const movesElement = document.querySelector('.js-moves-chosen');
        movesElement.innerHTML = `
          You
          <img src="images/${playerMove}-emoji.png" class="move-icon">
          <img src="images/${computerMove}-emoji.png" class="move-icon">
          Computer
        `;

        updateScoreElement();
        localStorage.setItem('score', JSON.stringify(score));
      }

      function resetScore() {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        };

        updateScoreElement();
        localStorage.removeItem('score');
      }

      function pickComputerMove() {
        const randomNumber = Math.random();
        let computerMove;

        if (randomNumber < (1 / 3)) {
          computerMove = 'rock';
        } else if (randomNumber < (2 / 3)) {
          computerMove = 'paper';
        } else {
          computerMove = 'scissors';
        }

        return computerMove;
      }

      function updateScoreElement() {
        document.querySelector('.js-score').innerHTML = `
          Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
        `;
      }
        */
(() => {
  let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    ties: 0,
  };

  const elements = {
    result: document.querySelector(".js-result"),
    moves: document.querySelector(".js-moves-chosen"),
    score: document.querySelector(".js-score"),
  };

  const savedScore = () => {
    localStorage.setItem("score", JSON.stringify(score));
  };

  const updateScore = () => {
    elements.score.textContent = `
          Wins: ${score.wins},
          Losses: ${score.losses},
          Ties: ${score.ties}`;
  };

  const randomMove = () => {
    ["rock", "paper", "scissors"][(Math.random() * 3) | 0];
  };

  const showMoves = (player, comp) => {
    elements.moves.innerHTML = `
              You <img src="images/${player}-emoji.png" class="move-icon">
              <img src="images/${comp}-emoji.png" class="move-icon"> Computer
              `;
  };

  function play(playerMove) {
    const comp = randMove();

    if (playerMove === comp) {
      els.result.textContent = "Tie.";
      score.ties++;
    } else if (
      (playerMove === "rock" && comp === "scissors") ||
      (playerMove === "paper" && comp === "rock") ||
      (playerMove === "scissors" && comp === "paper")
    ) {
      els.result.textContent = "You win.";
      score.wins++;
    } else {
      els.result.textContent = "You lose.";
      score.losses++;
    }

    showMoves(playerMove, comp);
    updateScore();
    save();
  }

  function reset() {
    score = { wins: 0, losses: 0, ties: 0 };
    els.result.textContent = "Score reset!";
    els.moves.textContent = "";
    updateScore();
    localStorage.removeItem("score");
  }

  updateScore();
  window.makeMove = play;
  window.resetScore = reset;
})();
