const ShareButton = (props) => {

	return (
		<div className="ciq-share-button" onClick={()=>props.setShareStatus("SHOW")}>Share</div>
	)
}

export default ShareButton

