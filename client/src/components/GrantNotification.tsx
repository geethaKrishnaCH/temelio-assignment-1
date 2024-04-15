import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAllFoundations } from "../services/api/endpoints/foundations.api";
import { fetchAllNonProfits } from "../services/api/endpoints/nonprofits.api";
import { Address } from "../services/api/types/address";
import { FoundationRes } from "../services/api/types/foundation";
import { NonProfitRes } from "../services/api/types/non-profit";
import { sendNotifications } from "../services/api/endpoints/notifications.api";

const GrantNotification = () => {
  const [foundations, setFoundations] = useState<FoundationRes[]>([]);
  const [nonProfits, setNonProfits] = useState<NonProfitRes[]>([]);
  const [selectedNonProfits, setSelectedNonProfits] = useState<NonProfitRes[]>(
    []
  );
  const [foundation, setFoundation] = useState<number | null>(null);
  useEffect(() => {
    const getAllNonProfits = async () => {
      const nonProfits = await fetchAllNonProfits();
      setNonProfits(nonProfits.map((np) => ({ ...np, selected: false })));
    };
    const getAllFoundations = async () => {
      const foundations = await fetchAllFoundations();
      setFoundations(foundations);
    };
    getAllFoundations();
    getAllNonProfits();
  }, []);

  const handleAdd = (target: NonProfitRes) => {
    const tempNonProfits = [...nonProfits];
    const selectedNonProfit = tempNonProfits.find(
      (item) => item.id === target.id
    );
    if (selectedNonProfit) {
      selectedNonProfit.selected = true;
      setSelectedNonProfits((prev) => [...prev, selectedNonProfit]);
      setNonProfits([...tempNonProfits]);
    }
  };

  const handleRemove = (target: NonProfitRes) => {
    const tempNonProfits = [...nonProfits];
    const selectedNonProfit = tempNonProfits.find(
      (item) => item.id === target.id
    );
    if (selectedNonProfit) {
      selectedNonProfit.selected = false;
      setNonProfits([...tempNonProfits]);
      const remainingSelected = selectedNonProfits.filter(
        (np) => np.id !== target.id
      );
      if (!!remainingSelected) {
        setSelectedNonProfits([...remainingSelected]);
      } else {
        setSelectedNonProfits([]);
      }
    }
  };

  const handleNotify = async () => {
    const selectedIds = selectedNonProfits.map((np) => np.id);
    await sendNotifications({ nonProfitIds: selectedIds });
    setSelectedNonProfits([]);
    const tempNonProfits = nonProfits.map((np) => {
      np.selected = false;
      return np;
    });
    setNonProfits([...tempNonProfits]);
  };

  const getAddress = ({
    street,
    city,
    zipCode,
    state,
    country,
  }: Address): string => {
    return `${street}, ${city}, ${state}, ${zipCode}, ${country}`;
  };

  let filteredNonProfits: NonProfitRes[] = [];
  if (!!foundation) {
    filteredNonProfits = nonProfits.filter(
      (np) => np.foundationId === foundation
    );
  } else {
    filteredNonProfits = nonProfits;
  }

  return (
    <Box>
      <Typography variant="h6">Send Notifications</Typography>
      <Box sx={{ marginTop: "0.25rem" }}>
        <InputLabel sx={{ marginBottom: "0.25rem" }}>Foundation</InputLabel>
        <Select
          size="small"
          name="foundation"
          sx={{ minWidth: "30%", marginBottom: "8px", maxWidth: "50%" }}
          value={foundation}
          onChange={(e) => {
            let { value } = e.target;
            const newFoundation = foundations.find((f) => f.id === value);
            if (newFoundation) {
              setFoundation(newFoundation.id);
            } else {
              setFoundation(null);
            }
          }}
        >
          <MenuItem value="">Select</MenuItem>
          {foundations.map((f) => (
            <MenuItem key={f.id} value={f.id}>
              {f.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper sx={{ paddingBottom: "1rem" }}>
            <Typography sx={{ padding: "0.5rem" }} variant="subtitle2">
              All Non-Profits
            </Typography>
            <TableContainer sx={{ maxHeight: "400px", overflow: "auto" }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No</TableCell>
                    <TableCell>Non-Profit</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredNonProfits.map((np, idx) => (
                    <TableRow key={np.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{np.name}</TableCell>
                      <TableCell>{getAddress(np.address)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleAdd(np)}
                          disabled={np.selected}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Typography sx={{ padding: "0.5rem" }} variant="subtitle2">
              Selected Non-Profits
            </Typography>
            {!(!!selectedNonProfits && selectedNonProfits.length > 0) && (
              <Typography
                variant="subtitle1"
                textAlign="center"
                sx={{ fontStyle: "italic" }}
              >
                None selected
              </Typography>
            )}
            {!!selectedNonProfits && selectedNonProfits.length > 0 && (
              <>
                <TableContainer sx={{ maxHeight: "400px", overflow: "auto" }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr. No.</TableCell>
                        <TableCell>Non-Profit</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedNonProfits.map((np, idx) => (
                        <TableRow key={np.id}>
                          <TableCell>{idx + 1}</TableCell>
                          <TableCell>{np.name}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="warning"
                              size="small"
                              onClick={() => handleRemove(np)}
                            >
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    padding: "1rem",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    disabled={!(selectedNonProfits.length > 0)}
                    onClick={handleNotify}
                  >
                    Nofify
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GrantNotification;
