import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from "@mui/material";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
// import FormContainer from '../../../components/common/FormContainer';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../../slices/usersApiSlice";

const UserEdit = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Box width="80%" m="80px auto">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Link to="/admin/userlist" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Retourner
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Modifier l'utilisateur</Typography>
        </Grid>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
            <Message severity='error'>{error}</Message>
        ) : (
          <Grid item xs={12}>
            <form onSubmit={submitHandler}>
              <TextField
                label="Nom"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                fullWidth
              />
              <TextField
                label="Adresse mail"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                fullWidth
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      name="isAdmin"
                    />
                  }
                  label="Est administrateur"
                  style={{ margin: "1rem" }}
                />
                <Button type="submit" variant="contained">
                  Mettre à jour
                </Button>
              </Box>
            </form>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default UserEdit;
