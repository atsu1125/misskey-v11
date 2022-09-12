import * as os from 'os';
import * as si from 'systeminformation';
import { getConnection } from 'typeorm';
import define from '../define';
import redis from '../../../db/redis';
import config from '../../../config';

export const meta = {
	requireCredential: false,

	desc: {
	},

	tags: ['meta'],

	params: {
	},
};

export default define(meta, async () => {
	const memStats = await si.mem();
	const fsStats = await si.fsSize();
	const netInterface = await si.networkInterfaceDefault();

	return {
		machine: config.hideServerInfo ? 'Unknown' : os.hostname(),
		os: config.hideServerInfo ? 'Unknown' : os.platform(),
		node: config.hideServerInfo ? 'Unknown' : process.version,
		psql: config.hideServerInfo ? 'Unknown' : await getConnection().query('SHOW server_version').then(x => x[0].server_version),
		redis: config.hideServerInfo ? 'Unknown' : redis.server_info.redis_version,
		cpu: {
			model: config.hideServerInfo ? 'Unknown' : os.cpus()[0].model,
			cores: config.hideServerInfo ? 'Unknown' : os.cpus().length
		},
		mem: {
			total: config.hideServerInfo ? 'Unknown' : memStats.total
		},
		fs: {
			total: config.hideServerInfo ? 'Unknown' : fsStats[0].size,
			used: config.hideServerInfo ? 'Unknown' : fsStats[0].used,
		},
		net: {
			interface: config.hideServerInfo ? 'Unknown' : netInterface
		}
	};
});
