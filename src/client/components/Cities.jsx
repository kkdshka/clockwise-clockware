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
        this.setState({modalUpdate: 'opened', editing: city});
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
                this.setState({modalCreate: 'closed', cities: cities});
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
                this.setState({modalUpdate: 'closed', cities: cities});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    renderCities() {
        return this.state.cities.map(city => {
            return <tr key={'city' + city.id}>
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
            </tr>
        });
    }

    renderModalCreate() {
        if (this.state.modalCreate === 'opened') {
            return (
                <form>
                    <h4>Добавить город</h4>
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
                    <h4>Изменить город</h4>
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
        return <div>
            <div className="row">
                <div className="col">
                    <Navigation active="cities"/>
                </div>
            </div>
            <div className={'row mt-4'}>
                <div className={'col-sm-4'}>
                    <h4 className="row justify-content-md-center">Города</h4>
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
                </div>
                <div className="col-sm-4">
                    <div>{this.renderModalCreate()}</div>
                    <div>{this.renderModalUpdate()}</div>
                </div>
            </div>
        </div>
    }
}
