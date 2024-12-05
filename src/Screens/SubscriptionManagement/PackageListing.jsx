import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import {
  getSubscriptions,
  addOrEditSubscriptionPlan,
  updateSubscriptionPlan,
  deletePlan
} from "../../services/subscriptionServices";
import "./style.css";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import PricingCard from "../PricingCard";

export const PackageListing = () => {
  const [role, setRole] = useState("model");
  const [planDuration, setPlanDuration] = useState("monthly");
  const [subscriptions, setSubscriptions] = useState([
    {
      plan: {
        id: 2,
        plan_type: 1,
        name: "Gold Plan model",
        points: "Good ,Easy Money",
        posts_limit: {
          value: 12,
          text: "12 Posts/Month"
        },
        messages_limit: {
          value: 30,
          text: "30 text message limit but, up to 10 outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 80,
          text: "Keep 80% of Sales"
        },
        tips_percent: {
          value: 100,
          text: "Keep 100% of Tips"
        },
        platinum_percent: {
          value: 20,
          text: "Earn 20% in Platinum Points on Sales"
        },
        requests: {
          value: 1,
          text: "can View Request but Can't Accept"
        },
        boost_limit: {
          value: 11,
          text: "11 Posts Boost/Month"
        },
        pricing_options: {
          monthly: 23,
          yearly: 123,
          month_platinum_points: "12"
        }
      },
      role: "model"
    },
    {
      plan: {
        id: 13,
        plan_type: 2,
        name: "Platinum Plan model",
        points: "Awesome Money",
        posts_limit: {
          value: 20,
          text: "20 Posts/Month"
        },
        messages_limit: {
          value: 100,
          text: "No text message limit and unlimited outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 30,
          text: "Keep 30% of Sales"
        },
        tips_percent: {
          value: 100,
          text: "Keep 100% of Tips"
        },
        platinum_percent: {
          value: 30,
          text: "Earn 30% in Platinum Points on Sales"
        },
        requests: {
          value: 111,
          text: "Request can be Accept"
        },
        boost_limit: {
          value: 20,
          text: "20 Posts Boost/Month"
        },
        pricing_options: {
          monthly: "50",
          yearly: "148",
          month_platinum_points: "450"
        }
      },
      role: "model"
    },
    {
      plan: {
        id: 26,
        plan_type: 3,
        name: "Platinum Plus model",
        points: "Excellent Investment!",
        posts_limit: {
          value: 1000,
          text: "1000 Posts/Month"
        },
        messages_limit: {
          value: 1000,
          text: "No text message limit and unlimited outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 50,
          text: "Keep 50% of Sales"
        },
        tips_percent: {
          value: 100,
          text: "Keep 100% of Tips"
        },
        platinum_percent: {
          value: 50,
          text: "Earn 50% in Platinum Points on Sales"
        },
        requests: {
          value: 2,
          text: "Request can be Accept"
        },
        boost_limit: {
          value: 1000,
          text: "1000 Posts Boost/Month"
        },
        pricing_options: {
          monthly: "100",
          yearly: "1000",
          month_platinum_points: "700"
        }
      },
      role: "model"
    },
    {
      plan: {
        id: 1,
        plan_type: 1,
        name: "Gold Plan user",
        points: "Good, Easy Money",
        posts_limit: {
          value: 11,
          text: "11 Request Posts/Day"
        },
        messages_limit: {
          value: 30,
          text: "30 text message limit but, up to 10 outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 80,
          text: "Keep 80% of Sales"
        },
        tips_percent: {
          value: 100,
          text: "Keep 100% of Tips"
        },
        platinum_percent: {
          value: 2,
          text: "Earn 2% in Platinum Points on Sales"
        },
        requests: 1,
        pricing_options: {
          monthly: 23,
          yearly: 123,
          month_platinum_points: "3511"
        }
      },
      role: "user"
    },
    {
      plan: {
        id: 3,
        plan_type: 3,
        name: "Platinum plus user",
        points: "Lots of Money!",
        posts_limit: {
          value: 10000,
          text: "10000 Request Posts/Day"
        },
        messages_limit: {
          value: 10000,
          text: "No text message limit and unlimited outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 80,
          text: "Keep 80% of Sales"
        },
        tips_percent: {
          value: 100,
          text: "Keep 100% of Tips"
        },
        platinum_percent: {
          value: 2,
          text: "Earn 2% in Platinum Points on Sales"
        },
        requests: 2,
        pricing_options: {
          monthly: 23,
          yearly: 123,
          month_platinum_points: 350
        }
      },
      role: "user"
    },
    {
      plan: {
        id: 12,
        plan_type: 2,
        name: "Madonna Cherry",
        points: "Dolor dolores accusa",
        posts_limit: {
          value: 50,
          text: "50 Request Posts/Day"
        },
        messages_limit: {
          value: 87,
          text: "No text message limit and unlimited outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 2,
          text: "Keep 2% of Sales"
        },
        tips_percent: {
          value: 30,
          text: "Keep 30% of Tips"
        },
        platinum_percent: {
          value: 55,
          text: "Earn 55% in Platinum Points on Sales"
        },
        requests: 2,
        pricing_options: {
          monthly: "346",
          yearly: "654",
          month_platinum_points: "10"
        }
      },
      role: "user"
    },
    {
      plan: {
        id: 13,
        plan_type: 2,
        name: "Bo Bernard",
        points: "Maiores sunt offici",
        posts_limit: {
          value: 10,
          text: "10 Request Posts/Day"
        },
        messages_limit: {
          value: 94,
          text: "No text message limit and unlimited outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 14,
          text: "Keep 14% of Sales"
        },
        tips_percent: {
          value: 64,
          text: "Keep 64% of Tips"
        },
        platinum_percent: {
          value: 6,
          text: "Earn 6% in Platinum Points on Sales"
        },
        requests: 2,
        pricing_options: {
          monthly: "994",
          yearly: "684",
          month_platinum_points: "5"
        }
      },
      role: "user"
    },
    {
      plan: {
        id: 14,
        plan_type: 3,
        name: "Irene Santana",
        points: "Dignissimos enim nis",
        posts_limit: {
          value: 1,
          text: "1 Request Posts/Day"
        },
        messages_limit: {
          value: 87,
          text: "No text message limit and unlimited outgoing images Messages Per Month"
        },
        sales_percent: {
          value: 47,
          text: "Keep 47% of Sales"
        },
        tips_percent: {
          value: 44,
          text: "Keep 44% of Tips"
        },
        platinum_percent: {
          value: 19,
          text: "Earn 19% in Platinum Points on Sales"
        },
        requests: 1,
        pricing_options: {
          monthly: "173",
          yearly: "621",
          month_platinum_points: "2"
        }
      },
      role: "user"
    }
  ]);
  const [userSubscription, setUserSubscription] = useState([]);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    name: "",
    points: "",
    plan_type: "",
    posts_limit: "",
    messages_limit: "",
    sales_percent: "",
    tips_percent: "",
    platinum_percent: "",
    requests: "",
    boost_limit: "",
    pricing_options: {
      monthly: "",
      yearly: "",
      month_platinum_points: ""
    }
  });
  const packageOptions = [
    { id: "weekly", name: "weekly" },
    { id: "monthly", name: "monthly" },
    { id: "yearly", name: "yearly" }
  ];

  const reqOptions = [
    {
      id: 1,
      name: "view"
    },
    {
      id: 2,
      name: "accept"
    }
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const confirmDelete = (id, role) => {
    setCategoryToDelete({ id, role }); // Set the category to delete
    setConfirmationModal(true); // Show the confirmation modal
  };

  const handleDeletePlan = async () => {
    setConfirmationModal(false);
    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      await deletePlan(categoryToDelete.id, categoryToDelete.role);
      setModalMessage("Plan deleted successfully!");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        fetchSubscriptions();
      }, 1000);
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");

      console.error("Error deleting plan:", error);
    } finally {
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  const fetchSubscriptions = async () => {
    document.querySelector(".loaderBox").classList.remove("d-none");
    try {
      const [modelData, userData] = await Promise.all([
        getSubscriptions("model"),
        getSubscriptions("user")
      ]);

      setSubscriptions([
        ...modelData.data.map((item) => ({ ...item, role: "model" })),
        ...userData.data.map((item) => ({ ...item, role: "user" }))
      ]);
      if (subscriptions) {
        document.querySelector(".loaderBox").classList.add("d-none");
      }
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");
      console.error("Error fetching subscriptions:", error);
      setError("Failed to fetch subscriptions");
    }
  };

  useEffect(() => {
    document.title = "Mike Smith | Admin - Package Listing";
    fetchSubscriptions();
  }, []);

  const handleAddOrEditPlan = async (e) => {
    e.preventDefault();
    document.querySelector(".loaderBox").classList.remove("d-none");

    try {
      const formData = new FormData();
      formData.append("name", currentPlan.name);
      formData.append("points", currentPlan.points);
      formData.append("plan_type", currentPlan.plan_type);
      {
        role === "model"
          ? formData.append("posts_limit", currentPlan.posts_limit)
          : formData.append(
              "request_post_limit",
              currentPlan.request_post_limit
            );
      }
      formData.append("messages_limit", currentPlan.messages_limit);
      formData.append("sales_percent", currentPlan.sales_percent);
      formData.append("tips_percent", currentPlan.tips_percent);
      formData.append("platinum_percent", currentPlan.platinum_percent);
      formData.append("requests", currentPlan.requests);
      {
        role === "model" &&
          formData.append("boost_limit", currentPlan.boost_limit);
      }
      formData.append(
        "pricing_options",
        JSON.stringify(currentPlan.pricing_options)
      );

      if (isEditing) {
        await updateSubscriptionPlan(currentPlan.id, formData, role);
        setModalMessage("Plan updated successfully!");
      } else {
        await addOrEditSubscriptionPlan(formData, role);
        setModalMessage("Plan added successfully!");
      }
      setFormModal(false);
      setEdit(false);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        setCurrentPlan({
          name: "",
          points: "",
          plan_type: "",
          posts_limit: "",
          messages_limit: "",
          sales_percent: "",
          tips_percent: "",
          platinum_percent: "",
          requests: "",
          boost_limit: "",
          pricing_options: {
            monthly: "",
            yearly: "",
            month_platinum_points: ""
          }
        });
        setIsEditing(false);
        // fetchSubscriptions();
      }, 1000);
    } catch (error) {
      document.querySelector(".loaderBox").classList.add("d-none");

      // setIsEditing(false);
      console.error("Error adding/editing plan:", error);
    } finally {
      setFormModal(false);
      document.querySelector(".loaderBox").classList.add("d-none");
    }
  };

  const handleEditPlan = (plan, role) => {
    setRole(role);
    setCurrentPlan(plan);
    setIsEditing(true);
    setEdit(true);
    setFormModal(true);
  };
  const openNewModalForm = () => {
    setIsEditing(false);
    setEdit(false);
    setCurrentPlan({
      name: "",
      points: "",
      plan_type: "",
      posts_limit: "",
      messages_limit: "",
      sales_percent: "",
      tips_percent: "",
      platinum_percent: "",
      requests: "",
      boost_limit: "",
      pricing_options: {
        monthly: "",
        yearly: "",
        month_platinum_points: ""
      }
    });
    setFormModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in currentPlan.pricing_options) {
      setCurrentPlan({
        ...currentPlan,
        pricing_options: {
          ...currentPlan.pricing_options,
          [name]: value
        }
      });
    } else {
      setCurrentPlan({ ...currentPlan, [name]: value });
    }
  };
  console.log("setCurrentPlan", currentPlan);
  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12">
            <div className="dashCard">
              <div className="row mb-3 justify-content-between">
                <div className="col-md-6 mb-2">
                  <h1 className="mainTitle text-uppercase">
                    Subscription Listing
                  </h1>
                </div>
                <div className="col-md-12 mb-2">
                  <div className="addUser">
                    <CustomButton
                      text="Add New Subscription"
                      variant="primaryButton"
                      onClick={() => openNewModalForm()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12">
            <div className="dashCard">
              <section id="pricing" className="pricing-content section-padding">
                <div className="">
                  <div className="row text-center justify-content-center packages-row">
                    {subscriptions.map((item, index) => (
                      <div className="col-md-6 col-lg-6 col-xl-4" key={index}>
                        <PricingCard
                          plan={item.plan}
                          planDuration={planDuration}
                          onEdit={() => handleEditPlan(item.plan, "model")}
                          onDelete={() => confirmDelete(item.plan.id, "model")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        show={formModal}
        close={() => {
          setFormModal(false);
          // setIsEditing(false);
        }}
        heading={isEditing ? "Edit subscription" : "Add New subscription"}
      >
        <div className="row p-3">
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Title"
              required
              id="name"
              type="text"
              placeholder="Enter title"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="title"
              value={currentPlan.title || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Price"
              required
              id="price"
              type="number"
              placeholder="Enter price"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="price"
              value={currentPlan.price || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2 text-capitalize">
            <SelectBox
              id="duration_type"
              selectClass="mainInput"
              name="duration_type"
              label="duration type"
              placeholder="Enter Plan Type"
              required
              value={currentPlan.duration_type}
              option={packageOptions}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "duration_type",
                    value: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Duration count"
              required
              id="duration_count"
              type="text"
              placeholder="duration count"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="duration_count"
              value={currentPlan.duration_count || ""}
              onChange={handleInputChange}
            />
          </div>

          {
            <div className="col-md-6 mb-2">
              <CustomInput
                label="Book limit"
                required
                id="book_limit"
                type="number"
                placeholder="Enter book Limit"
                labelClass="mainLabel"
                inputClass="mainInput"
                name="book_limit"
                value={currentPlan?.book_limit}
                onChange={handleInputChange}
              />
            </div>
          }
{/* 
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Sales Percent"
              required
              id="sales_percent"
              type="number"
              placeholder="Enter Sales Percent"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="sales_percent"
              value={currentPlan.sales_percent || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Tips Percent"
              required
              id="tips_percent"
              type="number"
              placeholder="Enter Tips Percent"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="tips_percent"
              value={currentPlan.tips_percent || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Platinum Percent"
              required
              id="platinum_percent"
              type="number"
              placeholder="Enter Platinum Percent"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="platinum_percent"
              value={currentPlan.platinum_percent || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6 mb-2">
            <SelectBox
              selectClass="mainInput"
              required
              label="Requests"
              id="requests"
              type="text"
              placeholder="Enter Requests"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="requests"
              option={reqOptions}
              value={currentPlan.requests}
              onChange={(e) =>
                handleInputChange({
                  target: {
                    name: "requests",
                    value: e.target.value
                  }
                })
              }
            />
          </div>
          {role === "model" && (
            <div className="col-md-6 mb-2">
              <CustomInput
                label="Boost Limit"
                required
                id="boost_limit"
                type="number"
                placeholder="Enter Boost Limit"
                labelClass="mainLabel"
                inputClass="mainInput"
                name="boost_limit"
                value={currentPlan.boost_limit || ""}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Monthly Price"
              required
              id="monthly"
              type="number"
              placeholder="Enter Monthly Price"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="monthly"
              value={currentPlan.pricing_options?.monthly}
              onChange={(e) =>
                setCurrentPlan({
                  ...currentPlan,
                  pricing_options: {
                    ...currentPlan.pricing_options,
                    monthly: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Yearly Price"
              required
              id="yearly"
              type="number"
              placeholder="Enter Yearly Price"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="yearly"
              value={currentPlan.pricing_options?.yearly}
              onChange={(e) =>
                setCurrentPlan({
                  ...currentPlan,
                  pricing_options: {
                    ...currentPlan.pricing_options,
                    yearly: e.target.value
                  }
                })
              }
            />
          </div>
          <div className="col-md-6 mb-2">
            <CustomInput
              label="Month Platinum Points"
              required
              id="month_platinum_points"
              type="number"
              placeholder="Enter Month Platinum Points"
              labelClass="mainLabel"
              inputClass="mainInput"
              name="month_platinum_points"
              value={currentPlan.pricing_options?.month_platinum_points}
              onChange={(e) =>
                setCurrentPlan({
                  ...currentPlan,
                  pricing_options: {
                    ...currentPlan.pricing_options,
                    month_platinum_points: e.target.value
                  }
                })
              }
            />
          </div> */}
          <CustomButton
            variant="primaryButton"
            text={isEditing ? "Update" : "Add"}
            className="me-2"
            type="submit"
            onClick={handleAddOrEditPlan}
          />
        </div>
      </CustomModal>
      <CustomModal
        show={showModal}
        close={() => setShowModal(false)}
        success
        heading={modalMessage}
      />
      <CustomModal
        show={confirmationModal}
        close={() => setConfirmationModal(false)}
        success={false}
        action={handleDeletePlan} // Call handleDelete only after confirmation
        heading="Are you sure you want to delete this plan?"
      />
    </DashboardLayout>
  );
};

export default PackageListing;
