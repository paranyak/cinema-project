const filters = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FILTER':
      return [...state, action.filter];
    case 'REMOVE_FILTER':
      return state.filter((el) => el !== filter);
    case 'CLEAR_FILTERS':
      return [];
    default:
      return state;
  }
};

export default filters;
