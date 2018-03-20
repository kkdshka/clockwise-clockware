import React from 'react';
import Navigation from './AdminNavigation.jsx';
import axios from "axios/index";

export default class Cities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            modalCreate: 'closed',
            modalUpdate: 'closed',
            editing: {}
        };
    }

    componentDidMount() {
        axios.get('/admin/cities/data')
            .then(res => {
                const cities = res.data;
                this.setState({cities});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnEditClick(city) {
        this.setState({modalUpdate: 'opened'});
        this.setState({editing: city});
    }

    handleOnDeleteClick(id) {
        axios.delete('/admin/cities/', {data: {id: id}})
            .then(res => {
                const cities = res.data;
                this.setState({cities});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitAdd() {
        const data = {
            name: this.refs.name.value,
        };
        axios.post('/admin/cities/', data)
            .then(res => {
                const cities = res.data;
                this.setState({modalCreate: 'closed'});
                this.setState({cities});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleOnSubmitEdit() {
        const data = {
            name: this.refs.name.value,
            id: this.state.editing.id
        };
        axios.put('/admin/cities/', data)
            .then(res => {
                const cities = res.data;
                this.setState({modalUpdate: 'closed'});
                this.setState({cities});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderCities() {
        const cities = [];
        this.state.cities.map(city =>
            cities.push(
                <tr key={'city' + city.id}>
                    <td>{city.name}</td>
                    <td>
                        <button
                            className="btn btn-warning"
                            onClick={() => this.handleOnEditClick(city)}>
                            <i className="fa fa-pencil"/>
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.handleOnDeleteClick(city.id)}>
                            <i className="fa fa-remove"/>
                        </button>
                    </td>
                </tr>));
        return cities;
    }

    renderModalCreate() {
        if (this.state.modalCreate === 'opened') {
            return (
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Название:</label>
                        <input type="text" className="form-control" id="name" ref="name"/>
                    </div>
                    <button type={'button'} className="btn btn-primary"
                            onClick={this.handleOnSubmitAdd.bind(this)}>Принять
                    </button>
                    <button type={'button'} className="btn float-right"
                            onClick={() => this.setState({modalCreate: 'closed'})}>Закрыть
                    </button>
                </form>
            );
        }
    }

    renderModalUpdate() {
        if (this.state.modalUpdate === 'opened') {
            return (
                <form className={'form'}>
                    <div className="form-group">
                        <label htmlFor="name">Название:</label>
                        <input type="text" className="form-control" id="name" ref="name"
                               defaultValue={this.state.editing.name}/>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleOnSubmitEdit.bind(this)}>Принять</button>
                    <button className="btn float-right" onClick={() => this.setState({modalUpdate: 'closed'})}>Закрыть
                    </button>
                </form>
            );
        }
    }

    render() {
        return <div className="row">
            <div className="col-sm">
                <Navigation active="cities"/>
                <div className={'row'}>
                    <div className={'col-md-4'}>
                        <h3 className="row justify-content-md-center">Города</h3>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Название</th>
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderCities()}
                            </tbody>
                        </table>
                        <button className="btn btn-success" onClick={() => this.setState({modalCreate: 'opened'})}>
                            <i className="fa fa-plus"/> Добавить
                        </button>
                        <div className="row">{this.renderModalCreate()}</div>
                        <div className="row">{this.renderModalUpdate()}</div>
                    </div>
                </div>
            </div>
        </div>
    }
}
