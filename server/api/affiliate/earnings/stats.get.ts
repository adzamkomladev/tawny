import { EarningsStatsResponse } from "~~/types/affiliate/earnings";


export default defineEventHandler(async (event): Promise<EarningsStatsResponse> => {
  const { user } = requireAuth(event);

  const db = useDb();

  // Verify user is an affiliate
  const dbUser = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, user.id),
    columns: { role: true },
  });

  if (dbUser?.role !== 'affiliate') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Only affiliates can access this resource',
    });
  }

  // TODO: Replace with actual database queries when data is available
  // Using dummy data for now
  const dummyData = {
    totalEarned: { current: 12450.0, monthAgo: 10200.0 },
    currentBalance: { current: 3250.75, monthAgo: 2800.0 },
    totalEventsProfited: { current: 24, monthAgo: 18 },
    futureProfit: { current: 1850.5, dayAgo: 1720.0 },
  };

  const totalEarnedChange = calculatePercentageChange(
    dummyData.totalEarned.current,
    dummyData.totalEarned.monthAgo
  );

  const currentBalanceChange = calculatePercentageChange(
    dummyData.currentBalance.current,
    dummyData.currentBalance.monthAgo
  );

  const totalEventsProfitedChange = calculatePercentageChange(
    dummyData.totalEventsProfited.current,
    dummyData.totalEventsProfited.monthAgo
  );

  const futureProfitChange = calculatePercentageChange(
    dummyData.futureProfit.current,
    dummyData.futureProfit.dayAgo
  );

  return {
    success: true,
    stats: {
      totalEarned: {
        label: 'Total Earned (Lifetime)',
        value: dummyData.totalEarned.current,
        formattedValue: formatCurrency(dummyData.totalEarned.current),
        change: totalEarnedChange,
        changeLabel: 'from last month',
        trend: getTrend(totalEarnedChange),
      },
      currentBalance: {
        label: 'Current Balance',
        value: dummyData.currentBalance.current,
        formattedValue: formatCurrency(dummyData.currentBalance.current),
        change: currentBalanceChange,
        changeLabel: 'from last month',
        trend: getTrend(currentBalanceChange),
      },
      totalEventsProfited: {
        label: 'Events Profited From',
        value: dummyData.totalEventsProfited.current,
        formattedValue: dummyData.totalEventsProfited.current.toString(),
        change: totalEventsProfitedChange,
        changeLabel: 'from last month',
        trend: getTrend(totalEventsProfitedChange),
      },
      futureProfit: {
        label: 'Future Profit',
        value: dummyData.futureProfit.current,
        formattedValue: formatCurrency(dummyData.futureProfit.current),
        change: futureProfitChange,
        changeLabel: 'from yesterday',
        trend: getTrend(futureProfitChange),
      },
    },
  };
});

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

const getTrend = (change: number): 'up' | 'down' | 'neutral' => {
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return 'neutral';
};