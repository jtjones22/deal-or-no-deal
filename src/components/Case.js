export default function Case(props) {
    let caseStatus = ''
    if (props.isPlayers) {
        caseStatus = 'case players'
    } else if (props.isOpen) {
        caseStatus = 'case open'
    }
    return(
    <div onClick={props.isOpen || props.isPlayers || props.isOnCall ? null : props.onSelect}
    className='case--container'>
        <h4 className={caseStatus}>
            {props.caseNumber}
        </h4>
    </div>
    )
}