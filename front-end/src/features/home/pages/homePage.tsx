import MusicTable from '../../../commons/components/MusicTable';
import LeftPanel from '../../../commons/components/LeftPanel';

import React from 'react';

const HomePage = (): React.ReactElement => {
	return (
		<>
			<LeftPanel />
			<MusicTable />
		</>
	);
};

export default HomePage;