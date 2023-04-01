import React, { useState } from 'react'
import Link from 'next/link'
import useLoginMember from '../api/useLoginMember'
import { useRouter } from 'next/router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loginMember, loading, error } = useLoginMember()
  const router = useRouter()

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault()
    try {
      await loginMember({ email, password })
      router.push('/assets/listPost')
    } catch (error) {
      console.log(error)
    }
    setEmail('')
    setPassword('')
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
        <Link href='/assets/register'>Register</Link>
      </h3>
      {error && <p>{error}</p>}
    </div>
  )
}

export default Login
