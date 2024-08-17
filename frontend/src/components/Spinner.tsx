import styled, { keyframes } from 'styled-components';
import { colours } from '../utils/colours';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid ${colours.background}; /* Light grey background */
  border-top: 4px solid ${colours.primary}; /* Deep purple spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: auto; /* Center the spinner */
`;

export default Spinner;
