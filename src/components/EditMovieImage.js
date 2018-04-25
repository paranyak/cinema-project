import React, {Component} from "react";
import "../styles/EditMovieImage.less";
import block from '../helpers/BEM'
import DragDropImage from './DragDropImage';

const b = block("EditMovieImage");
// const linkMain = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_275,h_408/';
// const linkScr = 'https://res.cloudinary.com/dtnnkdylh/image/upload/w_160,h_100,c_fill,g_center/';

class EditMovieImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: props.film.image,
            screenshots: props.film.screenshots
        };
        this.myCallback = this.myCallback.bind(this);
        this.myCallback2 = this.myCallback2.bind(this);
    }

    myCallback(name, item) {
        this.setState({[name]: [...this.state[name], item]})
    };

    myCallback2(name, item) {
        this.setState({[name]: item})
    }

    // onPosterClick() {
    //     // const upload = document.getElementById('my_file');
    //     console.log('upload');
    //     // upload.onclick = () => console.log('here');//this.upload.bind(this));
    //     return document.getElementById('my_file').onclick = this.upload();//.bind(this);
    // }
    //
    // upload() {
    //     console.log('can upload a file');
    // }

    componentDidMount() {
        const {poster, screenshots} = this.state;
        this.props.callback(['poster', 'screenshots'], [poster, screenshots]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {poster, screenshots} = this.state;
        if (prevState !== this.state) {
            this.props.callback(['poster', 'screenshots'], [poster, screenshots]);
        }
    }


    render() {
        const {film} = this.props;
        return (
            <section className={b()}>
                <h1 className={b('title')}>Poster</h1>
                <DragDropImage value={film.image} name='poster' callbackFromParent={this.myCallback2}
                               callbackInRemove={this.myCallback2}/>{/*<input type="image" src={linkMain + film.image} onClick={this.onPosterClick.bind(this)}/>*/}
                {/*<input type="file" id="my_file" style={{display: "none"}} accept="image/*"/>*/}
                {/*<picture>*/}
                {/*<img src={linkMain + film.image} className={b("main")} />*/}
                {/*</picture>*/}
                <h1 className={b('title')}>Screenshots</h1>
                <DragDropImage value={film.screenshots} name='screenshots' callbackFromParent={this.myCallback}
                               callbackInRemove={this.myCallback2}/>
            </section>
        )
    }
}

export default EditMovieImage;