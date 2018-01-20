import configs from "../../../configs/ui.js"

const Periodicity = (props) => {
	let options = configs.periodicity.options.map((item, i) => {
		let periodicity={period: item.period, interval: item.interval, timeUnit: item.timeUnit}
		return <menu-option key={"period" + i} className="option" onClick={props.setPeriodicityWithLoader.bind(this, periodicity)}>{item.label}</menu-option>
	})

  let label = getOptionLabel(props.periodicity)

	return (
		<span>
			<menu-select id="periodicitySelect">
				<span className="title">{label ? label : null}</span>
				<menu-select-options className="menu-hover">
					{options}
				</menu-select-options>
			</menu-select>
		</span>
	)
}

//private
function getOptionLabel(layout){
	for (var i = 0; i < configs.periodicity.options.length; i++){
    let option = configs.periodicity.options[i];
		if(layout.interval === option.interval && layout.period === option.period && layout.timeUnit === option.timeUnit){
			return option.label
		}
	}
}

export default Periodicity
