import { useEffect, useState } from "react"
import Case from './Case'
import Dealer from "./Dealer"
import SwitchCase from "./SwitchCase"
import prices from "../prices"
import rounds_ from '../rounds'

export default function Game() {
    const [cases, setCases] = useState([])
    const [rounds, setRounds] = useState(rounds_)
    const [openedCases, setOpenedCases] = useState(0)
    const [playerCase, setPlayerCase] = useState()
    const [values, setValues] = useState([])
    const [lastSelectedCase, setLastSelectedCase] = useState()
    const [deal, setDeal] = useState(false)
    const [dealerPrice, setDealerPrice] = useState()
    const [finalCase, setFinalCase] = useState()

    useEffect(() => {
        if(cases.length === 0) {
            let amount = [...prices]
            for (let i = 1;i !== 27; i++) {
                setCases(prevState => [...prevState, 
                    {
                        caseNumber: i,
                        value: amount.splice(Math.floor(Math.random() * 26 - i), 1)[0],
                        isOpen: false,
                    }])
                console.log('About to run values')
                setValues(prevState=> [...prevState, {
                    value: prices[i-1].toLocaleString(),
                    isChosen: false
                }])
            }
        }
    }, [reset])

    function reset() {
        setCases([])
        setRounds(rounds_)
        setOpenedCases(0)
        setPlayerCase()
        setValues([])
        setLastSelectedCase()
        setDeal(false)
        setDealerPrice()
        setFinalCase()
    }
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
        if(rounds[0] !== openedCases && !deal && openedCases!==24) {
            setCases(prevState=> {
                return prevState.map(briefCase => {
                    if (id === briefCase.caseNumber) {
                        if(!playerCase) {
                            setPlayerCase({...briefCase, isPlayers: true})
                            return {...briefCase, isPlayers: true}
                        }
                        turnOffValue(briefCase)
                        setOpenedCases(openedCases + 1)
                        setLastSelectedCase({...briefCase, isOpen: true})
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
    
    function dealOrNoDeal(decision, dealerPrice){
        if (!decision) {
            setRounds(rounds.slice(1))
        } else if (decision) {
            setDealerPrice(dealerPrice.toLocaleString())
            setDeal(true)
        }
    }

    function handleCaseSwitch(decision, lastCase) {
        if (decision) {
            setFinalCase(playerCase)
            setPlayerCase(lastCase)
            setDeal(true)
        } else {
            setDeal(true)
        }
    }
    
    function displayOutput() {
        let remainingCases = rounds[0] - openedCases
        if(deal) {
            if (dealerPrice) {
                return (
                    <div>
                        <h1>
                            The Dealer offered you ${dealerPrice} and 
                            your brief case contained ${playerCase.value.toLocaleString()}
                        </h1>
                        <button onClick={reset}>Reset Game</button>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1>
                            Your case #{playerCase.caseNumber} contained ${playerCase.value.toLocaleString()} and the final case 
                            #{finalCase.caseNumber} contained ${finalCase.value.toLocaleString()}
                        </h1>
                        <button onClick={reset}>Reset Game</button>
                    </div>
                )
            }
        } else {
            if (!playerCase){
                return <h1>Please Select Your Case</h1>
            }
            if (rounds[0] !== openedCases){
                if (openedCases === 24) {
                    if(!finalCase) {
                        cases.map(briefCase=> {
                            if(!briefCase.isOpen && !briefCase.isPlayers) {
                                return setFinalCase(briefCase)
                            }
                        })
                    }
                    return (
                        <div>
                            <SwitchCase
                            playerCase={playerCase}
                            finalCase={finalCase}
                            handleSwitch={handleCaseSwitch}
                            />
                        </div>
                    )
                }
                return (
                <div className="display-info--container">
                    <h1>Select</h1>
                    <h1 className="remainingcases">{remainingCases}</h1>
                    <h1>more {remainingCases > 1 ? 'cases' : 'case'}</h1>
                    {lastSelectedCase && 
                    <>
                        <hr style={{borderColor:"gold"}}></hr>
                        <h1 style={{marginTop:20 +'px'}}>
                            Case {lastSelectedCase.caseNumber} contained ${lastSelectedCase.value.toLocaleString()}
                        </h1>
                    </>}
                </div>
                )
            }
            if (rounds[0] === openedCases){
                return <Dealer
                onQuestion={dealOrNoDeal}
                cases={cases} />
            }
        }
    }

    const caseElements = cases.map((briefCase, i) => {
        return <Case
        key={i}
        caseNumber={briefCase.caseNumber}
        caseValue={briefCase.value}
        isOpen={briefCase.isOpen}
        isPlayers={briefCase.isPlayers}
        onSelect={() => selectedCase(briefCase.caseNumber)}
        />
    })
    
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
                {caseElements}
            </div>
        </div>
    )
}