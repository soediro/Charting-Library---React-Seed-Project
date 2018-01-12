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

      if(!this.props.ciq) return;

      var stx = this.props.ciq;

      console.log("sharing chart!");

      this.props.setShareStatus("GENERATING");

      var props = this.props;

      CIQ.Share.createImage(stx, {}, function(data){
        // CIQ.UI.bypassBindings=false;
        var id=CIQ.uniqueID();
        var host="https://share.chartiq.com";
        var startOffset=stx.getStartDateOffset();
        var metaData={
          "layout":stx.exportLayout(),
          "drawings":stx.exportDrawings(),
          "xOffset":startOffset,
          "startDate":stx.chart.dataSegment[startOffset].Date,
          "endDate":stx.chart.dataSegment[stx.chart.dataSegment.length-1].Date,
          "id":id,
          "symbol":stx.chart.symbol
        };
        var url= host + "/upload/" + id;
        var payload={"id":id,"image":data,"config":metaData};
        props.setShareStatus("UPLOADING");
        CIQ.Share.uploadImage(data, url, payload, function(err, response){
          if(err!==null){
            props.setShareStatus("ERROR", err);
            // CIQ.alert("error: "+err);
          }
          else {
            props.setShareStatus("COMPLETE", host+response);
            // $("cq-share-dialog .share-link-div").html(host+response);
          }
        });
      });

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
            <div className="ciq-dialog-cntrls share-link-div" >
              {this.props.shareStatusMsg}
            </div>
          );
          break;
        case "ERROR":
          return(
            <script>alert({this.props.shareStatusMsg})</script>
          );
          break;
        default:
          return(
            <div className="ciq-dialog-cntrls">
              <div className="ciq-btn" onClick={ () => {console.log(this.shareChart); this.shareChart()}}>Create Image</div>
            </div>
          );
          break;
      }
    }


	render() {
	  if (!this.props.shareStatus || this.props.shareStatus == "HIDDEN") return <span></span>
	  return (
      <div className="ciq dialog-overlay">
        <div className="ciq dialog share">
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
