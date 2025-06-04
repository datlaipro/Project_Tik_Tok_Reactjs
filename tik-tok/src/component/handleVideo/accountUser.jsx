import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ActionPattern from "./actionPattern";
import Follower from "./folower";
function AccountUser() {
  return (
    <div>
      <ActionPattern >
        <AccountCircleIcon sx={{ fontSize: 30 }} />
        <Follower />
      </ActionPattern>
    </div>
  );
}
export default AccountUser;
