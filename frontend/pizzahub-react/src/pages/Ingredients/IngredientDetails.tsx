import { Box, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DetailsToolbar } from "../../components/Toolbars/DetailsToolbar";
import * as yup from "yup";
import { object } from "yup";

import { Api } from "../../config/api";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IIngredient } from "../../models/IIngredient";

export const IngredientDetails: React.FC = () => {

    const [description, setDescription] = useState("");
    const [unit, setUnit] = useState("");
    const [valuePerUnit, setValuePerUnit] = useState(0);

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const navigate = useNavigate();

    const validationSchema: yup.Schema<Omit<IIngredient, "uuid">> = object({
        description: yup.string().required().min(1),
        unit: yup.string().required().min(1),
        valuePerUnit: yup.number().moreThan(0).required()
    });

    const uuid: string | undefined = useParams().uuid;
    const route = "ingredients";
    const ingredient = useLocation().state;

    const handleSave = async () => {
        try {
            const data = await validationSchema.validate({
                description,
                unit,
                valuePerUnit
            }, { abortEarly: false });
            console.log("validation OK");
            setValidationErrors({});
        } catch (error) {
            const yupError = error as yup.ValidationError;
            const errors: Record<string, string> = {};

            // console.log(yupError.inner);
            yupError.inner.forEach(error => {
                if (!error.path) return;
                errors[error.path] = error.message;

                // console.log(errors);
            });
            setValidationErrors(errors);
            console.log(!!validationErrors["valuePerUnit"]);
        }

        // if (uuid === "new") {
        //     Api.post("ingredients", data)
        //         .then((response) => console.log(response.data));
        // } else {
        //     Api.put(`ingredients/${uuid}`, data)
        //         .then((response) => console.log(response.data));
        // }
    };

    const handleDelete = () => {
        Api.delete(`ingredients/${uuid}`)
            .then(() => navigate("/dashboard/ingredients"));
    };

    useEffect(() => {
        if (uuid !== "new") {
            if (ingredient) {
                setDescription(ingredient.description);
                setUnit(ingredient.unit);
                setValuePerUnit(ingredient.valuePerUnit);
            } else {
                Api.get<IIngredient>(`${route}/${uuid}`)
                    .then(response => {
                        if (response.status === 200 && response.data) {
                            setDescription(response.data.description);
                            setUnit(response.data.unit);
                            setValuePerUnit(response.data.valuePerUnit);
                        } else {
                            throw new Error("Não foi possivel obter dados");
                        }
                    });
            }
        } else {
            setDescription("");
            setUnit("");
            setValuePerUnit(0);
        }
    }, []);

    return (
        <>
            <DetailsToolbar
                saveButton={handleSave}
                deleteButton={handleDelete}
                isUpdate={uuid !== "new"} />
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
                    disabled={uuid !== "new"}
                    error={!!validationErrors["description"]}
                    helperText={validationErrors["description"]}
                ></TextField>
                <TextField
                    placeholder="Unidade"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    disabled={uuid !== "new"}
                    error={!!validationErrors["unit"]}
                    helperText={validationErrors["unit"]}
                ></TextField>
                <TextField
                    type="number"
                    placeholder="Valor"
                    value={valuePerUnit}
                    onChange={(e) => setValuePerUnit(Number(e.target.value))}
                    error={!!validationErrors["valuePerUnit"]}
                    helperText={validationErrors["valuePerUnit"]}

                ></TextField>
            </Box>
        </>
    );
};