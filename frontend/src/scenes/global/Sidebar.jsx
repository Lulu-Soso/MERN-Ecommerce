import {
  Box,
  IconButton,
  Typography,
  Slide
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { setIsSidebarOpen } from "../../slices/cartSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.cart.isSidebarOpen);

  return (
    <>
      {isSidebarOpen && (
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            position: 'fixed',
            zIndex: 9,
            width: '100%',
            height: '100%',
            left: 0,
            top: 0
          }}
        />
      )}

      <Slide direction="right" in={isSidebarOpen} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: 'max(200px, 20%)',
            height: '100%',
            backgroundColor: 'white',
            zIndex: 99,
            // boxShadow: '2px 0 3px rgba(0,0,0,0.1)'
          }}
        >
          <Box padding="30px" overflow="auto" height="100%">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h3">
                PREA
              </Typography>
              <IconButton onClick={() => dispatch(setIsSidebarOpen(false))}>
                <CloseIcon />
              </IconButton>
              {/* Autres éléments de la barre latérale */}
            </Box>
          </Box>
        </Box>
      </Slide>
    </>
  );
};

export default Sidebar;
