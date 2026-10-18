const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

async function getJson(path) {
  const response = await fetch(`${API_BASE}${path}`)
  if (!response.ok) throw new Error(`API request failed: ${response.status}`)
  return response.json()
}

export const getProfile = () => getJson('/api/profile')
export const getProjects = () => getJson('/api/projects')
export const getSkills = () => getJson('/api/skills')
export const getExperience = () => getJson('/api/experience')
export const getHealth = () => getJson('/api/health')
export const getVersion = () => getJson('/api/version')
