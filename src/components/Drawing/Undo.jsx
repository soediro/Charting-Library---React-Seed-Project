import React from 'react'

const Undo = (props) => {
	let cName = props.canUndo ? 'ciq-btn active' : 'ciq-btn';
	return (
		<button disabled={!props.canUndo} className={cName} onClick={props.undo}>Undo</button>
	);
};

export default Undo;
