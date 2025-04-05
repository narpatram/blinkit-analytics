import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs(import.meta.env.VITE_CUBEJS_TOKEN, {
  apiUrl: `${import.meta.env.VITE_CUBEJS_API_URL}/cubejs-api/v1`,
});

export default cubejsApi;
