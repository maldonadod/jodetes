import React from "react"
import "./mesa.css"

function Mesa({ children }) {
  return (
    <div className="mesa">
      {children}
    </div>
  )
}

export default Mesa;