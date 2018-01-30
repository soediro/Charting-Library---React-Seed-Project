class Font extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sizeMenuOpen: false,
            familyMenuOpen: false,
            sizes: [8, 10, 12, 13, 14, 16, 20, 28, 36, 48, 64],
            families: ["Helvetica", "Courier", "Garamond", "Palatino", "Times New Roman"]
        };
        this.setSizeMenu = this.setSizeMenu.bind(this);
        this.setFamilyMenu = this.setFamilyMenu.bind(this);
    }
    setSizeMenu(open){
        this.setState({ sizeMenuOpen: open })
    }
    setFamilyMenu(open){
        this.setState({ familyMenuOpen: open })
    }
    render(){
        if (!this.props.fontOptions) { return (<span></span>) }
        console.log('this.state: ', this.state)

        let familyOptions = this.state.families.map((family, i) => {
            return (<menu-option key={'family' + i} onClick={this.props.onFamilyClick.bind(this, family)}><span>{family}</span></menu-option>)
        })

        let sizeOptions = this.state.sizes.map((size, i) => {
            return (<menu-option key={'size' + i} onClick={this.props.onSizeClick.bind(this, size)}><span>{size}</span></menu-option>)
        })

        let sizeMenuDisplay = {
            display: this.state.sizeMenuOpen ? 'block' : 'none'
        };

        let familyMenuDisplay = {
            display: this.state.familyMenuOpen ? 'block' : 'none'
        };

        return (
            <span>
                <menu-select id='fontSizeSelect' onMouseOver={this.setSizeMenu.bind(this, true)} onMouseOut={this.setSizeMenu.bind(this, false)} onClick={this.setSizeMenu.bind(this, false)}>
                    <span className="title">{this.props.fontSize}</span>
                    <menu-select-options className="menu-hover" style={sizeMenuDisplay}>
                        {sizeOptions}
                    </menu-select-options>
                </menu-select>

                <menu-select id='fontFamilySelect' onMouseOver={this.setFamilyMenu.bind(this, true)} onMouseOut={this.setFamilyMenu.bind(this, false)} onClick={this.setFamilyMenu.bind(this, false)}>
                    <span className="title">{this.props.fontFamily}</span>
                    <menu-select-options className="menu-hover" style={familyMenuDisplay}>
                        {familyOptions}
                    </menu-select-options>
                </menu-select>
            </span>
        )
    }
}

export default Font
