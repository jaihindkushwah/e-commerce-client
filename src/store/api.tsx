// import { getDataFromSessionStorage } from "../shared/utils";
import {
  type BaseQueryFn,
  createApi,
  type FetchArgs,
  fetchBaseQuery,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_ENDPOINT = import.meta.env.VITE_BASE_ENDPOINT;

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_ENDPOINT}/api/gateway/v1`,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // const loggedInUsername: string = getDataFromSessionStorage("loggedInuser");
    // await baseQuery(
    //   `/auth/refresh-token/${loggedInUsername}`,
    //   api,
    //   extraOptions
    // );
  }
  return result;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "clientApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Pokemon"],
  endpoints: () => ({}),
});
