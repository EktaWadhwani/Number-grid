import styled from 'styled-components';
import { colors, media } from '../../theme';

export const Wrapper = styled.div`
    ${(props) => props.showError && `
    input, textarea, select {border:1px solid ${colors.red};}
    `}
    width: 100%;
    display: flex;   
    flex-direction:column;
    margin-top:1em;
    margin-bottom:1em;
    
  }

  input[type=number],input[type=date],input[type=time]{
       margin: 0 10px;
    }

    input[type=text],textarea,select {
        width:95%;
    }
    input,textarea,select {
        padding:1em;
        
    }

    @media (${media.desktop}) {
        flex-direction:row;
        flex-wrap: row wrap;
        align-items: center;
    }

`;

export const InputWrapper = styled.div`
    width: 100%;
    
    @media (${media.desktop}) {
       width:50%;
       display:flex;  
       align-items: center; 
    }
`;

export const Label = styled.label`
    display: block;
    color: ${props => props.showError ? colors.red : colors.royalBlue} ;
    margin-bottom: 0.5em;
    text-transform: uppercase;
    
    span{
        color: ${colors.red};
        padding:2px;
    }

    @media (${media.desktop}) {
     flex: 1 0 8em;
     max-width: 10em;
    }

`;

export const Err = styled.div`
    position: relative;
    display: block;
    margin:10px 0 0 0;
    width:1px;
    height: ${props => props.error ? '1.25em' : '0'}; 

    @media (${media.desktop}) {
        margin:10px;
    }
    span {
        visibility: ${props => props.error ? 'visible' : 'hidden'};
        width: 10em;
        background-color: ${colors.red};
        color: ${colors.white};
        text-align: left;
        padding: 5px;
        position: absolute;
        z-index: 1;
        top: -5px;
        left: 110%;

        &::after {
            content: "";
            position: absolute;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent ${colors.red} transparent;
            bottom: 100%;  
            left: 50%;
             margin-left: -5px; 
       
            @media (${media.desktop}) {
                left:-5%;
                top: 50%;
                right: 100%;
                margin-top: -5px;
                border-color: transparent ${colors.red} transparent transparent;
            } 
        }
    }
`






