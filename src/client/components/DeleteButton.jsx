import Popover from 'react-simple-popover';
import React, {Component} from 'react';

export default class DeleteButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClick = () => {
        this.setState({open: !this.state.open});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {deletingMessage, handleDelete} = this.props;
        const {target} = this.refs;
        const {open} = this.state;

        return (
            <div style={{position: 'relative'}}>
                <button
                    className="btn btn-danger"
                    ref="target"
                    onClick={this.handleClick}><i className="fa fa-remove"/>
                </button>
                <Popover
                    placement='right'
                    container={this}
                    target={target}
                    show={open}
                    onHide={this.handleClose}>
                    <div className="container">
                        <div className='row'>
                            <div className="col-12 align-self-center">
                                <p>{deletingMessage}</p>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-danger"
                                            onClick={handleDelete}>Delete
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }
}