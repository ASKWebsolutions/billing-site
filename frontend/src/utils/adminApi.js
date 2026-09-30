/**
 * Shared helpers for admin-only API calls.
 *
 * The admin token lives for seven days. Without a shared 401 handler each page
 * would silently render an empty table when it expires, which reads as "all
 * the data is gone" rather than "log in again".
 */

export const API = import.meta.env?.VITE_API_URL || 'http://localhost:5000'

export const adminHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('mbx_admin_token')}`,
})

/**
 * Call this on any admin response. If the token is missing, expired or
 * revoked, drop it and send the browser to the login screen.
 *
 * A full page load is intentional: it restarts AuthContext, which then routes
 * to /admin/login on its own, so every page is covered without threading a
 * logout callback through each one.
 *
 * @returns {boolean} true when the response was a 401 and has been handled.
 */
export function handleUnauthorized(res) {
  if (!res || res.status !== 401) return false
  localStorage.removeItem('mbx_admin_token')
  if (!window.location.pathname.startsWith('/admin/login')) {
    window.location.replace('/admin/login?expired=1')
  }
  return true
}
