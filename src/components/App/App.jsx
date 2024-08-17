import Description from "../Description/Description.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import Notification from "../Notification/Notification .jsx";
import Options from "../Options/Options.jsx";

import { useState, useEffect } from "react";


export default function App() {

    const [value, setValue] = useState(() => {
        const savedValue = window.localStorage.getItem('value');
        return savedValue ? JSON.parse(savedValue) : { good: 0, neutral: 0, bad: 0 };
        });

    const updateFeedback = feedbackType => {
        setValue({...value, [feedbackType]: value[feedbackType] + 1})
    }

    const totalFeedback = value.good + value.neutral + value.bad;

    const positiveFeedback = totalFeedback
    ? Math.round((value.good / totalFeedback) * 100)
    : 0;

    const resetFeedback = () => {
        setValue({good: 0, neutral: 0, bad: 0})
    }

    useEffect(() => {
        localStorage.setItem('value', JSON.stringify(value));
        }, [value]);

    return (
        <>
            <Description />

            <Options 
                updateFeedback={updateFeedback}
                totalFeedback={totalFeedback}
                resetFeedback={resetFeedback}
                />

            {totalFeedback === 0 ? (
                <Notification />
            ) : (
                <Feedback 
                good={value.good}
                neatral={value.neutral}
                bad={value.bad}
                total={totalFeedback}
                positive={positiveFeedback}
            />
            )}
        </>
    )
};