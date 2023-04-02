import React, { useState } from 'react'
import Link from 'next/link'
import useLogin from '../api/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useLogin()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className='login flex flex-col justify-center items-center h-full'>
      <h1 className='loginTitle text-center mb-8'>Log In</h1>
      <form className='loginForm flex flex-col w-70' onSubmit={handleSubmit}>
        <label htmlFor='email' className='mb-2'>
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
          className='py-2 px-4 border border-gray-300 rounded-lg mb-5'
        />
        <label htmlFor='password' className='mb-2'>
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
          className='py-2 px-4 border border-gray-300 rounded-lg mb-5'
        />
        <button
          className='loginBtn bg-purple-500 text-white py-2 px-4 rounded-lg font-bold'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <h3 className='text-center mt-8'>
        Don&apos;t have an account?&nbsp;
        <Link href='/register'>Register</Link>
      </h3>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
