import type { AxiosRequestConfig, AxiosResponse } from "axios";
interface HttpRecptors<T> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestErrorFn?: (error: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseErrorFn?: (error: any) => any;
}

export interface HttpReuqestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HttpRecptors<T>;
}
