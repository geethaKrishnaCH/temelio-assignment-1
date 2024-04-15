import { Grid } from "@mui/material";

import Sidebar from "./components/Sidebar";
import AppRoutes from "./App.routes";

function App() {
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid item xs={6} sm={4} lg={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={6} sm={8} lg={10} sx={{ padding: "1rem", width: "100%" }}>
        <AppRoutes />
      </Grid>
    </Grid>
  );
}

export default App;
