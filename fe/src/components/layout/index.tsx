import React from "react";
import Header from "./Header";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const PageLayout: React.FC = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default PageLayout;