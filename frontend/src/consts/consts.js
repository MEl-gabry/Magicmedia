import store from "../store";

const token = store.getState().auth.access;

export const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json'
    }
};