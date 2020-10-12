import styled from 'styled-components';
import { colors } from '../../theme';

export const HeaderStyled = styled.header`
    background: ${colors.royalBlue};
    padding: 1em;

    h1 {
        margin:0;
        color:${colors.white};
        margin-left: 15%;
        font-weight:100;
    }
`;
