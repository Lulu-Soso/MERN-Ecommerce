import React from 'react';
import { Link } from 'react-router-dom';
import { Stepper, Step, StepLabel } from '@mui/material';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Stepper activeStep={-1} alternativeLabel>
      <Step completed={step1}>
        <StepLabel>
          {step1 ? <Link to='/login'>Se Connecter</Link> : 'Sign In'}
        </StepLabel>
      </Step>
      <Step completed={step2}>
        <StepLabel>
          {step2 ? <Link to='/shipping'>Livraison</Link> : 'Shipping'}
        </StepLabel>
      </Step>
      <Step completed={step3}>
        <StepLabel>
          {step3 ? <Link to='/payment'>Paiement</Link> : 'Payment'}
        </StepLabel>
      </Step>
      <Step completed={step4}>
        <StepLabel>
          {step4 ? <Link to='/placeorder'>Passer Commande</Link> : 'Place Order'}
        </StepLabel>
      </Step>
    </Stepper>
  );
};

export default CheckoutSteps;
