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
    <div className='login'>
      <h1 className='loginTitle'>Log In</h1>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email Address</label>
        <input
          required
          placeholder='Email Address'
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          required
          placeholder='Password'
          type='password'
          name='password'
          id='password'
          minLength={6}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className='loginBtn' disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <h3>
        Don&apos;t have an account?&nbsp;
        <Link href='/register'>Register</Link>
      </h3>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
