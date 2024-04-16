import api from "configs/api";

const addCategory = (data) => api.post("category", data);

const getCategory = () => api.get("category");

const removeCategory = async (id) => await api.delete(`category/${id}`);

export { addCategory, getCategory, removeCategory };
