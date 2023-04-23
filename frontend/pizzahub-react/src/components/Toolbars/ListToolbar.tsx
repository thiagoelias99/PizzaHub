import { Box, Paper, Button, TextField } from "@mui/material";
import React from "react";

interface IProps {
    newButton: () => void
    searchValue: string
    searchValueFeedback: (value: string) => void
}

export const ListToolbar: React.FC<IProps> = ({ newButton, searchValue, searchValueFeedback }) => {
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
            >Novo
            </Button>
            <TextField
                value={searchValue}
                onChange={(e) => searchValueFeedback(e.target.value)}
            >

            </TextField>
        </Box>
    );
};