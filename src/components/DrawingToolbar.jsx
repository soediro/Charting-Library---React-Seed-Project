//components
import ColorPicker from "./Drawing/ColorPicker"
import FillColor from "./Drawing/FillColor"
import LineColor from "./Drawing/LineColor"
// import Color from "./Drawing/Color"
import LineStyle from "./Drawing/LineStyle"
import FontSize from "./Text/FontSize"
import FontFamily from "./Text/FontFamily"
import FontStyle from "./Text/FontStyle"

//data sources
import { ChartStore, Actions } from '../stores/ChartStores'

class DrawingToolbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toolParams: null,
			isBold: false,
			showColorPicker: false,
			colorPickerLeft: 0,
			colorPickerTop: 0,
			colorPickerContext: ""
		};
	}
	componentDidMount(){
		this.bindCorrectContext();
	}
	bindCorrectContext(){
		this.changeFontStyle = this.changeFontStyle.bind(this);

		this.updateLineParams = this.updateLineParams.bind(this);
		this.updateFontFamily = this.updateFontFamily.bind(this);
		this.updateFontSize = this.updateFontSize.bind(this);
		this.toggleColorPicker = this.toggleColorPicker.bind(this);
		this.setColor = this.setColor.bind(this);
		this.updateLineParams = this.updateLineParams.bind(this);
		this.updateFontFamily = this.updateFontFamily.bind(this);
		this.updateFontSize = this.updateFontSize.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.showDrawingToolbar && !this.props.showDrawingToolbar) {
			this.props.draw()
		}
	}
	toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	setTool(tool){
		if (this.props.ciq === null) return
		else {
			let toolParams = CIQ.Drawing.getDrawingParameters(this.props.ciq, tool)
			this.props.changeVectorParams(tool)
			this.props.changeTool(tool, toolParams)
		}
	}
	changeFontStyle(type){
		this.props.setFontStyle(type)
		this.props.changeVectorStyle(type, { bold: this.props.fontStyle.bold, italic: this.props.fontStyle.italic })
	}
	changeFontFamily(family){
		this.props.setFontFamily(family)
		this.props.changeVectorStyle('family', { family: this.props.fontFamily })
	}
	toggleColorPicker(target){
		var colorPicker=this.state.showColorPicker,
		targetBounds = target.getBoundingClientRect(),
		context="";

		if(target.classList.contains('line')){
			context="line";
		}else if(target.classList.contains('fill')){
			context="fill";
		}

		this.setState({
			showColorPicker: !this.state.showColorPicker,
			colorPickerLeft: this.state.showColorPicker?targetBounds.left-120:0,
			colorPickerTop: 0,
			colorPickerContext: context
		});
	}
	setColor(colorEl){
		var color=colorEl.title,
		fill=this.props.fill, line=this.props.line;

		if(this.state.colorPickerContext==="line"){
			line=CIQ.hexToRgba('#'+color);
		}else if(this.state.colorPickerContext==="fill"){
			fill=CIQ.hexToRgba('#'+color);
		}

		this.setState({
			showColorPicker: false,
			color: color,
			line: line,
			fill: fill
		});
	}
	updateLineParams(weight, pattern){
		this.props.ciq.currentVectorParameters.lineWidth=weight
		this.props.ciq.currentVectorParameters.pattern=pattern
		this.props.setLineParams(weight, pattern)
	}
	updateFontFamily(newFamily){
		this.ciq.changeVectorParameter('fontFamily', newFamily);
		this.setState({
			fontFamily: newFamily
		});
	}
	updateFontSize(newSize){
		this.ciq.changeVectorParameter('fontSize', newSize+'px');
		this.setState({
			fontSize: newSize
		});
	}
	render() {
		let options = this.props.tools.map((tool, i) => {
			return (
				<menu-option key={"tool"+i} className="option" onClick={this.setTool.bind(this, tool)}>{this.toTitleCase(tool)}</menu-option>
			)
		})

		if(this.props.showDrawingToolbar){
			return (
				<div className="toolbar">
					<menu-select id="toolSelect">
						<span className="title">{this.props.selectedTool || "Select Tool"}</span>
						<menu-select-options className="menu-hover">
							{options}
						</menu-select-options>
					</menu-select>
					<span>
						<div className="drawingParameters">
							<ColorPicker open={this.state.showColorPicker} top={this.state.colorPickerTop} left={this.state.colorPickerLeft} onColorPick={this.setColor} />
							<FillColor color={this.props.fill} openColorPicker={this.toggleColorPicker} />
							<LineColor color={this.props.line} openColorPicker={this.toggleColorPicker} />
							<LineStyle {...this.props} onClick={this.updateLineParams} />
							<FontStyle {...this.props} onClick={this.changeFontStyle} />
							<FontSize fontOptions={this.props.fontOptions} size={this.props.fontSize} updateFontSize={this.updateFontSize} />
							<FontFamily fontOptions={this.props.fontOptions} family={this.props.fontFamily} updateFontFamily={this.updateFontFamily} />
						</div>
					</span>
				</div>
			)
		}else{
			return (
				<span></span>
			)
		}
	}
}

module.exports = DrawingToolbar;
