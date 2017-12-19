const OverlayMenu = (props) => {
    if (props.open){
        return (
            <span className="overlayMenu" style={{ top:props.top, left:props.left }}>
                <div className="edit" onClick={props.edit}>
                    Edit settings...
                </div>
                <div className="delete" onClick={props.delete}>
                    Delete study
                </div>
            </span>
        )
    } else {
        return (<span></span>)
    }
}

export default OverlayMenu

