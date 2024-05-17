import { NextResponse } from 'next/server'
import { connectMongoDB } from '../../../../lib/mongodb'
import User from '../../../../models/user'
import bcrypt from 'bcryptjs'

export async function POST(req: any) {
 try {
  const { name, email, password } = await req.json()
  const hashedPassword = await bcrypt.hash(password, 10)

  await connectMongoDB()
  await User.create({ name, email, password: hashedPassword })

  console.log(
   'Name : ' + name + ' Email : ' + email + ' Password : ' + password
  )

  return NextResponse.json({
   message: 'User Created Successfully',
   statusCode: 201,
  })
 } catch (error: any) {
  return NextResponse.json({
   error: `an error from api ${error.message}`,
   statusCode: 500,
  })
 }
}
