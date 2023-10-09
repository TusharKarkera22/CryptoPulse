import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa } from '@supabase/auth-ui-shared'
  
import { useNavigate } from 'react-router-dom'

const supabase = createClient("https://yuvdcqswxyuyscdvgkhr.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1dmRjcXN3eHl1eXNjZHZna2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NzQyNDgsImV4cCI6MjAxMjQ1MDI0OH0.OVBiKThwIRbMSgUl9EjBjdGsf4VKeW2URddfniiTzXg");

export default function Login() {
    const navigate = useNavigate()
    const [session, setSession] = useState(null)
  
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
  
      return () => subscription.unsubscribe()
    }, [])
  
    const handleLogout = async () => {
      await supabase.auth.signOut();
      setSession(null);
    }
  
    return (
      <div className='App'>
        <header>
          {session ? (
           navigate('/dashboard')
          ) : (
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme='dark' />
          )}
        </header>
      </div>
    );
  }
