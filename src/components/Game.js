import { useEffect, useState } from "react"
import Case from './Case'
import prices from "../prices"

export default function Game() {
    const [cases, setCases] = useState([])
    const [openedCases, setOpenedCases] = useState([])
    const [playerCase, setPlayerCase] = useState()

    useEffect(() => {
        for (let i = 1;i != 27; i++) {
            setCases(prevState => [...prevState, 
                {
                    caseNumber: i,
                    value: prices.splice(Math.floor(Math.random() * 26 - i), 1).toLocaleString(),
                    isOpen: false,
                }])
        }
    }, [])

    function openCase(id) {
        if(playerCase){
            setCases(prevState=> {
                return prevState.map(suitCase => {
                    if (id === suitCase.caseNumber) {
                        return {...suitCase, isOpen: true}
                    } else {
                        return suitCase
                    }
                })
            })
        } else {
            setPlayerCase(cases.splice(id-1, 1))
        }
    }
    
    return (
        <div className="game--container">
            <div className="playercase--container">
                <h3>
                    {playerCase ? `Your Case is ${playerCase[0].caseNumber}` : 'Please Select Your Case' }
                </h3>
            </div>
            <div className="cases--container">
                {cases.map(suitCase => {
                    return <Case
                    key={suitCase.caseNumber}
                    caseNumber={suitCase.caseNumber}
                    caseValue={suitCase.value}
                    isOpen={suitCase.isOpen}
                    onOpen={() => openCase(suitCase.caseNumber)}
                    />
                })}
            </div>
        </div>
    )
}