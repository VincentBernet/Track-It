import { keyframes } from "styled-components";

export const fadeIn = keyframes`
    0% {opacity: 0;}
    25% {opacity: 0.25;}
    50% {opacity: 0.50;}
    75% {opacity: 0.75;}
    100% {opacity: 1;}
`;

export const fadeOut = keyframes`
    0% {opacity: 1;}
    25% {opacity: 0.75;}
    50% {opacity: 0.50;}
    75% {opacity: 0.25;}
    100% {opacity: 0;}
`;

export const jumpShaking = keyframes`
    0% { transform: translateX(0) }
    25% { transform: translateY(-3px) }
    35% { transform: translateY(-3px) rotate(17deg) }
    55% { transform: translateY(-3px) rotate(-17deg) }
    65% { transform: translateY(-3px) rotate(17deg) }
    75% { transform: translateY(-3px) rotate(-17deg) }
    100% { transform: translateY(0) rotate(0) }
`;

export const horizontalShaking = keyframes`
    0% { transform: translateX(0) }
    2.5% { transform: translateY(2px) }
    5% { transform: translateY(-2px) }
    7.5% { transform: translateY(2px) }
    10% { transform: translateY(-2px)  }
    12.5% { transform: translateY(2px) }
    15% { transform: translateY(-2px)  }
    17.5% { transform: translateY(0px)  }

    35% { transform: translateY(0px)  }
    37.5% { transform: translateY(2px) }
    40% { transform: translateY(-2px) }
    42.5% { transform: translateY(2px) }
    45% { transform: translateY(-2px)  }
    47.5% { transform: translateY(2px) }
    50% { transform: translateY(-2px)  }
    52.5% { transform: translateY(0px)  }

    70% { transform: translateY(0px)  }
    72.5% { transform: translateY(2px) }
    75% { transform: translateY(-2px) }
    77.5% { transform: translateY(2px) }
    80% { transform: translateY(-2px)  }
    82.5% { transform: translateY(2px) }
    85% { transform: translateY(-2px)  }
    87.5% { transform: translateY(0px)  }
`;
