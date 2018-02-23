import React from 'react'
import configs from "../../../configs/ui.js";
import MenuSelect from '../shared/MenuSelect'

const ChartTypes = (props) => {
	return (
		<MenuSelect options={configs.chartTypes.types} keyName='type' name='label' handleOptionSelect={props.setChartType} menuId='chartTypeSelect' title='Chart Type' hasCheckboxes={true} chartType={props.chartType} />
	);
}

//private
// function getOptionLabel(layout){
// 	console.log('layout: ', layout)
// 	for (var i = 0; i < configs.chartTypes.types.length; i++){
// 		let option = configs.chartTypes.types[i];
// 		if(layout.chartType === option.type){
// 			return option.label
// 		}
// 	}
// 	return configs.chartTypes.types[0].label
// }

export default ChartTypes
