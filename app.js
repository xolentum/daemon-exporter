/*
 * Copyright 2020 The Xolentum Project <atom@xolentum.org>
 *
 * Licensed under the BSD 3-Clause License. See LICENSE in the project root for
 * more information.
 */

const Daemon = require('monero-rpc').Daemon
const express = require('express')
const prometheus = require('prom-client')
const util = require('util')

const DAEMON_HOST = process.env.DAEMON_HOST || 'http://localhost:13580'
const Gauge = prometheus.Gauge

const app = express()
const daemon = new Daemon(DAEMON_HOST)

let getInfo = util.promisify(daemon.getInfo.bind(daemon))
let getLastBlockHeader = util.promisify(daemon.getLastBlockHeader.bind(daemon))

const difficulty = new Gauge({ name: 'xolentumd_block_difficulty', help: 'Last block difficulty' })
const incomingConnections = new Gauge({ name: 'xolentumd_connections_incoming', help: 'Number of incoming connections' })
const mempoolSize = new Gauge({ name: 'xolentumd_tx_mempool', help: 'Number of transactions in the mempool' })
const outgoingConnections = new Gauge({ name: 'xolentumd_connections_outgoing', help: 'Number of outgoing connections' })
const reward = new Gauge({ name: 'xolentumd_block_reward', help: 'Last block reward' })
const txCount = new Gauge({ name: 'xolentumd_tx_chain', help: 'Number of transactions in total' })
const database_size = new Gauge({ name: 'xolentumd_database_size', help: 'Current database size on disk' })
const height = new Gauge({ name: 'xolentumd_height', help: 'Current block height' })
const rpc_connections_count = new Gauge({ name: 'xolentumd_rpc_connections', help: 'rpc_connections_count' })

app.get('/metrics', (req, res) => {
  Promise.all([
    getInfo(),
    getLastBlockHeader()
  ])
    .then(([info, header]) => {
      difficulty.set(Number(header.difficulty))
      incomingConnections.set(Number(info.incoming_connections_count))
      mempoolSize.set(Number(info.tx_pool_size))
      outgoingConnections.set(Number(info.outgoing_connections_count))
      reward.set(Number(header.reward / 1e12))
      txCount.set(Number(info.tx_count))
      database_size.set(Number(info.database_size))
      height.set(Number(info.height))
      rpc_connections_count.set(Number(info.rpc_connections_count))

      res.end(prometheus.register.metrics())
    })
    .catch(e => {
      console.log(e)
    })
})

module.exports = app
