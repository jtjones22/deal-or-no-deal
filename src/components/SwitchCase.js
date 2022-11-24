export default function SwitchCase(props) {
    return (
        <div className="decision--container">
            <h1>
                Do you wish to switch your case #{props.playerCase.caseNumber} with the final case #{props.finalCase.caseNumber}?
            </h1>
            <h1 className="button deal" onClick={()=>props.handleSwitch(true, (props.finalCase))}>
                Yes
            </h1>
            <h3>OR</h3>
            <h1 className="button nodeal" onClick={()=>props.handleSwitch(false)}>
                No
            </h1>
        </div>
    )
}