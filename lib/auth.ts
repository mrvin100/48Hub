import crypto from 'crypto';

/**
 * Hashes a password using PBKDF2
 * Returns a hash in format: algorithm$iterations$salt$hash
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const iterations = 100000;
  const algorithm = 'sha256';
  
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, 32, algorithm, (err, derivedKey) => {
      if (err) reject(err);
      const hash = derivedKey.toString('hex');
      resolve(`pbkdf2$${iterations}$${salt}$${hash}`);
    });
  });
}

/**
 * Verifies a password against a stored hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const [algorithm, iterations, salt, storedHash] = hash.split('$');
  
  if (algorithm !== 'pbkdf2') {
    return false;
  }
  
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, parseInt(iterations, 10), 32, 'sha256', (err, derivedKey) => {
      if (err) reject(err);
      const computedHash = derivedKey.toString('hex');
      resolve(computedHash === storedHash);
    });
  });
}

/**
 * Generates a secure random token for sessions/password reset
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generates initial password from matricule and timestamp
 * Format: Base64(KFOKAM48 + timestamp + randomString)
 */
export function generateInitialPassword(): string {
  const prefix = 'KFOKAM48';
  const timestamp = Date.now().toString();
  const random = crypto.randomBytes(8).toString('hex');
  const combined = prefix + timestamp + random;
  return Buffer.from(combined).toString('base64').slice(0, 16);
}
