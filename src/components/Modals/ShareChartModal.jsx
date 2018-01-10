class ShareChartModal extends React.Component {
	constructor(props) {
		super(props);
		var self = this;

    function shareChart() {
      this.props.shareChart(this.props.ciq.dataZone, "America/Costa_Rica");
      this.getMyZoneObj();
      if (this.props.ciq.chart.symbol) this.props.ciq.draw();
    }

    function DivShareStatus() {
      switch(this.props.shareStatus){
        case "GENERATING":
          return(
            <div class="cq-share-generating" >
              Generating Image
            </div>
          );
          break;
        case "UPLOADING":
          return(
            <div class="cq-share-uploading" >
              Uploading Image
            </div>
          );
          break;
        case "COMPLETE":
          return(
            <div class="cq-share-link-div" >
              {this.props.shareUrl}
            </div>
          );
          break;
        default:
          return(
            <div class="cq-share-create" onClick={()=>this.shareChart()}>
              Create Image
            </div>
          );
          break;

      }
      if(this.props.shareUrl){
        return
      } else {
        return
      }
    }
  }


	render() {
	  if (!this.props.showShareChartModel) return <span></span>
	  return (
      <div className="ciq dialog-overlay">
        <div className="ciq dialog share-chart">
          <div className="cq-close" onClick={ () => {this.props.toggleShareChartModal()}></div>
          <h3 className="center">Share Your Chart</h3>
          <DivShareStatus />

        </div>
      </div>


      <div>
        <h4 class="title">Share Your Chart</h4>
        <cq-separator></cq-separator>
        <cq-share-create class="ciq-btn" stxtap="share()">Create Image</cq-share-create>
        <cq-share-generating style="display:none">Generating Image</cq-share-generating>
        <cq-share-uploading style="display:none">Uploading Image</cq-share-uploading>

        <div class="share-link-div"></div>

        <cq-separator></cq-separator>
        <div class="ciq-dialog-cntrls">
          <div stxtap="close()" class="ciq-btn">Done</div>
        </div>
      </div>
		)
	}
}

module.exports = TimeZone;
