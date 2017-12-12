class FontSize extends React.Component{
    constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.fontSizeOptions=[8, 10, 12, 13, 14, 16, 20, 28, 36, 48, 64];
      this.state={
        fontSize:this.props.size
      };
    }
      onClick(newSize) {
      var self=this;
      return function(){
        self.setState({
          fontSize:newSize+'px',
        });
        self.props.updateFontSize(newSize);
      }
      }
      render() {
          if(!this.props.fontOptions) return <span></span>;
      var self=this;
      var fontSizes = this.fontSizeOptions.map(function(option, index) {
        return <menu-option key={"size" + index} onClick={self.onClick(option)}><span>{option}</span></menu-option>
      });
      return(
        <span>
          <menu-select id="fontSizeSelect">
                  <span className="title">{this.state.fontSize}</span>
                  <menu-select-options class="menu-hover">
            {fontSizes}
                  </menu-select-options>
              </menu-select>
        </span>
      )
      }
  }

  module.exports = FontSize;