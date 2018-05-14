import React, {Component} from "react";
import "../styles/CalendarRangePicker.less";
import DayPicker, {DateUtils} from 'react-day-picker';
import {getDates} from "../helpers/getDatesFromRange";

const numberOfMonths = 2;

class CalendarRangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            from: props.from,
            to: props.to,
            dates: []
        };
        this.baseState = {
            from: undefined,
            to: undefined,
            dates: []
        };
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        const {from, to} = this.state;
        console.log('form to', this.state);
        this.setState(range);

        if (from && to) {
            const arr = getDates(
                new Date(
                    from.getFullYear(),
                    from.getMonth(),
                    from.getDate()),
                new Date(
                    to.getFullYear(),
                    to.getMonth(),
                    to.getDate()
                )
            );
            this.setState(() => {
                this.props.callbackFromParent('scheduleDate', arr);
                return {dates: arr};
            });
        }

    }

    handleResetClick(e) {
        e.preventDefault();
        this.setState(this.baseState);
    }

    onCalendarBlur() {
        const {from, to} = this.state;
        if (from && !to) {
            this.setState({to: from});
        }
        if (from && to) {
            const arr = getDates(
                new Date(
                    from.getFullYear(),
                    from.getMonth(),
                    from.getDate()),
                new Date(
                    to.getFullYear(),
                    to.getMonth(),
                    to.getDate()
                )
            );
            this.setState(() => {
                this.props.callbackFromParent('scheduleDate', arr);
                return {dates: arr};
            });
        }
    }

    render() {
        const {from, to} = this.state;
        const {startDate} = this.props;
        const modifiers = {start: from, end: to};
        const disabledBefore =
            (new Date(startDate).getTime() > new Date().getTime()) ?
                new Date(startDate) :
                new Date();

        return (
            <div className="RangeExample" onBlur={this.onCalendarBlur.bind(this)}>
                <p className='Message'>
                    {!from && !to && 'Please select the first day.'}
                    {from && !to && 'Please select the last day.'}
                    {from &&
                    to &&
                    `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
                    {from &&
                    to && (
                        <button className="link" onClick={this.handleResetClick}>
                            Reset
                        </button>
                    )}
                </p>
                <DayPicker
                    className="Selectable"
                    numberOfMonths={numberOfMonths}
                    selectedDays={[from, {from, to}]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                    firstDayOfWeek={1}
                    disabledDays={{before: disabledBefore}}
                />
            </div>
        )
    }
}

export default CalendarRangePicker;