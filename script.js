document.addEventListener('DOMContentLoaded', () => {
  let balance = 500; // 初始余额
  let points = 0;    // 初始积分
  let currentBet = 100;

  // 更新余额和积分显示
  function updateDisplay() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('points').textContent = points;
  }

  // 获取随机卡牌
  function getRandomCard() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    return { suit: suits[Math.floor(Math.random() * suits.length)], value: Math.floor(Math.random() * 13) + 1 };
  }

  // 设置卡牌显示
  function setCardDisplay(cardElement, card) {
    cardElement.textContent = card.value;
    cardElement.style.color = ['hearts', 'diamonds'].includes(card.suit) ? 'red' : 'black';
  }

  // 处理猜测逻辑
  function checkGuess(condition) {
    const card3 = getRandomCard();
    setCardDisplay(document.getElementById('card3'), card3);

    const isRed = ['hearts', 'diamonds'].includes(card3.suit);
    const correct = (condition === 'red' && isRed) || (condition === 'black' && !isRed);

    if (correct) {
      balance += currentBet;
      points += 100;
      document.getElementById('message').textContent = 'You guessed correctly!';
    } else {
      balance -= currentBet;
      points += 50;
      document.getElementById('message').textContent = 'Wrong guess!';
    }

    updateDisplay();
    setTimeout(startGame, 2000);
  }

  // 开始游戏
  function startGame() {
    document.getElementById('card1').textContent = '?';
    document.getElementById('card2').textContent = '?';
    document.getElementById('card3').textContent = '?';
    document.getElementById('message').textContent = 'Make Your Guess!';
  }

  // 监听投注按钮
  document.querySelectorAll('.bet-btn').forEach(button => {
    button.addEventListener('click', () => {
      currentBet = parseInt(button.dataset.bet);
    });
  });

  // 监听 Red 和 Black 按钮
  document.getElementById('btn-red').addEventListener('click', () => checkGuess('red'));
  document.getElementById('btn-black').addEventListener('click', () => checkGuess('black'));

  updateDisplay();
  startGame();
});
