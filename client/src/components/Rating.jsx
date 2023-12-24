import React from 'react';
import { Box, Typography } from '@mui/material';
import {Star, StarHalf, StarBorder} from '@mui/icons-material';

const Rating = ({ value, text, color }) => {
  return (
    <Box display='flex' alignItems='center'>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {value >= star ? (
            <Star style={{ color }} />
          ) : value >= star - 0.5 ? (
            <StarHalf style={{ color }} />
          ) : (
            <StarBorder style={{ color }} />
          )}
        </span>
      ))}
      {text && (
        <Typography variant='body2' sx={{ ml: 1 }}>
          {text}
        </Typography>
      )}
    </Box>
  );
};

Rating.defaultProps = {
  color: '#f8e825',
};

export default Rating;
