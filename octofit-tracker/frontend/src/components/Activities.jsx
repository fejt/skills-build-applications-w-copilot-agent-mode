import { useEffect, useState } from 'react'
import { API_BASE, normalizeListPayload } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
  const ACTIVITIES_ENDPOINT = CODESPACE_NAME
    ? `https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : `${API_BASE}/activities/`

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(ACTIVITIES_ENDPOINT)
        if (!response.ok) {
          throw new Error(`Failed to load activities: ${response.status}`)
        }

        const data = await response.json()
        setActivities(normalizeListPayload(data))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities returned.</p>}
      <ul className="resource-list">
        {activities.map((activity) => (
          <li key={activity.id || activity._id}>
            <strong>{activity.type || 'Activity'}</strong>
            <div>{activity.description || `${activity.distanceKm || '-'} km in ${activity.durationMinutes || '-'} min`}</div>
            <div>{activity.calories ? `${activity.calories} kcal` : 'Calories unavailable'}</div>
            {activity.user && <div>User: {activity.user.name || activity.user.email}</div>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
