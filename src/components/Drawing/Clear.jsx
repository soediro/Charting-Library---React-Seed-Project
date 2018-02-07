class Clear extends React.Component {
	constructor(props){
		super(props)
		let drawings=props.ciq.drawingObjects.length
		this.state={
			activeDrawings:drawings
		}
		this.bindCorrectContext()
	}
	bindCorrectContext(){
		this.clearDrawings = this.clearDrawings.bind(this)
	}
	clearDrawings(){
		this.props.ciq.clearDrawings()
		this.setState({
			activeDrawings:this.props.ciq.drawingObjects.length
		})
	}
	render(){
			return(
				<button className={"ciq-btn " + (this.state.activeDrawings?'active':'')} onClick={this.clearDrawings}>Clear</button>
			)
	}
}
export default Clear
