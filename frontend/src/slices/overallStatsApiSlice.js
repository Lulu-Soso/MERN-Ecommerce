import { OVERALLSTATS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const overallStatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOverallStats: builder.query({
      query: () => ({
        url: OVERALLSTATS_URL,
      }),
      providesTags: ["OverallStats"],
      keepUnusedDataFor: 5,
    }),
    updateOverallStats: builder.mutation({
      query: (data) => ({
        url: `${OVERALLSTATS_URL}/${data.overallStatsId}`,
        method: 'PUT',
        body: data,
      }),
      providesTags: ["OverallStats"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetOverallStatsQuery,
  useUpdateOverallStatsMutation,
} = overallStatsApiSlice;