import type {components} from "./schema";

export interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export type Schema = components["schemas"];

export type NewCategory = Omit<Schema["Category"], "id" | "version">;