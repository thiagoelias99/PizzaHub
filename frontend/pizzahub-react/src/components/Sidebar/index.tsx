import { Box, Button, Drawer, Paper, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface IProps {
    children?: React.ReactNode
}

const Sidebar: React.FC<IProps> = ({ children }) => {
    const navigate = useNavigate();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    const [openSidebar, setOpenSidebar] = useState(true);

    const toggleSidebar = (): void => {
        setOpenSidebar(!openSidebar);
    };

    return (
        <>
            <Drawer
                variant={smDown ? "temporary" : "permanent"}
                open={true}
            >
                <Box
                    component={Paper}
                    width={theme.spacing(openSidebar ? 28 : 8)}
                    display='flex'
                    flexDirection="column"
                    alignItems='center'
                    gap={1}
                    overflow="hidden"
                >
                    <Button onClick={toggleSidebar}>Close</Button>
                    <Button onClick={e => navigate("/dashboard/ingredients")}>Ingredientes</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </Box>
            </Drawer>
            <Box
                height='100%'
                marginLeft={theme.spacing(openSidebar ? 28 : 8)}
            >
                <Outlet />
            </Box>
        </>
    );
};

export default Sidebar;