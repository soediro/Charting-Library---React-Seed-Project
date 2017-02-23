import ColorPicker from "./ColorPicker"

var StudyModal = React.createClass({
  getInitialState: function() {
    return {
      open: false,
      studyHelper: {},
      outputs:{},
      inputs:{},
      parameters:{}
    }
  },
  open(params) {
    var studyHelper =new CIQ.Studies.DialogHelper(params);
    this.setState({
      open: true,
      studyHelper: studyHelper,
       outputs:studyHelper.outputs,
      inputs:studyHelper.inputs,
      params:studyHelper.parameters
    });
  },
    close(studyHelper) {
    this.setState({
      open: false
    });
  },
  updateStudy(color, params) {

        var currentInputs={};
        var currentOutputs={};
        var currentParams={};
        for(var i=0; i<this.state.inputs.length; i++){
            currentInputs[this.state.inputs[i].name]=this.state.inputs[i].value;
        }
        for(var x=0; x<this.state.outputs.length; x++){
            currentOutputs[this.state.outputs[x].name]=this.state.outputs[x].color;
        }
        for(var y=0; y<this.state.params.length; y++){
            currentParams[this.state.params[y].name+'Value']=this.state.params[y].value;
            currentParams[this.state.params[y].name+'Color']=this.state.params[y].color;
        }

        this.state.studyHelper.updateStudy({inputs:currentInputs, outputs:currentOutputs, parameters:currentParams});
        this.close();
  },
  createSelectInput(input) {
    var inputOptions = []
    for (var option in input.options) {
      inputOptions.push(<option key={ "option" + option }>
                          { option }
                        </option>)
    }
    return <div key={ "select" + input.heading } className="inputs dialog-item">
             <select>
               { inputOptions }
             </select>
             <div>
               { input.heading }
             </div>
           </div>

  },
  createOtherInput(input, type) {
    return <div key={ type + input.name } className="inputs dialog-item">
             <input type={ type } defaultValue={ input.value }></input>
             <div>
               { input.heading }
             </div>
           </div>


  },
  openColorPicker: function(output, target) {
    var self = this;

    var targetBounds = target.getBoundingClientRect();

    this.refs.colorPicker.openDialog(targetBounds.top, targetBounds.left, function(color) {
      output.color = CIQ.hexToRgba('#' + color);
      self.forceUpdate();
    })

  },
  render: function() {
    var self = this;

    if (!this.state.open || !this.state.studyHelper) return <span></span>
    var inputs = this.state.inputs.map(function(input, index) {
      if (input.type === "select") return self.createSelectInput(input);
      return self.createOtherInput(input, input.type);
    });

    var outputs = this.state.outputs.map(function(output, index) {
      return <div key={ "output" + index } className="outputs dialog-item">
               { output.color ? <div style={ { "backgroundColor": output.color } } className="color-picker-swatch output" 
               onClick={ function(event){ self.openColorPicker(output,event.target);
                        } }></div> : <div></div> }
               <div>
                 { output.heading }
               </div>
             </div>
    });
    var params = this.state.params.map(function(param,index){
        <div>
            { param.color ? <div style={ { "backgroundColor": param.color } } className="color-picker-swatch param" 
             onClick={ function(event){ self.openColorPicker(param,event.target);
                        } }></div>:<div></div>}
            <input type={param.name==="studyOverZones"?"checkbox":"number"}></input>
            <div>{param.heading}</div>

        </div>
    })

    return (

      <div className="dialog-overlay" id="studyDialog">
        <ColorPicker ref="colorPicker"/>
        <div className="dialog">
	      <div className="cq-close" onClick={ this.close }></div>
          <h3>
            { this.state.studyHelper ? this.state.studyHelper.title : "" }
          </h3>
          <div id="inputs">
            { inputs }
          </div>
          <div id="outputs">
            { outputs }
          </div>
          <div id="parameters">
          <div className="parameters dialog-item">
          {params}
          </div>
          </div>
          <button className="pull-right" onClick={this.updateStudy}>Save</button>
        </div>
      </div>
    )
  }
});



module.exports = StudyModal;