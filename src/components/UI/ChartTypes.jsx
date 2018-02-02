import configs from "../../../configs/ui.js";

import MenuSelect from '../Menus/MenuSelect'

const ChartTypes = (props) => {
	let label = getOptionLabel(props.ciq.layout);
	return (
		<MenuSelect options={configs.chartTypes.types} keyName='type' name='label' handleOptionSelect={props.setChartType} menuId='chartTypeSelect' title={label} />
	);
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