import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashbordLayout from "../Layout/DashbordLayout";
import MyParcels from "../Pages/Dashbord/MyParcels/MyParcels";
import Payment from "../Pages/Dashbord/Payment/Payment";
import PaymentSuccess from "../Pages/Dashbord/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashbord/Payment/PaymentCancelled";
import PaymentHistory from "../Pages/Dashbord/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Dashbord/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashbord/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
         path: 'raider',
         element: <PrivateRoute>
          <Rider></Rider>
         </PrivateRoute>,
         loader: () => fetch('/serviceCenters.json').then(res => res.json())
         
        },
        {
          path: 'send-parcel',
         element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
         loader: () => fetch('/serviceCenters.json').then(res => res.json())
        },
        {
          path: 'coverage',
          Component: Coverage,
          loader: () => fetch('/serviceCenters.json').then(res => res.json())
        }
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children:[
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      }
    ]
  },
  {
   path: 'dashboard',
   element: <PrivateRoute><DashbordLayout></DashbordLayout></PrivateRoute>,
   children : [
     {
      path: 'my-parcels',
      Component: MyParcels
     },
     {
      path: 'payment-history',
      Component: PaymentHistory
     },
     {
      path: 'payment/:parcelId',
      Component:Payment
     },
     {
      path: 'payment-success',
      Component: PaymentSuccess
     },
     {
      path: 'payment-cancelled',
      Component: PaymentCancelled
     },
     {
      path: 'approve-riders',
      element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>
     },
     {
      path: 'users-management',
      element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>
     }
   ]
  }
]);
export default router;