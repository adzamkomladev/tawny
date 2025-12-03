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

export interface TeamOwner {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
}

export interface TeamEvent {
    id: string;
    title: string;
    slug: string;
    status: string;
    startDate: Date | string | null;
    endDate: Date | string | null;
    venue: string | null;
    ticketsSold: number;
    totalRevenue: number;
}

export interface TeamEarnings {
    totalRevenue: number;
    totalFees: number;
    affiliateShare: number;
    pendingPayout: number;
    lastPayoutDate: Date | string | null;
}

export interface TeamDetails {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    tags: string[];
    logo: string | null;
    banner: string | null;
    createdAt: Date | string | null;
    owner: TeamOwner;
    stats: {
        totalEvents: number;
        liveEvents: number;
        totalTicketsSold: number;
    };
    earnings: TeamEarnings;
    recentEvents: TeamEvent[];
}

export interface TeamDetailsResponse {
    success: boolean;
    data: TeamDetails;
}