import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAllNonProfits } from "../services/api/endpoints/nonprofits.api";
import { Address } from "../services/api/types/address";
import { ModalRes } from "../services/api/types/modal";
import { NonProfitRes } from "../services/api/types/non-profit";
import AddNonProfitModal from "./modals/AddNonProfitModal";

const NonProfitsList = () => {
  const [data, setData] = useState<NonProfitRes[]>([]);
  const [modelOpen, setModelOpen] = useState(false);
  const handleOpen = () => {
    setModelOpen(true);
  };
  const handleClose = (res?: ModalRes) => {
    setModelOpen(false);
    if (res?.refresh) {
      getAllNonProfits();
    }
  };

  const getAllNonProfits = async () => {
    const nonProfits = await fetchAllNonProfits();
    setData(nonProfits);
  };
  useEffect(() => {
    getAllNonProfits();
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
        <Typography variant="h6">Non-Profit Organizations</Typography>
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
                <TableCell sx={{ minWidth: "100px" }}>Foundation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{getAddress(row.address)}</TableCell>
                    <TableCell>{row.foundation}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* {modelOpen && ( */}
      <AddNonProfitModal open={modelOpen} handleClose={handleClose} />
      {/* )} */}
    </Box>
  );
};

export default NonProfitsList;
