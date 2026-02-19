const { Pool } = require('@neondatabase/serverless');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

// Hash password using pbkdf2 (same as lib/auth.ts)
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const iterations = 100000;
    const algorithm = 'sha256';
    
    crypto.pbkdf2(password, salt, iterations, 32, algorithm, (err, derivedKey) => {
      if (err) reject(err);
      const hash = derivedKey.toString('hex');
      resolve(`pbkdf2$${iterations}$${salt}$${hash}`);
    });
  });
}

async function createAdmin() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    // Admin credentials
    const adminMatricule = 'ADMIN001';
    const adminPassword = 'Admin@48Hub2024';
    const passwordHash = await hashPassword(adminPassword);

    // Check if admin already exists
    const checkResult = await pool.query(
      'SELECT id FROM users WHERE matricule = $1',
      [adminMatricule]
    );

    if (checkResult.rows.length > 0) {
      console.log('⚠️  Admin user already exists. Updating password...');
      
      // Update password with correct hash
      await pool.query(
        'UPDATE users SET password_hash = $1 WHERE matricule = $2',
        [passwordHash, adminMatricule]
      );
      
      console.log('✅ Admin password updated successfully!\n');
      console.log('📋 Admin Credentials:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Matricule:', adminMatricule);
      console.log('Password: ', adminPassword);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      await pool.end();
      process.exit(0);
    }

    // Create admin user
    await pool.query(
      `INSERT INTO users (matricule, email, password_hash, role, is_first_login, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [adminMatricule, 'admin@48hub.com', passwordHash, 'admin', false]
    );

    console.log('✅ Admin user created successfully!\n');
    console.log('📋 Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Matricule:', adminMatricule);
    console.log('Password: ', adminPassword);
    console.log('Email:    ', 'admin@48hub.com');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!\n');

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    await pool.end();
    process.exit(1);
  }
}

createAdmin();
