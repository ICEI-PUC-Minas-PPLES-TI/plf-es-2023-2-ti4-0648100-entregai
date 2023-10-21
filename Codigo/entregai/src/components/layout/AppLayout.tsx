import { ToastContainer } from "react-toastify";
import MenuBar from "../misc/MenuBar";
import Box from '@mui/material/Box';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
      <div style={{ display: 'flex' }}>

        <MenuBar />

        <Box component="main" className="main-content" sx={{ flexGrow: 1, padding: 3, marginTop: 10 }}>
          {children}
        </Box>

      </div>
    );
  }