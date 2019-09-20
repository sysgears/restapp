export const getItem = async (name: string) => window.localStorage.getItem(name);
export const setItem = async (name: string, value: string) => window.localStorage.setItem(name, value);
export const removeItem = async (name: string) => window.localStorage.removeItem(name);
