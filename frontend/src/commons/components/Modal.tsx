import { useState } from "react";
import styled from "styled-components";
import { fadeIn } from "../styles/global/animation";

type ModalProps = {
    onValidate: ({ playlistName, playlistDescription }:
        { playlistName: string, playlistDescription: string }) => void;
    onClose: () => void;
}

const Modal = ({ onValidate, onClose }: ModalProps) => {
    const [playlistName, setPlaylistName] = useState<string>('');
    const [playlistDescription, setPlaylistDescription] = useState<string>('');
    return (
        <StyledModal>
            <div className={'flex'}>
                <h3>Create a new playlist</h3>
                <button type='button' onClick={() => onClose()} aria-label="Close modal and cancel new playlist creation">
                    <img src={'./images/cross.png'} alt={"Cross image"} />
                </button>
            </div>

            <form onSubmit={e => {
                e.preventDefault();
            }}>
                <label className="input">
                    <input
                        className="input__field"
                        required
                        autoFocus
                        onChange={(e) => setPlaylistName(e.target.value)}
                        type="text" placeholder='Ex: Death Metal'
                    />
                    <span className="input__label">Playlist name</span>
                </label>
                <br />
                <label className="input">
                    <input
                        className="input__field"
                        onChange={(e) => setPlaylistDescription(e.target.value)}
                        type="text" placeholder='Ex: Best of Death Metal'
                    />
                    <span className="input__label">Playlist description</span>
                </label>

                <div style={{ marginTop: '20px' }}>
                    <button type='button' onClick={onClose}>Cancel</button>&nbsp;&nbsp;
                    <button className={'button_submit'} type='submit'
                        onClick={() => {
                            onValidate({
                                playlistName: playlistName !== '' ? playlistName : "Track-Itify : Default",
                                playlistDescription: playlistDescription !== '' ? playlistDescription : "Created with Track-It"
                            });
                            onClose();
                        }
                        }>
                        Create
                    </button>
                </div>
            </form>
        </StyledModal >
    );
};

const StyledModal = styled.div`
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    padding: 60px;
    background-color: var(--true-black);
    border: 5px solid var(--white);
    border-radius: 40px;
    animation: ${fadeIn} 200ms ease-in-out;

    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    img {
        width: 20px;
        height: 20px;
    }

    form {
        margin-top: 30px;
        .button_submit {
            background-color: var(--green);
        }

        .input {
            position: relative;
  
            &__label {
                position: absolute;
                left: 0;
                top: 0;
                padding: calc(.5rem * 0.75) calc(.5rem * .5);
                margin: calc(.5rem * 0.75 + 3px) calc(.5rem * .5);
                background-color: var(--true-black);
                white-space: nowrap;
                transform: translate(0, 0);
                transform-origin: 0 0;
                transition: transform 120ms ease-in;
                font-weight: bold;  
                line-height: 0.8;
            }
            &__field {
                box-sizing: border-box;
                display: block;
                width: 100%;
                border: 1px solid currentColor;
                padding: calc(.5rem * 1.5) .5rem;
                color: currentColor;
                background: transparent;
                border-radius: 4px;
                
                &:focus,
                &:not(:placeholder-shown) {
                    & + .input__label {
                        transform: translate(.25rem, -75%) scale(.8);
                        color: var(--green);
                    }
                }
            }
        }
    }
`;

export default Modal;