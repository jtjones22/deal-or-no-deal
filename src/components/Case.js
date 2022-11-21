export default function Case(props) {
    return(
    <div onClick={props.onOpen} className={`case--${props.isOpen ? 'opened' : 'closed'}`}>
        <h4>
            {props.isOpen ? `$${props.caseValue}` : props.caseNumber}
        </h4>

    </div>
    )
}