const DrawingToolbarButton = (props) => {
	return (
		<span><button className='drawing-toolbar-btn' onClick={props.toggleDrawingToolbar} /></span>
	)
}

export default DrawingToolbarButton