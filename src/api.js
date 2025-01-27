import { ALERT_TYPES } from "./constants";
import { toastAlert } from "./utils";

const url = `${process.env.REACT_APP_BASE_URL}`;

export const userLogoutRequest = async () => {
  try {
    const res = await fetch(`${url}logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const Addbook = async (data, id = null) => {
  try {
    const res = await fetch(id ? `${url}book?id=${id}` : `${url}book`, {
      method: id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
        // content: 'm'
      },
      body: data,
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      console.log("productData?.msg", productData?.msg);
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const Editbook = async (data) => {
  try {
    const res = await fetch(`${url}books`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body: data,
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      console.log("productData?.msg", productData?.msg);
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const Addchapter = async (data) => {
  try {
    const res = await fetch(`${url}chapter`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body: data,
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      console.log("productData?.msg", productData?.msg);
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const Getchaptersdetailbyid = async (id) => {
  console.log("ides", id);
  try {
    const res = await fetch(`${url}bookchapters/${id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const Getbookslist = async (search = null, page = null) => {
  try {
    const res = await fetch(search ? `${url}book/search?search=${search}` : page ? `${url}book?page=${page}&limit=10` : `${url}book`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const GetbooksDelete = async (id) => {
  try {
    const res = await fetch(`${url}book?id=${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const GetBookdetail = async (id) => {
  console.log("ides", id);
  try {
    const res = await fetch(`${url}book?bookId=${id}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const GetUserlist = async () => {
  try {
    const res = await fetch(`${url}profile/user`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const orderData = await res.json(); // Parse response JSON
    console.log(orderData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return orderData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const suspendUser = async (id, isActive) => {
  try {
    const res = await fetch(`${url}profile/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      }, body: JSON.stringify({
        userId: id,
        active: isActive,
      }),
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const orderData = await res.json(); // Parse response JSON
    console.log(orderData, "res");
    if (!res.ok) {
      toastAlert(orderData?.msg, ALERT_TYPES.ERROR);
    } else {
      toastAlert(orderData?.msg, ALERT_TYPES.SUCCESS);
    }

    return orderData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const GetPolicieslist = async () => {
  try {
    const res = await fetch(`${url}content?type=privacy`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const policiesData = await res.json(); // Parse response JSON
    console.log(policiesData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return policiesData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const Getterms = async (type = 'terms') => {
  try {
    const res = await fetch(`${url}content?type=${type}`, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const policiesData = await res.json(); // Parse response JSON
    console.log(policiesData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return policiesData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const Addpolicy = async (data) => {
  try {
    const res = await fetch(`${url}content?type=privacy`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body: data,
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const policyData = await res.json(); // Parse response JSON
    console.log(policyData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      console.log("policyData?.msg", policyData?.msg);
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return policyData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const addPages = async (data) => {
  try {
    const res = await fetch(`${url}pages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body: data,
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      console.log("productData?.msg", productData?.msg);
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};
export const addcategory = async (data) => {
  console.log("mmmm", data);

  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const res = await fetch(data.id ? `${url}category?id=${data.id}` : `${url}category`, {
      method: data.id ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body: formData,
    });

    console.log(res, "res");

    const productData = await res.json();
    console.log(productData, "res");

    if (!res.ok) {
    } else {
    }

    return productData; // Return parsed data
  } catch (error) {
    throw error; // Rethrow error to be handled by caller
  }
};

