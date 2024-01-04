import styled from "styled-components";
import { fadeIn } from "../../styles/global/animation";
import { CrossSvg } from "../icons";

type ModalTutorialProps = {
    onClose: () => void;
}

const ModalTutorial = ({ onClose }: ModalTutorialProps) => {
    return (
        <StyledModalOverlay>
            <StyledModal>
                <div className={'flex'}>
                    <h3>Welcome to Track-IT</h3>
                    <button type='button' onClick={() => onClose()} aria-label="Close tutorial modal">
                        <CrossSvg />
                    </button>
                </div>

                <section className={"justified_text"}>
                    <div>
                        It's a music organizer to aggregate all of your collection and manage it as you wish.
                        Currently, Track-It works as a plugin of Spotify, where you can organize your tracks by playlist in a simpler way.
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        There you can :
                        <ul>
                            <li>Consult all of your library (tracks and playlists) in a global view.</li>
                            <li>Filter, sort, and search your tracks.</li>
                            <li>Add your tracks to your playlists in one click (one or many tracks to one or many playlists).</li>
                            <li>Get recommendations on your tracks.</li>
                            <li>Bonus: get your top tracks, top artists, and other funny data.</li>
                        </ul>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        Roadmap :
                        <ul>
                            <li>Complete personalization with parameterization of your library and the possibility to add custom tags to your tracks.</li>
                            <li>Generate and modify playlists with rules related to current tracks data and/or your custom tags.</li>
                        </ul>
                    </div>
                </section>
                <button className={'button_submit'} type='submit' onClick={() => onClose()}>
                    Let's go !
                </button>
            </StyledModal>
        </StyledModalOverlay>
    );
};

const StyledModalOverlay = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(6px);
`;

const StyledModal = styled.div`
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 615px;
    padding: 60px;
    background-color: var(--true-black);
    border: 5px solid var(--white);
    border-radius: 40px;
    animation: ${fadeIn} 200ms ease-in-out;

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .button_submit {
        margin-top: 20px;
        margin-left: 380px;
        background-color: var(--green);
    }

    .justified_text {
        text-align: justify;
    }

    li {
        margin-left: 30px;
    }
`;

export default ModalTutorial;