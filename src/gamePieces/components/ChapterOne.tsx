import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTitle } from '../../hooks/useTitle';
import { useSDK, useAddress } from '@thirdweb-dev/react-core';
import "../styles/campaignTrail.css";
import chapterOne from '../assets/images/ChapterOne_Select.png';
import chapterTwo from '../assets/images/ChapterTwo_Select.png';
import chapterThree from '../assets/images/ChapterThree_Select.png';
import newlogo from '../assets/images/newlogo.png';
import { useNavigate } from 'react-router-dom';

function ChapterOne(props: { showMismatch: boolean }) {
  const [gameState, setGameState] = useState('battle'); // You can define different game states
  const [isPasswordEntered, setIsPasswordEntered] = useState(false); // Track whether the password is entered

  useTitle("Chapter One - SGT. NIHIL");
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));
  const isMediumLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const [isSmallScreen, setSmallScreen] = useState(false);
  const sdk = useSDK();
  const provider = sdk?.getProvider();
  const address = useAddress();
  const showMismatch = props.showMismatch;
  const navigate = useNavigate();

  useEffect(() => {
    // Add logic to handle game states and transitions
  }, [gameState]);

  const leaderSelect = () => {
    navigate("/ChapterOne/LeaderSelection");
  }



  // Render the password form or the secret content based on the password flag
  return (
    <Box
      className={"inner-container-game"} sx={{ position: "relative", backgroundColor:  "#000000" }}>
        <div className="Chapter-Selection-Container">
          <div className="Header">
            <img src={newlogo} alt="Fury of The Fury: The Simulation Logo" className="logo" />
            <h1 className="green-header">Planetary War Simulation</h1>
            <h2 className="green-subheader">*** Choose Your Battle ***</h2>
          </div>
          <div className="Columns">
            <div className="Column-NoPointer">
                <img src={chapterOne} alt="Chapter 1 - Sgt. Nihil" />
              <div className="Text">
                <p className="text-override">CHAPTER 1</p>
                <p className="sub-text-override">SGT. NIHIL</p>
              </div>
            </div>
            <div className="chapter-desc-column">
              <div className="chapter-one-box">
                <p className="chapter-text">Sgt. Nihil is a tyrant. Having led the charge against the experience on their homeworld, he took many lives.<br/><br/> Now, with the merger threatening everything, he leads the Ape Army in their conquest of the 3 planets.</p>
                <div className="row-between">
                  <p className="chapter-text">Difficulty: Medium</p>
                  <p className="chapter-text">HP: 13,500</p>
                </div>
              </div>
              <div className="row-end">
                <button className="green-button" onClick={leaderSelect}>Start Level</button>
              </div>
            </div>
          </div>
        </div>
    </Box>
  );
};

export default ChapterOne;
