import { BASE_URL, TIME_OUT } from "./config";
import Request from "./request";

const httpRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
});

export const http2Request = new Request({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config;
    },
    requestErrorFn: (error) => {
      return error;
    },
    responseSuccessFn: (config) => {
      return config;
    },
    responseErrorFn: (error) => {
      return error;
    }
  }
});
export default httpRequest;
