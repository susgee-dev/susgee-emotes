# [susgee-emotes](https://emotes.susgee.dev/)

A small Next.js app for browsing Twitch emotes and badges:

- Search a Twitch channel and view its emotes (Follower, Tier 1/2/3 Subscription, Bits) and badges.
- Browse Twitch global emotes (Global, Turbo, Prime, and Hype Train).
- View details for a specific emote and see other emotes in the same emote set.
- View an emote set, its owner (if available), and all emotes within it.

Live metadata, links, and images are enriched via Twitch endpoints. Requests are cached server-side for a short period
to reduce API load.

## Routes and features

- Home page with channel search
- /global | Twitch global emotes
- /[username] | Channel page showing:
    - Emotes: follower, subscription tiers (1/2/3), bits
    - Badges: subscriber and bits
    - Search within displayed emotes
- /emote/[emoteId] | Emote details page with owner/artist and other emotes in the same set
- /set/[setId] | Emote set page showing owner and emotes

## Caching

Server actions in src/app/actions.ts use a simple in-memory cache defined in src/lib/cache.ts with a default 10-minute
expiration. This helps reduce API calls to Twitch endpoints.

## Tech stack

- Next.js 15 (React 18)
- TypeScript
- Tailwind CSS
- HeroUI components
- Twitch GQL and Helix APIs