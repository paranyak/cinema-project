import React, {Component} from "react";
import "../styles/DragDropImage.scss";
import block from '../helpers/BEM'
import Dropzone from 'react-dropzone'
import axios from "axios/index";

const b = block("DragDropImage");
const link = 'https://res.cloudinary.com/dtnnkdylh/image/upload/';

class DragDropImage extends Component {
    constructor(props) {
        super(props);
        this.state = {images: [this.props.value]}
    }

    handleDrop(files) {
        const {name} = this.props;
        files.map(file => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", 'zfiucvj1');
            formData.append("api_key", "775112651137943");
            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post("https://api.cloudinary.com/v1_1/codeinfuse/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            }).then(response => {
                const data = response.data;
                const publicID = data.public_id;
                console.log(publicID);
                const val = (name === 'poster' || name === 'actor') ? [publicID] : [...this.state.images, publicID];
                this.setState({images: val});
                this.props.callbackFromParent(name, publicID);
            })
        });
    };

    removeImage(i) {
        const {images} = this.state;
        const {name} = this.props;
        const arr = [...images.slice(0, i), ...images.slice(i + 1)];
        this.setState({images: arr});
        const val = ((name === 'poster' || name === 'actor') ? '' : arr);
        this.props.callbackInRemove(name, val);
    };

    showImagePreview() {
        const {images} = this.state;

        if (images[0] === '') {
            this.setState({images: [...images.slice(1)]})
        }

        else if (typeof images[0] === 'object') {
            this.setState({images: [...images[0]]})
        }

        if (images.length !== 0) {
            return <div>
                <p className={b('message')}>Click on the image you want to remove</p>
                {images.map((el, i) => <picture key={i}>
                    <img alt="" src={link + el} className={b('image')} onClick={this.removeImage.bind(this, i)}/>
                </picture>)}
            </div>
        }

    }

    render() {
        const {name} = this.props;
        const multiple = (name !== 'poster' || name !== 'actor');
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