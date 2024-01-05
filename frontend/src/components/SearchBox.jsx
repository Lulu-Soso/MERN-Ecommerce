import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        ml: 1, 
        mr: 1,
        zIndex: 5,
        position: 'relative'
      }}
    >
      <TextField
        variant='outlined'
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='rechercher des produits...'
        size='small'
        sx={{
          flexGrow: 1,
          // backgroundColor: 'background.paper',
          // backgroundColor: 'white',
          borderRadius: '5px',
          zIndex: 5,
        }}
      />
      <Button
        type='submit'
        variant='contained'
        // color='primary'
        sx={{ p: 1, ml: 1 }}
      >
        Rechercher
      </Button>
    </Box>
  );
};

export default SearchBox;
