import { db } from "../db"

export type Badge = {
  badge_id: number
  badge_name: string
  badge_level: number
  description: string | null
  icon: string | null
}

export type BadgeWithStatus = Badge & {
  earned: boolean
  earned_at: Date | null
}

/**
 * Get all badges + whether the user has earned them
 */
export async function getUserBadges(userId: number): Promise<BadgeWithStatus[]> {
  const query = `
    SELECT 
      b.badge_id,
      b.badge_name,
      b.badge_level,
      b.description,
      b.icon,
      ub.earned_at
    FROM Badges b
    LEFT JOIN User_Badges ub
      ON b.badge_id = ub.badge_id
      AND ub.user_id = $1
    ORDER BY b.badge_level ASC, b.badge_id ASC
  `

  const { rows } = await db.query(query, [userId])

  return rows.map((row: any) => ({
    badge_id: row.badge_id,
    badge_name: row.badge_name,
    badge_level: row.badge_level,
    description: row.description,
    icon: row.icon,
    earned: row.earned_at !== null,
    earned_at: row.earned_at ?? null,
  }))
}

/**
 * Get only earned badges
 */
export async function getEarnedBadges(userId: number): Promise<BadgeWithStatus[]> {
  const badges = await getUserBadges(userId)
  return badges.filter(b => b.earned)
}

/**
 * Get only unearned badges
 */
export async function getUnearnedBadges(userId: number): Promise<BadgeWithStatus[]> {
  const badges = await getUserBadges(userId)
  return badges.filter(b => !b.earned)
}

/**
 * Award a badge to a user
 * (safe against duplicates)
 */
export async function awardBadge(userId: number, badgeId: number): Promise<void> {
  const query = `
    INSERT INTO User_Badges (user_id, badge_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, badge_id)
    DO NOTHING
  `

  await db.query(query, [userId, badgeId])
}

/**
 * Check if user already has a badge
 */
export async function hasBadge(userId: number, badgeId: number): Promise<boolean> {
  const query = `
    SELECT 1
    FROM User_Badges
    WHERE user_id = $1 AND badge_id = $2
    LIMIT 1
  `

  const { rows } = await db.query(query, [userId, badgeId])
  return rows.length > 0
}