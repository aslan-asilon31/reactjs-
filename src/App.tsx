import { Route, BrowserRouter as Router, Routes } from "react-router";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./pages/Admin/AuthPages/SignIn";
import SignUp from "./pages/Admin/AuthPages/SignUp";
import Ecommerce from "./pages/Admin/Dashboard/ECommerce";
import ProductCreate from "./pages/Admin/Products/ProductCreate";
import ProductEdit from "./pages/Admin/Products/ProductEdit";
import ProductList from "./pages/Admin/Products/ProductList";

import BrandCreate from "./pages/Admin/Brands/BrandCreate";
import BrandList from "./pages/Admin/Brands/BrandList";


import CategoryCreate from "./pages/Admin/Categories/CategoryCreate";
import CategoryList from "./pages/Admin/Categories/CategoryList";

import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import FormElements from "./pages/Forms/FormElements";
import NotFound from "./pages/OtherPage/NotFound";


import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";

export default function App() {


  return (
    <>
      <Router>
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Ecommerce />} />
            {/* Others Page */}
            <Route path="/product" element={<ProductList  />} />
            <Route path="/product/create" element={<ProductCreate  />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />

            <Route path="/brand" element={<BrandList  />} />
            <Route path="/brand/create" element={<BrandCreate  />} />

            <Route path="/category" element={<CategoryList  />} />
            <Route path="/category/create" element={<CategoryCreate  />} />


            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
          </Route>

          {/* Auth Layout */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
