import api from "./api";

export const getSubscriptions = async (userType) => {
  try {
    const response = await api.get(`/admin/${userType}-plan-listing`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addOrEditSubscriptionPlan = async (formData, userType) => {
  try {
    const response = await api.post(
      `/admin/${userType}-plan-add-edit`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSubscriptionPlan = async (id, formData, userType) => {
  try {
    const response = await api.post(
      `/admin/${userType}-plan-add-edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlanDetails = async (id, userType) => {
  try {
    const response = await api.get(`/admin/${userType}-plan-view/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deletePlan = async (id, userType) => {
  try {
    const response = await api.get(`/admin/${userType}-plan-delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
