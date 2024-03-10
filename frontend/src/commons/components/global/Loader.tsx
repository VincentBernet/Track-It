import styled, { keyframes } from "styled-components";

type StyledBarProps = {
	$delay: string;
};

type StyledLoaderProps = {
	$minHeight: string;
};

type LoaderProps = {
	minHeight: string;
};

const Loader = ({ minHeight }: LoaderProps) => (
	<StyledLoader $minHeight={minHeight}>
		<div className="bars">
			<StyledBar $delay="250ms" />
			<StyledBar $delay="715ms" />
			<StyledBar $delay="475ms" />
			<StyledBar $delay="25ms" />
			<StyledBar $delay="190ms" />
		</div>
	</StyledLoader>
);

export default Loader;

const dance = keyframes`
  from {
    height: 10px;
  }
  to {
    height: 100%;
  }
`;

const StyledLoader = styled.div<StyledLoaderProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: ${(props) => props.$minHeight};

  .bars {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    overflow: hidden;
    width: 100px;
    min-width: 100px;
    height: 50px;
    margin: 0 auto;
    z-index: 2;
    position: relative;
    left: 0;
    right: 0;
  }
`;

const StyledBar = styled.div<StyledBarProps>`
  width: 10px;
  height: 5px;
  margin: 0 2px;
  background-color: var(--dark-grey);
  animation-name: ${dance};
  animation-duration: 400ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${(props) => props.$delay || "0ms"};
`;
