import AppLayout from "@/components/AppLayout";
import { badges } from "@/data/lessons";

const Badges = () => {
  const earnedBadges = badges.filter((b) => b.earned);
  const unearnedBadges = badges.filter((b) => !b.earned);

  return (
    <AppLayout>
      <div className="px-5 py-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Badges</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {earnedBadges.length} of {badges.length} earned
          </p>
        </div>

        {/* Earned */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🏅</span>
            <h3 className="text-base font-bold text-foreground">Earned</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-card card-elevated border border-primary/20 rounded-2xl p-4 flex flex-col items-center gap-2"
              >
                <span className="text-4xl">{badge.emoji}</span>
                <span className="text-xs font-semibold text-foreground text-center leading-tight">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Locked */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🔒</span>
            <h3 className="text-base font-bold text-foreground">Locked</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {unearnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-muted/50 rounded-2xl p-4 flex flex-col items-center gap-2 opacity-50"
              >
                <span className="text-4xl">{badge.emoji}</span>
                <span className="text-xs font-semibold text-foreground text-center leading-tight">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Badges;