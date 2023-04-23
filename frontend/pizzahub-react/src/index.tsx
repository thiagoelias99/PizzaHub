import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Playground } from "./pages/playground";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DetailsToolbar } from "./components/Toolbars/DetailsToolbar";
import { IngredientDetails } from "./pages/Ingredients/IngredientDetails";
import Sidebar from "./components/Sidebar";
import { IngredientsList } from "./pages/Ingredients/IngredientList";
import { AppRoutes } from "./routes/AppRoutes";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AppRoutes />
        </ThemeProvider>
    </React.StrictMode>
);
