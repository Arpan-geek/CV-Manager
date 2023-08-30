import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useApplicantStore } from "../../store/applicantstore";



const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const createApplicant=useApplicantStore(state=>state.createApplicantAPI)

  const handleFormSubmit = (values) => {
  values={...values,technology:values.technology,position:values.position,salary:values.salary}
  console.log("🚀 ~ file: index.jsx:16 ~ handleFormSubmit ~   values={...values,technology:values.technology,position:values.position,salary:values.salary}:",   values={...values,technology:values.technology,position:values.position,salary:values.salary})
    createApplicant(values)
  };

  return (
    <Box m="20px">
      <Header title="Create Applicant" subtitle="Create a New Candidate" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
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
                type="text"
                label="Full Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={!!touched.fullName && !!errors.fullName}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 4" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.addres1 && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
            
                 <Select
          labelId="Technology"
          id="Technology"
          type="text"
          value={values.technology}
          label="Technology"
          onChange={handleChange}
          name="technology"
          error={!!touched.technology && !!errors.technology}
          sx={{ gridColumn: "span 2"}}
          // helperText={touched.technology && errors.technology}
        >
          
            <MenuItem value={"React"}>React</MenuItem>
            <MenuItem value={"Vue"}>Vue</MenuItem>
            <MenuItem value={"Dot Net"}>Dot Net</MenuItem> 
        </Select>
        <Select
          labelId="Position"
          id="Position"
          type="text"
          value={values.position}
          label="position"
          onChange={handleChange}
          name="position"
          error={!!touched.position && !!errors.position}
          sx={{ gridColumn: "span 2"}}
          // helperText={touched.technology && errors.technology}
        >
          
            <MenuItem value={"Junior"}>Junior</MenuItem>
            <MenuItem value={"Mid"}>Mid</MenuItem>
            <MenuItem value={"Senior"}>Senior</MenuItem> 
        </Select>
        <TextField
          fullWidth
          variant="filled"
          type="number"  // Use type="number" for numeric input
          label="Salary"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.salary}
          name="salary"
          error={touched.salary && !!errors.salary}
          helperText={touched.salary && errors.salary}
          sx={{ gridColumn: "span 4" }}
        />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  technology: yup.string().required("required"),
  position: yup.string().required("required"),
  salary: yup.number().required("required"),
});
const initialValues = {
  fullName: "",
  email: "",
  contact: "",
  address: "",
  technology: "",
  position: "",
  salary: "",
};

export default Form;
