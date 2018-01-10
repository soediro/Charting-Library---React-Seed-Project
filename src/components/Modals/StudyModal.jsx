import ColorPicker from "../Drawing/ColorPicker"
import ColorSwatch from '../Drawing/ColorSwatch'

class StudyModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studyHelper: {},
			outputs: {},
			inputs: {},
			parameters: {}
		};
		this.bindCorrectContext()
	}
	bindCorrectContext(){
		this.updateStudy = this.updateStudy.bind(this)
		this.updateInputs = this.updateInputs.bind(this)
		this.setColor = this.setColor.bind(this)
	}
	componentWillReceiveProps(nextProps){
		if(this.props.params !== nextProps.params && nextProps.params){
			let studyHelper = new CIQ.Studies.DialogHelper(nextProps.params)
			this.setState({
				studyHelper: studyHelper,
				outputs: studyHelper.outputs,
				inputs: studyHelper.inputs,
				parameters: studyHelper.parameters
			})
		}
	}
	setColor(color, type, name) {
		let newOutputs = this.state.outputs,
		newInputs = this.state.inputs

		if (type==="output"){
			newOutputs = this.state.outputs.map((output, i) => {
				if(name===output.heading){
					output.color = CIQ.hexToRgba('#'+color)
				}
				return output
			})
		}else if (type==="input"){
			newInputs = this.state.inputs.map((input, i) => {
				if(name===input.heading){
					input.color = CIQ.hexToRgba('#'+color)
				}
				return input
			})
		}else return

		this.setState({
			inputs: newInputs,
			outputs: newOutputs
		})
	}
	updateStudy() {
		var currentInputs = {};
		var currentOutputs = {};
		var currentParams = {};
		for (var i = 0; i < this.state.inputs.length; i++) {
        currentInputs[this.state.inputs[i].name]=this.state.inputs[i].value;
		}
		for (var x = 0; x < this.state.outputs.length; x++) {
			currentOutputs[this.state.outputs[x].name] = this.state.outputs[x].color;
		}
		for (var y = 0; y < this.state.parameters.length; y++) {
			currentParams[this.state.parameters[y].name + 'Value'] = this.state.params[y].value;
			currentParams[this.state.parameters[y].name + 'Color'] = this.state.params[y].color;
		}

		this.state.studyHelper.updateStudy({ inputs: currentInputs, outputs: currentOutputs, parameters: currentParams });
		this.props.closeModal()
	}
	updateInputs = (name, target) => {
		for (let input of this.state.inputs) {
			if (input.type === "checkbox") {
				input.value = target.checked;
				break;
			}
			if (input.name === name) {
				input.value = target.value;
				break;
			}
		}
		this.forceUpdate();
	};
	createSelectInput(input) {
		var inputOptions = [];
		for (var option in input.options) {
			inputOptions.push(<option key={"option" + option}>
				{option}
			</option>)
		}
		return <div key={"select" + input.heading} className="inputs dialog-item">
			<select defaultValue={input.value} onChange={event => {
				this.updateInputs(input.name, event.target);
			}}>
				{inputOptions}
			</select>
			<div>
				{input.heading}
			</div>
		</div>

	}
	createCheckboxInput(input) {
		return <div key={"checkbox" + input.name} className="inputs dialog-item">
			<input type="checkbox" checked={input.value}
				onChange={event => {
					this.updateInputs(input.name, event.target);
				}}></input>
			<div>
				{input.heading}
			</div>
		</div>
	}
	createOtherInput(input, type) {
		return <div key={type + input.name} className="inputs dialog-item">
			<input type={type} defaultValue={input.value}
				onChange={event => {
					this.updateInputs(input.name, event.target);
				}}></input>
			<div>
				{input.heading}
			</div>
		</div>
	}
	render() {

		if (!this.props.open || !this.state.studyHelper) return <span></span>

		let inputs = this.state.inputs.map((input, i) => {
			if (input.type === 'select') return this.createSelectInput(input)
			else if (input.type === 'checkbox') return this.createCheckboxInput(input)
			else return this.createOtherInput(input, input.type)
		})

		let outputs = this.state.outputs.map((output, i) => {
			return (
				<div key={"output"+i} className="outputs dialog-item">
					{output && output.color ? <ColorSwatch isModal={true} name={output.heading} type="output" setColor={this.setColor} color={output.color} /> : <div></div> }
					<div>
						{output.heading}
					</div>
				</div>
			)
		})

		let params = this.state.parameters.map((param, i) => {
			return (
				<div>
					{param.color ? <ColorSwatch isModal={true} name={param.heading} type='param' setColor={this.setColor} color={param.color} /> : <div></div>}
					<input type={param.name === 'studyOverZones' ? 'checkbox' : 'number'} />
					<div>{param.heading}</div>
				</div>
			)
		})

		return (
			<div className="dialog-overlay" id="studyDialog">
				<div className="dialog">
					<div className="cq-close" onClick={this.close}></div>
					<h3>
						{this.state.studyHelper ? this.state.studyHelper.title : ""}
					</h3>
					<div id="inputs">
						{inputs}
					</div>
					<div id="outputs">
						{outputs}
					</div>
					<div id="parameters">
						<div className="parameters dialog-item">
							{params}
						</div>
					</div>
					<button className="pull-right" onClick={this.updateStudy}>Save</button>
				</div>
			</div>
		)
	}
}

module.exports = StudyModal;
