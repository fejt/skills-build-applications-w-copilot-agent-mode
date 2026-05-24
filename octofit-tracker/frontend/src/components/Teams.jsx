import { useEffect, useState } from 'react'
import { API_BASE, normalizeListPayload } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${API_BASE}/teams/`)
        if (!response.ok) {
          throw new Error(`Failed to load teams: ${response.status}`)
        }

        const data = await response.json()
        setTeams(normalizeListPayload(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && teams.length === 0 && <p>No teams returned.</p>}
      <ul className="resource-list">
        {teams.map((team) => (
          <li key={team.id || team._id}>
            <strong>{team.name || 'Team'}</strong>
            <div>Goal: {team.goal || 'No goal set'}</div>
            <div>{team.members?.length ? `${team.members.length} members` : 'Members unavailable'}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
