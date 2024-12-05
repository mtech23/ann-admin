import { Route, Routes, BrowserRouter } from "react-router-dom";

import AdminLogin from "../Screens/Auth/Login";
import ForgetPassword from "../Screens/Auth/ForgetPassword";
import ForgetPassword2 from "../Screens/Auth/ForgetPassword2";
import ForgetPassword3 from "../Screens/Auth/ForgetPassword3";
import { Dashboard } from "../Screens/Dashboard";

// import { BookManagement } from "../Screens/BookManagement";
// import { AddBook } from "../Screens/BookManagement/AddBook";
// import { BookDetails } from "../Screens/BookManagement/BookDetail";
// import { EditBook } from "../Screens/BookManagement/EditBook";

import { BookManagement } from "../Screens/bookManagement/index";
import { AddBook } from "../Screens/bookManagement/AddBook";
import { EditBook } from "../Screens/bookManagement/EditBook";
import { BookDetails } from "../Screens/bookManagement/BookDetail";

import { NoteEdit } from "../Screens/StoryManagement/NoteEdit";
import { NoteDateil } from "../Screens/StoryManagement/Notedetail";
import { AddNote } from "../Screens/StoryManagement/AddNotes";
import { NoteList } from "../Screens/StoryManagement/index";

import { QuizEdit } from "../Screens/QuizManagement/QuizEdit";
import { QuizDateil } from "../Screens/QuizManagement/Quizdateil";
import { AddQuiz } from "../Screens/QuizManagement/AddQuiz";
import { QuizList } from "../Screens/QuizManagement/index";
import { OrdersManagement } from "../Screens/ordersManagement";
import { EditOrders } from "../Screens/ordersManagement/EditOrder";
import { OrdersDetails } from "../Screens/ordersManagement/OrderDetail";

import { PoliciesManagement } from "../Screens/policies";
import { AddPolicies } from "../Screens/policies/AddPolicies";
import { EditPolicies } from "../Screens/policies/EditPolicies";
import { PoliciesDetails } from "../Screens/policies/PoliciesDetail";

import { TermsAndConditionManagement } from "../Screens/TermsAndCondition";
import { AddTermsAndCondition } from "../Screens/TermsAndCondition/AddTermAndCondition";
import { EditTermsAndCondition } from "../Screens/TermsAndCondition/EditTermAndCondition";
import { TermsAndConditionDetails } from "../Screens/TermsAndCondition/TermAndConditionDetail";

// import { ChapterManagement } from "../Screens/chapterManagement/index";
// import { AddChapter } from "../Screens/chapterManagement/Addchapter";
// import { EditChapter } from "../Screens/chapterManagement/Editchapter";
// import { ChapterDetails } from "../Screens/chapterManagement/chapterDetail";

// import { MenuManagement } from "../Screens/MenuManagement";
// import { AddMenu } from "../Screens/MenuManagement/AddMenu";
// import { EditMenu } from "../Screens/MenuManagement/EditMenu";

import { CustomiseMenu } from "../Screens/CustomiseMenu";
import { AddMenu } from "../Screens/CustomiseMenu/AddMenu";
import { EditMenu } from "../Screens/CustomiseMenu/EditMenu";
import { CustomerSupport } from "../Screens/CustomerSupport";
import { CurrencyManagement } from "../Screens/CurrencyManagement";
import { ZipCode } from "../Screens/ZipCode";

// end

import Profile from "../Screens/Profile";
import EditProfile from "../Screens/Profile/EditProfile";
import ChangePassword from "../Screens/Profile/ChangePassword";
import { ProtectedRoutes } from "./ProtectedRoutes";
import Error from "../Screens/Error";
// import { SeriesManagement } from "../Screens/seriesManagement";
import CategoryManagement from "../Screens/CategoryManagement";
import SeriesDetail from "../Screens/CategoryManagement/SeriesDetail";
import { UsersManagement } from "../Screens/UsersManagement";
import PackageListing from "../Screens/SubscriptionManagement/PackageListing";

