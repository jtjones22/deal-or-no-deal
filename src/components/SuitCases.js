// import { useEffect, useState } from "react"
// import prices from "../prices"
// import SuitCase from './SuitCase'

// export default function SuitCases(props) {
    // const [cases, setCases] = useState([])
    // const [playerCase, setPlayerCase] = useState()
    // const [openedCases, setOpenedCases] = useState(0)

    // useEffect(() => {
    //     for (let i = 1;i != 27; i++) {
    //         setCases(prevState => [...prevState, 
    //             {
    //                 caseNumber: i,
    //                 value: prices.splice(Math.floor(Math.random() * 26 - i), 1).toLocaleString(),
    //                 isOpen: false,
    //             }])
    //     }
    // }, [])

    // function openCase(id) {
    //     if(playerCase){
    //         setOpenedCases(openedCases+1)
    //         setCases(prevState=> {
    //             return prevState.map(suitCase => {
    //                 if (id === suitCase.caseNumber) {
    //                     return {...suitCase, isOpen: true}
    //                 } else {
    //                     return suitCase
    //                 }
    //             })
    //         })
    //     } else {
    //         setPlayerCase(cases.splice(id-1, 1))
    //     }
    // }
    
    // const suitCaseElements = props.cases.map(suitCase => {
    //     return (
    //         <SuitCase 
    //         key={suitCase.caseNumber}
    //         caseNumber={suitCase.caseNumber}
    //         caseValue={suitCase.value}
    //         isOpen={suitCase.isOpen}
    //         onOpen={() => openCase(suitCase.caseNumber)}
    //         />
    //     )})
// }