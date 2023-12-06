import styled from "styled-components";
import { fadeIn } from "../styles/global/animation";

type ModalTutorialProps = {
    onClose: () => void;
}

const ModalTutorial = ({ onClose }: ModalTutorialProps) => {
    return (
        <StyledModalOverlay onClick={() => onClose()}>
            <StyledModal>
                <div className={'flex'}>
                    <h3>Welcome to Track-IT</h3>
                    <button type='button' onClick={() => onClose()} aria-label="Close modal and cancel new playlist creation">
                        <img src={'./images/cross.png'} alt={"Cross image"} />
                    </button>
                </div>

                <section>
                    It's a music organiser to agregate all of your collection and manage it as you wish.
                    Currently Track-It works as a plugin of spotify, where you can organize your tracks by playlist in an simplier way.
                    <div style={{ marginTop: "20px" }}>
                        Here you can :
                        <ul>
                            <li>Consult all of your librairy (tracks and playlist) in a global view</li>
                            <li>Add your tracks to your playlists in one click (one or many tracks to one or many playlist)</li>
                            <li>Get recommandations on your tracks</li>
                            <li>Bonus : get your top tracks, top artists and other funny data.</li>
                        </ul>
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        Roadmap :
                        <ul>
                            <li>Filter, sort and search your tracks</li>
                            <li>Complete personalization with parametrage of your librairy and possibility to add customs tags to your tracks.</li>
                            <li>Generate and modify playlist with rules related to current tracks data and / or your custom tags.</li>
                        </ul>
                    </div>
                </section>
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
    width: 600px;
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

    img {
        width: 20px;
        height: 20px;
    }
`;

export default ModalTutorial;