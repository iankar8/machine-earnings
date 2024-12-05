const requiredEnvVars = [
  'NEXT_PUBLIC_GHOST_URL',
  'GHOST_CONTENT_API_KEY',
  'NEXT_PUBLIC_GHOST_CONTENT_API_KEY',
  'NEXT_PUBLIC_URL',
] as const;

export type EnvVar = typeof requiredEnvVars[number];

export function validateConfig() {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

export function getConfig(key: EnvVar): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
} 