import axiosInstance from "./axiosInstance.js";

export const getGameId = async (username) => {
    try {
        const response = await axiosInstance.get(`/gameId/${username}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getNameOponent = async (username, gameId) => {
    try {
        const response = await axiosInstance.get(`/name-opponent/${username}/${gameId}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}