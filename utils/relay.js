import { RelayPool } from 'nostr-relaypool-fork'

export const relays = ['wss://relay.damus.io', 'wss://relay.snort.social', 'wss://eden.nostr.land', 'wss://nos.lol', 'wss://relay.current.fyi', 'wss://relay.nostr.info', 'wss://offchain.pub', 'wss://nostr.fmt.wiz.biz', 'wss://nostr.relayer.se']

export const pool = new RelayPool(relays, { dontLogSubscriptions: true })
