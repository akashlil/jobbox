import { apiSlice } from "../api/apiSlice";
import { getUser } from "../authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (bulider) => ({
    regiseter: bulider.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        const datas = await queryFulfilled;
        dispatch(getUser(data.email));
      },
    }),
  }),
});

export const { useRegiseterMutation } = authApi;
