import React, {Component} from "react";
import block from "../helpers/BEM";
import "../styles/DynamicList.scss";

const b = block("DynamicList");

class DynamicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestedList: [],
            chosenItems: props.items
        }
    }

    createList() {
        const {suggestedList, chosenItems} = this.state;
        const {type} = this.props;
        return chosenItems.map((item, j) => {
            return <div key={j}>
                <input name='name' className={b('input')} placeholder={`Enter ${type} name`} type="text"
                       value={item.name} list={`${type}s`}
                       onInput={this.onListChange.bind(this, j)} onChange={this.onOptionClick.bind(this, j)}/>
                <datalist id={`${type}s`}>
                    {suggestedList.map((sug, i) => <option key={i} value={sug.name}/>)}
                </datalist>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeItem.bind(this, j)}/>
            </div>
        })
    }

    async onListChange(i, e) {
        const {type} = this.props;
        const response = await fetch(`https://csucu-cinema-project.herokuapp.com/${type}s/autocomplete/${e.target.value}`);// 'posts' to get work the url
        if (!response.ok) {
            console.log("ERROR IN Choosing ", type);
            return null;
        } else {
            let suggestedList = await (response.json());
            if (suggestedList.length !== 0) {
                this.setState({suggestedList});
            }
        }
    }

    onOptionClick(i, e) {
        const {callback, type} = this.props;
        const {value} = e.target;
        const filtered = this.state.suggestedList.filter(f => f.name === value);
        let slugName = '';
        let dynLst = [];
        if (filtered.length === 1) {
            slugName = filtered[0].slugName;
            dynLst = type === 'movie' ? filtered[0].cast : filtered[0].movies;
        }
        let arr = [];
        if (type === 'movie') {
            arr = [
                ...this.state.chosenItems.slice(0, i),
                Object.assign({}, this.state.chosenItems[i], {name: value, slugName, cast: dynLst}),
                ...this.state.chosenItems.slice(i + 1)
            ];
        }
        else {
            arr = [
                ...this.state.chosenItems.slice(0, i),
                Object.assign({}, this.state.chosenItems[i], {name: value, slugName, movies: dynLst}),
                ...this.state.chosenItems.slice(i + 1)
            ];
        }
        this.setState({chosenItems: arr});
        callback(`${type}s`, arr);
    }

    addItem(e) {
        e.preventDefault();
        let arr = [];
        if (this.props.type === 'movie') {
            arr = [...this.state.chosenItems, {name: '', slugName: '', cast: []}];
        }
        else {
            arr = [...this.state.chosenItems, {name: '', slugName: '', movies: []}];
        }
        this.setState({chosenItems: arr});
    }

    removeItem(i) {
        const {callback, type} = this.props;
        const {chosenItems} = this.state;
        const arr = [
            ...chosenItems.slice(0, i),
            ...chosenItems.slice(i + 1)
        ];
        this.setState({chosenItems: arr});
        callback(`${type}s`, arr);
    }

    render() {
        return <div className={b()}>
            <button className={b('button')} onClick={this.addItem.bind(this)}>+</button>
            {this.createList()}
        </div>
    }
}

export default DynamicList;