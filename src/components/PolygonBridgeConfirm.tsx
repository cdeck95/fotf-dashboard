import {
  Box,
  Button,
  ImageList,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { useTitle } from "../hooks/useTitle";
import { useAddress } from "@thirdweb-dev/react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useSDK } from "@thirdweb-dev/react";
import "../styles/Dashboard.css";
import "../styles/Bridge.css";
import {
  LoadAllAccountDetails,
  allOwnedNFTs,
} from "../account/loadAllAccountDetails";
import ConnectWalletPage from "../components/ConnectWalletPage";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface BridgeProps {
  setCollection: Function;
  setAdvance: Function;
  collection: string;
}

function PolygonBridgeConfirm(props: BridgeProps) {
  useTitle("FOTF | Confirm Bridge");
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { tokens, isLoading, error, honeyBalance } = LoadAllAccountDetails();
  const { setCollection, setAdvance, collection } = props;
  console.log(tokens);
  console.log(isLoading);
  console.log(error);
  console.log(honeyBalance);

  const AllTokens = tokens.AllTokens.tokens;
  const tedNFTs = tokens.Teds?.tokens;
  const teddyNFTs = tokens.Teddies?.tokens;
  //const aiTedNFTs: string | any[] = [];
  const aiTedNFTs = tokens.AITeds?.tokens;
  const stakedTeddiesIDs = tokens.StakedTeddiesIDs?.tokens;

  var teddyCount = 0;
  if (stakedTeddiesIDs && teddyNFTs) {
    teddyCount = teddyNFTs?.length + stakedTeddiesIDs?.length;
  } else if (teddyNFTs) {
    teddyCount = teddyNFTs?.length;
  } else if (stakedTeddiesIDs) {
    teddyCount = stakedTeddiesIDs?.length;
  }

  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const [collectionCount, setCollectionCount] = useState(0);

  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();

  const leftDrawerWidth = isSmallScreen ? "0px" : "240px";
  const rightDrawerWidth = isSmallScreen ? "0px" : "340px";

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isMediumLarge || isMobile) {
      setSmallScreen(true);
      setSheetOpen(true);
    } else {
      setSmallScreen(false);
      setSheetOpen(false);
    }
  }, [isMediumLarge, isMobile]);

  useEffect(() => {
    if (collection === "Fury Teds") {
      setCollectionCount(tedNFTs?.length!);
    } else if (collection === "Teddies by FOTF") {
      setCollectionCount(teddyCount);
    } else if (collection === "AI Teds") {
      setCollectionCount(aiTedNFTs?.length!);
    }
  }, [aiTedNFTs?.length, collection, tedNFTs?.length, teddyCount]);

  //////////// OnSelect Functions ///////////////////////////

  interface IDictionary {
    [index: string]: string;
  }

  const [selectedCollection, setSelectedCollection] = useState("");

  function handleOnSelect(collection: string) {
    console.log(collection);
    if (collection === selectedCollection) {
      setSelectedCollection("");
    } else {
      setSelectedCollection(collection);
    }
  }

  //////////////////////////////////////////////

  return (
    <Box className="polygon-bridge-container">
      <Box className="row-center">
        <h1 className="Large-Header">Confirm Bridge</h1>
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Typography className="desc-text">
          Confirm the total amount of <span className="accent-text">{collection}</span> to be bridged to Polygon. Once a collection is bridged, 
          your wallet can no longer bridge again (for this collection) and all assets will be moved to Polygon
          and reverted on the main Ethereum network.
          <span className="accent-text">This is final.</span> 
        </Typography>
      </Box>
      <Box
        className="row-around"
        sx={{
          height: "450px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        {collection==="Fury Teds" && aiTedNFTs && (
          
          <Box className="row-even" >
             <ThirdwebNftMedia
                metadata={tedNFTs![0].metadata}
                style={{
                  maxHeight: "280px",
                  maxWidth: "280px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  width: "280px",
                  height: "280px",
                }}
              />
            <Typography className="desc-text-largest">
              <span className="desc-text-largest-accent">
                {tedNFTs?.length}
              </span>{" "}
              Fury Teds
            </Typography>
          </Box>
      )}

{collection==="Teddies by FOTF" && teddyNFTs && (
          
          <Box className="row-even" >
             <ThirdwebNftMedia
                metadata={teddyNFTs![0].metadata}
                style={{
                  maxHeight: "280px",
                  maxWidth: "280px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  width: "280px",
                  height: "280px",
                }}
              />
            <Typography className="desc-text-largest">
              <span className="desc-text-largest-accent">
                {teddyCount}
              </span>{" "}
              Teddies
            </Typography>
          </Box>
      )}

    {collection==="AI Teds" && aiTedNFTs && (
          
            <Box className="row-even" >
               <ThirdwebNftMedia
                  metadata={aiTedNFTs![0].metadata}
                  style={{
                    maxHeight: "280px",
                    maxWidth: "280px",
                    borderRadius: "10px",
                    objectFit: "cover",
                    width: "280px",
                    height: "280px",
                  }}
                />
              <Typography className="desc-text-largest">
                <span className="desc-text-largest-accent">
                  {aiTedNFTs?.length}
                </span>{" "}
                AI Teds
              </Typography>
            </Box>
        )}
      </Box>
      <Box
        className="row-center"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
      >
        <Typography className="desc-text">
          <span className="accent-text">Note:</span> Please verify the total
          number of assets before you choose to bridge. If you find any issues please open a
          support ticket in the{" "}
          <a href="https://discord.gg/fotf">
            <span className="underline">FOTF Discord</span>
          </a>{" "}
          (https://discord.gg/fotf).
        </Typography>
      </Box>
      <Box className="row-center">
        <Button
          className="bridge-btn"
          sx={{marginRight: "10px !important", marginLeft: "10px !important"}}
          variant="contained"          
          onClick={() => {
            setAdvance(false);
            setCollection("");
          }}
        >
          {" "}
          <ArrowLeftIcon
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
          <span className="top-padding">Back To Collection Picker</span>
        </Button>
        <Button
          className="bridge-btn"
          variant="contained"
          sx={{marginRight: "10px !important", marginLeft: "10px !important"}}
          disabled={collection === ""}
          onClick={() => {
            if (selectedCollection === "teds") {
              console.log("Would bridge teds");
            } else if (selectedCollection === "teddies") {
              console.log("Would bridge teddies");
            } else if (selectedCollection === "aiTeds") {
              console.log("Would bridge aiTeds");
            } else {
              console.log("No collection selected");
            }
          }}
        >
          <span className="top-padding">Bridge {collectionCount} to Polygon </span>{" "}
          <ArrowRightIcon
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
        </Button>
      </Box>
    </Box>
  );
}

export default PolygonBridgeConfirm;