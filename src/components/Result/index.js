import './index.css'

const Result = props => {
  const {correctLetters, wrongLetters, onStartAgain} = props
  const totalKeysPressed = correctLetters + wrongLetters
  const accuracy = (correctLetters / totalKeysPressed) * 100
  const onClickStartAgainBtn = () => {
    onStartAgain()
  }
  return (
    <div className="result-container">
      <h1>Result</h1>
      <div className="stats-container">
        <div>
          <p>Key Pressed: {totalKeysPressed}</p>
          <p>Accuracy: {accuracy}%</p>
        </div>
        <button type="button" onClick={onClickStartAgainBtn}>
          Start Again
        </button>
      </div>
    </div>
  )
}

export default Result
