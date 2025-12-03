import { PortfolioStatsResponse } from '~~/types/affiliate/portfolio';

export default defineEventHandler(async (event): Promise<PortfolioStatsResponse> => {
  // const { user } = requireAuth(event);

  // TODO: Replace with actual database queries when data is available
  // Using dummy data for now
  const dummyData = {
    totalTeams: { current: 8, monthAgo: 5 },
    totalEvents: { current: 42, monthAgo: 35 },
    liveEvents: { current: 3, monthAgo: 2 },
  };

  const totalTeamsChange = calculatePercentageChange(
    dummyData.totalTeams.current,
    dummyData.totalTeams.monthAgo
  );

  const totalEventsChange = calculatePercentageChange(
    dummyData.totalEvents.current,
    dummyData.totalEvents.monthAgo
  );

  const liveEventsChange = calculatePercentageChange(
    dummyData.liveEvents.current,
    dummyData.liveEvents.monthAgo
  );

  return {
    success: true,
    stats: {
      totalTeams: {
        label: 'Total Teams',
        value: dummyData.totalTeams.current,
        formattedValue: dummyData.totalTeams.current.toString(),
        change: totalTeamsChange,
        changeLabel: 'from last month',
        trend: getTrend(totalTeamsChange),
      },
      totalEvents: {
        label: 'Total Events',
        value: dummyData.totalEvents.current,
        formattedValue: dummyData.totalEvents.current.toString(),
        change: totalEventsChange,
        changeLabel: 'from last month',
        trend: getTrend(totalEventsChange),
      },
      liveEvents: {
        label: 'Live Events',
        value: dummyData.liveEvents.current,
        formattedValue: dummyData.liveEvents.current.toString(),
        change: liveEventsChange,
        changeLabel: 'from last month',
        trend: getTrend(liveEventsChange),
      },
    },
  };
});


const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

const getTrend = (change: number): 'up' | 'down' | 'neutral' => {
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return 'neutral';
};