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
                <img src={'./images/cross.png'} onClick={() => onClose()} />
            </div>

            <form onSubmit={e => {
                e.preventDefault();
            }}>
                <div>
                    <label> Name : &nbsp;
                        <input
                            required
                            autoFocus
                            onChange={(e) => setPlaylistName(e.target.value)}
                            type="text" placeholder='Ex: Death Metal'
                        />
                    </label>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label> Description : &nbsp;
                        <input
                            onChange={(e) => setPlaylistDescription(e.target.value)}
                            type="text" placeholder='Ex: Best of Death Metal'
                        />
                    </label>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button type='button' onClick={onClose}>Cancel</button>&nbsp;&nbsp;
                    <button
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
    animation: ${fadeIn} 200ms ease-in-out;
    z-index: 1000;
    position: fixed;
    top: 50%;
    left: 50%;
    width: 450px;
    transform: translate(-50%, -50%);
    background-color: var(--new-light-grey);
    padding: 60px;
    border: 5px solid var(--true-black);
    border-radius: 40px;
    form {
        margin-top: 30px;
    }
    .flex {
        display: flex;
        justify-content: space-between;

    }
    img {
        width: 20px;
        height: 20px;
    }
`;

export default Modal;