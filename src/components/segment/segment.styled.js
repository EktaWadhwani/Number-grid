import styled from 'styled-components';
import { colors, CONTAINER_MAX_WIDTH } from '../../theme';

export const SegmentStyled = styled.div`
    background: ${colors.white};
    margin-top:2em;
    max-width:${CONTAINER_MAX_WIDTH};
    margin-left:auto;
    margin-right:auto;
    box-shadow: 1px 1px 1px 1px ${colors.darkGray} ;
    padding:1.5em;

    h1 {
        margin:0;
        color:${colors.royalBlue};
        font-size:1.5em;
        padding-bottom:1rem;
        border-bottom:1px solid ${colors.gray};
    }
`;
