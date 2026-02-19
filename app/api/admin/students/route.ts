import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { generateMatricule, getNextStudentId } from '@/lib/matricule-generator'
import { generateInitialPassword, hashPassword } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const batch = request.nextUrl.searchParams.get('batch')

    let sql = `
      SELECT u.id, u.matricule, u.email, u.role, 
             u.created_at, sp.batch, sp.first_name, sp.last_name
      FROM users u
      LEFT JOIN student_profiles sp ON u.id = sp.user_id
      WHERE u.role = 'student'
    `
    const params: string[] = []

    if (batch) {
      sql += ' AND sp.batch = $1'
      params.push(batch)
    }

    sql += ' ORDER BY u.createdAt DESC'

    const result = await query(sql, params.length > 0 ? params : undefined)
    return NextResponse.json({ students: result.rows })
  } catch (error) {
    console.error('[admin/students] GET Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, batch, email } = body

    // Validate input
    if (!firstName || !lastName || !batch) {
      return NextResponse.json(
        { error: 'First name, last name, and batch are required' },
        { status: 400 }
      )
    }

    // Get the next student ID for this batch
    const batchResult = await query(
      `SELECT MAX(CAST(SUBSTRING(matricule FROM LENGTH(CONCAT('K48', $1)) + 1) AS INTEGER)) as maxId 
       FROM users 
       WHERE matricule LIKE $2 AND role = 'student'`,
      [batch, `K48${batch}%`]
    )

    const nextId = getNextStudentId(batchResult.rows[0]?.maxId)
    const matricule = generateMatricule({ batch, studentId: nextId })
    const initialPassword = generateInitialPassword()
    const passwordHash = await hashPassword(initialPassword)

    // Create user
    const userResult = await query(
      `INSERT INTO users (matricule, email, password_hash, role, is_first_login)
       VALUES ($1, $2, $3, $4, true)
       RETURNING id`,
      [matricule, email || null, passwordHash, 'student']
    )

    const userId = userResult.rows[0].id

    // Create student profile
    await query(
      `INSERT INTO student_profiles (user_id, first_name, last_name, batch)
       VALUES ($1, $2, $3, $4)`,
      [userId, firstName, lastName, batch]
    )

    return NextResponse.json({
      student: {
        id: userId,
        matricule,
        firstName,
        lastName,
        batch,
        password: initialPassword,
      },
    }, { status: 201 })
  } catch (error) {
    console.error('[admin/students] POST Error:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
