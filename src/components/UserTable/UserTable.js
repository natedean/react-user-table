import React, {PropTypes} from 'react';
import UserTableRow from './UserTableRow';
import UserTableHeaderRow from './UserTableHeaderRow';

const UserTable = ({users, sortField, sortDirection, columns, handleColumnHeaderClick}) => {
  return (
    <table className="bordered">
      <thead>
      <tr>
        {columns.map((col, i) =>
          <UserTableHeaderRow
            key={i}
            clickHandler={handleColumnHeaderClick}
            column={col}
            isActive={sortField === col}
            sortDirection={sortDirection}
          />)
        }
      </tr>
      </thead>
      <tbody>
        {users.map(user => <UserTableRow key={user._id} user={user} columns={columns}></UserTableRow>)}
      </tbody>
    </table>
  );
};
export default UserTable;

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object)
}
