
const navLinks = {
  admin: {
    management: [
      { title: "User Management", icon: "users", isActive: false, url: "/admin/users" },
      { title: "Affiliate Programs", icon: "box", isActive: false, url: "/admin/affiliates" },
      { title: "Reports", icon: "bar-chart-2", isActive: false, url: "/admin/reports" },
    ],
    settings: [
      { title: "Site Settings", icon: "settings-2", isActive: false, url: "/admin/settings/site" },
      { title: "Payment Settings", icon: "credit-card", isActive: false, url: "/admin/settings/payments" },
    ]
  },
  client: {
    events: [
      { title: "My Events", icon: "calendar", isActive: false, url: "/client/events" },
      { title: "Create Event", icon: "plus-circle", isActive: false, url: "/client/events/create" },
    ],
    platform: [
      { title: "Profile Settings", icon: "user", isActive: false, url: "/client/settings/profile" },
      { title: "Billing", icon: "credit-card", isActive: false, url: "/client/settings/billing" },
    ]
  }
};

export const useNav = () => {
  const eventId = '123';
  const teamId = '456';

  const affiliateNavLinks = computed(() => ({
    event: !eventId
      ? [
        ...(
          !teamId
            ? []
            : [{ title: "New", icon: "calendar-plus", isActive: false, url: "/affiliate/events/new" }]
        ),
      ]
      : [
        { title: "Overview", icon: "calendar-range", isActive: true, url: `/affiliate/events/${eventId}` },
        { title: "New", icon: "calendar-plus", isActive: false, url: "/affiliate/events/new" },
        {
          title: "Votes", icon: "vote", isActive: false, url: `/affiliate/events/${eventId}/votes`, items: [
            { title: "Overview", url: `/affiliate/events/${eventId}/votes` },
            { title: "Payments", url: `/affiliate/events/${eventId}/votes/payments` },
          ]
        },
        {
          title: "Tickets", icon: "ticket", isActive: false, url: `/affiliate/events/${eventId}/tickets`, items: [
            { title: "Overview", url: `/affiliate/events/${eventId}/tickets` },
            { title: "Sales", url: `/affiliate/events/${eventId}/tickets/sales` },
          ]
        },
        { title: "Settings", icon: "calendar-cog", isActive: false, url: `/affiliate/events/${eventId}/settings` },
      ],
    team: !teamId ? [] : [
      { title: "Overview", icon: "users", isActive: false, url: `/affiliate/teams/${teamId}` },
      { title: "Settings", icon: "user-cog", isActive: false, url: `/affiliate/teams/${teamId}/settings` },
    ],
    platform: [
      { title: "Earnings", icon: "coins", isActive: false, url: "/affiliate/earnings" },
      { title: "Portfolio", icon: "briefcase-business", isActive: false, url: "/affiliate/portfolios" },
      { title: "Settings", icon: "settings-2", isActive: false, url: "/affiliate/settings" },
    ]
  }));

  return {
    affiliateNavLinks,
    adminNavLinks: readonly(navLinks.admin),
    clientNavLinks: readonly(navLinks.client),
    teams: readonly([
      {
        name: "TV3",
        logo: 'gallery-vertical-end', // Replace with actual import if needed
        event: "Ghana's Most Beautiful",
      },
      {
        name: "GH-One TV",
        logo: 'audio-waveform', // Replace with actual import if needed
        event: "BBNaija",
      },
      {
        name: "CBN",
        logo: 'command', // Replace with actual import if needed
        event: "America's Next Top Model",
      },
    ])
  }
}
