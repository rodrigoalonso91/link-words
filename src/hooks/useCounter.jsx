import { useState } from "react"

export default function useCounter({initialValue = 0}) {

    const [counter, setCounter] = useState(initialValue)
    const [totalCounter, setTotalCounter] = useState(null)

    const resetCounter = () => {
        setCounter(initialValue)
    }

    const incrementCounter = (amount = 1) => {
        setTotalCounter(totalCounter + amount)
        setCounter(counter + amount)
    }

    return {
        counter,
        totalCounter,
        resetCounter,
        incrementCounter
    }
}
