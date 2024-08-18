import styled from 'styled-components'
import { colours } from '../utils/colours'

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  background-color: ${(props) =>
    props.variant === 'secondary' ? colours.secondary : colours.primary};
  color: ${colours.white};
  border: 2px solid ${colours.secondary};
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'secondary'
        ? colours.borderHover
        : colours.buttonHover};
    border-color: ${colours.borderHover};
  }

  &:disabled {
    background-color: ${colours.border};
    cursor: not-allowed;
  }
`

export default Button
