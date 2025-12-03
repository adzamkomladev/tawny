export interface StatCard {
    label: string;
    value: number;
    formattedValue: string;
    change: number;
    changeLabel: string;
    trend: 'up' | 'down' | 'neutral';
}

export interface PortfolioStatsResponse {
    success: boolean;
    stats: {
        totalTeams: StatCard;
        totalEvents: StatCard;
        liveEvents: StatCard;
    };
}