//@ts-ignore
import { require } from "@hyperoracle/zkgraph-lib";
import { Bytes, Event, Block, ByteArray } from "@hyperoracle/zkgraph-lib";

var transfer_event = Bytes.fromHexString(
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
);

export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events;

  // Track ERC721 Transfer events
  let transfer_collections: ByteArray = ByteArray.empty();
  for (let i = events.length - 1; i >= 0; i--) {
    if (
      events[i].esig == transfer_event
    ) {
      // Concatenate the token ID to the transfer_collections
      transfer_collections = transfer_collections.concat(events[i].topic3);
    }
  }
  let state = Bytes.fromByteArray(transfer_collections);

  return state;
}

