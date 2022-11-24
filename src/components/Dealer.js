export default function Dealer(props) {
    let numberOfCases = 0
    let total = 0
    props.cases.map(briefCase => {
        if(!briefCase.isOpen) {
            numberOfCases = numberOfCases + 1
            total = total + parseInt(briefCase.value)
        } 
    })
    let caseMean = parseInt(total/numberOfCases / 3).toLocaleString()

    return (
        <div className="dealer--container">
            <div>
                <h1 className="dealer price">
                    The Dealer offers you 
                    ${caseMean}
                    </h1>
            </div>
            <div className="decision--container">
                <h1 className="dealer button deal" onClick={()=>props.onQuestion(true, caseMean)}>
                    Deal
                </h1>
                <h3>OR</h3>
                <h1 className="deal button nodeal" onClick={()=>props.onQuestion(false)}>
                    No Deal
                </h1>
            </div>
        </div>
    )
}