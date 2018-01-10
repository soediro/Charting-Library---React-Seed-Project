const ShareButton = (props) => {
	return (
		<div className="ciq-share-button" onClick={props.shareChart.bind(this)}>Share</div>
	)
}

export default ShareButton

