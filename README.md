# Tile-Map-Proxy

A Tile Map Proxy base on NodeJS Edge runtime. Provide a unified API that uses Google XYZ tile coordinates

It can be imported into the map browser as a custom map source. Ovital, ACGIS etc.
Feature:

1. Resolve and optimize the tile map loading network. With the power of CloudFlare global CDN and cache.
2. Help people(Chinese) that after the GFW to access the world map service(Google etc.).
3. Smooth out the differences between each Tile API and provide Google XYZ-based Tile APIs in a unified format.
4. Provides a custom **hander** interface to handle possible limitations of some APIs. e.g. CORS/Header Referer/Cookie etc.

## Deploy

It support `Cloudflare Workers` and `Vercel Edge Functions` and `NodeJS Native` !

```shell
pnpm install
pnpm run dev:node
pnpm run dev
# bundle the code
pnpm run build
```

## Develop

```shell
pnpm install

pnpm create hono my-app
pnpm add --save-dev --save-exact prettier
pnpm add -D typescript ts-node @types/node
pnpm add -g tsx
```

## References

tsx: [What is tsx?](https://dev.to/_staticvoid/how-to-run-typescript-natively-in-nodejs-with-tsx-3a0c)
