const fetchUsers = (sortField, sortDirection) => {
  const queryParams = `?sortField=${sortField}&sortDirection=${sortDirection}`;
  return fetch(`https://api.guitarthinker.com/users${queryParams}`)
  // return fetch(`http://localhost:3001/users${queryParams}`)
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

export default {
  fetchUsers
}
