export interface AffiliateProfile {
  verified: boolean;
}

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  affiliate: AffiliateProfile;
}

export interface ProfileEvent {
  id: string;
  teamId: string;
  title: string;
  slug: string;
  logo: string | null;
}

export interface ProfileTeam {
  id: string;
  ownerId: string;
  affiliateId: string | null;
  name: string;
  slug: string;
  logo: string | null;
  events: ProfileEvent[];
}

export interface ProfileSelected {
  teamId: string | null;
  eventId: string | null;
}

export interface AuthProfile extends ProfileUser {
  teams: ProfileTeam[];
  selected: ProfileSelected | null;
}
