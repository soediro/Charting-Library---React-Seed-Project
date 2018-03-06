import configs from "../../../configs/ui.js";

import MenuSelect from '../shared/MenuSelect'

const ChartTypes = (props) => {
	let selected = configs.chartTypes.types.find((ct)=> ct.type==props.chartType)
	return (
		<MenuSelect
			options={configs.chartTypes.types}
			keyName='type'
			name='label'
			handleOptionSelect={props.setChartType}
			menuId='chartTypeSelect'
			title='Chart Type'
			hasCheckboxes={true}
			selected={selected} />
	);
}

export default ChartTypes
