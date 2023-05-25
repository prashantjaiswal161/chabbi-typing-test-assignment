import {Component} from 'react'
import Result from './components/Result'
import './App.css'

const letters = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']

class App extends Component {
  state = {
    timer: 300,
    correctLetters: 0,
    wrongLetters: 0,
    randomLetter: '',
    userInput: '',
    input: '',
    isActiveInput: false,
  }

  componentDidMount() {
    this.getRandomLetter()
  }

  getRandomLetter = () => {
    const randomNumber = Math.floor(Math.random() * letters.length)
    this.setState({randomLetter: letters[randomNumber]})
  }

  onChangeUserInput = event => {
    const {randomLetter} = this.state
    const userInput = event.target.value
    console.log(userInput, randomLetter)
    if (randomLetter === userInput) {
      this.setState(
        prevState => ({
          correctLetters: prevState.correctLetters + 1,
          input: `${prevState.input}${userInput} `,
          userInput: '',
        }),
        this.getRandomLetter,
      )
    } else {
      this.setState(
        prevState => ({
          wrongLetters: prevState.wrongLetters + 1,
          input: `${prevState.input}${userInput} `,
          userInput: '',
        }),
        this.getRandomLetter,
      )
    }
  }

  onStartAgain = () => {
    this.setState({
      timer: 300,
      correctLetters: 0,
      wrongLetters: 0,
      input: '',
    })
  }

  onClickStartBtn = () => {
    this.setState(prevState => ({isActiveInput: !prevState.isActiveInput}))
    setInterval(() => {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    }, 1000)
  }

  render() {
    const {
      timer,
      correctLetters,
      wrongLetters,
      randomLetter,
      userInput,
      input,
      isActiveInput,
    } = this.state

    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60

    return (
      <div className="bg-container">
        {timer > 0 ? (
          <div className="container">
            <h1>Typing Test</h1>
            <div className="stats">
              <p>
                Time Left:{' '}
                <span className="stats-count">
                  {minutes}:{seconds}
                </span>
              </p>
              <p>
                Corrects: <span className="stats-count">{correctLetters}</span>
              </p>
              <p>
                Mistakes: <span className="stats-count">{wrongLetters}</span>
              </p>
            </div>
            <div>
              {isActiveInput ? <h1>{randomLetter}</h1> : ''}
              <input
                type="text"
                placeholder="Type Here"
                value={userInput}
                disabled={!isActiveInput}
                onChange={this.onChangeUserInput}
              />
              <br />
              <br />
              <div>
                {isActiveInput ? null : (
                  <button type="button" onClick={this.onClickStartBtn}>
                    Start Test
                  </button>
                )}
              </div>
              <p>{input}</p>
            </div>
          </div>
        ) : (
          <Result
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            onStartAgain={this.onStartAgain}
          />
        )}
      </div>
    )
  }
}

export default App
