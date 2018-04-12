import React, {Component} from "react";
import "../styles/DragDropImage.less";
import block from '../helpers/BEM'
import Dropzone from 'react-dropzone'
import axios from "axios/index";

const b = block("DragDropImage");

class DragDropImage extends Component {
    handleDrop(files) {
// Push all the axios request promise into a single array
        console.log('files in drop', files);
        let preset = '';
        const {type} = this.props;

        if (type === 'poster') {
            preset = "pt8mg4xb";
        }
        else if (type === 'actor') {
            preset = "sfazgc2b";
        }
        else if (type === 'screenshot') {
            preset = 'ntkbwv1n';
        }
        files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", preset);
            formData.append("api_key", "775112651137943"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url; // You should store this URL for future references in your app
                this.props.callbackFromParent(type, fileURL);
            })
        });
    };

    render() {
        const {type} = this.props;
        const multiple = (type !== 'poster');
        return <Dropzone
            onDrop={this.handleDrop.bind(this)}
            multiple={multiple}
            accept="image/jpeg, image/jpg, image/png"
            className={b()}
            activeClassName={b(['active'])}
            rejectClassName={b(['reject'])}
        >
            <p>Drag your files or click here to upload</p>
        </Dropzone>;
    }
}

export default DragDropImage;