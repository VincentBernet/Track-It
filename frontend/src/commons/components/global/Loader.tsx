type LoaderProps = {
	minHeight: string;
};

const Loader = ({ minHeight }: LoaderProps) => (
	<div /*minHeight={minHeight}*/>
		<div className="bars">
			<div /*delay="250ms"*/ />
			<div /*delay="715ms"*/ />
			<div /*delay="475ms"*/ />
			<div /*delay="25ms"*/ />
			<div /*delay="190ms"*/ />
		</div>
	</div>
);

export default Loader;
