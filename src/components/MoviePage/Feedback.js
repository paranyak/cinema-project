import React, {Component} from 'react'
import "../../styles/Feedback.less";
import {connect} from "react-redux";
import {getFeedbackById} from "../../reducers";
import block from "../../helpers/BEM";

const b = block("Feedback");

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const {feedback} = this.props;
        console.log(feedback.feedbacks);
        return (
            <div className={b()}>
                {feedback.feedbacks.map((f, ind)=> <div className={b("item")} key={ind}>
                        <img className={b("img")} src={f.image}/>
                        <p className={b("name")}> {f.name}</p>
                        <p className={b("rating")} > {f.rating}</p>
                        <p className={b("text")} > {f.text}</p>
                    </div>)}
            </div>
        )
    }
}

export default connect((state, id) => {
        const feedback = getFeedbackById(state, id.id);
        return {feedback: feedback};
    }
)(Feedback);