import type { PortfolioStatsResponse, TeamDetailsResponse } from '~~/types/affiliate/portfolio';
import type { ListTeamsQuery, UpdateTeamPayload } from '../../schemas/affiliate/teams';

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

  async function getTeamDetails(teamId: string) {
    try {
      const data = await $fetch<TeamDetailsResponse>(`/api/affiliate/teams/${teamId}`);
      return { data, error: null };
    } catch (error: any) {
      console.error("Failed to fetch team details:", error);
      return { data: null, error: error.message || 'Failed to retrieve team details' };
    }
  }

  async function updateTeam(teamId: string, payload: UpdateTeamPayload) {
    try {
      await $fetch(`/api/affiliate/teams/${teamId}`, {
        method: 'PATCH',
        body: payload,
      });
      return { success: true, error: null };
    } catch (error: any) {
      console.error("Failed to update team:", error);
      return { success: false, error: error.message || 'Failed to update team' };
    }
  }

  return { getStats, getPortfoliosPaginated, getTeamDetails, updateTeam };
}
