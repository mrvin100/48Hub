export interface MatriculeMeta {
  batch: string;         // Batch identifier (e.g., "B1", "B2", "A1")
  studentId: number;     // Sequential student number within batch
}

/**
 * Generates matricule in format: K48[BATCH][ID]
 * Example: K48B1144
 * - K48 = KFOKAM 48 (organization prefix)
 * - B1 = Batch 1
 * - 144 = Sequential student ID within batch
 */
export function generateMatricule(meta: MatriculeMeta): string {
  const { batch, studentId } = meta;
  return `K48${batch}${studentId}`;
}

/**
 * Validates matricule format (K48 + alphanumeric batch + numeric ID)
 * Examples: K48B1144, K48B2500, K48A1100
 */
export function isValidMatricule(matricule: string): boolean {
  const regex = /^K48[A-Z0-9]+\d+$/;
  return regex.test(matricule);
}

/**
 * Parses matricule into components
 * Returns { prefix, batch, studentId } or null if invalid
 */
export function parseMatricule(matricule: string) {
  const match = matricule.match(/^K48([A-Z0-9]+?)(\d+)$/);
  if (!match) return null;
  return {
    prefix: "K48",
    batch: match[1],
    studentId: parseInt(match[2], 10),
  };
}

/**
 * Gets the next student ID for a batch
 * This should be called after checking the database for existing students in batch
 */
export function getNextStudentId(lastStudentId?: number): number {
  return (lastStudentId || 0) + 1;
}
