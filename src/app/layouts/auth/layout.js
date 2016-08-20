import React from 'react';
import { Header } from "./header";
import { Footer } from "./footer";

export let layout = ({
  children
}) => {
  return (
    <div className="defaultLayout">
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}