import {
  Box,
  IconButton,
  ImageList,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ConnectWallet,
  ThirdwebNftMedia,
  ThirdwebProvider,
  useContract,
  useNFT,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useTitle } from "./hooks/useTitle";
import "./styles/Dashboard.css";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HoneyExchange from "./views/HoneyExchange";
import Dashboard from "./views/Dashboard";

import NotFound from "./views/NotFound";
import LeftDrawer from "./components/LeftDrawer";
import RightDrawer from "./components/RightDrawer";
import BuildATeddy from "./views/BuildATeddy";
import TraitSwapTeds from "./views/TraitSwapTeds";
import HoneyStore from "./views/HoneyStore";
import TedClaims from "./views/TedClaims";
import TeddyClaims from "./views/TeddyClaims";
import MenuIcon from "@mui/icons-material/Menu";
import {
  LoadETHAccountDetails,
  allOwnedNFTs,
  initialState,
} from "./account/loadETHAccountDetails";
import VisualUpgrades from "./views/VisualUpgrades";
import ConnectWalletPage from "./components/ConnectWalletPage";
import PolygonBridge from "./views/PolygonBridge";
import { MainnetNetwork } from "./components/MainnetNetwork";
import { Ethereum, Polygon } from "@thirdweb-dev/chains";
import { LoadPolygonAccountDetails } from "./account/loadPolygonAccountDetails";
import AITedMint from "./views/AITedMint";
import TedMint from "./views/TedMint";
import TeddyMint from "./views/TeddyMint";
import { PolygonNetwork } from "./components/PolygonNetwork";
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import Game from "./gamePieces/components/Game";
import News from "./views/News";
import Campaigns from "./views/Campaigns";
import MyCards from "./views/MyCards";
import PackOpening from "./views/PackOpening";
import CampaignTrail from "./gamePieces/components/CampaignTrail";
import ChapterOne from "./gamePieces/components/ChapterOne";
import ChapterOneLeaderSelection from "./gamePieces/components/ChapterOneLeaderSelection";

export const LeftDrawerWidthPX = "260px";
export const LeftDrawerWidth = 260;

