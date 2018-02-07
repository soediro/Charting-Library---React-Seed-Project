class Undo extends React.Component {
	constructor(props){
		super(props);
		let drawings=props.ciq.drawingObjects.length
		this.state={
			activeDrawings:drawings
		}
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
		this.setState({
			activeDrawings:this.props.ciq.drawingObjects.length
		})
	}
	render(){
		return(
			<button className={"ciq-btn " + (this.state.activeDrawings?'active':'')} onClick={this.undoDrawing}>Undo</button>
		)
	}
}
export default Undo
