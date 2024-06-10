import { apiSlice } from "../../app/api/apiSlice"; // Importing apiSlice from the application API
import { logOut, setCredentials } from "./authSlice"; // Importing actions from authSlice

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Mutation for login
        login: builder.mutation({
            query: credentials => ({
                url: '/auth', // API endpoint for login
                method: 'POST', // HTTP method
                body: { ...credentials } // Request body containing credentials
            })
        }),
        // Mutation for logout
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout', // API endpoint for logout
                method: 'POST', // HTTP method
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; // Awaiting the response
                    console.log(data);
                    dispatch(logOut()); // Dispatching logOut action
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState()); // Resetting API state after a timeout
                    }, 1000);
                } catch (err) {
                    console.log(err); // Logging error
                }
            }
        }),
        // Mutation for refreshing token
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh', // API endpoint for token refresh
                method: 'GET', // HTTP method
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled; // Awaiting the response
                    console.log(data);
                    const { accessToken } = data; // Extracting access token from response
                    dispatch(setCredentials({ accessToken })); // Dispatching setCredentials action
                } catch (err) {
                    console.log(err); // Logging error
                }
            }
        }),
    })
});

export const {
    useLoginMutation, // Exporting hook for login mutation
    useSendLogoutMutation, // Exporting hook for logout mutation
    useRefreshMutation, // Exporting hook for refresh mutation
} = authApiSlice; // Exporting authApiSlice