function App() {
  useTitle("FOTF | Dashboard");
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");
  const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");
  const sidebarBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue("--sidebar-background-color");
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent-color");
  const errorColor = getComputedStyle(document.documentElement).getPropertyValue("--error-color");
  
  const theme = createTheme({
    typography: {
      fontFamily: ["Bebas Neue", "Roboto", "Helvetica", "Arial"].join(","),
      fontSize: 16,
      fontWeightLight: 300,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: sidebarBackgroundColor,
            paddingLeft: "10px !important",
            paddingRight: "10px !important",
            overflowX: "hidden",
            overflowY: "hidden",
            "&:hover": {
              overflowY: "auto",
            },
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            marginLeft: "20px",
            marginRight: "20px",
            opacity: 0.65,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            padding: 15,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColor,
            color: accentColor,
            "&:hover": {
              backgroundColor: accentColor,
              color: primaryColor,
            },
            "&:disabled": {
              backgroundColor: "grey",
            },
          },
        },
      },
    },
  });

  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const isLarge = useMediaQuery(theme.breakpoints.down("xl"));
  console.log(isMobile);
  console.log(isMediumLarge);
  console.log(isLarge);
  const [isSmallScreen, setSmallScreen] = useState(false);
  const leftDrawerWidth = isSmallScreen ? "0px" : "260px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "320px";

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress(); // Get connected wallet address
  const [, switchNetwork] = useNetwork(); // Switch to desired chain
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network
  const [showMismatch, setShowMismatch] = useState(false);
  
  const [leftNavOpen, setLeftNavOpen] = useState(true);
  const [rightNavOpen, setRightNavOpen] = useState(true);
  const [isBridgePage, setIsBridgePage] = useState(false);
  const [allOwnedNFTsArray, setAllOwnedNFTsArray] = useState<any>([]);

  const polygonTokenProps = LoadPolygonAccountDetails();

  const handleOpen = (): void => {
    setLeftNavOpen(true);
    console.log(leftNavOpen);
    console.log("setNavOpen is true");
  };

  const handleRightNavOpen = (): void => {
    setRightNavOpen(true);
    console.log(rightNavOpen);
    console.log("setRightNavOpen is true");
  };

  useEffect(() => {
    if (isMismatched && (!isSmallScreen || (isSmallScreen && !rightNavOpen && !leftNavOpen))){
      setShowMismatch(true);
    } else {
      setShowMismatch(false);
    }
  }, [address, isMismatched, isSmallScreen, leftNavOpen, rightNavOpen]);

 

  const location = useLocation();  
  const [pageTitle, setPageTitle] = useState("");
  const lowercasePath = location.pathname.toLowerCase();

  useEffect(() => {
    if (!isMobile && !isMediumLarge && isLarge && (pageTitle === "Dashboard")){
      setRightNavOpen(false);
      setSmallScreen(true);
    } else if (!isMobile && isMediumLarge) {
      setRightNavOpen(false);
      setSmallScreen(true);
    } else if (!address) {
      setRightNavOpen(true);
    } else {
      setRightNavOpen(false);
      setSmallScreen(isMobile);
    }
    setLeftNavOpen(false);
    
  }, [isMobile, isMediumLarge, isMismatched, isSmallScreen, isLarge, location.pathname, pageTitle, lowercasePath, address]);

  // useEffect(() => {
  //   if (!isMobile && !isMediumLarge && isLarge && (pageTitle === "Dashboard")){
  //     setLeftNavOpen(false);
  //     setRightNavOpen(false);
  //     setSmallScreen(true);
  //   } else if (!isMobile && isMediumLarge) {
  //     setLeftNavOpen(false);
  //     setRightNavOpen(false);
  //     setSmallScreen(true);
  //   } else if ((lowercasePath === "/game" || lowercasePath === "/campaigntrail" || lowercasePath === "/chapterone")  && address) {
  //     setLeftNavOpen(false);
  //     setRightNavOpen(false);
  //   } else {
  //     setLeftNavOpen(!isMobile);
  //     setRightNavOpen(!isMobile);
  //     setSmallScreen(isMobile);
  //   }
    
  // }, [isMobile, isMediumLarge, isMismatched, isSmallScreen, isLarge, location.pathname, pageTitle, lowercasePath, address]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!address) {
  //     navigate("/");
  //   }
  // }, [address, navigate]);

  useEffect(() => { 
 
    switch (lowercasePath) {
      // case "/":
      //   setPageTitle("Dashboard");
      //   break;
      case "/":
        setPageTitle("Campaign Trail - Pre-Alpha");
        navigate("/campaigntrail");
        break;
      case "/ChapterOne":
        setPageTitle("Chapter One - Sgt Nihil");
        navigate("/ChapterOne");
        break;
      case "/HoneyStore":
        setPageTitle("Honey Store");
        break;
      case "/game":
        setPageTitle("Game - Pre-Alpha");
        break;
      case "/campaigntrail":
        setPageTitle("Campaign Trail - Pre-Alpha");
        break;
      // case "/bridge":
      //   setPageTitle("Polygon Bridge");
      //   setIsBridgePage(true);
      //   break;
      // case "/tedmint":
      //   setPageTitle("Ted Mint");
      //   break;
      // case "/teddymint":
      //   setPageTitle("Teddy Mint");
      //   break;
      // case "/aitedmint":
      //   setPageTitle("AI Ted Mint");
      //   break;
      // case "/packopening":
      //   setPageTitle("Pack Opening");
      //   break;
      // case "/mycards":
      //   setPageTitle("My Cards");
      //   break;
      // case "/news":
      //   setPageTitle("News");
      //   break;
      // case "/teddyclaims":
      //   setPageTitle("Teddy Claims");
      //   break;
      // case "/tedclaims":
      //   setPageTitle("Ted Claims");
      //   break;
      // case "/HoneyExchange":
      //   setPageTitle("Honey Exchange");
      //   break;
      // case "/buildateddy":
      //   setPageTitle("Build A Teddy");
      //   break;
      // case "/traitswapteds":
      //   setPageTitle("Trait Swap Teds");
      //   break;
      // case "/VisualUpgrades":
      //   setPageTitle("Visual Upgrades");
      //   break;
      default:
        setPageTitle("404 - Page not found");
    }
  }, [location.pathname, lowercasePath, navigate]);

  const handleRefresh = async () => {
    window.location.reload();
  }

  return (
    <Box className="app-container" sx={{ position: "relative", overflowY: "hidden" }}>
        <ThemeProvider theme={theme}>
        {showMismatch && <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, marginLeft: leftDrawerWidth,
          marginRight: rightDrawerWidth,}}
          open={showMismatch}
        >
          <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1, marginLeft: leftDrawerWidth,
        marginRight: rightDrawerWidth, }}
        open={showMismatch}
          >
          <PolygonNetwork />
          </Backdrop>
        </Backdrop>
      }
          {isSmallScreen && (
            <Box
              sx={{
                position: "fixed",
                top: "0",
                backgroundColor: "Black",
                height: "60px",
                width: "100%",
                zIndex: "2 !important",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  zIndex: "2 !important",
                }}
              >
                {address && <Typography
                  sx={{
                    color: "White",
                    marginLeft: "10px",
                    marginTop: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "2rem",
                    zIndex: "2 !important",
                  }}
                >
                {pageTitle}
                </Typography>
              }
              </Box>
            </Box>
          )}
          <Box
            sx={{
              paddingLeft: leftNavOpen ? LeftDrawerWidthPX : "0px",
              paddingRight: rightNavOpen ? "340px" : "0px",
              marginTop: isSmallScreen ? "60px" : "0px",
              marginBottom: isSmallScreen ? "60px" : "50px",
              paddingBottom: isSmallScreen ? "60px" : "0px",
              backgroundColor: "white",
              height: "100% !important",
              width: "100dvw",
              display: "flex",
              flexDirection: "column",
            }}
            className="router-container"
          >     
          
 
          {/* <PullToRefresh className="ptr-override" onRefresh={handleRefresh}> */}
            {address ? (
              <Routes>
                {/* <Route path="/" element={<Dashboard tokenProps={polygonTokenProps} leftNavOpen={leftNavOpen} rightNavOpen={rightNavOpen} showMismatch={showMismatch} isSmallScreen={isSmallScreen} />} /> */}
                <Route path="/" element={<HoneyStore tokenProps={polygonTokenProps} isSmallScreen={isSmallScreen} />} />
                <Route path="/HoneyStore" element={<HoneyStore tokenProps={polygonTokenProps} isSmallScreen={isSmallScreen} />} />
                {/* <Route path="/Game" element={<Game showMismatch={showMismatch}/>} />{" "} */}
                <Route path="/CampaignTrail" element={<CampaignTrail showMismatch={showMismatch}/>} />{" "}
                <Route path="/ChapterOne" element={<ChapterOne showMismatch={showMismatch}/>} />{" "}
                <Route path="/ChapterOne/LeaderSelection" element={<ChapterOneLeaderSelection showMismatch={showMismatch}/>} />{" "}
                <Route path="/ChapterOne/Battle" element={<Game showMismatch={showMismatch}/>} />{" "}

                {/* <Route path="/TeddyClaims" element={<TeddyClaims tokenProps={polygonTokenProps} leftNavOpen={leftNavOpen} rightNavOpen={rightNavOpen} showMismatch={showMismatch} isSmallScreen={isSmallScreen}/>} />
                <Route path="/TedClaims" element={<TedClaims />} />{" "} */}
                {/* <Route path="/TedMint" element={<TedMint  showMismatch={showMismatch} contract={polygonTokenProps.tedContract} isloadingContract={polygonTokenProps.isLoadingTedContract} />} />{" "}
                <Route path="/TeddyMint" element={<TeddyMint showMismatch={showMismatch} contract={polygonTokenProps.teddyContract} isloadingContract={polygonTokenProps.isLoadingTeddyContract} />} />{" "}
                <Route path="/AITedMint" element={<AITedMint  showMismatch={showMismatch} contract={polygonTokenProps.aiTedContract} isloadingContract={polygonTokenProps.isLoadingAITedContract} />} />{" "}
                
                <Route path="/PackOpening" element={<PackOpening/>} />{" "}
                <Route path="/MyCards" element={<MyCards/>} />{" "}
                <Route path="/News" element={<News/>} />{" "}
                <Route path="/Campaigns" element={<Campaigns/>} />{" "} */}


                {/* <Route
                  path="/Bridge"
                  element={
                    <PolygonBridge
                      tokenProps={polygonTokenProps} leftNavOpen={navOpen} rightNavOpen={rightNavOpen} 
                    />
                  }
                /> */}
                {/* <Route
                  path="/HoneyExchange"
                  element={<HoneyExchange tokenProps={polygonTokenProps} leftNavOpen={leftNavOpen} rightNavOpen={rightNavOpen} showMismatch={showMismatch} isSmallScreen={isSmallScreen}/>}
                />
                <Route path="/BuildATeddy" element={<BuildATeddy />} />
                <Route path="/TraitSwapTeds" element={<TraitSwapTeds />} />
                <Route path="/VisualUpgrades" element={<VisualUpgrades />} /> */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            ) : (
              <ConnectWalletPage tedContract={polygonTokenProps.tedContract} isLoadingTedContract={polygonTokenProps.isLoadingTedContract} teddyContract={polygonTokenProps.teddyContract} isLoadingTeddyContract={polygonTokenProps.isLoadingTeddyContract}  />
            )}  

            
            {/* </PullToRefresh> */}
          </Box>
          {/* {leftNavOpen ? (
              <LeftDrawer navOpen={leftNavOpen} setNavOpen={setLeftNavOpen} />
            ) : (
              <Box
                sx={{
                  position: "fixed",
                  top: "5px",
                  left: "5px",
                  backgroundColor: "transparent",
                  zIndex: "2 !important",
                }}
              >
                {address && !isBridgePage && (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => handleOpen()}
                    size="large"
                  >
                    <MenuIcon sx={{ color: "White" }} />
                  </IconButton>
                )}
              </Box>
            )} */}
            {rightNavOpen ? (
              <RightDrawer
                tokenProps={polygonTokenProps}
                navOpen={rightNavOpen}
                setNavOpen={setRightNavOpen}
                // tokens={tokens}
                // error={error}
                // isLoadingTed={isLoadingTed}
                // isLoadingTeddy={isLoadingTeddy}
                // isLoadingStaked={isLoadingStaked}
                // isLoadingAI={isLoadingAI}
                // isLoadingBirthCerts={isLoadingBirthCerts}
                // isLoadingOneOfOne={isLoadingOneOfOne}
                // honeyBalance={honeyBalance}
              />
            ) : (
              <Box
                sx={{
                  position: "fixed",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "transparent",
                  zIndex: "2 !important",
                }}
              >
                {/* {!leftNavOpen && (
                  <IconButton
                    color="inherit"
                    aria-label="open right drawer"
                    onClick={() => handleRightNavOpen()}
                    size="large"
                    sx={{ zIndex: "2 !important" }}
                  >
                    <MenuIcon sx={{ color: "White" }} />
                  </IconButton>
                )} */}
              </Box>
            )} 
        </ThemeProvider>
    </Box>
    
  );
}

export default App;
