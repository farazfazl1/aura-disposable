## Case-insensitive `/store/[slug]` routing

### Problem

The store product page (`/store/[slug]`) previously looked up products using a **case-sensitive** comparison:

- `item.slug === params.slug`

That meant `"/store/saffron"` worked but `"/store/Saffron"` (or other case combinations) would not resolve to the same product, even though they represent the same logical slug.

### Change

The `/store/[slug]` route now normalizes the incoming path segment and performs a **case-insensitive** match:

- `requestedSlug = decodeURIComponent(params.slug).toLowerCase()`
- `item.slug.toLowerCase() === requestedSlug`

This ensures any casing variant (e.g. `SAFFRON`, `Saffron`, `sAfFrOn`) resolves to the same product resource.

### Canonical links

The store landing page (`/store`) now links to the canonical lowercase slug for Saffron (`/store/saffron`) to keep generated URLs consistent.

### Quick manual test

With the dev server running on port 3000, all of these should render the same product page:

- `http://localhost:3000/store/saffron`
- `http://localhost:3000/store/Saffron`
- `http://localhost:3000/store/SAFFRON`
- `http://localhost:3000/store/sAfFrOn`

