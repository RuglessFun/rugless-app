'use client';
import { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { SOL_MINT, type Token } from '@/lib/types';

let pluginPromise: Promise<void> | null = null;
function loadPlugin() {
  if (window.Jupiter) return Promise.resolve();
  if (pluginPromise) return pluginPromise;
  pluginPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://plugin.jup.ag/plugin-v1.js';
    script.async = true;
    const timer = setTimeout(() => {
      script.remove();
      reject(Error('The trading provider took too long to load.'));
    }, 20_000);
    script.onload = () => {
      clearTimeout(timer);
      window.Jupiter ? resolve() : reject(Error('Trading provider unavailable.'));
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      reject(Error('Could not load the trading provider.'));
    };
    document.head.append(script);
  }).catch((e) => {
    pluginPromise = null;
    throw e;
  });
  return pluginPromise;
}
export function SwapPanel({ token }: { token: Token }) {
  const wallet = useWallet(),
    { setVisible } = useWalletModal(),
    walletRef = useRef(wallet);
  walletRef.current = wallet;
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading'),
    [message, setMessage] = useState(''),
    [tx, setTx] = useState<string | null>(null),
    [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let cancelled = false;
    setState('loading');
    setMessage('');
    loadPlugin()
      .then(() => {
        if (cancelled || !window.Jupiter) return;
        window.Jupiter.init({
          displayMode: 'integrated',
          integratedTargetId: 'jupiter-swap',
          autoConnect: false,
          enableWalletPassthrough: true,
          passthroughWalletContextState: walletRef.current,
          onRequestConnectWallet: () => setVisible(true),
          formProps: {
            initialInputMint: SOL_MINT,
            initialOutputMint: token.mint,
            fixedMint: token.mint,
          },
          containerStyles: { width: '100%', minHeight: 430 },
          onSwapError: () => setMessage('Swap failed. Check the wallet result before retrying.'),
          onSuccess: ({ txid }) => {
            setMessage('Transaction submitted. Check its on-chain status.');
            if (/^[1-9A-HJ-NP-Za-km-z]{32,100}$/.test(txid)) setTx(txid);
          },
        });
        setState('ready');
      })
      .catch((e) => {
        if (!cancelled) {
          setState('error');
          setMessage(e instanceof Error ? e.message : 'Trading provider unavailable.');
        }
      });
    return () => {
      cancelled = true;
      window.Jupiter?.close();
    };
  }, [token.mint, setVisible, attempt]);
  useEffect(() => {
    if (state === 'ready') window.Jupiter?.syncProps({ passthroughWalletContextState: wallet });
  }, [wallet, state]);
  return (
    <aside className="swap-panel panel">
      <div className="panel-title">
        <h2>Trade ${token.symbol}</h2>
        <span className="badge">Mainnet</span>
      </div>
      {state === 'loading' && (
        <p className="panel-message" role="status">
          Loading secure swap…
        </p>
      )}
      <div id="jupiter-swap" />
      {message && (
        <p className="panel-message" role="status">
          {message}
        </p>
      )}
      {state === 'error' && (
        <button className="button" onClick={() => setAttempt((n) => n + 1)}>
          Retry swap
        </button>
      )}
      {tx && (
        <a
          href={`https://solscan.io/tx/${tx}`}
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          View transaction ↗
        </a>
      )}
      <div className="swap-foot">
        <p>
          Powered by Jupiter. Review price impact, fees and minimum received, then approve in your
          wallet.
        </p>
        <a href={`https://pump.fun/coin/${token.mint}`} target="_blank" rel="noreferrer">
          Open on Pump.fun ↗
        </a>
      </div>
    </aside>
  );
}
