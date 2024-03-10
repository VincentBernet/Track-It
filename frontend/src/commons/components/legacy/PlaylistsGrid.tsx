import { Link } from "react-router-dom";
import type { playlistType } from "../../spotify/responsesTypes";
import { StyledGrid } from "../../styles";

type PlaylistsGridProps = {
	playlists: playlistType[];
};

const PlaylistsGrid = ({ playlists }: PlaylistsGridProps) => (
	<>
		{playlists?.length ? (
			<StyledGrid>
				{playlists.map((playlist, i) => (
					<li className="grid__item" key={i}>
						<Link className="grid__item__inner" to={`/playlists/${playlist.id}`}>
							<div className="grid__item__img">
								{playlist.images.length && playlist.images[0] ? (
									<img src={playlist.images[0].url} alt={playlist.name} />
								) : (
									<img src={"/images/default_image.png"} alt={playlist.name} />
								)}
							</div>
							<h3 className="grid__item__name overflow-ellipsis">{playlist.name}</h3>
							<p className="grid__item__label">Playlist</p>
						</Link>
					</li>
				))}
			</StyledGrid>
		) : (
			<p className="empty-notice">No playlists available</p>
		)}
	</>
);

export default PlaylistsGrid;