export default function AdminRouter() {
  return (
    <BrowserRouter basename="/ann-admin">
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/forget-password2" element={<ForgetPassword2 />} />
        <Route path="/forget-password3" element={<ForgetPassword3 />} />

        {/* <Route path="/dashboard" element={<ProtectedRoutes Components={Dashboard} />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/book-management" element={<BookManagement/>}   /> */}
        <Route
          path="/book-management"
          element={<ProtectedRoutes Components={BookManagement} />}
        />
        <Route
          path="/subscription-listing"
          element={<ProtectedRoutes Components={PackageListing} />}
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

        {/* Orders Managment */}
        <Route
          path="/orders-management"
          element={<ProtectedRoutes Components={OrdersManagement} />}
        />
        <Route
          path="/users-management"
          element={<ProtectedRoutes Components={UsersManagement} />}
        />

        <Route
          path="/story-management"
          element={<ProtectedRoutes Components={NoteList} />}
        />

        <Route
          path="/story-management/add-story"
          element={<ProtectedRoutes Components={AddNote} />}
        />

        <Route
          path="/story-management/story-detail/:id"
          element={<ProtectedRoutes Components={NoteDateil} />}
        />

        <Route
          path="/story-management/edit-story/:id"
          element={<ProtectedRoutes Components={NoteEdit} />}
        />

        {/* <Route
          path="/orders-management/add-order"
          element={<ProtectedRoutes Components={AddBook} />}
        /> */}
        <Route
          path="/orders-management/order-details/:id"
          element={<OrdersDetails />}
        />
        <Route
          path="/orders-management/edit-order/:id"
          element={<ProtectedRoutes Components={EditOrders} />}
        />
        {/* Orders Managment */}

        {/* Policies Managment */}
        <Route
          path="/policies-management"
          element={<ProtectedRoutes Components={PoliciesManagement} />}
        />
        <Route
          path="/policies-management/add-policies"
          element={<ProtectedRoutes Components={AddPolicies} />}
        />
        <Route
          path="/policies-management/policies-details/:id"
          element={<ProtectedRoutes Components={PoliciesDetails} />}
        />
        <Route
          path="/policies-management/edit-policies/:id"
          element={<ProtectedRoutes Components={EditPolicies} />}
        />
        {/* Policies Managment */}

        {/* Terms And Condition Managment */}
        <Route
          path="/terms-condition-management"
          element={<ProtectedRoutes Components={TermsAndConditionManagement} />}
        />
        <Route
          path="/terms-condition-management/add-terms-condition"
          element={<ProtectedRoutes Components={AddTermsAndCondition} />}
        />
        <Route
          path="/terms-condition-management/terms-condition-details/:id"
          element={<ProtectedRoutes Components={TermsAndConditionDetails} />}
        />
        <Route
          path="/terms-condition-management/edit-terms-condition/:id"
          element={<ProtectedRoutes Components={EditTermsAndCondition} />}
        />
        {/* Terms And Condition Managment */}

        {/* 
        <Route path="/chapter-management" element={<ProtectedRoutes Components={ChapterManagement} />} />
        <Route path="/chapter-management/add-chapter" element={<ProtectedRoutes Components={AddChapter} />} />
        <Route path="/chapter-management/chapter-details/:id" element={<ProtectedRoutes Components={ChapterDetails} />} />
        <Route path="/chapter-management/edit-chapter/:id" element={<ProtectedRoutes Components={EditChapter} />} /> */}

        <Route
          path="/customise-menu"
          element={<ProtectedRoutes Components={CustomiseMenu} />}
        />
        <Route
          path="/add-menu"
          element={<ProtectedRoutes Components={AddMenu} />}
        />
        {/* <Route path="/menu-management/menu-details/:id" element={<ProtectedRoutes Components={menuDetails} />} /> */}
        <Route
          path="/customise-menu/edit-menu/:id"
          element={<ProtectedRoutes Components={EditMenu} />}
        />

        <Route
          path="/zipcode-list"
          element={<ProtectedRoutes Components={ZipCode} />}
        />

        <Route
          path="/customer-support"
          element={<ProtectedRoutes Components={CustomerSupport} />}
        />
        <Route
          path="/currency-management"
          element={<ProtectedRoutes Components={CurrencyManagement} />}
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
