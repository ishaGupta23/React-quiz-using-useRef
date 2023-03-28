import React, { useState, useRef } from 'react';
import '../App.css'

function Quize() {

    const questionData = [
        {
            question: '1) Which company developed ReactJS?',
            options: [' Apple', ' Facebook', ' Google', ' Twitter'],
            correctAnswer: 1,

        },
        {
            question: '2) What is the highest mountain in the world?',
            options: [' Everest', ' Kilimanjaro', ' Denali', ' Aconcagua'],
            correctAnswer: 0,
        },
        {
            question: '3) What is the largest country in the world by area?',
            options: [' China', ' USA', ' Russia', ' India'],
            correctAnswer: 2,
        },
        {
            question: '4) Choose the library which is most often associated with react?',
            options: [" Sinon", ' Chai', ' Jest', ' Mocha'],
            correctAnswer: 2,

        },
        {
            question: '5) What is used to handle code-splitting?',
            options: [' React.lazy', ' React.memo', ' React.fallback', ' React.split'],
            correctAnswer: 0,

        },
        {
            question: '6) Why is ref used?',
            options: [' o bind a function', ' to call a function', ' to directly access the DOM node', ' to refer to another js file'],
            correctAnswer: 2,

        },
        {
            question: '7) Which company developed ReactJS?',
            options: [' Apple', ' Facebook', ' Google', ' Twitter'],
            correctAnswer: 1,

        },
        {
            question: 'Which company developed ReactJS?',
            options: [' Apple', ' Facebook', ' Google', ' Twitter'],
            correctAnswer: 1,

        },

    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const optionRefs = useRef([]);
    const [score, setScore] = useState(0);
    const [passing, setPassing] = useState(false);

    const handleOptionClick = (index) => {
        setSelectedOption(index);
    };

    const handleNextClick = () => {
        if (selectedOption !== null) {
            setSelectedOption(null);
            const correctAnswer = questionData[currentQuestion].correctAnswer;
            if (selectedOption === correctAnswer) {
                setScore(score + 2);
            }
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmitClick = () => {
        if (selectedOption !== null) {
            const correctAnswer = questionData[currentQuestion].correctAnswer;
            if (selectedOption === correctAnswer) {
                setScore(score + 2);
            }
            if (score >= 12) {
                setPassing(true);
            }
        }
    };

    const handleRestartClick = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setScore(0);
        setPassing(false);
    };

    const isLastQuestion = currentQuestion === questionData.length - 1;
    const buttonText = isLastQuestion ? 'Submit' : 'Next';
    const showResult = isLastQuestion && selectedOption !== null;

    return (
        <div className='quiz-container' >
            {
                showResult ? (
                    <div className='result-container'>
                        <h2>Your score is {score} out of 16</h2>
                        {passing ? (
                            <h3>Congraculation, You passed !</h3>
                        ) : (
                            <button className='restart-button' onClick={handleRestartClick}> Restart</button>
                        )}
                    </div>
                ) : (
                    <>

                        <h2>{questionData[currentQuestion].question}</h2>
                        <div className='options-container flex'>
                            {questionData[currentQuestion].options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`option ${selectedOption === index ? 'selected' : ''}`}
                                    onClick={() => handleOptionClick(index)}
                                    ref={(el) => (optionRefs.current[index] = el)}
                                >
                                    <input
                                        type="radio"
                                        id={`option${index}`}
                                        name="options"
                                        value={option}
                                        checked={selectedOption === index}
                                        onChange={() => handleOptionClick(index)}
                                    />
                                    <label htmlFor={`option${index}`}> {option} </label>
                                </div>
                            ))}
                        </div>
                        <div className='mainRight flex'>
                            <button className="next-button"
                                onClick={isLastQuestion ? handleSubmitClick : handleNextClick}
                            >
                                {buttonText}
                            </button>
                        </div>


                    </>
                )
            }

        </div>
    );
}

export default Quize;