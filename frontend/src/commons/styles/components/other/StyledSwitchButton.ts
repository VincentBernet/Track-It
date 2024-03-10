import styled from "styled-components";

// By Github/NadeeshaEranjan : https://codepen.io/alvarotrigo/pen/jOaXGyq
const StyledSwitchButton = styled.div`
    /*switch styles*/
    label {
        font-size: 13px;
        color: var(--white);
        font-weight: 500;
        box-sizing: unset;
    }

    .btn-color-mode-switch{
        display: inline-block;
        margin: 0px;
        position: relative;
    }

    // le container principale
    .btn-color-mode-switch > label.btn-color-mode-switch-inner{
        margin: 0px;
        width: 186px;
        height: 35px;
        background: black;
        border-radius: 26px;
        overflow: hidden;
        position: relative;
        transition: all 0.3s ease;
        display: block;
    }

    // Le container de droite
    .btn-color-mode-switch > label.btn-color-mode-switch-inner:before{
        content: attr(data-on);
        position: absolute;
        font-size: 12px;
        font-weight: 500;
        top: 11px;
        right: 14px;
    }

    // Le container du switch qui
    .btn-color-mode-switch > label.btn-color-mode-switch-inner:after{
        content: attr(data-off);
        width: 93px;
        background: var(--green);
        border-radius: 26px;
        position: absolute;
        left: 2px;
        top: 2px;
        bottom: 2px;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0px 0px 6px -2px #111;
        padding: 8px 0px 8px 0px;
    }

    .btn-color-mode-switch input[type="checkbox"]{
        cursor: pointer;
        width: 186px;
        height: 40px;
        opacity: 0;
        position: absolute;
        top: 0;
        z-index: 1;
        margin: 0px;
    }

    .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner{
        background: black;
        color: #fff;
    }

    .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:after{
        content: attr(data-on);
        left: 90px;
        background: var(--green);
    }

    .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:before{
        content: attr(data-off);
        right: auto;
        left: 30px;
    }

    .btn-color-mode-switch input[type="checkbox"]:checked + label.btn-color-mode-switch-inner{
        /*background: black;
        color: #fff;*/
    }

    .btn-color-mode-switch input[type="checkbox"]:checked ~ .alert{
        display: block;
    }
`;

export default StyledSwitchButton;
