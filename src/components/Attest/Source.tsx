import { makeStyles, TextField } from "@material-ui/core";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementStep, setSourceAsset, setSourceChain } from "../../store/attestSlice";
import {
  selectAttestIsSourceComplete,
  selectAttestShouldLockFields,
  selectAttestSourceAsset,
  selectAttestSourceChain,
} from "../../store/selectors";
import { CHAINS } from "../../utils/consts";
import ButtonWithLoader from "../ButtonWithLoader";
import ChainSelect from "../ChainSelect";
import KeyAndBalance from "../KeyAndBalance";
import LowBalanceWarning from "../LowBalanceWarning";

const useStyles = makeStyles((theme) => ({
  transferField: {
    marginTop: theme.spacing(5),
  },
  errorMessage: {
    color: 'red',
    marginTop: theme.spacing(2),
  },
}));

function Source() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const sourceChain = useSelector(selectAttestSourceChain);
  const sourceAsset = useSelector(selectAttestSourceAsset); // Get asset from Redux
  const isSourceComplete = useSelector(selectAttestIsSourceComplete);
  const shouldLockFields = useSelector(selectAttestShouldLockFields);
  
  // State to hold error messages and Circle API data
  const [errorMessage, setErrorMessage] = useState("");
  const [circleData, setCircleData] = useState(null); // State to store Circle API data
  const [walletAddress, setWalletAddress] = useState(""); // State to store the wallet address

  const handleSourceChange = useCallback(
    (event) => {
      dispatch(setSourceChain(event.target.value));
    },
    [dispatch]
  );

  const handleAssetChange = useCallback(
    (event) => {
      dispatch(setSourceAsset(event.target.value)); // Dispatch asset change to Redux
    },
    [dispatch]
  );

  const handleWalletAddressChange = useCallback(
    (event) => {
      setWalletAddress(event.target.value); // Update wallet address state
    },
    []
  );

  const handleCircleApiCheck = async () => {
    try {
      const response = await fetch(`https://api.circle.com/v1/address/${walletAddress}`, {
        headers: {
          Authorization: `Bearer LIVE_API_KEY:b85fe8031e4b113841d9e28c54b65643:2a21dadb037fa48db38296876b11e4b6`, // Replace with your Circle API key
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setCircleData(data); // Save Circle API response for later display or use
      console.log("Circle API Data:", data);
    } catch (error) {
      console.error("Circle API Error:", error);
      setErrorMessage("Failed to fetch Circle API data. Please check the wallet address.");
    }
  };

  const handleNextClick = useCallback(async () => {
    try {
      await handleCircleApiCheck(); // Call the Circle API check before proceeding
      dispatch(incrementStep());
      // Clear the error message if successful
      setErrorMessage("");
    } catch (error) {
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        // Set the error message from the error instance
        setErrorMessage(error.message);
      } else {
        // Fallback for any other type of error
        setErrorMessage("An unexpected error occurred.");
      }
    }
  }, [dispatch, walletAddress]); // Include walletAddress in dependencies

  return (
    <>
      <ChainSelect
        select
        variant="outlined"
        fullWidth
        value={sourceChain}
        onChange={handleSourceChange}
        disabled={shouldLockFields}
        chains={CHAINS}
      />
      <KeyAndBalance chainId={sourceChain} />
      
      <TextField
        label="Asset" // Re-added field for asset
        variant="outlined"
        fullWidth
        className={classes.transferField}
        value={sourceAsset} // Controlled by Redux state
        onChange={handleAssetChange} // Update state on change
        disabled={shouldLockFields}
      />

      <TextField
        label="Wallet Address" // Field for wallet address
        variant="outlined"
        fullWidth
        className={classes.transferField}
        value={walletAddress} // Value controlled by state
        onChange={handleWalletAddressChange} // Update state on change
        disabled={shouldLockFields}
      />
      
      {errorMessage && <div className={classes.errorMessage}>{errorMessage}</div>}
      <LowBalanceWarning chainId={sourceChain} />
      
      <ButtonWithLoader
        disabled={!isSourceComplete || !walletAddress || !sourceAsset} // Disable if no wallet address or asset is entered
        onClick={handleNextClick}
        showLoader={false}
      >
        Next
      </ButtonWithLoader>
    </>
  );
}

export default Source;
