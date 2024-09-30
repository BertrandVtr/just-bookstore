import axios, { Axios } from "axios";

export default function (path: string): Axios {
    const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
    const baseURL = `${apiUrl}${path}`;

    return axios.create({ baseURL })
}
