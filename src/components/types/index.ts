import { ComponentType } from "react";

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "AGENT" | "ADMIN" | "USER";

export interface IResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
  // meta: {
  //   page: number;
  //   limit: number;
  //   total: number;
  //   totalPage: number;
  // };
}
