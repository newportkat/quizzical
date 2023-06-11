import React from "react"
import Question from "../Question/Question"
import he from "he"

const QuestionsPage = () => {
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(null)
    const [isGameOver, setIsGameOver] = React.useState(false)

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    async function getQuestions() {
        const res = await fetch(
            "https://opentdb.com/api.php?amount=5&type=multiple"
        )
        const data = await res.json()
        const modifiedData = data.results.map((question) => {
            const answersArray = [
                {
                    answer: he.decode(question.correct_answer),
                    isSelected: false,
                    isCorrect: true,
                },
                ...question.incorrect_answers.map((answer) => ({
                    answer: he.decode(answer),
                    isSelected: false,
                    isCorrect: false,
                })),
            ]
            return {
                ...question,
                question: he.decode(question.question),
                answersArray: shuffleArray(answersArray),
            }
        })
        setQuestions(modifiedData)
    }
    React.useEffect(() => {
        getQuestions()
    }, [])

    const resetGame = () => {
        setQuestions([])
        setScore(null)
        getQuestions()
        setIsGameOver(false)
    }

    const selectAnswer = (questionIndex, answerIndex) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    return {
                        ...question,
                        answersArray: question.answersArray.map(
                            (answer, aIndex) => ({
                                ...answer,
                                isSelected: aIndex === answerIndex,
                            })
                        ),
                    }
                }
                return question
            })
        )
    }

    const checkAnswers = () => {
        let correctAnswers = 0
        questions.forEach((question) => {
            question.answersArray.forEach((answer) => {
                if (
                    answer.isSelected &&
                    answer.answer === question.correct_answer
                ) {
                    correctAnswers += 1
                }
            })
        })
        setScore(correctAnswers)
        setIsGameOver(true)
    }

    const allQuestionsAnswered = questions.every((question) =>
        question.answersArray.some((answer) => answer.isSelected)
    )

    return (
        <>
            {questions.length > 0 ? (
                <section className="questions-page">
                    {questions.map((question, index) => (
                        <Question
                            key={index}
                            questionIndex={index}
                            question={question.question}
                            correctAnswer={question.correct_answer}
                            incorrectAnswers={question.incorrect_answers}
                            answersArray={question.answersArray}
                            selectAnswer={selectAnswer}
                            isGameOver={isGameOver}
                        />
                    ))}
                    {score !== null && (
                        <p>You scored {score}/5 correct answers</p>
                    )}
                    {isGameOver ? (
                        <button className="answers-btn btn" onClick={resetGame}>
                            Play Again
                        </button>
                    ) : (
                        <button
                            className="answers-btn btn"
                            disabled={!allQuestionsAnswered}
                            onClick={checkAnswers}
                        >
                            Check answers
                        </button>
                    )}
                </section>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default QuestionsPage
