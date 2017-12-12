//components
import ColorPicker from "./Drawing/ColorPicker"
import FillColor from "./Drawing/FillColor"
import LineColor from "./Drawing/LineColor"
import LineStyle from "./Drawing/LineStyle"
import Bold from "./Text/Bold"
import Italic from "./Text/Italic"
import FontSize from "./Text/FontSize"
import FontFamily from "./Text/FontFamily"

//data sources
import { ChartStore, Actions } from '../stores/ChartStore'

class DrawingToolbar extends React.Component {
	constructor(props) {
		super(props);
		var tools = CIQ.Drawing.getDrawingToolList({});
		var toolsArray=Object.keys(tools).map(function (key) {
			return tools[key];
		});

		this.state = {
			active: false,
			launchToolbar: false,
			arrOfTools: toolsArray.sort(),
			toolParams: false,
			selectedTool: false,
			fill: null,
			line: "auto",
			lineWidth: null,
			parameters: null,
			fontOptions: null,
			fontFamily: null,
			fontSize: null,
			fontStyle: null,
			color: null,
			showColorPicker: false,
			colorPickerLeft: 0,
			colorPickerTop: 0,
			colorPickerContext: ""
		};
		this.ciq = props.ciq;
	}
	componentDidMount(){
		this.bindCorrectContext();
		ChartStore.addListener(['drawingToolbarChange'], this.onChartChange);
	}
	bindCorrectContext(){
		this.updateLineParams = this.updateLineParams.bind(this);
		this.updateFontFamily = this.updateFontFamily.bind(this);
		this.updateFontSize = this.updateFontSize.bind(this);
		this.toggleBold = this.toggleBold.bind(this);
		this.toggleItalic = this.toggleItalic.bind(this);
		this.toggleColorPicker = this.toggleColorPicker.bind(this);
		this.setColor = this.setColor.bind(this);
		this.updateLineParams = this.updateLineParams.bind(this);
		this.updateFontFamily = this.updateFontFamily.bind(this);
		this.updateFontSize = this.updateFontSize.bind(this);
		this.toggleBold = this.toggleBold.bind(this);
		this.toggleItalic = this.toggleItalic.bind(this);
		this.onChartChange = this.onChartChange.bind(this);
	}
	componentWillUnmount(){
		ChartStore.removeListener(['drawingToolbarChange'], this.onChartChange);
		this.ciq.destory();
	}
	onChartChange(){
		if (this.state.active !== ChartStore.getToolbarStatus()){
			var callback=function(){
				var elem = document.getElementById('chartContainer');
				if(this.state.active){
					elem.className += " toolbarOn";
				}else{
					elem.classList.remove('toolbarOn');
					this.ciq.changeVectorType('');
				}
				this.ciq.draw();
			}.bind(this);

			this.setState({
				active: !this.state.active
			}, callback);
		}
	}
	toTitleCase(str) {
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}
	setTool(tool){
		if(tool=='annotation' || tool=='callout'){ // no need to do this every time
			// Sync the defaults for font tool
			var style = this.props.ciq.canvasStyle("stx_annotation");

      this.props.ciq.currentVectorParameters.annotation.font.size=style.fontSize;
      this.props.ciq.currentVectorParameters.annotation.font.family=style.fontFamily;
      this.props.ciq.currentVectorParameters.annotation.font.style=style.fontStyle;
      this.props.ciq.currentVectorParameters.annotation.font.weight=style.fontWeight;
		}
		// Set all the info for the toolbar
		this.setState({
			selectedTool:this.toTitleCase(tool),
			toolParams:CIQ.Drawing.getDrawingParameters(this.props.ciq, tool)
		});
		// Activate the tool
		this.props.ciq.changeVectorType(tool);
	}
	toggleDrawingToolbar(){
		this.setState({
			active: !this.state.active
		});
	}
	toggleColorPicker(target){
		console.log("inside toggleColorPicker target is: ", target);
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
		fill=this.state.fill, line=this.state.line;

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
		this.ciq.currentVectorParameters.lineWidth=width;
		this.ciq.currentVectorParameters.pattern=pattern;
		this.setState({
			lineWidth: width,
			pattern: pattern
		});
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
	toggleBold(bold){
		var weightType=bold?"bold":"normal";
		this.ciq.changeVectorParameter('fontWeight', weightType);
		this.setState({
			fontStyle: weightType
		});
	}
	toggleItalic(italic){
		var italicType=italic?"italic":"normal";
		this.ciq.changeVectorParameter('fontStyle', italicType);
		this.setState({
			fontStyle: italicType
		});
	}
	render() {
		var self = this;
		var options = this.state.arrOfTools.map(function (item, index) {
			return <menu-option key={"tool" + index} className="option" onClick={function () {
				self.setTool(item);
			}}>{self.toTitleCase(item)}</menu-option>
		});

		if(this.state.active){
			return (
				<div className="toolbar">
					<menu-select id="toolSelect">
						<span className="title">{this.state.selectedTool || "Select Tool"}</span>
						<menu-select-options className="menu-hover">
							{options}
						</menu-select-options>
					</menu-select>
					<span>
						<div className="drawingParameters">
							<ColorPicker open={this.state.showColorPicker} top={this.state.colorPickerTop} left={this.state.colorPickerLeft} onColorPick={this.setColor} />
							<FillColor color={this.state.fill} openColorPicker={this.toggleColorPicker} />
							<LineColor color={this.state.line} openColorPicker={this.toggleColorPicker} />
							<LineStyle width={this.state.lineWidth} pattern={this.state.linePattern} updateLineParams={this.updateLineParams} />
							<Bold fontOptions={this.state.fontOptions} toggleBold={this.toggleBold} />
							<Italic fontOptions={this.state.fontOptions} toggleItalic={this.toggleItalic} />
							<FontSize fontOptions={this.state.fontOptions} size={this.state.fontSize} updateFontSize={this.updateFontSize} />
							<FontFamily fontOptions={this.state.fontOptions} family={this.state.fontFamily} updateFontFamily={this.updateFontFamily} />
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
