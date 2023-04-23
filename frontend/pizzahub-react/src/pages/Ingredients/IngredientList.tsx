import { Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IIngredient } from "../../models/IIngredient";
import { Api } from "../../config/api";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import { OpenInNew } from "@mui/icons-material";
import { ListToolbar } from "../../components/Toolbars/ListToolbar";

export const IngredientsList: React.FC = () => {
    const route = "ingredients";
    const navigate = useNavigate();

    const [tableData, setTableData] = useState<IIngredient[] | null>(null);
    const [searchValue, setSearchValue] = useState("");

    function fetchData(filter = "", page = 1, limit = 10, uuid = ""): void {
        const query = `${route}/?filter=${filter}&limit=${limit}&page=${page}&uuid=${uuid}`;

        Api.get<IIngredient[]>(query)
            .then((response) => {
                setTableData(response.data);
            })
            .catch(error => console.log);
    }

    useEffect(() => {
        fetchData(searchValue);
    }, [searchValue]);

    function handleDelete(uuid: string): void {
        Api.delete(`${route}/${uuid}`)
            .then(response => alert(response.status))
            .then(response => fetchData())
            .catch(error => console.log);
    }

    function handleOpen(ingredient: IIngredient): void {
        navigate(ingredient.uuid, { state: ingredient });
    }

    function handleNew(): void {
        navigate("new");
    }

    function handleSearch(value: string): void {
        setSearchValue(value);
    }

    return (
        <>
            <ListToolbar
                newButton={handleNew}
                searchValue={searchValue}
                searchValueFeedback={handleSearch}
            />
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
                            <TableRow
                                key={row.uuid}>
                                <TableCell>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={e => handleDelete(row.uuid)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={e => handleOpen(row)}
                                    >
                                        <OpenInNew />
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
        </>
    );
};