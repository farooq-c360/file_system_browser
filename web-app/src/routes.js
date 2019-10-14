/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Person from "@material-ui/icons/Dns";
import History from "@material-ui/icons/History";
import Stars from "@material-ui/icons/Stars";
import Favourite from "@material-ui/icons/FavoriteBorder";
// core components/views for Admin layout
import FileSystemBrowser from "views/browser/home.js";
import QuickAccessFileBrowser from "views/browser/browse_quick_accessable_files.js";

const dashboardRoutes = [
  {
    path: "/browser/home",
    params: "/:folder",
    name: "My Data",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: FileSystemBrowser,
    layout: "/admin"
  },
  {
    path: "/recent",
    params: "",
    name: "Recent",
    rtlName: "طباعة",
    icon: History,
    component: QuickAccessFileBrowser,
    layout: "/admin"
  },
  {
    path: "/favourite",
    params: "",
    name: "Favourite",
    rtlName: "طباعة",
    icon: Favourite,
    component: QuickAccessFileBrowser,
    layout: "/admin"
  },
  {
    path: "/bookmarks",
    params: "",
    name: "Bookmarks",
    rtlName: "الرموز",
    icon: Stars,
    component: QuickAccessFileBrowser,
    layout: "/admin"
  },
];

export default dashboardRoutes;
