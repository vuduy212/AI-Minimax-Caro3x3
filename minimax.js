function bestMove() { //ham may danh
  let maxVal = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        board[i][j] = ai; // AI sẽ đánh vào ô này
        let score = minimax(board, 0, false, -Infinity, Infinity); // bước tiếp theo sẽ phải là human nên isMax = false
        board[i][j] = '';
        if (score > maxVal) {
          maxVal = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai; //danh vao bang caro
  currentPlayer = human; //chuyen nguoi choi hien tai sang nguoi

  let resultP = createP('');
  resultP.style('font-size', '20pt');
  resultP.html(`${maxVal}`);
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing, alpha, beta) {
  let result = checkWinner();
  if (result !== null) {
    //return scores[result];
    if (result == ai){
      return scores[result] - depth;
    } else if (result == human) {
      return scores[result] + depth;
    } else {
      return scores[result];
    }
  }

  if (isMaximizing) {
    let maxVal = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false, alpha, beta);
          board[i][j] = '';
          maxVal = max(score, maxVal);
          alpha = max(alpha, maxVal);
          if (beta <= alpha){
            break;
          }
        }
      }
    }
    return maxVal;
  } else {
    let minVal = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true, alpha, beta);
          board[i][j] = '';
          minVal = min(score, minVal);
          beta = min(beta, minVal);
          if (beta <= alpha){
            break;
          }
        }
      }
    }
    return minVal;
  }
}