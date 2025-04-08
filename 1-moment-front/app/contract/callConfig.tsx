import { createConfig, http } from "wagmi";
import { base, mainnet } from "wagmi/chains";

export const callConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});
