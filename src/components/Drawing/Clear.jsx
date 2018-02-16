const Clear = (props) => {
	let cName = props.canClear ? 'ciq-btn active' : 'ciq-btn';

	return (
		<button className={cName} onClick={props.clear}>Clear</button>
	);
};

export default Clear;