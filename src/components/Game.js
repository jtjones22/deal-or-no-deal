import { useEffect, useState } from "react"
import Case from './Case'
import prices from "../prices"

export default function Game() {
    const [cases, setCases] = useState([])
    // const [openedCases, setOpenedCases] = useState([])
    const [playerCase, setPlayerCase] = useState()

    useEffect(() => {
        for (let i = 1;i != 27; i++) {
            let values = [...prices]
            setCases(prevState => [...prevState, 
                {
                    caseNumber: i,
                    value: values.splice(Math.floor(Math.random() * 26 - i), 1).toLocaleString(),
                    isOpen: false,
                }])
        }
    }, [])

    function selectedCase(id) {
        setCases(prevState=> {
            return prevState.map(suitCase => {
                if (id === suitCase.caseNumber) {
                    if(!playerCase) {
                        setPlayerCase({...suitCase, isPlayers: true})
                        return {...suitCase, isPlayers: true}
                    }
                    return {...suitCase, isOpen: true}
                } else {
                    return suitCase
                }
            })
        })
    }

    const columnOneElements = prices.slice(0,13).map((price, i) => {
        return(
            <div key={i} className="value--container">
                <h3 className="value" >$ {price.toLocaleString()}</h3>
            </div>
        )
    })


    const columnTwoElements = prices.slice(13,26).map((price, i) => {
        return(
            <div key={i} className="value--container">
                <h3 className="value" >$ {price.toLocaleString()}</h3>
            </div>
        )
    })


    return (
        <div className="game--container">
            <div className="playercase--container">
                <h3 className="playercase">
                    {playerCase ? `Your Case is ${playerCase.caseNumber}` : 'Please Select Your Case' }
                </h3>
            </div>
            <div className="values--container left">
                {columnOneElements}
            </div>
            <div className="values--container right">
                {columnTwoElements}
            </div>
            <div className="cases--container">
                {cases.map((suitCase, i) => {
                    return <Case
                    key={i}
                    caseNumber={suitCase.caseNumber}
                    caseValue={suitCase.value}
                    isOpen={suitCase.isOpen}
                    isPlayers={suitCase.isPlayers}
                    onSelect={() => selectedCase(suitCase.caseNumber)}
                    />
                })}
            </div>
        </div>
    )
}