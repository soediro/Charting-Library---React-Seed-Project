import React from 'react'

const Measure = (props) => {
	let selectedTool=props.selectedTool;
	let rejectList=['Callout','Annotation','Arrow','Average','Check','Crossline',
	'Focusarrow','Freeform','Heart','Horizontal','Rectangle','Star','Vertical','Xcross'];
	if(rejectList.indexOf(selectedTool)>-1){
		return <span></span>
	} else {
		return (
			<div>
				<span className="measureUnlit" id="mMeasure"></span>
			</div>
		)
	}
}
export default Measure
