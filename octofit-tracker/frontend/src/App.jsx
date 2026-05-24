import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE, CODESPACE_NAME } from './api.js'
import './App.css'

const activeStyle = ({ isActive }) => ({
  color: isActive ? '#2d6cdf' : '#555',
  textDecoration: 'none',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.5rem',
  backgroundColor: isActive ? '#eef4ff' : 'transparent',
})

function App() {
  const modeLabel = CODESPACE_NAME
    ? `Codespaces preview mode: ${CODESPACE_NAME}-8000.app.github.dev`
    : 'VITE_CODESPACE_NAME is not set. Falling back to http://localhost:8000/api.'

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>OctoFit Tracker</h1>
          <p className="subtitle">
            React 19 + Vite frontend using routed pages and Codespaces-aware API URLs.
          </p>
          <p className="env-note">{modeLabel}</p>
          <p className="env-help">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the
            preview host format.
          </p>
          <p className="api-base">
            API base:{' '}
            <code>{API_BASE}</code>
          </p>
        </div>
        <nav className="nav-links">
          <NavLink to="/users" style={activeStyle}>Users</NavLink>
          <NavLink to="/activities" style={activeStyle}>Activities</NavLink>
          <NavLink to="/workouts" style={activeStyle}>Workouts</NavLink>
          <NavLink to="/teams" style={activeStyle}>Teams</NavLink>
          <NavLink to="/leaderboard" style={activeStyle}>Leaderboard</NavLink>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
