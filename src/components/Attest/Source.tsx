// Source.js
import { makeStyles, TextField } from "@material-ui/core";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementStep,
  setSourceAsset,
  setSourceChain,
  setMessageContent, // Import the new action
} from "../../store/attestSlice";
import {
  selectAttestIsSourceComplete,
  selectAttestShouldLockFields,
  selectAttestSourceChain,
  selectAttestSourceAsset,
  selectAttestMessageContent, // Import the new selector
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
}));

function Source() {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const sourceChain = useSelector(selectAttestSourceChain);
  const sourceAsset = useSelector(selectAttestSourceAsset);
  const messageContent = useSelector(selectAttestMessageContent); // Use selector to get message content
  const isSourceComplete = useSelector(selectAttestIsSourceComplete);
  const shouldLockFields = useSelector(selectAttestShouldLockFields);

  const handleSourceChange = useCallback(
    (event) => {
      dispatch(setSourceChain(event.target.value));
    },
    [dispatch]
  );

  const handleAssetChange = useCallback(
    (event) => {
      dispatch(setSourceAsset(event.target.value));
    },
    [dispatch]
  );

  const handleMessageChange = useCallback(
    (event) => {
      dispatch(setMessageContent(event.target.value)); // Dispatch the new message content
    },
    [dispatch]
  );

  const handleNextClick = useCallback(() => {
    dispatch(incrementStep());
  }, [dispatch]);

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
        label="Asset"
        variant="outlined"
        fullWidth
        className={classes.transferField}
        value={sourceAsset}
        onChange={handleAssetChange}
        disabled={shouldLockFields}
      />
      <TextField
        label="Message Content" // Label for the new input
        variant="outlined"
        fullWidth
        className={classes.transferField}
        value={messageContent}
        onChange={handleMessageChange} // Handler for the new input
        disabled={shouldLockFields}
      />
      <LowBalanceWarning chainId={sourceChain} />
      <ButtonWithLoader
        disabled={!isSourceComplete}
        onClick={handleNextClick}
        showLoader={false}
      >
        Next
      </ButtonWithLoader>
    </>
  );
}

export default Source;
