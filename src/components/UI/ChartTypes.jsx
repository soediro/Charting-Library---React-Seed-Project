import configs from "../../../configs/ui.js"

const ChartTypes = (props) => {
	let options = configs.chartTypes.types.map((item, i) => {
		return (
			<menu-option key={"type" + i} className="option" onClick={props.setChartType.bind(this, item)}>{item.label}</menu-option>
		)
	})

	let label = getOptionLabel(props.ciq.layout);

	return (
		<menu-select id="chartTypeSelect">
			<span className="title">{label ? label : null}</span>
			<menu-select-options className="menu-hover">
				{options}
			</menu-select-options>
		</menu-select>
	)
}

//private
function getOptionLabel(layout){
	for (var i = 0; i < configs.chartTypes.types.length; i++){
		let option = configs.chartTypes.types[i];
		if(layout.chartType === option.type){
			return option.label
		}
	}
	return configs.chartTypes.types[0].label
}

export default ChartTypes