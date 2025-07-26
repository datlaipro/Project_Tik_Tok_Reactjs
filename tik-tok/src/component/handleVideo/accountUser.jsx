import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ActionPattern from "./actionPattern";
import Follower from "./folower";

function AccountUser() {
  return (
    <div style={{ position: "relative"}}> {/* 👈 thêm relative ở đây */}
      <ActionPattern>
        <div > {/* 👈 hoặc đây */}
          <AccountCircleIcon sx={{ fontSize: 30 }} />
           
        </div>
        <Follower />{/* sẽ bám vào thẻ cha gần nhất có relative */}
      </ActionPattern>
    </div>
  );
}
export default AccountUser