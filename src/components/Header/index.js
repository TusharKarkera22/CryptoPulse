import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import Button from "../Common/Button";
import TemporaryDrawer from "./drawer";
import { useNavigate } from "react-router-dom";
const supabase = createClient("https://yuvdcqswxyuyscdvgkhr.supabase.co", "YOUR_API_KEY");

export default function Header() {
    const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate('/login')
  };

    return (
        <div className="navbar">
            <Link to={'/'} className="logo">
                CryptoPulse<span style={{ color: "var(--primary)" }}>.</span>
            </Link>
            <div className="links">
                <NavLink to="/">
                    <p className="link">Home</p>
                </NavLink>
                <NavLink to="/compare">
                    <p className="link">Compare</p>
                </NavLink>
                <NavLink to="/watchlist">
                    <p className="link">Watchlist</p>
                </NavLink>
                <NavLink to="/dashboard">
                    <Button text={"Dashboard"} onClick={() => console.log('hii')} outline={true}/>
                </NavLink>
                
                    <Button text={"Logout"} onClick={handleLogout} outline={true}/>
                
            </div>
            <div className="mobile-drawer">
                <TemporaryDrawer />
            </div>
        </div>
    )
}