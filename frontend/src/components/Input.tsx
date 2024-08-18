import styled from 'styled-components'
import { colours } from '../utils/colours'

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${colours.border};
  border-radius: 5px;
  margin-bottom: 15px;
  box-sizing: border-box;

  &:focus {
    border-color: ${colours.primary};
    outline: none;
  }
`

export default Input
