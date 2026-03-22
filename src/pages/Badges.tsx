import { useEffect, useState } from "react"

type Badge = {
  badge_id: number
  badge_name: string
  badge_level: number
  badge_description: string | null
  icon: string | null
  earned: boolean
  earned_at: string | null
}

type Props = {
  userId: number
}

export default function Badges({ userId }: Props) {
  const [earned, setEarned] = useState<Badge[]>([])
  const [unearned, setUnearned] = useState<Badge[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBadges() {
      try {
        const res = await fetch(`/api/badges?userId=${userId}`)
        const data: Badge[] = await res.json()

        setEarned(data.filter(b => b.earned))
        setUnearned(data.filter(b => !b.earned))
      } catch (err) {
        console.error("Failed to fetch badges", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBadges()
  }, [userId])

  if (loading) return <p>Loading badges...</p>

  return (
    <div style={{ padding: "1rem" }}>
      {/* ===================== */}
      {/* EARNED BADGES */}
      {/* ===================== */}
      <h2>🏆 Earned Badges</h2>

      {earned.length === 0 ? (
        <p>No badges earned yet</p>
      ) : (
        <div style={gridStyle}>
          {earned.map(badge => (
            <div key={badge.badge_id} style={earnedCard}>
              <div style={iconStyle}>
                {badge.icon ? (
                  <img src={badge.icon} alt={badge.badge_name} />
                ) : (
                  "🏅"
                )}
              </div>

              <h4>{badge.badge_name}</h4>
              <p style={descStyle}>{badge.badge_description}</p>

              <small>
                Earned:{" "}
                {badge.earned_at
                  ? new Date(badge.earned_at).toLocaleDateString()
                  : ""}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* ===================== */}
      {/* SPACING */}
      {/* ===================== */}
      <div style={{ margin: "2rem 0" }} />

      {/* ===================== */}
      {/* UNEARNED BADGES */}
      {/* ===================== */}
      <h2>🔒 Locked Badges</h2>

      <div style={gridStyle}>
        {unearned.map(badge => (
          <div key={badge.badge_id} style={unearnedCard}>
            <div style={iconStyle}>
              {badge.icon ? (
                <img src={badge.icon} alt={badge.badge_name} />
              ) : (
                "🔒"
              )}
            </div>

            <h4>{badge.badge_name}</h4>
            <p style={descStyle}>{badge.badge_description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

//
// 🎨 Styles (simple inline for now)
//

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "1rem",
}

const earnedCard: React.CSSProperties = {
  padding: "1rem",
  borderRadius: "10px",
  background: "#f5f5f5",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
}

const unearnedCard: React.CSSProperties = {
  ...earnedCard,
  opacity: 0.4,
  filter: "grayscale(100%)",
}

const iconStyle: React.CSSProperties = {
  fontSize: "2rem",
  marginBottom: "0.5rem",
}

const descStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#555",
}