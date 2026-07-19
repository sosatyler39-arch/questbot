export interface GameCreators {
  youtubeChannelIds: string[];
}

// Per-game curated source config, kept out of hardcoded pipeline logic so a
// second game (brief §9: Palworld is a real post-beta candidate) is just a
// new entry here, not a code change.
export const CREATORS: Record<string, GameCreators> = {
  'elden-ring': {
    // TODO: fill in curated Elden Ring guide creator channel IDs before
    // running the sync job for real.
    youtubeChannelIds: [],
  },
};
