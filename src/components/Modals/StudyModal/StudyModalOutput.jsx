import ColorSwatch from '../../Drawing/ColorSwatch'

const StudyModalOutput = (props) => {
    if (!props.output) return (<div></div>)
    return (
        <div className='outputs dialog-item'>
            {props.output.color ? <ColorSwatch isModal={true} name={props.output.heading} type={'output'} setColor={props.setColor} color={props.output.color} /> : <div></div>}
            <div>
                {props.output.heading}
            </div>
        </div>
    )
}

export default StudyModalOutput