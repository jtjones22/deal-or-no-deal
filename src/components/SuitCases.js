import { useEffect, useState } from "react"
import prices from "../prices"

export default function SuitCases(props) {
    const [suitCases, setSuitCases] = useState([])
    useEffect(() => {
        let values = prices
        for (let i = 26;i != 0; i--) {
            setSuitCases(prevState => [...prevState, 
                {
                    caseNumber: i,
                    value: values.splice(Math.floor(Math.random() * i), 1).toString(),
                }])
        }
    }, [])

    const suitCaseElements = suitCases.map(suitCase => {
        return (
            <div key={suitCase.caseNumber}>
                <h4>{suitCase.caseNumber} - ${suitCase.value}</h4>
            </div>
            )})
    

    console.log(suitCases)
    return (
        <div className="suitcases--container">
                {suitCaseElements}
        </div>
    )
}