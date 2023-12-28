import { Box } from "@mui/material";

const FormContainer = ({ children }) => {
  return (
    <Box container display="flex" justifyContent="center" sx={{ mt: 10, height: "70%" }}>
      <Box item xs={12} md={6} sx={{ minHeight: "550px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default FormContainer;
