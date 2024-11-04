import { CHAIN_ID_SOLANA, isTerraChain } from "@certusone/wormhole-sdk";
import { Alert } from "@material-ui/lab";
import { Link, makeStyles, Button } from "@material-ui/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers"; // Import ethers.js for Ethereum interaction
import { useHandleAttest } from "../../hooks/useHandleAttest";
import useIsWalletReady from "../../hooks/useIsWalletReady";
import useMetaplexData from "../../hooks/useMetaplexData";
import {
  selectAttestAttestTx,
  selectAttestIsSendComplete,
  selectAttestSourceAsset,
  selectAttestSourceChain,
  selectAttestMessageContent, // Selector to get Circle data from Redux
} from "../../store/selectors";
import ButtonWithLoader from "../ButtonWithLoader";
import KeyAndBalance from "../KeyAndBalance";
import TransactionProgress from "../TransactionProgress";
import WaitingForWalletMessage from "./WaitingForWalletMessage";
import { SOLANA_TOKEN_METADATA_PROGRAM_URL } from "../../utils/consts";
import TerraFeeDenomPicker from "../TerraFeeDenomPicker";
import { ExternalProvider } from "@ethersproject/providers";

const useStyles = makeStyles((theme) => ({
  alert: {
    marginTop: theme.spacing(1),
  },
}));

const SolanaTokenMetadataWarning = () => {
  const sourceAsset = useSelector(selectAttestSourceAsset);
  const sourceAssetArrayed = useMemo(() => {
    return [sourceAsset];
  }, [sourceAsset]);
  const metaplexData = useMetaplexData(sourceAssetArrayed);
  const classes = useStyles();

  if (metaplexData.isFetching || metaplexData.error) {
    return null;
  }

  return !metaplexData.data?.get(sourceAsset) ? (
    <Alert severity="warning" variant="outlined" className={classes.alert}>
      This token is missing on-chain (Metaplex) metadata. Without it, the
      wrapped token's name and symbol will be empty. See the{" "}
      <Link
        href={SOLANA_TOKEN_METADATA_PROGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        metaplex repository
      </Link>{" "}
      for details.
    </Alert>
  ) : null;
};

function Send() {
  const { handleClick, disabled, showLoader } = useHandleAttest();
  const sourceChain = useSelector(selectAttestSourceChain);
  const attestTx = useSelector(selectAttestAttestTx);
  const isSendComplete = useSelector(selectAttestIsSendComplete);
  const { isReady, statusMessage } = useIsWalletReady(sourceChain);
  const sourceAsset = useSelector(selectAttestSourceAsset);
  const circleData = useSelector(selectAttestMessageContent); // Get Circle data message from Redux

  // Function to send Circle data to Ethereum
const handleSendToEthereum = async () => {
  if (!circleData) {
    return console.error("No message content to send.");
  }
  
  if (!window.ethereum) {
    console.error("Ethereum provider not found.");
    return;
  }
  
  const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
  const signer = provider.getSigner();
  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your Ethereum contract address
  const abi = [
    "function storeData(string memory _data) public",
  ]; // Smart contract ABI
  const contract = new ethers.Contract(contractAddress, abi, signer);
  
  try {
    const tx = await contract.storeData(JSON.stringify(circleData)); // Send data as a stringified JSON
    await tx.wait();
    console.log("Data sent to Ethereum:", tx);
  } catch (error) {
    console.error("Ethereum send error:", error);
  }
};


  return (
    <>
      <KeyAndBalance chainId={sourceChain} />
      {isTerraChain(sourceChain) && (
        <TerraFeeDenomPicker disabled={disabled} chainId={sourceChain} />
      )}
      <ButtonWithLoader
        disabled={!isReady || disabled}
        onClick={handleClick}
        showLoader={showLoader}
        error={statusMessage}
      >
        Attest
      </ButtonWithLoader>
      {sourceChain === CHAIN_ID_SOLANA && <SolanaTokenMetadataWarning />}
      <WaitingForWalletMessage />
      <TransactionProgress
        chainId={sourceChain}
        tx={attestTx}
        isSendComplete={isSendComplete}
      />

      {/* New button to send data to Ethereum */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendToEthereum}
        disabled={!circleData}
      >
        Send Data to Ethereum
      </Button>
    </>
  );
}

export default Send;
