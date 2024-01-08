import { UPS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const upsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUpsOptions: builder.query({
      query: () => ({
        url: UPS_URL,
      }),
      providesTags: ["UpsOptions"],
      keepUnusedDataFor: 5,
    }),
    getUpsDetails: builder.query({
      query: (upsId) => ({
        url: `${UPS_URL}/${upsId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createUpsOption: builder.mutation({
      query: () => ({
        url: UPS_URL,
        method: "POST",
      }),
      invalidatesTags: ["UpsOptions"],
    }),
    updateUpsOption: builder.mutation({
      query: (data) => ({
        url: `${UPS_URL}/${data.upsId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UpsOptions"],
    }),
    deleteUpsOption: builder.mutation({
      query: (upsId) => ({
        url: `${UPS_URL}/${upsId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UpsOptions"],
    }),
  }),
});

export const {
  useGetUpsOptionsQuery,
  useGetUpsDetailsQuery,
  useCreateUpsOptionMutation,
  useUpdateUpsOptionMutation,
  useDeleteUpsOptionMutation,
} = upsApiSlice;
