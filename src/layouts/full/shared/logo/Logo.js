import { Link } from "react-router-dom";
import { ReactComponent as LogoDark1 } from "src/assets/images/logos/dark1-logo.svg";
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
        justifyContent:'center'
      }}
    >
      {/* <LogoDark1 /> */}
    <img src={dareLogo} alt="data"/>
      {/* <dareLogo /> */}
    </LinkStyled>
  );
};

export default Logo;
