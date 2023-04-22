import { Box, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { DetailsToolbar } from "../../toolbars/DetailsToolbar";

import { Api } from "../../config/api";

export const IngredientDetails: React.FC = () => {
    const [description, setDescription] = useState("");
    const [unit, setUnit] = useState("");
    const [value, setValue] = useState(0);

    const handleSave = () => {
        const data = {
            description,
            unit,
            valuePerUnit: value
        };
        Api.post("ingredients", data)
            .then((response) => console.log(response.data));
    };

    return (
        <>
            <DetailsToolbar 
                newButton={handleSave}/>
            <Box
                component={Paper}
                display='flex'
                flexDirection="column"
                alignItems="flex-start"
                gap={1}
                marginX={1}
                marginY={1}
                padding={1}
            >
                <TextField
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></TextField>
                <TextField
                    placeholder="Unidade"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                ></TextField>
                <TextField
                    placeholder="Valor"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                ></TextField>
            </Box>
        </>
    );
};