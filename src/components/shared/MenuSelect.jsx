import PropTypes from 'prop-types'

class MenuSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false,
            title: props.title,
            hasButtons: props.hasButtons
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
            menuOpen: false,
            title: option.label
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
            let onSelect = this.props.needsCiq ? this.selectOption.bind(this, this.props.ciq, option) : this.selectOption.bind(this, option),
            optionLabel = this.props.name ? option[this.props.name] : (this.props.labelNeedsTransform ? this.props.labelTransform(option) : option);

            if(this.props.noButtons.indexOf(optionLabel)>-1 || !this.state.hasButtons){
                return (
                    <menu-option key={'menuSelectOption' + this.props.keyName + i} onClick={onSelect}>
                        {optionLabel}
                    </menu-option>
                );
            }else{
                return (
                    <menu-option key={'menuSelectOption' + this.props.keyName + i} onClick={onSelect}>
                        <span className='title'>{this.state.title}</span>
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
    hasButtons: false,
    options: [],
    noButtons: [],
    needsCiq: false,
    labelNeedsTransform: false,
    keyName: 'option'
};

MenuSelect.PropTypes = {
    options: PropTypes.array.isRequired,
    keyName: PropTypes.string.isRequired,
    menuId: PropTypes.string.isRequired,
    deleteItem: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    hasButtons: PropTypes.bool.isRequired,
    labelNeedsTransform: PropTypes.bool,
    labelTransform: PropTypes.func,
    needsCiq: PropTypes.bool,
    ciq: PropTypes.object,
    noButtons: PropTypes.array
};

export default MenuSelect