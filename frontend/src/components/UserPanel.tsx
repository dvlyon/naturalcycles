import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import FormWrapper from './FormWrapper'
import Button from './Button'
import Input from './Input'
import { styled } from 'styled-components'
import Title from './Title'
import ErrorLabel from './ErrorLabel'

const StyledDiv = styled.div`
  display: flex;
  gap: 0.5em;
`

const UserPanel = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  const { user, signOut } = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const idToken = await user?.getIdToken()

        const response = await fetch(import.meta.env.VITE_PROFILE_URL, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })

        if (response.ok) {
          const data = await response.json()

          setName(data.name || '')
          setEmail(data.email || '')
        } else {
          console.log('Failed to fetch profile.')
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  const validate = () => {
    let valid = true

    if (name.trim() === '') {
      setNameError('Name cannot be empty.')
      valid = false
    } else {
      setNameError('')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email.')
      valid = false
    } else {
      setEmailError('')
    }

    return valid
  }

  const handleSave = async () => {
    if (!validate()) {
      return
    }

    try {
      const idToken = await user?.getIdToken()

      const response = await fetch(import.meta.env.VITE_PROFILE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (response.ok) {
        alert('Profile updated successfully.')
      } else {
        alert('Failed to update profile.')
      }
    } catch (error) {
      console.error('Error updating profile:', error)

      alert('Error updating profile.')
    }
  }

  return (
    <FormWrapper>
      <Title>User Profile</Title>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {nameError && <ErrorLabel>{nameError}</ErrorLabel>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <ErrorLabel>{emailError}</ErrorLabel>}
      <StyledDiv>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={signOut}>Logout</Button>
      </StyledDiv>
    </FormWrapper>
  )
}

export default UserPanel
