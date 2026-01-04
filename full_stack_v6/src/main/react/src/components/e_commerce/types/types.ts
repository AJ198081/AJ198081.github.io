import type {components} from "./schema";

export interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export type Schema = components["schemas"];

export type NewProduct = Omit<Schema["Product"], "id" | "version" | "auditMetaData" | "images">
    & { images: FileList };

export type NewCategory = Omit<Schema["Category"], "id" | "version">;