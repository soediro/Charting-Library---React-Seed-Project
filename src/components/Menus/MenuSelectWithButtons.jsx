import PropTypes from 'prop-types'

class MenuSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        this.selectOption = this.selectOption.bind(this);
    }
    toggleMenu(open){
        this.setState({ menuOpen: open })
    }
    edit(option, event){
        event.stopPropagation();
        this.props.editItem(option);
    }
    delete(option, event){
        event.stopPropagation();
        this.props.deleteItem(option);
    }
    selectOption(ciq, option){
        this.setState({
            menuOpen: false
        }, () => {
            if (Object.keys(ciq).length > 0){
                this.props.handleOptionSelect(ciq, option);
            } else {
                this.props.handleOptionSelect(option);
            }
        });
    }
    render(){
        if(this.props.options.length===0) { return (<div></div>); }

        let options = this.props.options.map((option, i) => {
            // let onSelect = this.props.needsCiq ? this.props.handleOptionSelect.bind(this, this.props.ciq, option) : this.props.handleOptionSelect.bind(this, option),
            let onSelect = this.props.needsCiq ? this.selectOption.bind(this, this.props.ciq, option) : this.selectOption.bind(this, option),
            optionLabel = this.props.name ? option[this.props.name] : option

            if(this.props.noButtons.indexOf(optionLabel)>-1){
                return (
                    <menu-option key={'menuSelectOption' + this.props.keyName + i} onClick={onSelect}>
                        {optionLabel}
                    </menu-option>
                );
            }else{
                return (
                    <menu-option key={'menuSelectOption' + this.props.keyName + i} onClick={onSelect}>
                        <span className='ciq-edit' onClick={this.edit.bind(this, option)}></span>
                        <cq-close onClick={this.delete.bind(this, option)}></cq-close>
                        {optionLabel}
                    </menu-option>
                );
            }
        });

        let menuDisplay = {
            display: this.state.menuOpen ? 'block' : 'none'
        };

        return (
            <menu-select id={this.props.menuId} onMouseLeave={this.toggleMenu.bind(this, false)} onClick={this.toggleMenu.bind(this, !this.state.menuOpen)}>
                <span className='title'>{this.props.title}</span>
                <menu-select-options className='ps-container' style={menuDisplay}>
                    {options}
                </menu-select-options>
            </menu-select>
        );
    }
}

MenuSelect.defaultProps = {
    options: [],
    noButtons: []
};

MenuSelect.PropTypes = {
    options: PropTypes.array.isRequired,
    keyName: PropTypes.string.isRequired,
    menuId: PropTypes.string.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    needsCiq: PropTypes.bool,
    ciq: PropTypes.object,
    noButtons: PropTypes.array
};

export default MenuSelect