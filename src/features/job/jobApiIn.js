import { apiSlice } from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    addJob: bulider.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),

    getjobs: bulider.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["jobs"],
    }),

    getJobById: bulider.query({
      query: (id) => ({
        url: `/job/${id}`,
        method: "GET",
      }),
      providesTags: ["jobById"],
    }),

    applyJob: bulider.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["jobById"],
    }),

    getApplyJobList: bulider.query({
      query: (email) => ({
        url: `/applied-jobs/${email}`,
      }),
    }),
  }),
});

export const {
  useAddJobMutation,
  useGetjobsQuery,
  useGetJobByIdQuery,
  useApplyJobMutation,
  useGetApplyJobListQuery,
} = jobApi;
