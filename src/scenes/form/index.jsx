import { Box, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const handleFormSubmit = async (values) => {
    console.log('Submitting form', values); 
    fetch('http://localhost:3001/addKund', { // Update this URL to your backend endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data saved:', data);
    })
    .catch(error => {
        console.error('Error saving data:', error);
    });
};

const initialValues = {
    Kundnamn: "",
    Lonesystem: "",
    Team: "",
    Konsult: ""
};

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return <Box m="20px">
        <Header title="Lägg till Kunder" subtitle="Lägg till information om nya kunder"/>
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
        >
        {({values, handleChange, handleSubmit, handleBlur}) => (
            <form onSubmit={handleSubmit}>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{"& > div": {gridColumn: isNonMobile ? undefined: "span 4"}}}
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
    </Box>;
};

export default Form;
