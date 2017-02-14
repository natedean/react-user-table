import React, { PropTypes } from 'react';

const UserTableRow = ({user, columns}) => {
  return (
    <tr>
      {columns.map((column, i) => <td key={i}>{user[column]}</td>)}
    </tr>
  );
};
export default UserTableRow;

UserTableRow.propTypes = {
  user: PropTypes.object
};
