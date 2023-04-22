import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Playground } from "./pages/playground";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DetailsToolbar } from "./toolbars/DetailsToolbar";
import { IngredientDetails } from "./pages/Ingredients/IngredientDetails";
import Sidebar from "./components/Sidebar";
import { IngredientsList } from "./pages/Ingredients/IngredientList";

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
            <Sidebar>
                <IngredientsList />
                {/* <IngredientDetails /> */}
            </Sidebar>
        </ThemeProvider>
    </React.StrictMode>
);
