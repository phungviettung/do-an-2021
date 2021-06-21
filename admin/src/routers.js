//import AddUser from "./views/components/users/AddUser";
//import ListUser from "./views/components/users/ListUser";
// lazy loading
import React from "react";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    BarcodeOutlined
} from "@ant-design/icons";

const AddUser = React.lazy(
    () => import("./views/components/users/AddUser")
    // new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(import("./views/components/users/AddUser"));
    //     }, 1000);
    // })
);

const ListUser = React.lazy(() => import("./views/components/users/ListUser"));

const Dashboard = React.lazy(() => import("./views/components/dasboard"))

const AddProduct = React.lazy(() => import("./views/components/products/AddProduct"));
const ListProduct = React.lazy(() => import("./views/components/products/ListProduct"));

const AddCategory = React.lazy(() => import("./views/components/categories/AddCategory"));
const ListCategory = React.lazy(() => import("./views/components/categories/ListCategory"));

const AddMaterial = React.lazy(() => import("./views/components/material/AddMaterial"));
const ListMaterial = React.lazy(() => import("./views/components/material/ListMaterial"));

const DetailOrder = React.lazy(() => import("./views/components/orders/DetailOrder"));
const ListOrder = React.lazy(() => import("./views/components/orders/ListOrder"));

const routers = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <PieChartOutlined />,
        component: <Dashboard/>
    },
    {
        name: "Users",
        path: "/users",
        icon: <UserOutlined />,
        children: [
            {
                name: "Add user",
                path: "/users/add",
                icon: <UserOutlined />,
                component: <AddUser />,
            },
            {
                name: "User Manager",
                path: "/users/list",
                icon: <UserOutlined />,
                component: <ListUser />,
            },
            {
                name: "Update user",
                path: "/users/edit/:id",
                icon: <UserOutlined />,
                component: <AddUser />,
                hidden: true,
            },
        ],
    },
    {
        name: "Products",
        path: "/products",
        icon: <BarcodeOutlined />,
        children: [
            {
                name: "Add Product",
                path: "/products/add",
                icon: <BarcodeOutlined />,
                component: <AddProduct />,
            },
            {
                name: "List Product",
                path: "/products/list",
                icon: <BarcodeOutlined />,
                component: <ListProduct />,
            },
            {
                name: "Update Product",
                path: "/products/edit/:id",
                icon: <BarcodeOutlined />,
                component: <AddProduct />,
                hidden: true,
            },
        ],
    },
    {
        name: "Categories",
        path: "/categories",
        icon: <BarcodeOutlined />,
        children: [
            {
                name: "Add Category",
                path: "/categories/add",
                icon: <BarcodeOutlined />,
                component: <AddCategory />,
            },
            {
                name: "List Category",
                path: "/categories/list",
                icon: <BarcodeOutlined />,
                component: <ListCategory />,
            },
            {
                name: "Update Category",
                path: "/categories/edit/:id",
                icon: <BarcodeOutlined />,
                component: <AddCategory />,
                hidden: true,
            },
        ],
    },
    {
        name: "Material",
        path: "/material",
        icon: <BarcodeOutlined />,
        children: [
            {
                name: "Add Material",
                path: "/material/add",
                icon: <BarcodeOutlined />,
                component: <AddMaterial />,
            },
            {
                name: "List Material",
                path: "/material/list",
                icon: <BarcodeOutlined />,
                component: <ListMaterial />,
            },
            {
                name: "Update Material",
                path: "/material/edit/:id",
                icon: <BarcodeOutlined />,
                component: <AddMaterial />,
                hidden: true,
            },
        ],
    },
    {
        name: "Orders",
        path: "/orders",
        icon: <BarcodeOutlined />,
        children: [
            {
                name: "Add Order",
                path: "/orders/detail/:id",
                icon: <BarcodeOutlined />,
                component: <DetailOrder />,
                hidden: true,
            },
            {
                name: "List Order",
                path: "/orders/list",
                icon: <BarcodeOutlined />,
                component: <ListOrder />,
            },
            // {
            //     name: "Update Order",
            //     path: "/orders/edit/:id",
            //     icon: <BarcodeOutlined />,
            //     component: <AddOrder />,
            //     hidden: true,
            // },
        ],
    },
];

export default routers;
