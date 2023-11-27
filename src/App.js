// App.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from './store/store';

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [newUserName, setNewUserName] = useState('');
  const [editUserId, setEditUserId] = useState(null);

  const handleAddUser = () => {
    if (newUserName.trim() === '') return;
    
    if (editUserId) {
      // Update existing user
      dispatch(updateUser({ id: editUserId, updatedUser: { id: editUserId, name: newUserName } }));
      setEditUserId(null);
    } else {
      // Add new user
      dispatch(addUser({ id: Date.now(), name: newUserName }));
    }

    setNewUserName('');
  };

  const handleEditUser = user => {
    setNewUserName(user.name);
    setEditUserId(user.id);
  };

  const handleDeleteUser = userId => {
    dispatch(deleteUser(userId));
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter user name"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>
          {editUserId ? 'Update User' : 'Add User'}
        </button>
      </div>
    </div>
  );
}

export default App;
