export default function Dealer(props) {
    let numberOfCases = 0
    let total = 0
    let maxValue = 0
    let RMS = props.cases.map(briefCase => {
        if(!briefCase.isOpen) {
            maxValue = briefCase.value > maxValue ? briefCase.value : maxValue
            // console.log(briefCase.caseNumber)
            // console.log(briefCase.value)
            numberOfCases = numberOfCases + 1
            total = total + parseInt(briefCase.value)
        } 
    })
    return (
        <div>
            <div>
                <h1 className="dealer--price">
                    The Dealer offers you 
                    ${parseInt((total/numberOfCases))}
                    </h1>
            </div>
            <div className="deal-button--container">
                <button value={((total/numberOfCases)).toLocaleString()} 
                className='deal--button deal' name='deal' onClick={props.onQuestion}>Deal</button> 
                <h3>OR</h3> 
                <button name='no deal' className="deal--button nodeal" onClick={props.onQuestion}>No Deal</button>
            </div>
        </div>
    )
}