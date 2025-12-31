import axios from "axios";

import type {operations, paths} from "../assets/schema";

export const backendClient = axios.create({baseURL: `${import.meta.env.VITE_API_BASE_URL}`});

export type BackendPaths = paths[keyof paths];

export type BackendPath = BackendPaths[keyof BackendPaths];

export type BackendOperation = BackendPath[keyof BackendPath];

export type BackendResponse<T> = T extends BackendOperation ? Awaited<ReturnType<T>> : never;


const jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhal9hZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzY3MjEyMjYzLCJleHAiOjE3NjgwNzYyNjN9.vCIKWMzE4NPsMDYa30HeM2He2QwS9kokwM21YKTIgin4WlTAgs1GHJuaCGUfoQZ4KGgodNHMi_UtYu3kubIK3w";

backendClient.interceptors.request.use(config => {
    config.headers.set(
        'Authorization', `Bearer ${jwtToken}`
    );
    return config;
});


export const getAllProducts = () => backendClient
    .get<BackendResponse<operations["getAllProducts"]>>("/api/v1/products/all");


export default backendClient;