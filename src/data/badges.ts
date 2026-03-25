export type Badge = {
  badge_id: number
  badge_name: string
  badge_level: number
  badge_description: string | null
  icon: string | null
}

export type BadgeWithStatus = Badge & {
  earned: boolean
  earned_at: Date | null
}