//components
import FibonacciModal from '../Modals/FibonacciModal';

class FibonacciUI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showFibonacciModal: false,
    }
    this.bindCorrectContext()
  }
  bindCorrectContext(){
    this.toggleFibonacciModal = this.toggleFibonacciModal.bind(this)
  }
  toggleFibonacciModal(){
    this.setState({
      showFibonacciModal: !this.state.showFibonacciModal
    })
  }
  render() {
    if (!(this.props.ciq.currentVectorParameters.vectorType==='fibonacci' || this.props.ciq.currentVectorParameters.vectorType==='fibarc' || this.props.ciq.currentVectorParameters.vectorType==='fibfan' || this.props.ciq.currentVectorParameters.vectorType==='fibtimezone')) return (<span></span>)
    return (
      <span>
				<FibonacciModal {...this.props} open={this.state.showFibonacciModal} toggle={this.toggleFibonacciModal} />
				<button onClick={this.toggleFibonacciModal}>Settings</button>
			</span>
    );
  }
}

export default FibonacciUI;
