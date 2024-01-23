import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
} from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setConfirmationMessage("");
    };

    const handleFormSubmit = async (values, { resetForm }) => {
        console.log("Submitting form", values);
        fetch("http://localhost:3001/addKund", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data saved:", data);
                setConfirmationMessage("Client added successfully");
                setOpenDialog(true);
                resetForm(); // Reset the form's values after successful submission
            })
            .catch((error) => {
                console.error("Error saving data:", error);
                setConfirmationMessage("Error saving data");
                setOpenDialog(true);
            });
    };

    const initialValues = {
        Kundnamn: "",
        Lonesystem: "",
        Team: "",
        Konsult: "",
    };

    return (
        <Box m="20px">
            <Header title="Lägg till Kunder" subtitle="Lägg till information om nya kunder" />
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
            >
                {({ values, handleChange, handleSubmit, handleBlur }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Kundnamn"
                                name="Kundnamn"
                                value={values.Kundnamn}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Lönesystem"
                                name="Lonesystem"
                                value={values.Lonesystem}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Team"
                                name="Team"
                                value={values.Team}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Konsult"
                                name="Konsult"
                                value={values.Konsult}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="info" variant="contained">
                                Lägg till kund
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        {confirmationMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="info">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Form;
