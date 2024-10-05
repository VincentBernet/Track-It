import { useState } from "react";
import { CrossSvg } from "../icons";

type ModalProps = {
	onValidate: ({ playlistName, playlistDescription }: { playlistName: string; playlistDescription: string }) => void;
	onClose: () => void;
};

const Modal = ({ onValidate, onClose }: ModalProps) => {
	const [playlistName, setPlaylistName] = useState<string>("");
	const [playlistDescription, setPlaylistDescription] = useState<string>("");
	return (
		<div>
			<div>
				<div className={"flex"}>
					<h3>Create a new playlist</h3>
					<button type="button" onClick={() => onClose()} aria-label="Close modal and cancel new playlist creation">
						<CrossSvg />
					</button>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<label className="input">
						<input
							className="input__field"
							required={true}
							// biome-ignore lint/a11y/noAutofocus: Will try to find a better solution
							autoFocus={true}
							onChange={(e) => setPlaylistName(e.target.value)}
							type="text"
							placeholder="Ex: Death Metal"
						/>
						<span className="input__label">Playlist name</span>
					</label>
					<br />
					<label className="input">
						<input
							className="input__field"
							onChange={(e) => setPlaylistDescription(e.target.value)}
							type="text"
							placeholder="Ex: Best of Death Metal"
						/>
						<span className="input__label">Playlist description</span>
					</label>

					<div style={{ marginTop: "20px" }}>
						<button type="button" onClick={onClose}>
							Cancel
						</button>
						&nbsp;&nbsp;
						<button
							className={"button_submit"}
							type="submit"
							onClick={() => {
								onValidate({
									playlistName: playlistName !== "" ? playlistName : "Track-Itify : Default",
									playlistDescription: playlistDescription !== "" ? playlistDescription : "Created with Track-It",
								});
								onClose();
							}}
						>
							Create
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Modal;
