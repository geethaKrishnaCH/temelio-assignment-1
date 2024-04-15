import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAllFoundations } from "../../services/api/endpoints/foundations.api";
import { saveNonProfit } from "../../services/api/endpoints/nonprofits.api";
import { FoundationRes } from "../../services/api/types/foundation";
import { ModalRes } from "../../services/api/types/modal";
import { NonProfitReq } from "../../services/api/types/non-profit";

interface Props {
  open: boolean;
  handleClose: (res?: ModalRes) => void;
}

const AddNonProfitModal = ({ open, handleClose }: Props) => {
  const [nonProfit, setNonProfit] = useState<NonProfitReq>({
    name: "",
    email: "",
    street: "",
    foundation: null,
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [foundations, setFoundations] = useState<FoundationRes[]>([]);

  const handleSubmit = async () => {
    await saveNonProfit(nonProfit);
    handleClose({ refresh: true });
  };

  useEffect(() => {
    const getAllFoundations = async () => {
      const foundations = await fetchAllFoundations();
      setFoundations(foundations);
    };
    getAllFoundations();
  }, []);
  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ minWidth: "400px" }}>
        <div>Non-Profit Details</div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form>
          <TextField
            sx={{ marginBottom: "8px" }}
            type="name"
            label="Name"
            size="small"
            name="name"
            fullWidth
            value={nonProfit.name}
            onChange={(e) =>
              setNonProfit((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            type="email"
            label="Email"
            size="small"
            name="email"
            fullWidth
            value={nonProfit.email}
            onChange={(e) =>
              setNonProfit((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Box>
            <InputLabel>Foundation</InputLabel>
            <Select
              size="small"
              name="foundation"
              sx={{ minWidth: "30%", marginBottom: "8px", maxWidth: "50%" }}
              value={nonProfit.foundation}
              onChange={(e) => {
                let { name, value } = e.target;
                const foundation = value ?? null;
                setNonProfit((prev) => ({
                  ...prev,
                  [name]: foundation,
                }));
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
          <TextField
            sx={{ marginBottom: "8px" }}
            type="text"
            label="Street"
            size="small"
            name="street"
            fullWidth
            value={nonProfit.street}
            onChange={(e) =>
              setNonProfit((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <Grid container spacing={2} sx={{ marginBottom: "8px" }}>
            <Grid item xs={6}>
              <TextField
                type="city"
                label="City"
                size="small"
                name="city"
                fullWidth
                value={nonProfit.city}
                onChange={(e) =>
                  setNonProfit((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="State"
                size="small"
                name="state"
                fullWidth
                value={nonProfit.state}
                onChange={(e) =>
                  setNonProfit((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ marginBottom: "8px" }}>
            <Grid item xs={6}>
              <TextField
                sx={{ marginBottom: "4px" }}
                type="text"
                label="Zipcode"
                size="small"
                name="zipCode"
                fullWidth
                value={nonProfit.zipCode}
                onChange={(e) =>
                  setNonProfit((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                label="Country"
                size="small"
                name="country"
                fullWidth
                value={nonProfit.country}
                onChange={(e) =>
                  setNonProfit((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <Divider />
      <DialogActions>
        <Button variant="contained" type="button" onClick={handleSubmit}>
          Add
        </Button>
        <Button variant="outlined" onClick={() => handleClose()}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNonProfitModal;
