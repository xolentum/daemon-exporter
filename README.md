# Xolentumd Exporter
> Xolentum Prometheus exporter

### Environment Variables

* `DAEMON_HOST` - xolentumd host, default: `http://localhost:13580`
* `PORT` - port to expose metrics on, default: `9396`

### Metrics Exported

* `xolentumd_height` - Current block height
* `xolentumd_block_difficulty` - Last block difficulty
* `xolentumd_block_reward` - Last block reward
* `xolentumd_connections_incoming` - Number of incoming connections
* `xolentumd_connections_outgoing` - Number of outgoing connections
* `xolentumd_connections_rpc` - Number of RPC connections
* `xolentumd_tx_chain` - Number of transactions in total
* `xolentumd_tx_mempool` - Number of transactions in the mempool
* `xolentumd_database_size` - Current database size on disk


### License

[BSD-3-Clause License](LICENSE)

Copyright © 2021 The Xolentum Project   
Copyright © 2018-2020 Excitable Aardvark 
