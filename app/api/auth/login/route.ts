import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyPassword } from '@/lib/auth'
import { hashPassword } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { matricule, password } = body

    // Validate input
    if (!matricule || !password) {
      return NextResponse.json(
        { error: 'Matricule and password are required' },
        { status: 400 }
      )
    }

    // Find user by matricule
    const result = await query(
      'SELECT id, password_hash, role, is_first_login FROM users WHERE matricule = $1',
      [matricule]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid matricule or password' },
        { status: 401 }
      )
    }

    const user = result.rows[0]

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid matricule or password' },
        { status: 401 }
      )
    }

    // Update last login
    await query(
      'UPDATE users SET last_login_at = NOW() WHERE id = $1',
      [user.id]
    )

    // Return user data (without password)
    return NextResponse.json({
      user: {
        id: user.id,
        matricule,
        role: user.role,
        isFirstLogin: user.is_first_login,
      },
    })
  } catch (error) {
    console.error('[auth/login] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}
