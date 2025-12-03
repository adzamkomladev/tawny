import * as z from 'zod';

// Query schema for earnings chart data
export const earningsChartQuerySchema = z.object({
    period: z.enum(['day', 'week', 'month']).default('month'),
    range: z.coerce.number().int().min(1).max(12).default(6),
});

export type EarningsChartQuery = z.infer<typeof earningsChartQuerySchema>;
