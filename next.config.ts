import type { NextConfig } from "next";

/**
 * Intentionally minimal.
 *
 * Per PDD §4/§5: App Router only, Turbopack (the Next.js 16 default) is not
 * reconfigured, and no additional infrastructure (custom webpack, rewrites,
 * headers, etc.) is added unless a concrete requirement calls for it.
 *
 * Cloudinary images are served via `next-cloudinary`'s `CldImage`, which
 * builds fully-qualified `res.cloudinary.com` URLs through its own loader —
 * it does not go through the built-in `next/image` optimizer, so no
 * `images.remotePatterns` entry is required here (see PDD §4.2).
 */
const nextConfig: NextConfig = {};

export default nextConfig;
