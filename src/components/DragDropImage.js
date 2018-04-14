import React, {Component} from "react";
import "../styles/DragDropImage.less";
import block from '../helpers/BEM'
import Dropzone from 'react-dropzone'
import axios from "axios/index";

const b = block("DragDropImage");

class DragDropImage extends Component {
    constructor() {
        super();
        this.state = {images: []}
    }

    handleDrop(files) {
        let preset = '';
        const {name} = this.props;

        if (name === 'poster') {
            preset = "pt8mg4xb";
        }
        else if (name === 'actors') {
            preset = "sfazgc2b";
        }
        else if (name === 'screenshots') {
            preset = 'ntkbwv1n';
        }
        files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", preset);
            formData.append("api_key", "775112651137943");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url;
                const val = (name === 'poster') ? [fileURL] : [...this.state.images, fileURL];
                this.setState({images: val});
                this.props.callbackFromParent(name, fileURL);
            })
        });
    };

    removeImage(i) {
        const {images} = this.state;
        const {name} = this.props;
        const arr = [...images.slice(0, i), ...images.slice(i + 1)];
        this.setState({images: arr});
        const val = (name === 'poster' ? '' : arr);
        this.props.callbackInRemove(name, val);
    };

    showImagePreview() {
        const {images} = this.state;
        if (images.length !== 0) {
            return <div>
                <p className={b('message')}>Click on the image you want to remove</p>
                {images.map((el, i) => <img src={el} key={i} className={b('image')} onClick={this.removeImage.bind(this, i)}/>)}
            </div>
        }

    }

    render() {
        const {name} = this.props;
        const multiple = (name !== 'poster');
        return <div>
            <Dropzone
                onDrop={this.handleDrop.bind(this)}
                multiple={multiple}
                accept="image/jpeg, image/jpg, image/png"
                className={b()}
                activeClassName={b(['active'])}
                rejectClassName={b(['reject'])}
            >
                <p>Drag your files or click here to upload</p>
            </Dropzone>
            {this.showImagePreview()}
        </div>
    }
}

export default DragDropImage;