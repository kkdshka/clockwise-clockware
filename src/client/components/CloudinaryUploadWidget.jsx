import React, { Component } from 'react';

export default class CloudinaryUploadWidget extends Component {
    uploadWidget() {
        const {resultHandler, entity} = this.props;
        cloudinary.openUploadWidget({ cloud_name: 'kkdshka', upload_preset: 'watchmaker', tags:['watchmakers']},
            function(error, result) {
                resultHandler(result, entity);
            });
    }
    render(){
        const {url} = this.props;
        return (
            <div className="main">
                <div className="upload">
                    <img src={url} onClick={this.uploadWidget.bind(this)} className="btn upload-button" />
                </div>
            </div>
        );
    }
}