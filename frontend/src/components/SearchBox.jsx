import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Box, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{
        display: "flex",
        alignItems: "center",
        ml: 1,
        mr: 1,
        zIndex: 5,
        position: "relative",
      }}
    >
      <TextField
        variant="outlined"
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="rechercher des produits..."
        size="small"
        sx={{
          flexGrow: 1,
          borderRadius: "5px",
          zIndex: 5,
        }}
      />
      <IconButton type="submit">
        <SearchOutlined />
      </IconButton>
    </Box>
  );
};

export default SearchBox;
