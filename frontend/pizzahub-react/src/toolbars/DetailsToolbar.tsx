import React from "react";
import { Box, Button, Paper } from "@mui/material";

// import { Container } from './styles';

interface IProps {
    newButton: () => void
}

export const DetailsToolbar: React.FC<IProps> = ({newButton}) => {
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
            <Button
                variant="contained"
                onClick={newButton}
            >Novo</Button>
            <Button variant="contained">Salvar</Button>
            <Button variant="contained">Deletar</Button>
        </Box>
    );
};