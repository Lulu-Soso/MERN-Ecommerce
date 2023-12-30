import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Message from '../../../components/Message'; // Update or replace this component
import Loader from '../../../components/Loader'; // Update or replace this component
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '../../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        toast.success("User deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Box width="80%" m="80px auto">
      <Typography variant='h4' sx={{ mb: 2 }}>Utilisateurs</Typography>
      {isLoading ? (
        <Loader /> // Update or replace this component
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message> // Update or replace this component
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NOM</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>ADMIN</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <CheckIcon style={{ color: 'green' }} />
                    ) : (
                      <CloseIcon style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell>
                    {!user.isAdmin && (
                      <>
                        <Link to={`/admin/user/${user._id}/edit`} style={{ marginRight: '10px' }}>
                          <Button variant='outlined'>
                            <EditIcon />
                          </Button>
                        </Link>
                        <Button
                          variant='outlined'
                          color='error'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserList;
