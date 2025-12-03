export interface TeamData {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    banner: string | null;
    createdAt: Date | null;
    ownerId: string;
    ownerName: string | null;
    ownerEmail: string | null;
}

export interface EventInfo {
    totalEvents: number;
    hasOngoingEvent: boolean;
}

// Transformed team data returned from API
export interface TeamCardData extends EventInfo {
    id: string;
    name: string;
    slug: string;
    logo: string | null;
    banner: string | null;
    owner: {
        id: string;
        name: string | null;
        email: string | null;
    };
    createdAt: Date | string | null;
}
