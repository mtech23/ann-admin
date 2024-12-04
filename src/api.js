import { ALERT_TYPES } from "./constants";
import { toastAlert } from "./utils";

// const url = "https://custom3.mystagingserver.site/Mike-Smith";
const url = `${process.env.REACT_APP_BASE_URL}api/`;
//SIGN UP
export const userSignUpRequest = async (type, data) => {
  try {
    const res = await fetch(`${url}api/${type}-register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    if (!res.ok) {
      toastAlert(productData?.message, ALERT_TYPES.ERROR);
    } else {
      toastAlert(productData?.message, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};

//LOGIN
export const userLoginRequest = async (data) => {
  try {
    const res = await fetch(`${url}api/user-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert data to JSON string
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const productData = await res.json(); // Parse response JSON
    console.log(productData, "res");
    if (!res.ok) {
      toastAlert(productData?.message, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.message, ALERT_TYPES.SUCCESS);
    }

    return productData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};

//LOGOUT
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

const LogoutData = localStorage.getItem("login");

//AddBook
export const Addbook = async (data, id = null) => {
  try {
    const res = await fetch(id ? `${url}books/${id}` : `${url}books`, {
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

//EditEditBook
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
    const res = await fetch(`${url}chapters`, {
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

//EditChpater
export const Editchapter = async (data) => {
  try {
    const res = await fetch(`${url}chapters`, {
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

//Get Chapter   list
// export const Getchapterslist = async ( ) => {
//   try {
//     const res = await fetch(`${url}chapters`, {
//       method: "Get",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("login")}`,
//       },
//     });
//     console.log(res, "res");
//     // Ensure response is ok before proceeding

//     const productData = await res.json(); // Parse response JSON
//     console.log(productData, "res");
//     if (!res.ok) {
//       // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
//     } else {
//       // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
//     }

//     return productData; // Return parsed data
//   } catch (error) {
//     toastAlert(error, ALERT_TYPES.ERROR); // Handle error
//     throw error; // Rethrow error to be handled by caller
//   }
// };

//Get Books Delete  list
export const Getchaptersbyid = async (id) => {
  try {
    const res = await fetch(`${url}chapters/${id}`, {
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

//Get Books Delete  list
export const DeleteChapter = async (id) => {
  try {
    const res = await fetch(`${url}chapters/${id}`, {
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

//Get chapters  detail
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

//Get Books   list
export const Getbookslist = async () => {
  try {
    const res = await fetch(`${url}books`, {
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

//Get Books Delete  list
export const GetbooksDelete = async (id) => {
  try {
    const res = await fetch(`${url}books/${id}`, {
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

//Get Books  detail
export const GetBookdetail = async (id) => {
  console.log("ides", id);
  try {
    const res = await fetch(`${url}books/${id}`, {
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

// Order Managment
//Get Orders   list
export const GetOrderlist = async () => {
  try {
    const res = await fetch(`${url}orders`, {
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
export const GetUserlist = async () => {
  try {
    const res = await fetch(`${url}user-listing`, {
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
export const suspendUser = async (id) => {
  try {
    const res = await fetch(`${url}suspend-user/${id} `, {
      method: "POST",
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
//Get Order  detail
export const GetOrderdetail = async (id) => {
  console.log("ides", id);
  try {
    const res = await fetch(`${url}view-order/${id}`, {
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

export const getpolicedetail = async (id) => {
  console.log("ides", id);
  try {
    const res = await fetch(`${url}content/${id}`, {
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

// Policies Managment
//Get Orders   list
export const GetPolicieslist = async () => {
  try {
    const res = await fetch(`${url}privacy-policy`, {
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

export const Getterms = async () => {
  try {
    const res = await fetch(`${url}terms-condition`, {
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

//Get Policy Delete
export const GettermsDelete = async (id) => {
  try {
    const res = await fetch(`${url}content/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const policyData = await res.json(); // Parse response JSON
    console.log(policyData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return policyData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};

//AddPolicy
export const Addpolicy = async (data) => {
  try {
    const res = await fetch(`${url}content`, {
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

//EditPolicy
export const Editpolicy = async (data) => {
  try {
    const res = await fetch(`${url}content`, {
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

//Get Policy Delete
export const GetpolicyDelete = async (id) => {
  try {
    const res = await fetch(`${url}content/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
    });
    console.log(res, "res");
    // Ensure response is ok before proceeding

    const policyData = await res.json(); // Parse response JSON
    console.log(policyData, "res");
    if (!res.ok) {
      // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
    } else {
      // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
    }

    return policyData; // Return parsed data
  } catch (error) {
    toastAlert(error, ALERT_TYPES.ERROR); // Handle error
    throw error; // Rethrow error to be handled by caller
  }
};

// export const addPages = async ( ) => {

//   try {
//     const res = await fetch(`${url}pages`, {
//       method: "Post",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("login")}`,
//       },
//     });
//     console.log(res, "res");
//     // Ensure response is ok before proceeding

//     const productData = await res.json(); // Parse response JSON
//     console.log(productData, "res");
//     if (!res.ok) {
//       // toastAlert(productData?.msg, ALERT_TYPES.ERROR);
//     } else {
//       // toastAlert(productData?.msg, ALERT_TYPES.SUCCESS);
//     }

//     return productData; // Return parsed data
//   } catch (error) {
//     toastAlert(error, ALERT_TYPES.ERROR); // Handle error
//     throw error; // Rethrow error to be handled by caller
//   }
// };

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

export const Addquestions = async (data) => {
  try {
    const res = await fetch(`${url}questions`, {
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

export const Getpagedetail = async (id) => {
  try {
    const res = await fetch(`${url}pages/${id}`, {
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

export const pageDelete = async (id) => {
  try {
    const res = await fetch(`${url}pages/${id}`, {
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

export const fetchCategoriesOptions = async () => {
  try {
    const res = await fetch(`${url}categories`, {
      method: "GET",
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
export const addcategory = async (data) => {
  console.log("mmmm", data);

  const formData = new FormData();

  for (const key in data) {
    formData.append(key, data[key]);
  }

  try {
    const res = await fetch(`${url}addcategory`, {
      method: "POST",
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

export const handlePin = async (id) => {
  const formData = new FormData();
  formData.append("book_id", id);
  try {
    const res = await fetch(`${url}pin`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("login")}`,
      },
      body: formData,
    });
    return res;
  } catch (error) {
    console.log("error", error);
  }
};
