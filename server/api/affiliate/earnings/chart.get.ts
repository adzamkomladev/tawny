import { ChartDataResponse, EarningsDataPoint, EventsDataPoint, PeriodType } from '~~/types/affiliate/earnings';
import { earningsChartQuerySchema } from '~~/schemas/affiliate/earnings';

export default defineEventHandler(async (event): Promise<ChartDataResponse> => {
  const { user } = requireAuth(event);

  const { period: periodType, range } = await getValidatedQuery(event, earningsChartQuerySchema.parse);

  // Generate period ranges for both charts
  const earningsPeriods = generatePeriodRange(periodType, range);
  const eventsPeriods = generatePeriodRange('month', range);

  // TODO: Replace with actual database queries when earnings data is available
  // Using dummy data for now - simulates realistic affiliate earnings patterns
  const generateDummyEarnings = (): EarningsDataPoint[] => {
    return earningsPeriods.map((date) => {
      // Simulate varying earnings with some randomness for realistic chart
      const baseAmount = 1500 + Math.random() * 2000;
      const seasonalMultiplier = 0.8 + Math.sin(date.getMonth() * 0.5) * 0.4;
      const earnings = Math.round(baseAmount * seasonalMultiplier * 100) / 100;

      return {
        period: getPeriodKey(date, periodType),
        label: getPeriodLabel(date, periodType),
        earnings,
        formattedEarnings: formatCurrency(earnings),
      };
    });
  };

  const generateDummyEvents = (): EventsDataPoint[] => {
    return eventsPeriods.map((date) => {
      // Simulate varying event counts
      const eventsCount = Math.floor(2 + Math.random() * 6);

      return {
        month: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
        label: getMonthLabel(date),
        eventsCount,
      };
    });
  };

  const earningsData = generateDummyEarnings();
  const eventsData = generateDummyEvents();

  const totalEarnings = earningsData.reduce((sum, item) => sum + item.earnings, 0);
  const totalEvents = eventsData.reduce((sum, item) => sum + item.eventsCount, 0);

  return {
    success: true,
    earnings: {
      data: earningsData,
      totalEarnings,
      formattedTotalEarnings: formatCurrency(totalEarnings),
      periodType,
    },
    events: {
      data: eventsData,
      totalEvents,
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

const getMonthLabel = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getWeekLabel = (date: Date): string => {
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - date.getDay());
  return `Week of ${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
};

const getDayLabel = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const getPeriodKey = (date: Date, periodType: PeriodType): string => {
  switch (periodType) {
    case 'day':
      return date.toISOString().split('T')[0];
    case 'week': {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      return weekStart.toISOString().split('T')[0];
    }
    case 'month':
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }
};

const getPeriodLabel = (date: Date, periodType: PeriodType): string => {
  switch (periodType) {
    case 'day':
      return getDayLabel(date);
    case 'week':
      return getWeekLabel(date);
    case 'month':
      return getMonthLabel(date);
  }
};

const generatePeriodRange = (periodType: PeriodType, range: number): Date[] => {
  const periods: Date[] = [];
  const now = new Date();

  for (let i = range - 1; i >= 0; i--) {
    const date = new Date(now);
    switch (periodType) {
      case 'day':
        date.setDate(date.getDate() - i);
        break;
      case 'week':
        date.setDate(date.getDate() - i * 7);
        break;
      case 'month':
        date.setMonth(date.getMonth() - i);
        break;
    }
    periods.push(date);
  }

  return periods;
};