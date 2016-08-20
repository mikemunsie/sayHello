import React from 'react';
import { Link } from 'react-router';

export let Header = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/auth/dashboard">Dashboard</Link>
    </div>
  )
}