import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className = "square" onClick = {props.onClick}>
            {props.value}
        </button>
    );
}

function PlayAgainControl(props) {
        return (
            <div>
                <span>
                    <p>"Play Again?"</p>
                    <button onClick = {props.onYesClick}>
                        "Yes"
                    </button>
                    <button onClick = {props.onNoClick}>
                        "No"
                    </button>
                </span>
            </div>
        );
}
  
  class Board extends React.Component {
    renderSquare(i) {
      return ( 
        <Square 
            value={this.props.squares[i]}
            onClick = {() => this.props.onClick(i)} 
        />
      );
    }

    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
      constructor() {
          super();
          this.state = {
              history: [{
                  squares: Array(9).fill(null),
              }],
              xIsNext: true,
              isPlayAgain: true,
              stepNumber: 0,
          };
      }

      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleYesClick() {
        const squares = Array(9).fill(null);
        const isPlayAgain = true;
        const xIsNext = true;
        this.setState({
            isPlayAgain: isPlayAgain,
            history: [{
                squares: squares,
            }],
            xIsNext: xIsNext,
            stepNumber: 0,
        })
    }

    handleNoClick() {
        //const isPlayAgain = false;
        /*this.setState({
            isPlayAgain: isPlayAgain,
        })*/
        alert("Ok.");
    }

    renderPlayAgainControl() {
        return (
            <PlayAgainControl
                onYesClick = {() => this.handleYesClick()}
                onNoClick = {() => this.handleNoClick()}
            />
        );
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const isPlayAgain = this.state.isPlayAgain;

        const moves = history.map((step, move) => {
            const desc = move ? 
            'Move #' + move :
            'Game start';
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        let status;
        var playAgain;
        if (winner)
        {
            status = winner + ' Player wins!';
            playAgain = this.renderPlayAgainControl();
        }
        else if (this.state.stepNumber === 9)
        {
            status = "Tie Game!";
            playAgain = this.renderPlayAgainControl();
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        /*if (isPlayAgain === false)
        {
            alert("Ok.");
        }*/

      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{playAgain}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
      const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], 
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[b] === squares[a] && squares[a] === squares[c])
          {
              return squares[a];
          }
      }
      return null;
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  