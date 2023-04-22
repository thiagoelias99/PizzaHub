import { Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IIngredient } from "../../models/IIngredient";
import { Api } from "../../config/api";

import DeleteIcon from "@mui/icons-material/Delete";
import { error } from "console";


const data: IIngredient[] = [
    {
        uuid: "abcd",
        description: "Tomate",
        unit: "unidade",
        valuePerUnit: 12.99
    },
    {
        uuid: "abc3",
        description: "Tomate 4",
        unit: "unidade",
        valuePerUnit: 12.99
    },
    {
        uuid: "abc7",
        description: "Tomate 3",
        unit: "unidade",
        valuePerUnit: 12.99
    },
    {
        uuid: "abcdhjdsf",
        description: "Tomate 2",
        unit: "unidade",
        valuePerUnit: 12.99
    }
];

export const IngredientsList: React.FC = () => {
    const route = "ingredients";

    const [tableData, setTableData] = useState<IIngredient[] | null>(null);

    function fetchData(): void {
        Api.get<IIngredient[]>(route)
            .then((response) => {
                setTableData(response.data);
            })
            .catch(error => console.log);
    }


    useEffect(() => {
        fetchData();
    }, []);

    function handleDelete(uuid: string): void {
        Api.delete(`${route}/${uuid}`)
            .then(response => alert(response.status))
            .then(fetchData)
            .catch(error => console.log);
    }

    return (
        <Box
            component={Paper}
            display='flex'
            flexDirection="column"
            alignItems='center'
            gap={1}
            marginX={1}
            marginY={1}
            padding={1}
        >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Descrição</TableCell>
                        <TableCell>Unidade</TableCell>
                        <TableCell>Valor por Unidade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData && tableData.map((row) => (
                        <TableRow key={row.uuid}>
                            <TableCell>
                                <IconButton
                                    aria-label="delete"
                                    onClick={e => handleDelete(row.uuid)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.unit}</TableCell>
                            <TableCell>{row.valuePerUnit}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </Box>
    );
};