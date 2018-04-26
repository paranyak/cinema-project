import React, {Component} from "react";
import "../styles/EditImage.less";
import block from '../helpers/BEM'
import DragDropImage from './DragDropImage';

const b = block("EditImage");

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
                <h3 className={b('title')}>Poster</h3>
                <DragDropImage value={film.image} name='poster' callbackFromParent={this.myCallback2}
                               callbackInRemove={this.myCallback2}/>
                <h3 className={b('title')}>Screenshots</h3>
                <DragDropImage value={film.screenshots} name='screenshots' callbackFromParent={this.myCallback}
                               callbackInRemove={this.myCallback2}/>
            </section>
        )
    }
}

export default EditMovieImage;