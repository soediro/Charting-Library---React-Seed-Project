import React from 'react'

const AxisLabel  = (props) => {
    let cName = props.showAxisLabels  ? 'ciq-checkbox ciq-active' : 'ciq-checkbox';

    if (!props.hasLabels) return (<span></span>);

    return (
        <div>
            <div className="ciq-heading">Axis Label:</div>
            <span onClick={props.toggleAxisLabels} className={cName}><span></span></span>
        </div>
    );
}

export default AxisLabel
