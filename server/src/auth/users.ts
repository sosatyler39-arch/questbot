import { pool } from '../db.js';
import type { Tier } from '../../../shared/types.js';

export async function upsertDiscordUser(discordId: string, username: string): Promise<{ tier: Tier }> {
  const { rows } = await pool.query<{ tier: Tier }>(
    `INSERT INTO users (discord_id, discord_username)
     VALUES ($1, $2)
     ON CONFLICT (discord_id) DO UPDATE SET discord_username = EXCLUDED.discord_username
     RETURNING tier`,
    [discordId, username],
  );
  return { tier: rows[0].tier };
}

export async function getUserTier(discordId: string): Promise<Tier> {
  const { rows } = await pool.query<{ tier: Tier }>('SELECT tier FROM users WHERE discord_id = $1', [discordId]);
  return rows[0]?.tier ?? 'free';
}

export async function setStripeCustomer(discordId: string, stripeCustomerId: string): Promise<void> {
  await pool.query('UPDATE users SET stripe_customer_id = $1 WHERE discord_id = $2', [stripeCustomerId, discordId]);
}

export async function setTierByStripeCustomer(stripeCustomerId: string, tier: Tier): Promise<void> {
  await pool.query('UPDATE users SET tier = $1 WHERE stripe_customer_id = $2', [tier, stripeCustomerId]);
}
