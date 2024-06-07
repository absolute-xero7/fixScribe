import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API slice using createApi
export const apiSlice = createApi({
    // Specify the baseQuery configuration with the base URL
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    // Define tagTypes for caching and invalidation
    tagTypes: ['Note', 'User'],
    // Define endpoints using the builder function
    endpoints: builder => ({})
});
