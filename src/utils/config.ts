const requiredEnvVars = [
  'NEXT_PUBLIC_GHOST_URL',
  'GHOST_CONTENT_API_KEY',
  'NEXT_PUBLIC_GHOST_CONTENT_API_KEY',
  'NEXT_PUBLIC_URL',
] as const;

export type EnvVar = typeof requiredEnvVars[number];

export function validateConfig(): void {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }
}

interface Config {
  ghostUrl: string;
  ghostKey: string;
  ghostVersion: string;
}

export function getConfig(): Config {
  return {
    ghostUrl: process.env.NEXT_PUBLIC_GHOST_URL || '',
    ghostKey: process.env.NEXT_PUBLIC_GHOST_KEY || '',
    ghostVersion: process.env.NEXT_PUBLIC_GHOST_VERSION || 'v5.0',
  };
} 