import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import parser from "react-html-parser";
import { fetchAllFoundations } from "../services/api/endpoints/foundations.api";
import { fetchAllNonProfits } from "../services/api/endpoints/nonprofits.api";
import { fetchNotifications } from "../services/api/endpoints/notifications.api";
import { FoundationRes } from "../services/api/types/foundation";
import { NonProfitRes } from "../services/api/types/non-profit";
import { NotificationRes } from "../services/api/types/notification";

const AllSentEmails = () => {
  const [foundations, setFoundations] = useState<FoundationRes[]>([]);
  const [nonProfits, setNonProfits] = useState<NonProfitRes[]>([]);
  const [nonProfit, setNonProfit] = useState<string>("");
  const [foundation, setFoundation] = useState<string>("");
  const [notifications, setNotifications] = useState<NotificationRes[]>([]);

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

  useEffect(() => {
    const getSentEmails = async () => {
      const res = await fetchNotifications(foundation, nonProfit);
      setNotifications(res);
    };
    getSentEmails();
  }, [nonProfit, foundation]);

  const handleFoundationChange = (e: SelectChangeEvent) => {
    let { value } = e.target;
    if (!!value) {
      const newFoundation = foundations.find((f) => f.id + "" === value);
      if (!!newFoundation) {
        setFoundation(newFoundation.id + "");
      } else {
        setFoundation("");
      }
    } else {
      setFoundation("");
    }
  };
  const handleNonProfitChange = (e: SelectChangeEvent) => {
    let { value } = e.target;
    if (!!value) {
      const newNonProfit = nonProfits.find((f) => f.id + "" === value);
      if (!!newNonProfit) {
        setNonProfit(newNonProfit.id + "");
      } else {
        setNonProfit("");
      }
    } else {
      setNonProfit("");
    }
  };

  return (
    <Box>
      <Typography variant="h6">Sent Notifications</Typography>
      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Box sx={{ marginTop: "0.25rem" }}>
          <InputLabel sx={{ marginBottom: "0.25rem" }}>Foundation</InputLabel>
          <Select
            size="small"
            name="foundation"
            sx={{ minWidth: "200px", marginBottom: "8px", maxWidth: "50%" }}
            value={foundation}
            onChange={handleFoundationChange}
          >
            <MenuItem value="">Select</MenuItem>
            {foundations.map((f) => (
              <MenuItem key={f.id} value={f.id + ""}>
                {f.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ marginTop: "0.25rem" }}>
          <InputLabel sx={{ marginBottom: "0.25rem" }}>Non-Profit</InputLabel>
          <Select
            size="small"
            name="nonProfit"
            sx={{ minWidth: "200px", marginBottom: "8px", maxWidth: "50%" }}
            value={nonProfit}
            onChange={handleNonProfitChange}
          >
            <MenuItem value="">Select</MenuItem>
            {nonProfits.map((f) => (
              <MenuItem key={f.id} value={f.id + ""}>
                {f.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box>
        {!(notifications && notifications.length > 0) && (
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ fontStyle: "italic" }}
          >
            No data found
          </Typography>
        )}
        {notifications && notifications.length > 0 && (
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ minWidth: "100px" }}>Sender</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>Receiver</TableCell>
                  <TableCell sx={{ minWidth: "100px" }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.foundation}</TableCell>
                      <TableCell>{row.nonProfit}</TableCell>
                      <TableCell>{parser(row.email)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default AllSentEmails;
