import type { WalletContextState } from '@solana/wallet-adapter-react';
import type { CSSProperties } from 'react';
export type JupiterInit = {
  displayMode: 'integrated';
  integratedTargetId: string;
  autoConnect: boolean;
  enableWalletPassthrough: boolean;
  passthroughWalletContextState: WalletContextState;
  onRequestConnectWallet: () => void;
  formProps: { initialInputMint: string; initialOutputMint: string; fixedMint: string };
  containerStyles?: CSSProperties;
  onSwapError: () => void;
  onSuccess: (result: { txid: string }) => void;
};
declare global {
  interface Window {
    Jupiter?: {
      init: (props: JupiterInit) => void;
      close: () => void;
      syncProps: (props: { passthroughWalletContextState: WalletContextState }) => void;
    };
  }
}
