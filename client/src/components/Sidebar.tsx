import {
  Email,
  Foundation,
  Lightbulb,
  MonetizationOn,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navigationItems: ItemProps[] = [
  {
    label: "Foundations",
    icon: <Foundation />,
    path: "/foundations",
    selector: "foundations",
  },
  {
    label: "Non-Profits",
    icon: <Lightbulb />,
    path: "/nonprofits",
    selector: "nonprofits",
  },
  {
    label: "Notify Grants",
    icon: <MonetizationOn />, // Replace with appropriate icon
    path: "/notify-grants",
    selector: "notify-grants",
  },
  {
    label: "Sent Emails",
    icon: <Email />, // Replace with appropriate icon
    path: "/sent-emails",
    selector: "sent-emails",
  },
];

interface ItemProps {
  label: string;
  icon: React.ReactElement;
  path: string;
  selector: string;
}

const Sidebar = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (item: ItemProps) => {
    setSelected(item.selector);
    navigate(item.path);
  };

  useEffect(() => {
    const path = location.pathname;
    const currentItem = navigationItems.find((ni) => ni.path === path);
    if (currentItem) {
      setSelected(currentItem.selector);
    }
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box sx={{ display: "flex", padding: "1rem 2rem 0" }}>
        <Typography
          variant="h5"
          component={Link}
          to={"/"}
          sx={{ textDecoration: "none" }}
        >
          Temelio
        </Typography>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={selected === item.selector}
            onClick={() => handleNavigation(item)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
