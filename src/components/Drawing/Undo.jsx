class Undo extends React.Component {
	constructor(props){
		super(props);
		this.bindCorrectContext()
	}
	bindCorrectContext(){
		this.undoDrawing = this.undoDrawing.bind(this)
	}
	undoDrawing(){
		let before=this.props.ciq.drawingObjects
		this.props.ciq.undoLast()
		let after=this.props.ciq.drawingObjects
		this.props.ciq.undoStamp(before,after);
	}
	render(){
		return(
			<button className={"ciq-btn " + (this.props.ciq.drawingObjects.length?'active':'')} onClick={this.undoDrawing}>Undo</button>
		)
	}
}
export default Undo
