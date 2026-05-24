import { useEffect, useState } from 'react'
import { API_BASE, normalizeListPayload } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
  const WORKOUTS_ENDPOINT = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : `${API_BASE}/workouts/`

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(WORKOUTS_ENDPOINT)
        if (!response.ok) {
          throw new Error(`Failed to load workouts: ${response.status}`)
        }

        const data = await response.json()
        setWorkouts(normalizeListPayload(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && workouts.length === 0 && <p>No workouts returned.</p>}
      <ul className="resource-list">
        {workouts.map((workout) => (
          <li key={workout.id || workout._id}>
            <strong>{workout.title || workout.name || 'Workout'}</strong>
            <div>Duration: {workout.durationMinutes ? `${workout.durationMinutes} min` : 'Unknown'}</div>
            <div>Intensity: {workout.intensity || 'Unspecified'}</div>
            <div>Focus: {workout.focus || 'General'}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
