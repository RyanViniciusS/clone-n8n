// src/app/api/auth/[...all]/route.ts
import { auth } from '@/lib/auth';

// Exporta named exports para cada método
export const GET = auth.handler;
export const POST = auth.handler;
export const PATCH = auth.handler;
export const DELETE = auth.handler;
export const PUT = auth.handler;
