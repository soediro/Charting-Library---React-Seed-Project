const Undo = (props) => {
	let cName = props.canUndo ? 'ciq-btn active' : 'ciq-btn';

	return (
		<button className={cName} onClick={props.undo}>Undo</button>
	);
};

export default Undo;
