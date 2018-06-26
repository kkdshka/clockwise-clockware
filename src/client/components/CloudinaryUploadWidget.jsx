import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

export default class CloudinaryUploadWidget extends Component {
    uploadWidget() {
        const {resultHandler, entity} = this.props;
        cloudinary.openUploadWidget({ cloud_name: 'kkdshka', upload_preset: 'evjhhq1q', tags:['watchmakers']},
            function(error, result) {
                resultHandler(result, entity);
            });
    }
    render(){
        const {url} = this.props;
        return (
            <div className="main">
                <div className="upload">
                    <img src={url} onClick={this.uploadWidget.bind(this)} className="avatar btn upload-button" />
                </div>
            </div>

        );
    }
}