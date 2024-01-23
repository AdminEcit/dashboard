import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Team = () => {
    const [teamData, setTeamData] = useState([]);
    const [editOpen, setEditOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState({});
    const [deleteOpen, setDeleteOpen] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetch('http://localhost:3001/getKunder')
            .then(response => response.json())
            .then(data => setTeamData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (row) => {
        setCurrentRow(row);
        setEditOpen(true);
    };

    const handleEditChange = (e) => {
        setCurrentRow({ ...currentRow, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = () => {
        fetch(`http://localhost:3001/updateKund/${currentRow.KundID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentRow),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data updated successfully', data);
            setEditOpen(false); // Close the edit dialog
            // You can update the state with the edited data here
            setTeamData(prevData => prevData.map(row => row.KundID === currentRow.KundID ? currentRow : row));
        })
        .catch(error => console.error('Error updating data:', error));
    };

    const handleRemove = (id) => {
        setCurrentRow({ KundID: id }); // Set the currentRow for delete confirmation
        setDeleteOpen(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:3001/deleteKund/${currentRow.KundID}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Data deleted successfully', data);
            // You can update the state to remove the deleted data here
            setTeamData(prevData => prevData.filter(row => row.KundID !== currentRow.KundID));
            setDeleteOpen(false); // Close the confirmation dialog
        })
        .catch(error => console.error('Error deleting data:', error));
    };

    const cancelDelete = () => {
        setDeleteOpen(false); // Close the confirmation dialog without deleting
    };

    const columns = [
        { field: "KundID", headerName: "ID", type: "number", width: 70 },
        { field: "Kundnamn", headerName: "Name", flex: 1 },
        { field: "Lonesystem", headerName: "Lonesystem", flex: 1 },
        { field: "Team", headerName: "Team", flex: 1 },
        { field: "Konsult", headerName: "Konsult", flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            width: 150,
            renderCell: (params) => (
                <>
                    <Button color="primary" onClick={() => handleEdit(params.row)}>Edit</Button>
                    <Button color="secondary" onClick={() => handleRemove(params.row.KundID)}>Remove</Button>
                </>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="" subtitle="Managing the team members"/>
            <Box m="40px 0 0 0" height="75vh" sx={{ /* your existing styles */ }}>
                <DataGrid 
                    rows={teamData} 
                    columns={columns} 
                    getRowId={(row) => row.KundID}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
                <DialogTitle>Edit Team Member</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        name="Kundnamn"
                        value={currentRow.Kundnamn || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Lonesystem"
                        type="text"
                        fullWidth
                        name="Lonesystem"
                        value={currentRow.Lonesystem || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Team"
                        type="text"
                        fullWidth
                        name="Team"
                        value={currentRow.Team || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Konsult"
                        type="text"
                        fullWidth
                        name="Konsult"
                        value={currentRow.Konsult || ''}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmDelete} color="secondary">Yes</Button>
                    <Button onClick={cancelDelete} color="primary">No</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Team;
