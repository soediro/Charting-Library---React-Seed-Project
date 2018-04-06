import React from 'react'

const Redo = (props) => {
	let cName = props.canRedo ? 'ciq-btn active' : 'ciq-btn';

	return (
		<button disabled={!props.canRedo} className={cName} onClick={props.redo}>Redo</button>
	);
};

export default Redo;
