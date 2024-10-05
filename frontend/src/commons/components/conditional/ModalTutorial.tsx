import { CrossSvg } from "../icons";

type ModalTutorialProps = {
	onClose: () => void;
};

const ModalTutorial = ({ onClose }: ModalTutorialProps) => {
	return (
		<div>
			<div>
				<div className={"flex"}>
					<h3>Welcome to Track-IT</h3>
					<button type="button" onClick={() => onClose()} aria-label="Close tutorial modal">
						<CrossSvg />
					</button>
				</div>

				<section className={"justified_text"}>
					<div>
						It's a music organizer to aggregate all of your collection and manage it as you wish. Currently, Track-It
						works as a plugin of Spotify, where you can organize your tracks by playlist in a simpler way.
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
							<li>
								Complete personalization with parameterization of your library and the possibility to add custom tags to
								your tracks.
							</li>
							<li>Generate and modify playlists with rules related to current tracks data and/or your custom tags.</li>
						</ul>
					</div>
				</section>
				<button className={"button_submit"} type="submit" onClick={() => onClose()}>
					Let's go !
				</button>
			</div>
		</div>
	);
};

export default ModalTutorial;
