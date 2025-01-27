import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";

import { BookManagement } from "../Screens/bookManagement/index";
import { AddBook } from "../Screens/bookManagement/AddBook";
import { EditBook } from "../Screens/bookManagement/EditBook";
import { BookDetails } from "../Screens/bookManagement/BookDetail";



import { PoliciesManagement } from "../Screens/policies";
import { AddPolicies } from "../Screens/policies/AddPolicies";

import { TermsAndConditionManagement } from "../Screens/TermsAndCondition";
import { AddTermsAndCondition } from "../Screens/TermsAndCondition/AddTermAndCondition";

import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";
import CategoryManagement from "../Screens/CategoryManagement";
import { UsersManagement } from "../Screens/UsersManagement";
import { UserQuery } from "../Screens/UserQuery";
import { UserQueryDetail } from "../Screens/UserQuery/UserQueryDetail";

export default function AdminRouter() {
  return (
    <BrowserRouter basename="/ann-admin">
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} />
        <Route
          path="/book-management"
          element={<ProtectedRoutes Components={BookManagement} />}
        />
        <Route
          path="/category-management"
          element={<ProtectedRoutes Components={CategoryManagement} />}
        />
        <Route
          path="/book-management/add-book"
          element={<ProtectedRoutes Components={AddBook} />}
        />
        <Route
          path="/book-management/book-details/:id"
          element={<ProtectedRoutes Components={BookDetails} />}
        />
        <Route
          path="/category-management/category-details/:id"
          element={<ProtectedRoutes Components={BookManagement} />}
        />
        <Route
          path="/book-management/edit-book/:id"
          element={<ProtectedRoutes Components={EditBook} />}
        />

        <Route
          path="/query-management"
          element={<ProtectedRoutes Components={UserQuery} />}
        />
        <Route
          path="/query-management/query-detail/:id"
          element={<ProtectedRoutes Components={UserQueryDetail} />}
        />
        <Route
          path="/users-management"
          element={<ProtectedRoutes Components={UsersManagement} />}
        />

        <Route
          path="/policies-management"
          element={<ProtectedRoutes Components={PoliciesManagement} />}
        />
        <Route
          path="/policies-management/add-policies"
          element={<ProtectedRoutes Components={AddPolicies} />}
        />
        <Route
          path="/terms-condition-management"
          element={<ProtectedRoutes Components={TermsAndConditionManagement} />}
        />
        <Route
          path="/terms-condition-management/add-terms-condition"
          element={<ProtectedRoutes Components={AddTermsAndCondition} />}
        />
      
       
        <Route
          path="/profile"
          element={<ProtectedRoutes Components={Profile} />}
        />
        <Route
          path="/profile/edit-profile"
          element={<ProtectedRoutes Components={EditProfile} />}
        />
        <Route path="/profile/change-password" element={<ChangePassword />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
