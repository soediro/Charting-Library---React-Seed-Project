const Legend = (props) => {

  console.log(props.comparisons)

  if (props.comparisons && props.comparisons.length === 0) return (<span></span>)

	let comparisons = props.comparisons.map((comparison, i) => {
		return (
			<div className="comparisonWrapper" key={"comparison" + i}>
				<div className="chartSeriesColor" style={{ 'backgroundColor': comparison.parameters.color }}></div>
				<div className="chartSeries">{comparison.display}</div>
				<div className="deleteSeries" onClick={props.removeComparison.bind(this, comparison)}></div>
			</div>
		)
	})

	return (
		<div className="comparisons">
			{comparisons}
		</div>
	)
}

export default Legend
