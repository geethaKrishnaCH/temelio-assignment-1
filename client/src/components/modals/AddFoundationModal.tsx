import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { saveFoundation } from "../../services/api/endpoints/foundations.api";
import { FoundationReq } from "../../services/api/types/foundation";
import { ModalRes } from "../../services/api/types/modal";

interface Props {
  open: boolean;
  handleClose: (res?: ModalRes) => void;
}

const AddFoundationModal = ({ open, handleClose }: Props) => {
  const [foundation, setFoundation] = useState<FoundationReq>({
    name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleSubmit = async () => {
    await saveFoundation(foundation);
    handleClose({ refresh: true });
  };
  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle sx={{ minWidth: "400px" }}>
        <div>Foundation Details</div>
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
            value={foundation.name}
            onChange={(e) =>
              setFoundation((prev) => ({
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
            value={foundation.email}
            onChange={(e) =>
              setFoundation((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }))
            }
          />
          <TextField
            sx={{ marginBottom: "8px" }}
            type="text"
            label="Street"
            size="small"
            name="street"
            fullWidth
            value={foundation.street}
            onChange={(e) =>
              setFoundation((prev) => ({
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
                value={foundation.city}
                onChange={(e) =>
                  setFoundation((prev) => ({
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
                value={foundation.state}
                onChange={(e) =>
                  setFoundation((prev) => ({
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
                value={foundation.zipCode}
                onChange={(e) =>
                  setFoundation((prev) => ({
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
                value={foundation.country}
                onChange={(e) =>
                  setFoundation((prev) => ({
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

export default AddFoundationModal;
