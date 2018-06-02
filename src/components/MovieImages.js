import React, {Component} from "react";
import "../styles/ImageFields.scss";
import block from '../helpers/BEM'
import DragDropImage from './DragDropImage';

const b = block("ImageFields");

class MovieImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            poster: props.film.image || '',
            screenshots: props.film.screenshots || [],
            trailer: props.film.trailer || ''
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

    onInputChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    componentDidMount() {
        const {poster, screenshots, trailer} = this.state;
        this.props.callback(['poster', 'screenshots', 'trailer'], [poster, screenshots, trailer]);
    }

    componentDidUpdate(prevProps, prevState) {
        const {poster, screenshots, trailer} = this.state;
        if (prevState !== this.state) {
            this.props.callback(['poster', 'screenshots', 'trailer'], [poster, screenshots, trailer]);
        }
    }


    render() {
        const {film} = this.props;
        const {poster, screenshots} = this.state;
        return (
            <section className={b()}>
                <h3 className={b('title')}>Poster</h3>
                <DragDropImage value={poster} name='poster' callbackFromParent={this.myCallback2}
                               callbackInRemove={this.myCallback2}/>
                <h3 className={b('title')}>Screenshots</h3>
                <DragDropImage value={screenshots} name='screenshots' callbackFromParent={this.myCallback}
                               callbackInRemove={this.myCallback2}/>
                <h3 className={b('title')}>Trailer</h3>
                <input className={b('input')} placeholder='Please, enter the movie trailer link' type="url" defaultValue={film.trailer} name='trailer' onChange={this.onInputChange.bind(this)}/>
            </section>
        )
    }
}

export default MovieImages;