import { useEffect, useState } from "react"
import Case from './Case'
import Dealer from "./Dealer"
import prices from "../prices"
import rounds_ from '../rounds'

export default function Game() {
    const [cases, setCases] = useState([])
    const [rounds, setRounds] = useState(rounds_)
    const [openedCases, setOpenedCases] = useState(0)
    const [playerCase, setPlayerCase] = useState()
    const [values, setValues] = useState([])
    const [isOnCall, setIsOnCall] = useState(false)
    const [deal, setDeal] = useState(false)
    const [dealerPrice, setDealerPrice] = useState()

    useEffect(() => {
        let amount = [...prices]
        for (let i = 1;i !== 27; i++) {
            setCases(prevState => [...prevState, 
                {
                    caseNumber: i,
                    value: amount.splice(Math.floor(Math.random() * 26 - i), 1)[0],
                    isOpen: false,
                }])
            setValues(prevState=> [...prevState, {
                value: prices[i-1].toLocaleString(),
                isChosen: false
            }])
        }
    }, [])

    function turnOffValue(briefCase) {
        setValues(prevState => {
            return prevState.map(price => {
                if(price.value.toLocaleString() === briefCase.value.toLocaleString()) {
                    return {...price, isChosen: true}
                } else {
                    return price
                }
            })
        })
    }

    function selectedCase(id) {
        if(rounds[0] !== openedCases && !deal) {
            setCases(prevState=> {
                return prevState.map(briefCase => {
                    if (id === briefCase.caseNumber) {
                        if(!playerCase) {
                            setPlayerCase({...briefCase, isPlayers: true})
                            return {...briefCase, isPlayers: true}
                        }
                        turnOffValue(briefCase)
                        setOpenedCases(openedCases + 1)
                        return {...briefCase, isOpen: true}
                    } else {
                        return briefCase
                    }
                })
            })
        }
    }

    const columnOneElements = values.slice(0,13).map((price, i) => {
        let valueStatus = price.isChosen ? 'value--container chosen' : 'value--container'
        return(
            <div key={i} className={valueStatus}>
                <h3 className='value'>$ {price.value.toLocaleString()}</h3>
            </div>
        )
    })

    const columnTwoElements = values.slice(13,26).map((price, i) => {
        let valueStatus = price.isChosen ? 'value--container chosen' : 'value--container'
        return(
            <div key={i} className={valueStatus}>
                <h3 className='value'>$ {price.value.toLocaleString()}</h3>
            </div>
        )
    })
    
    function dealOrNoDeal(event){
        if (event.target.name === 'no deal') {
            setRounds(rounds.slice(1))
        } else if (event.target.name === 'deal') {
            setDealerPrice(event.target.value)
            setDeal(true)
        }
    }
    
    function displayOutput() {
        let remainingCases = rounds[0] - openedCases
        console.log(openedCases)
        if(deal) {
            return (
            <h1>
                The Dealer offered you ${dealerPrice} and 
                your brief case contained ${playerCase.value.toLocaleString()}
            </h1>
            )
        } else {
            if (!playerCase){
                return <h1>Please Select Your Case</h1>
            }
            if (rounds[0] !== openedCases){
                if (openedCases === 24) {
                    console('One case to open')
                }
                return <h1>Select {remainingCases} more {remainingCases > 1 ? 'cases' : 'case'}</h1>
            }
            if (rounds[0] === openedCases){
                return <Dealer
                onQuestion={dealOrNoDeal}
                cases={cases} />
            }
        }
    }

    
    return (
        <div className="game--container">
            <div className="playercase--container">
                <h3 className="playercase">
                    {playerCase ? `Your Case is ${playerCase.caseNumber}` : `Your Case is ....`}
                </h3>
            </div>
            <div className="values--container left">
                {columnOneElements}
            </div>
            <div className="values--container right">
                {columnTwoElements}
            </div>
            <div className="display--container">
                {displayOutput()}       
            </div>
            <div className="cases--container">
                {cases.map((briefCase, i) => {
                    return <Case
                    key={i}
                    caseNumber={briefCase.caseNumber}
                    caseValue={briefCase.value}
                    isOpen={briefCase.isOpen}
                    isPlayers={briefCase.isPlayers}
                    onSelect={() => selectedCase(briefCase.caseNumber)}
                    isOnCall = {isOnCall}
                    />
                })}
            </div>
        </div>
    )
}