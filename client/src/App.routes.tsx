import { Navigate, Route, Routes } from "react-router-dom";
import AllSentEmails from "./components/AllSentEmails";
import FoundationsList from "./components/FoundationsList";
import GrantNotification from "./components/GrantNotification";
import NonProfitsList from "./components/NonProfitsList";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to={"/foundations"} />} />
    <Route path="nonprofits" element={<NonProfitsList />} />
    <Route path="foundations" element={<FoundationsList />} />
    <Route path="notify-grants" element={<GrantNotification />} />
    <Route path="sent-emails" element={<AllSentEmails />} />
  </Routes>
);

export default AppRoutes;
