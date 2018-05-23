import React, {Component} from "react";
import block from "../../helpers/BEM";
import "../../styles/AddActorInfo.less";
import NominationsList from "./NominationsList";
import AddDynamicList from "./AddDynamicList";

const b = block("AddActorInfo");

class AddActorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            info: '',
            date: {},
            city: '',
            nominations: [],
            name: ''
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        const {movies, info, date, city, nominations, name} = this.state;
        if (prevState !== this.state) {
            this.props.callback(
                ['movies', 'info', 'date', 'city', 'nominations', 'name'],
                [movies, info, date, city, nominations, name]);
        }
    }

    onValueChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }

    callback(name, value) {
        this.setState({[name]: value})
    }

    render() {
        return <section className={b()}>
            <h3 className={b('title')}>Actor Name</h3>
            <input className={b("input", ['name'])} name='name'
                   onChange={this.onValueChange} placeholder='Please, enter the actor name'/>

            <h3 className={b('title')}>Short Info</h3>
            <textarea className={b('input', ['textarea'])}
                      placeholder='Please, enter the actor bio...' name='info' rows="5"
                      onChange={this.onValueChange}/>

            <h3 className={b("title")}>Date of birth</h3>
            <input type='date' className={b('input')} name='date' onChange={this.onValueChange}/>

            <h3 className={b("title")}>City of birth</h3>
            <input className={b("input")} name='city' onChange={this.onValueChange}/>

            <h3 className={b("title")}>Nominations</h3>
            <NominationsList nominations={[]} callback={this.callback}/>

            <h3 className={b("title")}>Movies</h3>
            <AddDynamicList type='movie' items={[]} callback={this.callback}/>
        </section>
    }
}

export default AddActorInfo;