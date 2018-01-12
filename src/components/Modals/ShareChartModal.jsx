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
            <div className="ciq-dialog-cntrls" >
              Generating Image
            </div>
          );
          break;
        case "UPLOADING":
          return(
            <div className="ciq-dialog-cntrls" >
              Uploading Image
            </div>
          );
          break;
        case "COMPLETE":
          return(
            <div className="ciq-dialog-cntrls" >
              {self.state.shareUrl}
            </div>
          );
          break;
        default:
          return(
            <div className="ciq-dialog-cntrls">
              <div className="ciq-btn" onClick={ () => {this.props.shareChart()}}>Create Image</div>
            </div>
          );
          break;
      }
    }


	render() {
	  if (!this.props.shareStatus || this.props.shareStatus == "HIDDEN") return <span></span>
	  return (
      <div className="ciq dialog-overlay">
        <div className="ciq dialog timezone">
          <div className="cq-close" onClick={ () => {this.props.setShareStatus("HIDDEN")}}></div>
          <h3 className="center">Share Your Chart</h3>
          {this.DivShareStatus()}
          <div className="share-link-div"></div> 
          <div className="ciq-dialog-cntrls">
            <div className="ciq-btn" onClick={ () => {this.props.setShareStatus("HIDDEN")}}>Done</div>
          </div>
        </div>
      </div>
		)
	}
}

module.exports = ShareChartModal;
