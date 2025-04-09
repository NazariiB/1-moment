import { createConfig, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'

export const callConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    miniAppConnector()
  ],
});
