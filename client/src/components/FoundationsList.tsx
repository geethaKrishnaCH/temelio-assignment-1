import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { fetchAllFoundations } from "../services/api/endpoints/foundations.api";
import { Address } from "../services/api/types/address";
import { FoundationRes } from "../services/api/types/foundation";
import AddFoundationModal from "./modals/AddFoundationModal";
import { ModalRes } from "../services/api/types/modal";

const FoundationsList = () => {
  const [data, setData] = useState<FoundationRes[]>([]);
  const [modelOpen, setModelOpen] = useState(false);
  const handleOpen = () => {
    setModelOpen(true);
  };
  const handleClose = (res?: ModalRes) => {
    setModelOpen(false);
    if (res?.refresh) {
      getAllFoundations();
    }
  };

  const getAllFoundations = async () => {
    const foundations = await fetchAllFoundations();
    setData(foundations);
  };
  useEffect(() => {
    getAllFoundations();
  }, []);

  const getAddress = ({
    street,
    city,
    zipCode,
    state,
    country,
  }: Address): string => {
    return `${street}, ${city}, ${state}, ${zipCode}, ${country}`;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Foundations</Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </Box>
      {!(data && data.length > 0) && (
        <Typography variant="subtitle1" textAlign="center">
          No data found
        </Typography>
      )}
      {data && data.length > 0 && (
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: "100px" }}>Name</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Email</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Address</TableCell>
                {/* <TableCell sx={{ minWidth: "100px" }}></TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{getAddress(row.address)}</TableCell>
                    {/* <TableCell>
                      <Button variant="contained" color="warning" size="small">
                        Remove
                      </Button>
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {modelOpen && (
        <AddFoundationModal open={modelOpen} handleClose={handleClose} />
      )}
    </Box>
  );
};

export default FoundationsList;
