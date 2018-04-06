import React from 'react'

const DrawingToolbarButton = (props) => {

	function toggleDrawingToolbar() {

		props.toggleDrawingToolbar()

	}

	return (
		<span><button className='drawing-toolbar-btn' onClick={()=>toggleDrawingToolbar()} /></span>
	)
}

export default DrawingToolbarButton
