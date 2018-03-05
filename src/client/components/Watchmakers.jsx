import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watchmakers: [],
            modal: "closed"
        };
    }

    componentDidMount() {
        axios.get('/watchmakers')
                .then(res => {
                    const watchmakers = res.data;
                    this.setState({watchmakers});
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    handleOnEditClick(id) {
        console.log('Edited');
    }

    handleOnDeleteClick(id) {
        console.log('Deleted');
    }

    handleOnSubmitAdd(event) {
        event.preventDefault();
        console.log('submit');
        const data = {
            name: this.refs.name.value,
            city: this.refs.city.value,
            rating: this.refs.rating.value
        };
        axios.post('/watchmakers/', data)
                .then(res => {
                    const watchmakers = res.data;
                    this.setState({watchmakers});
                })
                .catch(function (error) {
                    console.log(error);
                });
        ;
    }

    renderWatchmakers() {
        const watchmakers = [];
        this.state.watchmakers.map(watchmaker =>
            watchmakers.push(
                    <tr key={'watchmaker' + watchmaker.id}>
                        <td>{watchmaker.name}</td>
                        <td>{watchmaker.city}</td>
                        <td>{watchmaker.rating}</td>
                        <td>
                            <button 
                                className="btn btn-warning"
                                onClick={() => this.handleOnEditClick(watchmaker.id)}>
                                <span className="fa fa-pencil"></span>
                            </button>
                        </td>
                        <td>
                            <button 
                                className="btn btn-danger"
                                onClick={() => this.handleOnDeleteClick(watchmaker.id)}>
                                <i className="fa fa-remove"></i>
                            </button>
                        </td>
                    </tr>));
        return watchmakers;
    }

    renderModalCreate() {
        if (this.state.modal === 'opened') {
            return (
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" className="form-control" id="name" ref="name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City:</label>
                            <select className="form-control" id="city" ref="city">
                                <option>Dnipro</option>
                                <option>Uzhgorod</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating:</label>
                            <select className="form-control" id="rating" ref="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" onClick={this.handleOnSubmitAdd.bind(this)}>Submit</button>
                        <button className="btn" onClick={() => this.setState({modal: 'closed'})}>Close</button>
                    </form>
                );
            }
        }

        render() {
            return (
                    <div className="row">
                        <div className="col-md-6">
                            <h3 className="row justify-content-md-center">Watchmakers</h3>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Rating</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderWatchmakers()}
                                </tbody>
                            </table>
                            <button className="btn btn-success" onClick={() => this.setState({modal: 'opened'})}>
                                <i className="fa fa-plus"></i> Add
                            </button>
                            <div>
                                {this.renderModalCreate()}
                            </div>
                        </div>
                    </div>
                        );
            }
        }
        ;

        export default App;