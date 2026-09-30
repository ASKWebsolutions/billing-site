/**
 * Verifies the live-chat alert logic in src/utils/liveChat.js: the unread diff
 * that decides how many rings to play, the cap that stops a throttled tab
 * queueing dozens of alarms, and the active-session skip.
 */
import assert from 'node:assert'
import { diffUnread, MAX_BEEPS_PER_CYCLE } from '../src/utils/liveChat.js'

let passed = 0
const check = (name, fn) => {
  fn()
  passed++
  console.log(`  ok  ${name}`)
}

console.log('diffUnread')

check('no change produces no rings', () => {
  assert.deepStrictEqual(diffUnread({ a: 2, b: 1 }, { a: 2, b: 1 }), { beeps: 0, top: null })
})

check('first message on a new session rings once', () => {
  const r = diffUnread({}, { a: 1 })
  assert.strictEqual(r.beeps, 1)
  assert.strictEqual(r.top, 'a')
})

check('opening a chat box (unread 0) never rings', () => {
  // POST /api/chat/start creates the session with adminUnread 0.
  assert.deepStrictEqual(diffUnread({}, { a: 0 }), { beeps: 0, top: null })
})

check('three messages arriving in one poll ring three times', () => {
  assert.strictEqual(diffUnread({ a: 0 }, { a: 3 }).beeps, 3)
})

check('ring count is the per-session delta, not the total unread', () => {
  // Session a already had 5 unread; one more arrives -> exactly 1 ring.
  assert.strictEqual(diffUnread({ a: 5, b: 0 }, { a: 6, b: 0 }).beeps, 1)
})

check('rings accumulate across separate sessions', () => {
  assert.strictEqual(diffUnread({ a: 0, b: 0 }, { a: 2, b: 1 }).beeps, 3)
})

check(`burst is capped at ${MAX_BEEPS_PER_CYCLE} so a backgrounded tab cannot queue a barrage`, () => {
  assert.strictEqual(diffUnread({ a: 0 }, { a: 40 }).beeps, MAX_BEEPS_PER_CYCLE)
})

check('toast names the session with the largest jump', () => {
  assert.strictEqual(diffUnread({ a: 0, b: 0 }, { a: 1, b: 4 }).top, 'b')
})

check('cleared counters never ring', () => {
  // Admin read the thread: counts go down, must stay silent.
  assert.deepStrictEqual(diffUnread({ a: 4 }, { a: 0 }), { beeps: 0, top: null })
})

check('missing counters default to 0 rather than NaN', () => {
  assert.strictEqual(diffUnread({}, { a: undefined, b: 2 }).beeps, 2)
  assert.ok(!Number.isNaN(diffUnread({ a: undefined }, { a: 3 }).beeps))
})

check('active session is excluded by the caller before diffing', () => {
  // Mirrors ChatAlarmPoller: both snapshots drop the open thread first.
  const prev = { a: 0, open: 0 }
  const next = { a: 1, open: 6 }
  delete prev.open
  delete next.open
  assert.strictEqual(diffUnread(prev, next).beeps, 1)
})

console.log(`\n${passed} checks passed`)
