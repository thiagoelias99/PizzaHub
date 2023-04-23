import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { IngredientsList } from "../pages/Ingredients/IngredientList";
import { IngredientDetails } from "../pages/Ingredients/IngredientDetails";
import Sidebar from "../components/Sidebar";

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Link to={"/dashboard/ingredients"}>Ingredientes</Link>
                } />
                <Route path="/dashboard" element={<Sidebar />}>
                    <Route path="ingredients" element={<IngredientsList />} />
                    <Route path="ingredients/:uuid" element={<IngredientDetails />} />
                </Route>
                {/* <Route path="/dashboard/ingredients" element={<IngredientsList />} />
                <Route path="/dashboard/ingredients/:uuid" element={<IngredientDetails />} /> */}
                <Route path="*" element={<div>Pagina Não Encontrada</div>} />
            </Routes>
        </BrowserRouter>
    );
};