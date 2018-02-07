class Redo extends React.Component {
	constructor(props){
		super(props);
		this.state={
			active:false
		}
		this.bindCorrectContext()
	}
	bindCorrectContext(){
		this.redoDrawing = this.redoDrawing.bind(this)
	}
	redoDrawing(){
		let before=this.props.ciq.drawingObjects
		this.props.ciq.drawingObjects=this.props.ciq.undoStamps.pop()
		let after=this.props.ciq.drawingObjects
		this.props.ciq.undoStamp(before,after);
	}
	render(){
		return(
			<button className="ciq-btn" onClick={this.redoDrawing}>Redo</button>
		)
	}
}
export default Redo
