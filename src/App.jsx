import { useEffect, useState } from "react";
import useCounter from "./hooks/useCounter";

const counterLimit = 14

export default function App() {

    const [allWords, setAllWords] = useState([]);
    const [previousWord, setPreviousWord] = useState('');
    const [currentWord, setCurrentWord] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [firstTime, setFirstTime] = useState(true);

    const {counter, incrementCounter, resetCounter, totalCounter} = useCounter({initialValue: 0});

    useEffect(() => {
        if (counter <= counterLimit) return

        setAllWords([previousWord])
        resetCounter()
    }, [counter, previousWord])

    const handleInputChange = (event) => {
        setCurrentWord(event.target.value.trim());
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (firstTime) {
            setAllWords([...allWords, currentWord])
            setPreviousWord(currentWord)
            setFirstTime(false)
            setCurrentWord('')
            incrementCounter()
            return
        }

        const currentWordFirstChar = currentWord.charAt(0).toLowerCase();
        const previousWordLastChar = previousWord.charAt(previousWord.length - 1).toLowerCase()
        const previousWordSecondLastChar = previousWord.charAt(previousWord.length - 2).toLowerCase()
        const previousWordThirdLastChar = previousWord.charAt(previousWord.length - 3).toLowerCase()

        if (currentWordFirstChar === previousWordLastChar || 
            currentWordFirstChar === previousWordSecondLastChar ||
            currentWordFirstChar === previousWordThirdLastChar) {
            setAllWords([...allWords, currentWord])
            setPreviousWord(currentWord)
            setCurrentWord('')
            setShowMessage(false)
            incrementCounter()
        }
        else {
            setShowMessage(true)
        }
    }

    return (
        <div className="container">
            <h1 className="title">Link-Words</h1>
            <p style={{ opacity: `${showMessage ? 1 : 0}` }}>¡Inténtalo de nuevo!</p>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" value={currentWord} onChange={handleInputChange} />
                <button type="submit">Link 🔗</button>
            </form>
            {
                allWords.length > 0 && (
                    <section className="counter">
                        <span>Total: </span>{totalCounter}
                    </section>
                )
            }
            <p className="words">{allWords.join(' - ')}</p>
        </div>
    )
}
