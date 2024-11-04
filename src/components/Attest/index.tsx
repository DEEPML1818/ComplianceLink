import React, { useEffect, useState } from "react";
import {
  Container,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../store/attestSlice";
import {
  selectAttestActiveStep,
  selectAttestIsCreateComplete,
  selectAttestIsCreating,
  selectAttestIsSendComplete,
  selectAttestIsSending,
} from "../../store/selectors";
import HeaderText from "../HeaderText";
import Create from "./Create";
import CreatePreview from "./CreatePreview";
import Send from "./Send";
import SendPreview from "./SendPreview";
import Source from "./Source";
import SourcePreview from "./SourcePreview";
import Target from "./Target";
import TargetPreview from "./TargetPreview";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique keys

const complianceUrl = 'https://api.circle.com/v1/w3s/compliance/screening/addresses';
const apiKey = 'LIVE_API_KEY:b85fe8031e4b113841d9e28c54b65643:2a21dadb037fa48db38296876b11e4b6'; // Replace with your actual API key

// Define a type for the compliance results
interface ComplianceResult {
  address: string;
  result?: any; // You can define a more specific type based on your API response
  error?: string; // Use string for error messages
}

function Attest() {
  const dispatch = useDispatch();
  const activeStep = useSelector(selectAttestActiveStep);
  const isSending = useSelector(selectAttestIsSending);
  const isSendComplete = useSelector(selectAttestIsSendComplete);
  const isCreating = useSelector(selectAttestIsCreating);
  const isCreateComplete = useSelector(selectAttestIsCreateComplete);
  const preventNavigation = (isSending || isSendComplete || isCreating) && !isCreateComplete;

  const [walletAddress, setWalletAddress] = useState("");
  const [circleData, setCircleData] = useState(null);
  const [complianceResults, setComplianceResults] = useState<ComplianceResult[]>([]);
  const [loadingCompliance, setLoadingCompliance] = useState(false);
  const [errorCompliance, setErrorCompliance] = useState<string | null>(null);

  useEffect(() => {
    if (preventNavigation) {
      window.onbeforeunload = () => true;
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, [preventNavigation]);

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };

  const handleCircleApiCheck = async () => {
    try {
      const response = await fetch(`https://api.circle.com/v1/address/${walletAddress}`, {
        headers: {
          Authorization: `Bearer LIVE_API_KEY:b85fe8031e4b113841d9e28c54b65643:2a21dadb037fa48db38296876b11e4b6`, // Replace with your Circle API key
        },
      });
      const data = await response.json();
      setCircleData(data); // Save Circle API response for later display or use
      console.log("Circle API Data:", data);
    } catch (error) {
      console.error("Circle API Error:", error);
    }
  };

  const handleComplianceCheck = async () => {
    setLoadingCompliance(true);
    setErrorCompliance(null); // Reset error state
    const addressesToCheck = [walletAddress]; // Check the entered wallet address
    const results: ComplianceResult[] = []; // Declare results with the ComplianceResult type

    for (const address of addressesToCheck) {
      try {
        const response = await fetch(complianceUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            address,
            chain: 'AVAX', // Specify the correct chain as needed
            idempotencyKey: uuidv4(), // Unique key for idempotency
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          results.push({ address, error: `HTTP error! status: ${response.status} - ${errorText}` });
          continue;
        }

        const json = await response.json();
        results.push({ address, result: json });
      } catch (error) {
        const errorMessage = (error as Error).message; // Cast error to Error type
        results.push({ address, error: errorMessage });
      }
    }

    setComplianceResults(results); // Set the results with the correct type
    setLoadingCompliance(false);
  };

  return (
    <Container maxWidth="md">
      <HeaderText white>Message Registration</HeaderText>
      <Alert severity="info">
        This form allows you to register a message on a new foreign chain. Messages
        must be registered before they can be transferred.
      </Alert>

      <TextField
        label="Wallet Address"
        variant="outlined"
        fullWidth
        value={walletAddress}
        onChange={handleWalletChange}
        style={{ marginTop: "20px" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleCircleApiCheck}
        style={{ marginTop: "10px" }}
      >
        Check Wallet Address with Circle
      </Button>

      {circleData && (
        <Alert severity="info" style={{ marginTop: "10px" }}>
          Circle API Data: {JSON.stringify(circleData)}
        </Alert>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleComplianceCheck}
        disabled={loadingCompliance}
        style={{ marginTop: "10px" }}
      >
        Check Compliance
      </Button>

      {loadingCompliance && <Typography variant="body1">Checking compliance...</Typography>}
      {errorCompliance && <Alert severity="error">{errorCompliance}</Alert>}
      {complianceResults.map((result, index) => (
        <Alert key={index} severity={result.error ? "error" : "info"}>
          {result.address}: {result.error ? result.error : JSON.stringify(result.result)}
        </Alert>
      ))}

      <Stepper activeStep={activeStep} orientation="vertical">
        <Step expanded={activeStep >= 0} disabled={preventNavigation || isCreateComplete}>
          <StepButton onClick={() => dispatch(setStep(0))} icon={null}>
            1. Source
          </StepButton>
          <StepContent>
            {activeStep === 0 ? <Source /> : <SourcePreview />}
          </StepContent>
        </Step>
        
        <Step expanded={activeStep >= 1} disabled={preventNavigation || isCreateComplete}>
          <StepButton onClick={() => dispatch(setStep(1))} icon={null}>
            2. Target
          </StepButton>
          <StepContent>
            {activeStep === 1 ? <Target /> : <TargetPreview />}
          </StepContent>
        </Step>
        
        <Step expanded={activeStep >= 2} disabled={isSendComplete}>
          <StepButton onClick={() => dispatch(setStep(2))} icon={null}>
            3. Send Message
          </StepButton>
          <StepContent>
            {activeStep === 2 ? <Send /> : <SendPreview />}
          </StepContent>
        </Step>
        
        <Step expanded={activeStep >= 3}>
          <StepButton onClick={() => dispatch(setStep(3))} disabled={!isSendComplete} icon={null}>
            4. Create Wrapped Message
          </StepButton>
          <StepContent>
            {isCreateComplete ? <CreatePreview /> : <Create />}
          </StepContent>
        </Step>
      </Stepper>
    </Container>
  );
}

export default Attest;
