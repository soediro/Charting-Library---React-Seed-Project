class ShareChartModal extends React.Component {
	constructor(props) {
    super(props);
    var self = this;

    // this.state = {
    //   shareStatus : props.shareStatus,
    //   propnames : Object.keys(props)
    // }
  }

    shareChart() {
      props.shareChart();
    }

    DivShareStatus() {
      switch(this.props.shareStatus){
        case "GENERATING":
          return(
            <div className="cq-share-generating" >
              Generating Image
            </div>
          );
          break;
        case "UPLOADING":
          return(
            <div className="cq-share-uploading" >
              Uploading Image
            </div>
          );
          break;
        case "COMPLETE":
          return(
            <div className="cq-share-link-div" >
              {self.state.shareUrl}
            </div>
          );
          break;
        default:
          return(
            <div className="cq-share-create" onClick={()=>this.props.shareChart()}>
              Create Image
            </div>
          );
          break;
      }
    }


	render() {
	  if (!this.props.shareStatus || this.props.shareStatus == "HIDDEN") return <span>{console.log(this.props)}</span>
	  return (
      <div className="ciq dialog-overlay">
        <div className="ciq dialog timezone">
          <div className="cq-close" onClick={ () => {this.props.setShareStatus("HIDDEN")}}></div>
          <h3 className="center">Share Your Chart</h3>
          {this.DivShareStatus()}
          <div className="ciq-dialog-cntrls">
            <div className="ciq-btn" onClick={ () => {this.props.setShareStatus("HIDDEN")}}>Done</div>
          </div>
        </div>
      </div>
		)
	}
}

module.exports = ShareChartModal;
