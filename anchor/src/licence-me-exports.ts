// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import LicenceMeIDL from '../target/idl/licence_me.json';
import type { LicenceMe } from '../target/types/licence_me';

// Re-export the generated IDL and type
export { LicenceMe, LicenceMeIDL };

// The programId is imported from the program IDL.
export const LICENCE_ME_PROGRAM_ID = new PublicKey(LicenceMeIDL.address);

// This is a helper function to get the LicenceMe Anchor program.
export function getLicenceMeProgram(provider: AnchorProvider) {
  return new Program(LicenceMeIDL as LicenceMe, provider);
}

// This is a helper function to get the program ID for the LicenceMe program depending on the cluster.
export function getLicenceMeProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return LICENCE_ME_PROGRAM_ID;
  }
}
