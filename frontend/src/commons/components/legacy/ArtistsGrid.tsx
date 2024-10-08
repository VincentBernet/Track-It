import type { artistType } from "../../spotify/responsesTypes";
import { StyledGrid } from "../../styles";

type ArtistsGridProps = {
	artists: artistType[];
};

const ArtistsGrid = ({ artists }: ArtistsGridProps) => (
	<>
		{artists?.length ? (
			<StyledGrid $type="artist">
				{artists.map((artist, i) => (
					<li className="grid__item" key={`${artist.name} ${artist.id} ${i}`}>
						<div className="grid__item__inner">
							{artist.images[0] && (
								<div className="grid__item__img">
									<img src={artist.images[0].url} alt={artist.name} />
								</div>
							)}
							<h3 className="grid__item__name overflow-ellipsis">{artist.name}</h3>
							<p className="grid__item__label">Artist</p>
						</div>
					</li>
				))}
			</StyledGrid>
		) : (
			<p className="empty-notice">No artists available</p>
		)}
	</>
);

export default ArtistsGrid;
