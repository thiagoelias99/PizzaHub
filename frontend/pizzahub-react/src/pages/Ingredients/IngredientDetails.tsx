import { Box, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DetailsToolbar } from "../../toolbars/DetailsToolbar";

import { Api } from "../../config/api";
import { useLocation, useParams } from "react-router-dom";
import { IIngredient } from "../../models/IIngredient";

export const IngredientDetails: React.FC = () => {
    const [description, setDescription] = useState("");
    const [unit, setUnit] = useState("");
    const [value, setValue] = useState(0);

    const uuid: string | undefined = useParams().uuid;
    const route = "ingredients";
    const ingredient = useLocation().state;

    const handleSave = () => {
        const data = {
            description,
            unit,
            valuePerUnit: value
        };
        Api.post("ingredients", data)
            .then((response) => console.log(response.data));
    };

    useEffect(() => {

        if (uuid !== "new") {
            if (ingredient) {
                setDescription(ingredient.description);
                setUnit(ingredient.unit);
                setValue(ingredient.valuePerUnit);
            } else {
                Api.get<IIngredient>(`${route}/${uuid}`)
                    .then(response => {
                        if (response.status === 200 && response.data) {
                            setDescription(response.data.description);
                            setUnit(response.data.unit);
                            setValue(response.data.valuePerUnit);
                        } else {
                            throw new Error("Não foi possivel obter dados");
                        }
                    });
            }
        }
    }, []);

    return (
        <>
            <DetailsToolbar
                newButton={handleSave} />
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