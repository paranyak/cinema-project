import data from "../data/feedbacks"

const feedbacks = (state = data.Feedbacks) => {
    return state;
};

export default feedbacks;

export const getAllFeedbacks = (state) => state;

export const getFeedbackById = (state, id) =>{
    return state.filter(f=> f.id === id)[0];
};
