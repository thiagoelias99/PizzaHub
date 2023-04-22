import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { IngredientsList } from "../pages/Ingredients/IngredientList";
import { IngredientDetails } from "../pages/Ingredients/IngredientDetails";

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<div>Olá</div>} />
                <Route path='/ingredients' element={<IngredientsList />} />
                <Route path='/ingredients/:uuid' element={<IngredientDetails />} />
                <Route path='*' element={<div>Pagina Não Encontrada</div>} />
            </Routes>
        </BrowserRouter>
    );
};