import React, {Component} from "react";
import "../styles/TimeRanges.scss";
import block from '../helpers/BEM'

const b = block("TimeRanges");

class TimeRanges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: props.schedule
        }
    }

    createScheduleList() {
        return this.state.schedule.map((el, i) =>
            <div key={i}>
                <input type='time' className={b('time-input')} value={el} onChange={this.onTimeChange.bind(this, i)}/>
                <input type='button' value='-' className={b('button')}
                       onClick={this.removeSchedule.bind(this, i)}/>
            </div>
        )
    }

    onTimeChange(i, e) {
        const {name, callbackFromParent} = this.props;
        const arr = [...this.state.schedule.slice(0, i), e.target.value, ...this.state.schedule.slice(i + 1)];
        this.setState({schedule: arr});
        callbackFromParent(name, arr);
    }

    addSchedule(e) {
        e.preventDefault();
        const {name, callbackFromParent} = this.props;
        this.setState(prevState => {
            const arr = [...prevState.schedule, '00:00'];
            callbackFromParent(name, arr);
            return {schedule: arr};
        });
    }

    removeSchedule(i) {
        const {name, callbackFromParent} = this.props;
        let schedule = [...this.state.schedule];
        const arr = [
            ...schedule.slice(0, i),
            ...schedule.slice(i + 1)
        ];
        this.setState({schedule: arr});
        callbackFromParent(name, arr);
    }

    render() {
        return <div className={b()}>
            <p className={b('add-time')}>Create a time list of movie sessions for each day</p>
            <button className={b('button')} onClick={this.addSchedule.bind(this)}>+</button>
            {this.createScheduleList()}
        </div>;
    }
}

export default TimeRanges;
