import React from "react";
import { Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IProps {
    saveButton: () => void
    deleteButton: () => void
    isUpdate: boolean
}

export const DetailsToolbar: React.FC<IProps> = ({ saveButton, deleteButton, isUpdate }) => {
    const navigate = useNavigate();

    return (
        <Box
            component={Paper}
            display="flex"
            flexDirection="row"
            alignItems="flex-start"
            gap={1}
            marginX={1}
            marginY={1}
            padding={1}
        >
            <Button variant="contained" onClick={saveButton}>Salvar</Button>
            {isUpdate && <Button variant="contained" onClick={deleteButton}>Deletar</Button>}
            <Button variant="contained" onClick={e => navigate(-1)}>Voltar</Button>
        </Box>
    );
};