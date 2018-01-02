
const rangeConfig = [
	{
		"display": "All",
		"span": "all",
		"multiplier": 1
	},
	{
		"display": "5y",
		"span": "year",
		"multiplier": 5
	},
	{
		"display": "1y",
		"span": "year",
		"multiplier": 1
	},
	{
		"display": "YTD",
		"span": "YTD",
		"multiplier": 1
	},
	{
		"display": "3m",
		"span": "month",
		"multiplier": 3
	},
	{
		"display": "1m",
		"span": "month",
		"multiplier": 1
	},
	{
		"display": "5d",
		"span": "day",
		"multiplier": 5
	},
	{
		"display": "1d",
		"span": "day",
		"multiplier": 1
	}
];

const RangeSelector = (props) => {
	let ranges = rangeConfig.map((range, i) => {
		return (<div className="quick-link" key={'range' + i} onClick={props.setSpan.bind(this, range.span, range.multiplier)}>{range.display}</div>)
	})

	return (
		<div>
			{ranges}
		</div>
	)
}

export default RangeSelector

