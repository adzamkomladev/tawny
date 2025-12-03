import type { PortfolioStatsResponse } from '~~/types/affiliate/portfolio';
import type { ListTeamsQuery } from '../../schemas/affiliate/teams';

export const usePortfolio = () => {
  async function getStats() {
    try {
      const { stats } = await $fetch<PortfolioStatsResponse>('/api/affiliate/portfolio/stats');
      return { stats, error: null };
    } catch (error) {
      console.error("Failed to fetch portfolio stats:", error);
      return { stats: null, error };
    }
  }

  async function getPortfoliosPaginated(query: ListTeamsQuery) {
    try {
      const { data } = await $fetch('/api/affiliate/teams', { query });
      return { data, error: null };
    } catch (error: any) {
      console.error("Failed to fetch portfolios:", error);
      return { data: null, error: error.message || 'Failed to retrieve portfolios' };
    }
  }

  return { getStats, getPortfoliosPaginated };
}
