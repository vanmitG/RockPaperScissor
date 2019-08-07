import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  state = {
    isGameOver: false,
    playerWinCount: 0,
    computerWinCount: 0,
    maxGame: 5,
    count: 0,
    gameCount: 1,
    gameHistory: [],
    totalGameHistory: [],
    choice: "ruby",
    computerChoice: "ruby",
    imgChoice: {
      ruby:
        "https://media.gettyimages.com/photos/closeup-of-a-sparkling-red-ruby-picture-id172373115?s=612x612",
      tree:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Ash_Tree_-_geograph.org.uk_-_590710.jpg/220px-Ash_Tree_-_geograph.org.uk_-_590710.jpg",
      metal:
        "https://images.unsplash.com/photo-1501166222995-ff31c7e93cef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
    }
  };
  resetGame() {
    let gameHistory = this.state.gameHistory;
    this.setState({
      isGameOver: false,
      playerWinCount: 0,
      computerWinCount: 0,
      choice: "ruby",
      computerChoice: "ruby",
      outcome: null,
      count: 0,
      gameCount: (this.state.gameCount += 1),
      gameHistory: [],
      totalGameHistory: this.state.totalGameHistory.concat(
        this.state.GameHistory
      )
    });
  }
  makeUserChoice(playerChoice) {
    const choices = ["ruby", "tree", "metal"];
    // let computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let computerChoice = "ruby";
    let outcome;
    let computerWinCount = 0;
    let playerWinCount = 0;
    let isGameOver = false;
    // if (this.state.playerWinCount === 3 || this.state.computerWinCount === 3) {
    //   this.setState({ isGameOver: true });
    //   return;
    // }
    if (this.state.playerWinCount === 2 || this.state.computerWinCount === 2) {
      isGameOver = true;
      this.setState({
        isGameOver: true
      });
      return;
    }
    if (playerChoice === "ruby") {
      outcome = computerChoice === "tree" ? "Computer Won" : "Player Won";
    }
    if (playerChoice === "tree") {
      outcome = computerChoice === "metal" ? "Computer Won" : "Player Won";
    }
    if (playerChoice === "metal") {
      outcome = computerChoice === "ruby" ? "Computer Won" : "Player Won";
    }
    if (playerChoice === computerChoice) {
      outcome = "Tie game";
    }

    if (outcome === "Computer Won") {
      computerWinCount = 1;
    } else {
      playerWinCount = 1;
    }

    this.setState({
      outcome: outcome,
      choice: playerChoice,
      isGameOver: isGameOver,
      count: this.state.count + 1,
      computerChoice: computerChoice,
      playerWinCount: this.state.playerWinCount + playerWinCount,
      computerWinCount: this.state.computerWinCount + computerWinCount,
      gameHistory: this.state.gameHistory.concat(outcome)
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Rock, Paper, Scissor</h1>
        <div className="choiceContainer">
          <div className="player">
            <h2 className={this.state.choice}>{this.state.choice}</h2>
            <img
              src={this.state.imgChoice[this.state.choice]}
              alt={this.state.choice}
            />
            <h3 className={this.state.choice}>
              Player: {this.state.playerWinCount}
            </h3>
          </div>

          <div>
            <h2>Game Count: {this.state.gameCount}</h2>
            <h2>Play Count: {this.state.count}</h2>
            <div style={this.state.isGameOver ? { display: "none" } : null}>
              <button onClick={() => this.makeUserChoice("ruby")}>Ruby</button>
              <button onClick={() => this.makeUserChoice("tree")}>Tree</button>
              <button onClick={() => this.makeUserChoice("metal")}>
                Metal
              </button>
            </div>
            <div style={!this.state.isGameOver ? { display: "none" } : null}>
              <button onClick={() => this.resetGame()}>Reset Game</button>
            </div>
            <br />
            <h2>{this.state.outcome}</h2>
            <h3>
              <ul>
                {this.state.gameHistory.map((el, idx) => {
                  return <li>{el}</li>;
                })}
              </ul>
            </h3>
          </div>

          <div className="computer">
            <h2 className={`${this.state.computerChoice}`}>
              {this.state.computerChoice}
            </h2>
            <img
              src={this.state.imgChoice[this.state.computerChoice]}
              alt={this.state.computerChoice}
            />
            <h3 className={this.state.computerChoice}>
              Computer Win: {this.state.computerWinCount}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
