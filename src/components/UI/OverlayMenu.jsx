const OverlayMenu = (props) => {
    if (props.showStudyOverlay){
        return (
            <span className="overlayMenu" style={{ top: props.overlayTop, left: props.overlayLeft }}>
                <div className="edit" onClick={props.toggleStudyModal}>
                    Edit settings...
                </div>
                <div className="delete" onClick={props.removeStudy}>
                    Delete study
                </div>
            </span>
        )
    } else {
        return (<span></span>)
    }
}

export default OverlayMenu

