
const navLinks = {
  affiliate: {
    events: [
      { title: "New Event", icon: "calendar-plus", isActive: false, url: "/affiliate/events" },
      {
        title: "Votes", icon: "vote", isActive: true, url: "/affiliate/votes", items: [
          { title: "Dashboard", url: "/affiliate/votes" },
          { title: "Payments", url: "/affiliate/votes/payments" },
        ]
      },
      {
        title: "Tickets", icon: "ticket", isActive: false, url: "/affiliate/tickets", items: [
          { title: "Dashboard", url: "/affiliate/tickets" },
          { title: "Sales", url: "/affiliate/tickets/sales" },
        ]
      },
      { title: "Event Settings", icon: "settings", isActive: false, url: "/affiliate/events/settings" },
    ],
    platform: [
      { title: "Earnings", icon: "coins", isActive: false, url: "/affiliate/earnings" },
      { title: "Portfolio", icon: "briefcase-business", isActive: false, url: "/affiliate/portfolio" },
      { title: "Settings", icon: "settings", isActive: false, url: "/affiliate/settings" },
    ]
  },
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
  return {
    affiliateNavLinks: navLinks.affiliate,
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
