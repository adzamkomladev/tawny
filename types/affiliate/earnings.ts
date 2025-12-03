export type PeriodType = 'day' | 'week' | 'month';

export interface EarningsDataPoint {
    period: string;
    label: string;
    earnings: number;
    formattedEarnings: string;
}

export interface EventsDataPoint {
    month: string;
    label: string;
    eventsCount: number;
}

export interface ChartDataResponse {
    success: boolean;
    earnings: {
        data: EarningsDataPoint[];
        totalEarnings: number;
        formattedTotalEarnings: string;
        periodType: PeriodType;
    };
    events: {
        data: EventsDataPoint[];
        totalEvents: number;
    };
}

export interface StatCard {
    label: string;
    value: number;
    formattedValue: string;
    change: number;
    changeLabel: string;
    trend: 'up' | 'down' | 'neutral';
}

export interface EarningsStatsResponse {
    success: boolean;
    stats: {
        totalEarned: StatCard;
        currentBalance: StatCard;
        totalEventsProfited: StatCard;
        futureProfit: StatCard;
    };
}