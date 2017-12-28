const LineStyle = (props) => {
	let cName = props.linePattern && props.lineWidth ? 'ciq-' + props.linePattern + '-' + props.lineWidth : null;

	if(cName){
		return (
			<span>
				<menu-select id='lineSelect'>
				<span className={'title ' + cName}></span>
					<menu-select-options className="menu-hover">
						<menu-option class="option" onClick={props.onClick.bind(this, 1, 'solid')}><span className="ciq-line-style-option ciq-solid-1"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 3, 'solid')}><span className="ciq-line-style-option ciq-solid-3"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 5, 'solid')}><span className="ciq-line-style-option ciq-solid-5"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 1, 'dotted')}><span className="ciq-line-style-option ciq-dotted-1"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 3, 'dotted')}><span className="ciq-line-style-option ciq-dotted-3"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 5, 'dotted')}><span className="ciq-line-style-option ciq-dotted-5"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 1, 'dashed')}><span className="ciq-line-style-option ciq-dashed-1"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 3, 'dashed')}><span className="ciq-line-style-option ciq-dashed-3"></span></menu-option>
						<menu-option class="option" onClick={props.onClick.bind(this, 5, 'dashed')}><span className="ciq-line-style-option ciq-dashed-5"></span></menu-option>
					</menu-select-options>
				</menu-select>
			</span>
		)
	} else {
		return (<span></span>)
	}
}

export default LineStyle