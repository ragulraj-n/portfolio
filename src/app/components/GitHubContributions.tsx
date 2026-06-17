import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "../data/profile";

function formatDate(dateString: string): string {
  try {
    // Parse as UTC to avoid timezone offset issues
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateString;
  }
}

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface MonthLabel {
  name: string;
  columnIndex: number;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  content: string;
}

const DAY_LABELS = [
  { name: 'Mon', rowIndex: 1 },
  { name: 'Wed', rowIndex: 3 },
  { name: 'Fri', rowIndex: 5 },
];

function calculateMonthLabels(days: ContributionDay[]): MonthLabel[] {
  const labels: MonthLabel[] = [];
  let currentMonth = -1;
  days.forEach((day, index) => {
    const columnIndex = Math.floor(index / 7);
    const [year, month] = day.date.split('-').map(Number);
    const date = new Date(year, month - 1, 1);
    const m = date.getMonth();
    if (m !== currentMonth) {
      currentMonth = m;
      labels.push({
        name: date.toLocaleDateString('en-US', { month: 'short' }),
        columnIndex,
      });
    }
  });
  return labels;
}

export function GitHubContributions() {
  const [days, setDays] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const username = encodeURIComponent(profile.contact.githubUsername);
        const url = `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();

        // Extract contribution days directly from the contributions array
        const allDays: ContributionDay[] = json.contributions || [];
        setDays(allDays);
        
        // Get total from lastYear
        setTotalCount(json.total?.lastYear || 0);
        setLoading(false);
      } catch (err) {
        console.error("GitHub contributions fetch error:", err);
        
        // Try fallback URL
        try {
          const username = encodeURIComponent(profile.contact.githubUsername);
          const fallbackUrl = `https://github-contributions-api.jogruber.de/v4/${username}`;
          const fallbackResponse = await fetch(fallbackUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            mode: 'cors'
          });

          if (!fallbackResponse.ok) {
            throw new Error(`Fallback HTTP error! status: ${fallbackResponse.status}`);
          }

          const fallbackJson = await fallbackResponse.json();

          const allDays: ContributionDay[] = fallbackJson.contributions || [];
          
          setDays(allDays);
          setTotalCount(fallbackJson.total?.lastYear || 0);
          setLoading(false);
        } catch (fallbackErr) {
          console.error("Fallback also failed:", fallbackErr);
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchContributions();
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "#ebedf0";
      case 1: return "#b6d4f7";
      case 2: return "#6baed6";
      case 3: return "#2171b5";
      case 4: return "#084594";
      default: return "#ebedf0";
    }
  };

  const handleMouseEnter = (e: React.MouseEvent, day: ContributionDay) => {
    const content = day.count === 0
      ? `No contributions on ${formatDate(day.date)}`
      : `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formatDate(day.date)}`;
    const x = e.clientX + 12;
    const y = e.clientY - 36;
    setTooltip({ visible: true, x, y, content });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip(prev => prev ? { ...prev, x: e.clientX + 12, y: e.clientY - 36 } : null);
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <section id="github-contributions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#F5F0E8] border-[3px] border-[#1A1A1A] p-5 sm:p-6"
          style={{ boxShadow: "5px 5px 0px #1A1A1A" }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <span
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
              className="text-[11px] uppercase text-[#1A1A1A]"
            >
              Contributions
            </span>
            {!loading && !error && totalCount > 0 && (
              <span
                style={{ fontFamily: 'var(--font-mono)' }}
                className="text-sm font-bold text-[#1A1A1A]"
              >
                {totalCount} last year
              </span>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="overflow-x-auto">
              <div className="inline-grid grid-cols-[repeat(53,12px)] grid-rows-7 gap-[3px] min-w-max">
                {Array.from({ length: 53 * 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3"
                    style={{ backgroundColor: "#E8E3D8" }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ fontFamily: 'var(--font-mono)' }} className="text-sm text-[#1A1A1A] text-center py-8">
              Contribution data unavailable
            </div>
          )}

          {/* Contribution Grid */}
          {!loading && !error && days.length > 0 && (() => {
            const monthLabels = calculateMonthLabels(days);
            const CELL = 12;
            const GAP = 3;
            const STEP = CELL + GAP; // 15px per column/row
            const gridWidth = 53 * CELL + 52 * GAP; // 53 cols
            const gridHeight = 7 * CELL + 6 * GAP;  // 7 rows = 102px
            const DAY_LABEL_WIDTH = 28;

            return (
              <>
                <div className="overflow-x-auto">
                  <div style={{ minWidth: 'max-content' }}>
                    {/* Month labels row — offset by day label width */}
                    <div style={{ paddingLeft: DAY_LABEL_WIDTH, marginBottom: 4 }}>
                      <div style={{ position: 'relative', height: 16, width: gridWidth }}>
                        {monthLabels.reduce<{ labels: MonthLabel[]; lastX: number }>(
                          (acc, label) => {
                            const x = label.columnIndex * STEP;
                            if (x - acc.lastX >= 28) {
                              acc.labels.push(label);
                              acc.lastX = x;
                            }
                            return acc;
                          },
                          { labels: [], lastX: -28 }
                        ).labels.map((label) => (
                          <span
                            key={`${label.name}-${label.columnIndex}`}
                            style={{
                              position: 'absolute',
                              left: label.columnIndex * STEP,
                              top: 0,
                              fontFamily: 'var(--font-mono)',
                              fontSize: 11,
                              color: 'rgba(26,26,26,0.6)',
                              whiteSpace: 'nowrap',
                              lineHeight: '16px',
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Day labels + Grid row */}
                    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
                      {/* Day labels column */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: DAY_LABEL_WIDTH - 4,
                          height: gridHeight,
                          justifyContent: 'space-between',
                          paddingTop: 0,
                        }}
                      >
                        {/* 7 rows: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6 */}
                        {[0, 1, 2, 3, 4, 5, 6].map((rowIdx) => {
                          const label = DAY_LABELS.find(d => d.rowIndex === rowIdx);
                          return (
                            <div
                              key={rowIdx}
                              style={{
                                height: CELL,
                                lineHeight: `${CELL}px`,
                                fontFamily: 'var(--font-mono)',
                                fontSize: 11,
                                color: 'rgba(26,26,26,0.6)',
                                textAlign: 'right',
                              }}
                            >
                              {label ? label.name : ''}
                            </div>
                          );
                        })}
                      </div>

                      {/* Contribution grid */}
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: `repeat(53, ${CELL}px)`,
                          gridTemplateRows: `repeat(7, ${CELL}px)`,
                          gap: GAP,
                        }}
                      >
                        {days.map((day, index) => (
                          <motion.div
                            key={`${day.date}-${index}`}
                            style={{ backgroundColor: getLevelColor(day.level), width: CELL, height: CELL }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.001 }}
                            whileHover={{ scale: 1.3 }}
                            onMouseEnter={(e) => handleMouseEnter(e, day)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  <span style={{ fontFamily: 'var(--font-mono)' }} className="text-[11px] text-[#1A1A1A] opacity-60">Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className="w-3 h-3" style={{ backgroundColor: getLevelColor(level) }} />
                  ))}
                  <span style={{ fontFamily: 'var(--font-mono)' }} className="text-[11px] text-[#1A1A1A] opacity-60">More</span>
                </div>
              </>
            );
          })()}
        </motion.div>

        {/* View GitHub Button */}
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              fontFamily: 'var(--font-mono)',
              boxShadow: "3px 3px 0px #1A1A1A"
            }}
            className="px-6 py-3 border-[2px] border-[#1A1A1A] bg-transparent text-[#1A1A1A] text-sm uppercase tracking-wide"
            whileHover={{
              y: -2,
              boxShadow: "4px 4px 0px #1A1A1A",
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            View GitHub →
          </motion.a>
        </motion.div>
      </div>

      {/* Custom Tooltip */}
      {tooltip?.visible && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: '#1A1A1A',
            color: '#F5F0E8',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            padding: '6px 10px',
            borderRadius: 0,
            pointerEvents: 'none',
            zIndex: 99999,
            whiteSpace: 'nowrap',
          }}
        >
          {tooltip.content}
        </div>
      )}
    </section>
  );
}
