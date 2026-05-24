import { useEffect, useState } from 'react'
import { API_BASE, normalizeListPayload } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE}/users/`)
        if (!response.ok) {
          throw new Error(`Failed to load users: ${response.status}`)
        }

        const data = await response.json()
        setUsers(normalizeListPayload(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users returned.</p>}
      <ul className="resource-list">
        {users.map((user) => (
          <li key={user.id || user._id}>
            <strong>{user.name || user.username || 'Unknown'}</strong>
            <br />
            <span>{user.email || 'No email provided'}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
