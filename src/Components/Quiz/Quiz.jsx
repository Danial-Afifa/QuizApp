import React, { useRef, useState } from 'react'
import './Quiz.css'
import {data} from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    
    const Option1 = useRef();
    const Option2 = useRef();
    const Option3 = useRef();
    const Option4 = useRef();

    const option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e, ans) => {
        if(lock === false) {
            if(question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                option_array[question.ans-1].current.classList.add("correct");
            }
        }
    }

    const next = () => {
        if(lock === true) {
            if(index === data.length-1) {
                setResult(true);
                return 0;
            }
            setIndex(prevIndex => prevIndex + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            option_array.forEach((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
            });
        }
    }

    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result ? null : (
                <>
                    <h2>{index+1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>a. {question.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>b. {question.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>c. {question.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>d. {question.option4}</li>
                    </ul>
                    <button onClick={next}>Next</button>
                    <div className="index">{index+1} of {data.length} questions</div>
                </>
            )}
            
            {result && (
                <>
                    <h2>You Scored {score} out of {data.length}</h2>
                    <button onClick={reset}>Reset</button>
                </>
            )}
        </div>
    )
}

export default Quiz