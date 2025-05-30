import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch('/apis/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      await fetch('/apis/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      setName('');
      fetchUsers(); // Refresh after adding
    } catch (err) {
      console.error('Failed to add user', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Left: Add user */}
      <div style={{ flex: 1, marginRight: '40px' }}>
        <h2>Add User</h2>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter user name"
          style={{ width: '100%', padding: '8px' }}
        />
        <button onClick={addUser} style={{ marginTop: '10px', padding: '8px 12px' }}>
          Add
        </button>
      </div>

      {/* Right: User list */}
      <div style={{ flex: 1 }}>
        <h2>User List</h2>
        <button onClick={fetchUsers} disabled={loading} style={{ marginBottom: '10px' }}>
          {loading ? 'Loading...' : 'Refresh'}
        </button>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
