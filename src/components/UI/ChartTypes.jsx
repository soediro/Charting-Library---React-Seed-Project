import configs from "../../../configs/ui.js";

import MenuSelect from '../shared/MenuSelect'

const ChartTypes = (props) => {
	return (
		<MenuSelect options={configs.chartTypes.types} keyName='type' name='label' handleOptionSelect={props.setChartType} menuId='chartTypeSelect' title='Chart Type' hasCheckboxes={true} chartType={props.chartType} />
	);
}

export default ChartTypes