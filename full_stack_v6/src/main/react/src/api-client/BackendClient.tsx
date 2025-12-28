import axios from "axios";

import type {operations, paths} from "../assets/schema";

export const backendClient = axios.create({baseURL: `${import.meta.env.VITE_API_BASE_URL}`});

export type BackendPaths = paths[keyof paths];

export type BackendPath = BackendPaths[keyof BackendPaths];

export type BackendOperation = BackendPath[keyof BackendPath];

export type BackendResponse<T> = T extends BackendOperation ? Awaited<ReturnType<T>> : never;


const jwtToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhal9hZG1pbiIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzY2OTU2MDYwLCJleHAiOjE3NjcwNDI0NjB9.tkZ_F7-oOWlPLBJeYfDs04w6fSM6_7kEGGT8mm58s2d8PVIdX5tk82YAIYyxzw7gfxeGQrnykSnMCNS5yOgF3A";

backendClient.interceptors.request.use(config => {
    config.headers.set(
        'Authorization', `Bearer ${jwtToken}`
    );
    return config;
});


export const getAllProducts = () => backendClient
    .get<BackendResponse<operations["getAllProducts"]>>("/api/v1/products/all");


export default backendClient;