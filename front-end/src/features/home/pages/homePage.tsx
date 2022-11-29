import React from 'react';
import TrackTable from '../../../commons/components/TrackTable';
import LeftPanel from '../../../commons/components/LeftPanel';

const HomePage = (): React.ReactElement => {
	return (
		<>
			<LeftPanel />
			<TrackTable />
		</>
	);
};

export default HomePage;