import { useEffect, useState } from 'react'
import { API_BASE, normalizeListPayload } from '../api.js'

function Leaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${API_BASE}/leaderboard/`)
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard: ${response.status}`)
        }

        const data = await response.json()
        setScores(normalizeListPayload(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && scores.length === 0 && <p>No leaderboard entries returned.</p>}
      <ol className="resource-list">
        {scores.map((entry, index) => (
          <li key={entry.id || entry._id || index}>
            <strong>{entry.name || entry.team || `Entry ${index + 1}`}</strong>
            <div>{entry.score ? `${entry.score} points` : 'Score unavailable'}</div>
            {entry.category && <div>{entry.category}</div>}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
