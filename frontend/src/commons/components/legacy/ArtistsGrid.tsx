import type { Artist } from "../../spotify/responsesTypes";

type ArtistsGridProps = {
	artists: Artist[];
};

const ArtistsGrid = ({ artists }: ArtistsGridProps) => (
	<>
		{artists?.length ? (
			<div /*type="artist"*/>
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
			</div>
		) : (
			<p className="empty-notice">No artists available</p>
		)}
	</>
);

export default ArtistsGrid;
