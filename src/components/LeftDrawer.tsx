import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import "../styles/globals.css";
import fotfAppLogo from "../assets/FOTF_App.png";
import theHubLogo from "../assets/hub_icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Backdrop, Chip, IconButton, useMediaQuery, useTheme } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ShopOutlinedIcon from "@mui/icons-material/ShopOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useEffect, useState } from "react";
import { useAddress, useSDK } from "@thirdweb-dev/react";
import { LeftDrawerWidth } from "../App";
import ConnectingAirportsOutlinedIcon from '@mui/icons-material/ConnectingAirportsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CycloneOutlinedIcon from '@mui/icons-material/CycloneOutlined';
import ChildFriendlyOutlinedIcon from '@mui/icons-material/ChildFriendlyOutlined';
import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';

type NavProps = {
  setNavOpen: Function;
  navOpen: boolean;
};

const primaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--primary-color");
const secondaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--secondary-color");
const backgroundColorGlobal = getComputedStyle(
  document.documentElement
).getPropertyValue("--background-color");
const accentColor = getComputedStyle(document.documentElement).getPropertyValue(
  "--accent-color"
);

function LeftDrawer(props: NavProps) {
  const { navOpen, setNavOpen } = props;
  const navigate = useNavigate();
  const themeMui = useTheme();
  const isMobile = !useMediaQuery(themeMui.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(themeMui.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [activePage, setActivePage] = React.useState("Dashboard");
  const drawerWidth = navOpen ? LeftDrawerWidth : 0;

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleMobileClick = () => {
    if (isMobile) {
      console.log("mobile click - closing nav")
      setNavOpen(false);
    }
  };

  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");


  const [isBridgePage, setIsBridgePage] = useState(false);
  const location = useLocation();  

  useEffect(() => {
    if (!isMobile && isMediumLarge) {
      setSmallScreen(true);
    } else {
      setSmallScreen(isMobile); 
    }
    const lowercasePath = location.pathname.toLowerCase();
    switch (lowercasePath) {
      // case "/HoneyExchange":
      //   setActivePage("HoneyExchange");
      //   break;
      case "/HoneyStore":
        setActivePage("HoneyStore");
        break;
      case "/campaigntrail":
        setActivePage("CampaignTrail");
        break;
      // case "/buildateddy":
      //   setActivePage("BuildATeddy");
      //   break;
      // case "/tedmint":
      //   setActivePage("TedMint");
      //   break;
      // case "/teddymint":
      //   setActivePage("TeddyMint");
      //   break;
      // case "/aitedmint":
      //   setActivePage("AITedMint");
      //   break;
      
      // case "/teddyclaims":
      //   setActivePage("TeddyClaims");
      //   break;
      // case "/tedclaims":
      //   setActivePage("TedClaims");
      //   break;
      // case "/traitswapteds":
      //   setActivePage("TraitSwapTeds");
      //   break;
      // case "/Bridge":
      //   setActivePage("PolygonBridge");
      //   setIsBridgePage(true);
      //   break;
      // case "/bridge":
      //   setActivePage("PolygonBridge");
      //   setIsBridgePage(true);
      //   break;
      default:
        setActivePage("Dashboard");
        break;
    }
  }, [isMobile, isMediumLarge, location.pathname]);

 

  const loadPage = (page: string) => {
    switch (page) {
      case "Dashboard":
        navigate("/");
        setActivePage("Dashboard");
        handleMobileClick();
        break;
      case "HowToPlay":
        window.open("https://docs.furyofthefur.com");
        handleMobileClick();
        break;
      case "News":
        navigate("/News");
        handleMobileClick();
        break;
      case "CampaignTrail":
        navigate("/CampaignTrail");
        handleMobileClick();
        break;
      case "PackOpening":
        navigate("/PackOpening");
        handleMobileClick();
        break;
      case "MyCards":
        navigate("/MyCards");
        handleMobileClick();
        break;
      // case "Downloads":
      //   window.open(
      //     "https://drive.google.com/drive/folders/1_FHhUhooWOXxfJoNaS1YBKgvMLMjsCPN?usp=sharing"
      //   );
      //   handleMobileClick();
      //   break;
      // case "Shop":
      //   window.open("https://shopfotf.com");
      //   handleMobileClick();
      //   break;
      case "HoneyStore":
        navigate("/HoneyStore");
        setActivePage("HoneyStore");
        handleMobileClick();
        break;
      case "TedMint":
        navigate("/TedMint");
        setActivePage("TedMint");
        handleMobileClick();
        break;
      case "TeddyMint":
        navigate("/TeddyMint");
        setActivePage("TeddyMint");
        handleMobileClick();
        break;
      case "AITedMint":
        navigate("/AITedMint");
        setActivePage("AITedMint");
        handleMobileClick();
        break;
      // case "TedClaims":
      //   navigate("/TedClaims");
      //   setActivePage("TedClaims");
      //   handleMobileClick();
      //   break;
      // case "TeddyClaims":
      //   navigate("/TeddyClaims");
      //   setActivePage("TeddyClaims");
      //   handleMobileClick();
      //   break;
      case "BuildATeddy":
        navigate("/BuildATeddy");
        setActivePage("BuildATeddy");
        handleMobileClick();
        break;
      case "TraitSwapTeds":
        navigate("/TraitSwapTeds");
        setActivePage("TraitSwapTeds");
        handleMobileClick();
        break;
      case "HoneyExchange":
        navigate("/HoneyExchange");
        setActivePage("HoneyExchange");
        handleMobileClick();
        break;
      case "PolygonBridge":
        navigate("/Bridge");
        setActivePage("PolygonBridge");
        handleMobileClick();
        break;
      case "VisualUpgrades":
        navigate("/VisualUpgrades");
        setActivePage("VisualUpgrades");
        handleMobileClick();
        break;
      case "Hub":
        window.open("https://furyofthefur.com");
        handleMobileClick();
        break;
      default:
        navigate("/");
        handleMobileClick();
        break;
    }
  };

  // const StyledDialog = styled(Drawer)`
  //   margin: 0px;
  //   padding: 0px;
  // `;

  return (
    <Box sx={{ display: "flex", margin: "0px !important", padding: "0px !important" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-root": { width: 200, zIndex: -1 },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            zIndex: 10001,
            overflowY: "auto",
            overflowX: "hidden",
            margin: "0px !important", padding: "0px !important",
            border: "none",
            boxSizing: "border-box",
            flexShrink: 0,
          },
        }}
        open={navOpen}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <Box sx={{ paddingTop: "10px", position: "relative" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <img
                src={fotfAppLogo}
                alt="FOTF Logo"
                onClick={() => loadPage("Dashboard")}
                className={isSmallScreen ? "mainLogo-Mobile" : "mainLogo"}
              />
              {isMobile || isMediumLarge ? (
                <IconButton onClick={() => setNavOpen(false)} size="large">
                  <ChevronLeftIcon style={{ fill: "black" }} />
                </IconButton>
              ) : (
                <div></div>
              )}
            </Box>
          </Box>
        </Toolbar>
        <List>
          {/* <ListItem
            key={"Dashboard"}
            disablePadding
            onClick={() => loadPage("Dashboard")}
          >
            <ListItemButton selected={activePage === "Dashboard"}>
              <ListItemIcon>
                <GridViewOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"HowToPlay"}
            disablePadding
            onClick={() => loadPage("HowToPlay")}
          >
            <ListItemButton selected={activePage === "HowToPlay"}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"How To Play"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"News"}
            disablePadding
            onClick={() => loadPage("News")}
          >
            <ListItemButton selected={activePage === "News"}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"News"} />
            </ListItemButton>
          </ListItem>
           */}
          {/* <ListItem
            key={"Downloads"}
            disablePadding
            onClick={() => loadPage("Downloads")}
          >
            <ListItemButton selected={activePage === "Downloads"}>
              <ListItemIcon>
                <FileDownloadOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Downloads"} />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem
            key={"Shop"}
            disablePadding
            onClick={() => loadPage("Shop")}
          >
            <ListItemButton selected={activePage === "Shop"}>
              <ListItemIcon>
                <ShopOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Shop"} />
            </ListItemButton>
          </ListItem> */}
        </List>
        {/* <Divider />
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px" }}>
          Minting
        </Typography>
        <List>
          <ListItem
            key={"TedMint"}
            disablePadding
            onClick={() => loadPage("TedMint")}
          >
            <ListItemButton selected={activePage === "TedMint"}>
              <ListItemIcon>
                <CatchingPokemonOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Fury Ted Mint"} />
              <Chip size="small"  label={<Typography sx={{fontSize: "15px"}}> New &#x2728; </Typography>} color="primary" sx={{maxHeight: "40px", maxWidth: "70px", marginRight: "33px", marginBottom: "15px", border: "none"}} variant="outlined"/>
            </ListItemButton>
          </ListItem> 
          <ListItem
            key={"TeddyMint"}
            disablePadding
            onClick={() => loadPage("TeddyMint")}
          >
            <ListItemButton selected={activePage === "TeddyMint"}>
              <ListItemIcon>
                <ChildFriendlyOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Teddy Mint"} />
              <Chip size="small"  label={<Typography sx={{fontSize: "15px"}}> New &#x2728; </Typography>} color="primary" sx={{maxHeight: "40px", maxWidth: "70px", marginRight: "50px", marginBottom: "15px", border: "none"}} variant="outlined"/>
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"AITedMint"}
            disablePadding
            onClick={() => loadPage("AITedMint")}
          >
            <ListItemButton selected={activePage === "AITedMint"}>
              <ListItemIcon>
                <CycloneOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"AI Ted Mint"} />
              <Chip size="small"  label={<Typography sx={{fontSize: "15px"}}> New &#x2728; </Typography>} color="primary" sx={{maxHeight: "40px", maxWidth: "70px", marginRight: "50px", marginBottom: "15px", border: "none"}} variant="outlined"/>
            </ListItemButton>
          </ListItem>
        </List> */}
        {/* <Divider />
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px" }}>
          Utility
        </Typography>
        <List> */}
          {/* <ListItem
            key={"BuildATeddy"}
            disablePadding
            onClick={() => loadPage("BuildATeddy")}
          >
            <ListItemButton selected={activePage === "BuildATeddy"}>
              <ListItemIcon>
                <ConstructionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Build A Teddy"} />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem
            key={"TraitSwapTeds"}
            disablePadding
            onClick={() => loadPage("TraitSwapTeds")}
          >
            <ListItemButton selected={activePage === "TraitSwapTeds"}>
              <ListItemIcon>
                <EditOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Trait Swap Teds"} />
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem
            key={"PackOpening"}
            disablePadding
            onClick={() => loadPage("PackOpening")}
          >
            <ListItemButton selected={activePage === "PackOpening"}>
              <ListItemIcon>
                <PrecisionManufacturingOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Box className="row">
                <ListItemText primary={"Pack Opening"} />
                <Chip size="small"  label={<Typography sx={{fontSize: "15px"}}> New &#x2728; </Typography>} color="primary" sx={{ justifyContent: "flex-start", textAlign: "start", alignItems: "flex-start", marginRight: "45px", marginBottom: "15px", border: "none"}} variant="outlined"/>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"MyCards"}
            disablePadding
            onClick={() => loadPage("MyCards")}
          >
            <ListItemButton selected={activePage === "MyCards"}>
              <ListItemIcon>
                <ImageOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"My Cards"} />
              <Chip size="small"  label={<Typography sx={{fontSize: "15px"}}> New &#x2728; </Typography>} color="primary" sx={{ justifyContent: "flex-start", textAlign: "start", alignItems: "flex-start", marginRight: "55px", marginBottom: "15px", border: "none"}} variant="outlined"/>
            </ListItemButton>
          </ListItem> */}
          {/* <ListItem
            key={"HoneyExchange"}
            disablePadding
            onClick={() => loadPage("HoneyExchange")}
          >
            <ListItemButton selected={activePage === "HoneyExchange"}>
              <ListItemIcon>
                <PrecisionManufacturingOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Box className="row">
                <ListItemText primary={"Honey Exchange"} />
              </Box>
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"VisualUpgrades"}
            disablePadding
            onClick={() => loadPage("VisualUpgrades")}
          >
            <ListItemButton selected={activePage === "VisualUpgrades"}>
              <ListItemIcon>
                <ImageOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Visual Upgrades"} />
            </ListItemButton>
          </ListItem> 
          {/* <ListItem
            key={"PolygonBridge"}
            disablePadding
            onClick={() => loadPage("PolygonBridge")}
          >
            <ListItemButton selected={activePage === "PolygonBridge"}>
              <ListItemIcon>
                <ConnectingAirportsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Polygon Bridge"} />
            </ListItemButton>
          </ListItem>
        </List> */}
        <Divider />
        <Typography sx={{ marginTop: "10px", paddingLeft: "18px" }}>
          Economy
        </Typography>
        <List>
          <ListItem
            key={"HoneyStore"}
            disablePadding
            onClick={() => loadPage("HoneyStore")}
          >
            <ListItemButton selected={activePage === "HoneyStore"}>
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Box className="row">
                <ListItemText primary={"$HNY Store"} />
                {/* <Chip size="small"  label={<Typography sx={{fontSize: "15px"}}> New &#x2728; </Typography>} color="primary" sx={{maxHeight: "40px", maxWidth: "70px", justifyContent: "flex-start", textAlign: "start", alignItems: "flex-start", marginRight: "25px", marginBottom: "15px", border: "none"}} variant="outlined"/> */}
              </Box>
              </ListItemButton>
          </ListItem>
          <ListItem
            key={"CampaignTrail"}
            disablePadding
            onClick={() => loadPage("CampaignTrail")}
          >
            <ListItemButton selected={activePage === "CampaignTrail"}>
              <ListItemIcon>
                <DescriptionOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Campaign Trail"} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem
            key={"TedClaims"}
            disablePadding
            onClick={() => loadPage("TedClaims")}
          >
            <ListItemButton selected={activePage === "TedClaims"}>
              <ListItemIcon>
                <RequestQuoteOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Ted Claims"} />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"TeddyClaims"}
            disablePadding
            onClick={() => loadPage("TeddyClaims")}
          >
            <ListItemButton selected={activePage === "TeddyClaims"}>
              <ListItemIcon>
                <SwapHorizOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={"Teddy Claims"} />
            </ListItemButton>
          </ListItem>
           */}
        </List>
        
        <Box
          sx={{
            cursor: "pointer",
            border: "solid",
            marginTop: "25px",
            borderRadius: "10px",
            backgroundColor: "#000",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "25px",
            maxWidth: "200px !important",
            width: "200px !important",
            height: "150px !important",
            maxHeight: "150px !important",
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => loadPage("Hub")}
        >
          <img src={theHubLogo} alt="Visit The Hub" className="hubLogo" />
          <Box
            sx={{
              flexDirection: "column",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "10px",
              paddingRight: "10%",
            }}
          >
            <Typography
              sx={{
                color: accentColor,
                fontSize: "1.75rem",
                paddingLeft: "5px",
                justifyContent: "end",
                alignSelf: "flex-end",
                marginTop: "10px",
              }}
            >
              Visit The Hub
            </Typography>
            <Typography
              sx={{
                color: accentColor,
                fontSize: "1rem",
                justifyContent: "end",
                alignSelf: "flex-end",
                marginBottom: "10px",
              }}
            >
              All things FOTF
            </Typography>
          </Box>
        </Box>
        {!address && <Backdrop
          sx={{
            color: "#fff",
            width: drawerWidth,
            zIndex: (theme: { zIndex: { drawer: number } }) =>
              theme.zIndex.drawer + 1,
          }}
          open={!address}
          onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>}
        {isBridgePage && <Backdrop
          sx={{
            color: "#fff",
            width: drawerWidth,
            zIndex: (theme: { zIndex: { drawer: number } }) =>
              theme.zIndex.drawer + 1,
          }}
          open={isBridgePage}
          onClick={handleClose}
        >
          {/* <CircularProgress color="inherit" /> */}
        </Backdrop>}
      </Drawer>
    </Box>
  );
}

export default LeftDrawer;
