/**
 * Manage the state of a number ref in a clean way.
 *
 * Supports, setting, incrementing, decrementing, and resetting.
 *
 * Access the raw ref through the `ref` property.
 */
export class NumRefManager {
  max: number

  current: number = 0

  min: number = 0

  constructor(max?: number, min?: number) {
    this.max = max || 0
    this.min = min || 0
  }

  public set value(index: number) {
    this.current = index % (this.max + 1)
  }

  public get value() {
    return this.current
  }

  public next = () => {
    this.current += 1
    if (this.current > this.max) this.current = this.min
  }

  public prev = () => {
    this.current -= 1
    if (this.current < this.min) this.current = this.max
  }
}

export const KEY_CODES = {
  ARROW_LEFT: "ArrowLeft",
  ARROW_LEFT_IE11: "Left",
  ARROW_RIGHT: "ArrowRight",
  ARROW_RIGHT_IE11: "Right",
  ARROW_UP: "ArrowUp",
  ARROW_UP_IE11: "Up",
  ARROW_DOWN: "ArrowDown",
  ARROW_DOWN_IE11: "Down",
  ESCAPE: "Escape",
  ESCAPE_IE11: "Esc",
  TAB: "Tab",
  SPACE: " ",
  SPACE_IE11: "Spacebar",
  ENTER: "Enter",
}

/**
 * Check if an element is in the viewport
 * @param el - The element to check
 * @returns {boolean} - Whether the element is in the viewport
 */
export function elementIsInWindow(el: Element): boolean {
  // return false in SSR mode
  if (typeof window === "undefined") return false

  // otherwise, check status of element.
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom
      <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right
      <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const eps = 1

export function elementIsAtTop(el: Element) {
  const rect = el.getBoundingClientRect()
  return -eps <= rect.top && rect.top <= eps
}

export function elementIsAtBottom(el: Element) {
  const rect = el.getBoundingClientRect()
  return -eps + window.innerHeight <= rect.bottom && rect.bottom <= eps + window.innerHeight
}

export function elementIsBelowScreen(el: Element) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}

export function elementIsAboveScreen(el: Element) {
  const rect = el.getBoundingClientRect()
  return rect.bottom < 0
}

/**
 * Get comment date as string.
 *
 * `today?` return time as string.
 *
 * `yesterday?`, return 'yesterday'.
 *
 * `< 5 days ago?`, return number of days.
 *
 * `otherwise`, return date as string
 */
export function getCommentDateAsString(date: Date) {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const daysAgo = new Date()
  daysAgo.setDate(today.getDate() - 5)

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  } else if (date > daysAgo) {
    return `${Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24))} days ago`
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
  }
}

export default () => ({
  NumRefManager,
  getCommentDateAsString,
  KEY_CODES,
  loaderDelay: 2000,
  elementIsInWindow,
  elementIsAtTop,
  elementIsAtBottom,
  elementIsBelowScreen,
  elementIsAboveScreen,
})
