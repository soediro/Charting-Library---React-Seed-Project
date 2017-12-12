class Italic extends React.Component{
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state={
            italic:false
        };
    }
    onClick() {
        var self=this;
        return function(){
        self.setState({
            italic:!self.state.italic
            }, () => {
                self.props.toggleItalic(self.state.italic);
            });
        };
    }
    render() {
        if(!this.props.fontOptions) return <span></span>;
        return(
            <span><div className="italicBtn" onClick={this.onClick()}>I</div></span>
        )
    }
}

module.exports = Italic;