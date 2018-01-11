const ShareButton = (props) => {

	return (
		<div className="ciq-share-button" onClick={()=>props.setShareStatus("SHOW")}>Share {props.shareStatus}</div>
	)
}

export default ShareButton

