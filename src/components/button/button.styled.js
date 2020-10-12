import styled from 'styled-components';
import { colors } from '../../theme';

export const ButtonWrapper = styled.div`
    padding:1em;
    display:flex;
    justify-content:center;
`;

export const ButtonStyled = styled.button`
    background: ${colors.orange};
    padding: 1em;
    color:${colors.white};
`;
