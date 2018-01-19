class FibonacciModal extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      fibDisplays:{}
    }
    this.bindCorrectContext()
  }
  bindCorrectContext(){
    this.updateSetting = this.updateSetting.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    var fibs=nextProps.ciq.currentVectorParameters.fibonacci.fibs
    var defaultDisplays={}
    for(var xx=0; xx<fibs.length; xx++){
      var level=fibs[xx]
      defaultDisplays[level.level]=level.display
    }
    this.setState({
      fibDisplays:defaultDisplays
    })
  }
  updateSetting(level){
    console.log(level);
    // set the state

    //update the chart object
    for(var ii=0; ii<this.props.ciq.currentVectorParameters.fibonacci.fibs.length; ii++){
      if(this.props.ciq.currentVectorParameters.fibonacci.fibs[ii].level===level.level){
        this.props.ciq.currentVectorParameters.fibonacci.fibs[ii].display=level.display
      }
    }
  }
  closeDialog(){
    this.props.toggle()
  }
  render() {
    if (!this.props.open) return <span></span>
    var that=this;
    var options = Object.keys(this.state.fibDisplays).map(function(level, levelIndex) {
      var isChecked=that.state.fibDisplays[level]
      return (<li key={"level" + levelIndex} className={"dialog-item"}>
					<span>
					 { level }
					</span>
        <input type="checkbox" checked={isChecked} onChange={function(){that.updateSetting(level)}} />
      </li>);
    });
    return (
      <span className = "ciq dialog-overlay" >
			 <div className="ciq dialog fibonacci">
				<h3 className="center">Fibonacci Settings</h3>
         <ul>
           {options}
         </ul>
				 <button className="pull-right ciq" onClick={this.closeDialog}>Done</button>
			 </div>
			</span>
    );
  }
}

module.exports = FibonacciModal;
