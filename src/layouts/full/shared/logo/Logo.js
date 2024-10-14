import { Link } from "react-router-dom";
import dareLogo from "src/assets/images/dareLogo.png";
import { styled } from "@mui/material";
const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled
      to="/"
      height={70}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={dareLogo} alt="data" />
    </LinkStyled>
  );
};

export default Logo;
