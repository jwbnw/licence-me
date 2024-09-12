import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { LicenceMe } from '../target/types/licence_me';

describe('licence-me', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.LicenceMe as Program<LicenceMe>;

  const licenceMeKeypair = Keypair.generate();

  it('Initialize LicenceMe', async () => {
    await program.methods
      .initialize()
      .accounts({
        licenceMe: licenceMeKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([licenceMeKeypair])
      .rpc();

    const currentCount = await program.account.licenceMe.fetch(
      licenceMeKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment LicenceMe', async () => {
    await program.methods
      .increment()
      .accounts({ licenceMe: licenceMeKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.licenceMe.fetch(
      licenceMeKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment LicenceMe Again', async () => {
    await program.methods
      .increment()
      .accounts({ licenceMe: licenceMeKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.licenceMe.fetch(
      licenceMeKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement LicenceMe', async () => {
    await program.methods
      .decrement()
      .accounts({ licenceMe: licenceMeKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.licenceMe.fetch(
      licenceMeKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set licenceMe value', async () => {
    await program.methods
      .set(42)
      .accounts({ licenceMe: licenceMeKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.licenceMe.fetch(
      licenceMeKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the licenceMe account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        licenceMe: licenceMeKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.licenceMe.fetchNullable(
      licenceMeKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
