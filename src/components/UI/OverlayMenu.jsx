import React from 'react'

const OverlayMenu = (props) => {
    if (props.studyOverlay.show){
        return (
            <span className="overlayMenu" style={{ top: props.studyOverlay.top, left: props.studyOverlay.left }}>
                <div className="edit" onClick={props.openStudyModal}>
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

