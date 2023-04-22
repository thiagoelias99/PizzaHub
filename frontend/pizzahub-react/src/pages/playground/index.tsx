import { Box, Button, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AccessAlarm } from "@mui/icons-material";

import React from "react";

export const Playground: React.FC = () => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            component={Paper}            
            display='flex'
            paddingX={smDown ? 1 : 2} >

            <Button
                variant="contained"
                color="primary">
                Teste
            </Button>
            <Button
                variant="contained"
                color="secondary"
                sx={{
                    width: theme.spacing(10)
                }}>
                Teste
            </Button>
            <Button
                variant="contained"
                color="success" sx={{
                    width: 10
                }}>
                Teste
            </Button>
            <IconButton aria-label="delete">
                <AccessAlarm />
            </IconButton>
            <Typography >Teste</Typography>
            <Box
                sx={{
                    width: theme.breakpoints.up("sm") ? 200 : 400
                }}>

            </Box>
        </Box>
    );
};