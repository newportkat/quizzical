const Question = (props) => {
    const answersElements = props.answersArray.map((answer, answerIndex) => {
        const isCorrectAnswer = answer.answer === props.correctAnswer
        const isSelected = answer.isSelected
        let answerClasses = "answer"

        if (props.isGameOver) {
            if (isCorrectAnswer) {
                answerClasses += " correct-answer"
            } else if (isSelected) {
                answerClasses += " selected-incorrect-answer"
            } else {
                answerClasses += " unselected-incorrect-answer"
            }
        } else if (isSelected) {
            answerClasses += " selected"
        }

        return (
            <span
                key={answerIndex}
                className={answerClasses}
                onClick={() =>
                    props.isGameOver
                        ? null
                        : props.selectAnswer(props.questionIndex, answerIndex)
                }
            >
                {answer.answer}
            </span>
        )
    })

    return (
        <div className="question-container">
            <h2 className="question-text">{props.question}</h2>
            <div className="answers">{answersElements}</div>
        </div>
    )
}

export default Question
