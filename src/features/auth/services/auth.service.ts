import { api } from "../../../store/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Pokemon"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Pokemon"],
    }),
  }),
});
export const { useLoginMutation } = authApi;
