export const fetchUsers = (sortField, sortDirection) => {
  const queryParams = `?sortField=${sortField}&sortDirection=${sortDirection}`;
  return fetch(`https://api.guitarthinker.com/users${queryParams}`)
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res.map(user => {
        return Object.assign({}, user, {
          _created_at: new Date(user._created_at).toLocaleString(),
          _updated_at: new Date(user._updated_at).toLocaleString()
        });
      })
    })
};

export const fetchQuestions = () => {
  return fetch(`https://api.guitarthinker.com/questions`)
    .then(res => {
      return res.json();
    })
    .then(questions => questions.sort((a, b) => a.difficulty - b.difficulty))

};
