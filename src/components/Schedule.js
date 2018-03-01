import React, {Component} from "react";
import "../styles/Schedule.less";
import {DateTime, Duration, Interval} from "luxon";

class Schedule extends Component {
    constructor(props) {
        super(props);


        const sessionStart = new DateTime({
            year: 2018,
            month: 3,
            day: 1,
            hour: 8,
            minute: 0
        });
        const scheduleInterval = new Interval.after(sessionStart, {hours: 16});
        console.log(scheduleInterval);
        this.state = {
            session: scheduleInterval.splitBy({minutes: 30})
        }
    }

    render() {
        const {session} = this.state;
        console.log(session);
        return <div className="Schedule">
            <div className="Schedule__day">DAY: 1.03/2018</div>
            <div className="Schedule__time-string">
                {
                    session
                    .map(time => <span className="Schedule__time-item">
                        {time.start.toFormat("HH:mm")}
                    </span>)
                }
            </div>
            <div className="Schedule__film-list">
                {[
                    {
                        name: "Black Panther",
                        schedule: ["9:00", "10:00"],
                        duration: ["1h 30m"]
                    },
                    {
                        name: "Black Panther",
                        schedule: ["9:00", "10:00"],
                        duration: ["1h 30m"]
                    }
                ]
                .map(film => <div className="Schedule__film">
                    <span className="Schedule__film-name">{film.name}</span>
                    {film.schedule.join(" ---")}
                    {film.duration}
                </div> )}
            </div>
        </div>;
    }
}

export default Schedule;