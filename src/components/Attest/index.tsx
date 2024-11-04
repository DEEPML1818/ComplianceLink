import React, { useEffect } from "react";
import {
  Container,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Button,
  Typography
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
import { useComplianceCheck } from "../../hooks/useComplianceCheck";

function Attest() {
  const dispatch = useDispatch();
  const activeStep = useSelector(selectAttestActiveStep);
  const isSending = useSelector(selectAttestIsSending);
  const isSendComplete = useSelector(selectAttestIsSendComplete);
  const isCreating = useSelector(selectAttestIsCreating);
  const isCreateComplete = useSelector(selectAttestIsCreateComplete);
  const preventNavigation =
    (isSending || isSendComplete || isCreating) && !isCreateComplete;

  const { results, checkCompliance, loading, error } = useComplianceCheck();
  const addressesToCheck = ["0x0d043128146654C7683Fbf30ac98D7B2285DeD00"]; // Replace with actual addresses as needed

  useEffect(() => {
    if (preventNavigation) {
      window.onbeforeunload = () => true;
      return () => {
        window.onbeforeunload = null;
      };
    }
  }, [preventNavigation]);

  const handleComplianceCheck = async () => {
    await checkCompliance(addressesToCheck);
    if (error) {
      console.error("Compliance Check Error:", error);
      return;
    }
    console.log("Compliance Results:", results);
  };

  return (
    <Container maxWidth="md">
      <HeaderText white>Message Registration</HeaderText>
      <Alert severity="info">
        This form allows you to register a message on a new foreign chain. Messages
        must be registered before they can be transferred.
      </Alert>
      
      {loading ? (
        <Typography variant="body1">Checking compliance...</Typography>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleComplianceCheck}
          disabled={loading}
        >
          Check Compliance
        </Button>
      )}
      
      {error && <Alert severity="error">{error}</Alert>}
      {results.map((result) => (
        <Alert key={result.address} severity={result.status === "clear" ? "success" : "warning"}>
          {result.address}: {result.status} - {result.details}
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
