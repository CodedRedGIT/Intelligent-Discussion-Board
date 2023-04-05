import React, { useState } from 'react'
import Link from 'next/link'
import useLogin from '../api/useLogin'
import { Card } from '@/components/layout/Card'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className='flex flex-col justify-center items-center h-full'>
      <Card className='w-96'>
        <h1 className='text-center mb-8 text-2xl'>Log In</h1>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='email' className='mb-2 text-xl'>
            Email Address
          </label>
          <input
            required
            placeholder='Email Address'
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='py-2 px-4 border border-gray-300 rounded-lg mb-5 text-xl'
          />
          <label htmlFor='password' className='mb-2 text-xl'>
            Password
          </label>
          <input
            required
            placeholder='Password'
            type='password'
            name='password'
            id='password'
            minLength={6}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className='py-2 px-4 border border-gray-300 rounded-lg mb-5 text-xl'
          />
          <button
            className=' bg-green-500 text-white py-2 px-4 rounded-lg font-bold text-xl'
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
        </form>
        <h3 className='text-center mt-8 text-xl'>
          Don&apos;t have an account?&nbsp;
          <Link href='/register' className='underline text-blue-500'>
            Register
          </Link>
        </h3>
        {error && <p className='text-red-500 mt-4 text-lg'>{error}</p>}
      </Card>
    </div>
  )
}

export default Login
