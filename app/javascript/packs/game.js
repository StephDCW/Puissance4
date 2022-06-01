class Puissance4 {
  constructor(element_id, rows = 6, cols = 7) {
    this.rows = rows;
    this.cols = cols;
    this.board = Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      this.board[i] = Array(this.cols).fill(0);
    }
    this.turn = 1;
    this.moves = 0;
    this.winner = null;
    this.element = document.querySelector(element_id);
    if(this.element) {
    this.element.addEventListener('click', (event) => this.handle_click(event));
    }
    this.render();
  }

  render() {
    let table = document.createElement('table');
    for (let i = this.rows - 1; i >= 0; i--) {
      let tr = table.appendChild(document.createElement('tr'));
      for (let j = 0; j < this.cols; j++) {
        let td = tr.appendChild(document.createElement('td'));
        let colour = this.board[i][j];
        if (colour)
          td.className = 'player' + colour;
        td.dataset.column = j;
      }
    }
    if(this.element) {
    this.element.innerHTML = '';
    this.element.appendChild(table);
    }
    let joueur = document.querySelector(".color-turn")
    joueur.style.backgroundColor = "red";
    if (this.turn === 1) {
      console.log(joueur)
      joueur.style.backgroundColor = "red";
    } else {
      joueur.style.backgroundColor = "yellow";
    }
  }

  set(row, column, player) {
    this.board[row][column] = player;
    this.moves++;
  }

  play(column) {
  let row;
  for (let i = 0; i < this.rows; i++) {
    if (this.board[i][column] == 0) {
      row = i;
      break;
    }
  }
  if (row === undefined) {
    return null;
  } else {
    this.set(row, column, this.turn);
    return row;
  }
  }

  handle_click(event) {
    if (this.winner !== null) {
      if (window.confirm("Game over!\n\nDo you want to restart?")) {
        this.reset();
        this.render();
      }
      return;
    }

    let column = event.target.dataset.column;
    if (column !== undefined) {
      column = parseInt(column);
      let row = this.play(parseInt(column));
      if (row === null) {
        window.alert("La colonne est remplie");
      } else {
        if (this.win(row, column, this.turn)) {
          this.winner = this.turn;
        } else if (this.moves >= this.rows * this.columns) {
          this.winner = 0;
        }
        this.turn = 3 - this.turn;
        this.render()
        switch (this.winner) {
          case 0:
            window.confirm("Match Nul !\n\nVoulez-vous rejouer ?");
            this.reset();
            this.render();
            break;
          case 1:
            window.confirm("Les rouges ont gagné !\n\nVoulez-vous rejouer ?");
            this.reset();
            this.render();
            break;
          case 2:
            window.confirm("Les jaunes ont gagné !\n\nVoulez-vous rejouer ?");
            this.reset();
            this.render();
            break;
        }
      }
    }
  }


  win(row, column, player) {
    let count = 0;
    for (let j = 0; j < this.cols; j++) {
      count = (this.board[row][j] == player) ? count + 1 : 0;
      if (count >= 4) return true;
    }
    count = 0;
    for (let i = 0; i < this.rows; i++) {
      count = (this.board[i][column] == player) ? count + 1 : 0;
      if (count >= 4) return true;
    }
    count = 0;
    let shift = row - column;
    for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) {
      count = (this.board[i][i - shift] == player) ? count + 1 : 0;
      if (count >= 4) return true;
    }
    count = 0;
    shift = row + column;
    for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) {
      console.log(i, shift - i, shift)
      count = (this.board[i][shift - i] == player) ? count + 1 : 0;
      if (count >= 4) return true;
    }

    return false;
  }


  reset() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.board[i][j] = 0;
      }
    }
    this.move = 0;
    this.winner = null;
  }
}


let p4 = new Puissance4('#jeu');

export default Puissance4
