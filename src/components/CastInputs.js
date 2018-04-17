import React, {Component} from "react";
import "../styles/CastInputs.less";
import block from '../helpers/BEM'
import DragDropImage from "./DragDropImage";

const b = block("CastInputs");

class CastInputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedActors: [],
            chosenActors: []
        }
    }

    createCastList() {
        const {suggestedActors} = this.state;
        return this.state.chosenActors.map((ac, j) => {
            return <div key={j}>
                <input ref='actorInput' name='name' className={b('input')} placeholder={'Enter actor name'} type="text" value={ac.name}
                       onInput={this.onListChange.bind(this, j)} onChange={this.onOptionClick.bind(this, j)} list="actors"/>
                <datalist id="actors">
                    {suggestedActors.map((actor, i) => <option key={i} value={actor.id}/>)}
                </datalist>

                <input type='text' value={ac.role} className={b('input')} onChange={this.onRoleChange.bind(this, j)} placeholder="Enter actor's role" name='role'/>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeActorAndRole.bind(this, j)}/>
                <DragDropImage value={ac.image} name='actor' callbackFromParent={this.addActorAvatar.bind(this, j)} callbackInRemove={this.addActorAvatar.bind(this, j)}/>
            </div>
        })
    }

    addActorAvatar(i, name, val) {
        const {callback} = this.props;
        console.log('coming val is', val);
        const arr = [
            ...this.state.chosenActors.slice(0, i),
            Object.assign({}, this.state.chosenActors[i], {image: val}),
            ...this.state.chosenActors.slice(i + 1)
        ];
        this.setState({
            chosenActors: arr
        });
        callback('cast', arr);
    }

    async onListChange(i, e) {
        const response = await fetch(`http://localhost:3000/actors?id_like=${e.target.value}`);// 'posts' to get work the url

        if (!response.ok) {
            console.log("ERROR IN Choosing ACTOR");
        } else {
            let suggestedActors = await (response.json());
            if (suggestedActors !== []) {
                this.setState({suggestedActors});
                console.log('sug actors', this.state.suggestedActors);
            }
            // TODO: add selected suggested actor name/image to chosenActors[i].name/image
            // this.props.callback('cast', suggestedActors)
        }
    }

    onOptionClick(i, e) {
        const {name, callback} = this.props;
        const arr = [
            ...this.state.chosenActors.slice(0, i),
            Object.assign({}, this.state.chosenActors[i], {name: e.target.value}),
            ...this.state.chosenActors.slice(i + 1)
        ];
        this.setState({chosenActors: arr});
        callback(name, arr);
    }

    onRoleChange(i, e) {
        const {name, callback} = this.props;
        const arr = [
            ...this.state.chosenActors.slice(0, i),
            Object.assign({}, this.state.chosenActors[i], {role: e.target.value}),
            ...this.state.chosenActors.slice(i + 1)
        ];
        this.setState({chosenActors: arr});
        callback(name, arr);
    }

    addActorAndRole(e) {
        e.preventDefault();
        const {name, callback} = this.props;
        this.setState(prevState => {
            const arr = [...prevState.chosenActors, {
                image: '',
                name: '',
                role: ''
            }];
            callback(name, arr);
            return {chosenActors: arr};
        });
    }

    removeActorAndRole(i) {
        const {name, callback} = this.props;
        const {chosenActors} = this.state;
        const arr = [
            ...chosenActors.slice(0, i),
            ...chosenActors.slice(i + 1)
        ];
        this.setState({
            chosenActors: arr
        });
        callback(name, arr);
    }

    render() {
        return <div className={b()}>
            <button className={b('button')} onClick={this.addActorAndRole.bind(this)}>+</button>
            {this.createCastList()}
            </div>
    }
}

export default CastInputs;