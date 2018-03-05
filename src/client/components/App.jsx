import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

//    callback(res) {
//        this.res = res;
//    }
//
    componentDidMount() {
        axios.get("/watchmakers")
                .then(res => console.log(res))
        .catch(function (error) {
                console.log(error);
        });
    } 

    render() {
        return <h1>Hello World</h1>;
    }
}
;

export default App;