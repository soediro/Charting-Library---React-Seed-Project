const FontStyle = (props) => {
    if(!props.fontOptions) return (<span></span>)
    return (
        <span>
            <div className="boldBtn" onClick={props.onClick.bind(this, 'bold')}>B</div>
            <div className="italicBtn" onClick={props.onClick.bind(this, 'italic')}>I</div>
        </span>
    )
}

export default FontStyle