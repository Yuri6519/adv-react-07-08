import React from 'react'

function ErrorField({ input, meta, label, type }) {
  //console.log("ErrorField::meta::", meta)
  // console.log("ErrorField::input::", input)
  // console.log("ErrorField::type::", type)

  const { error, touched } = meta

  const errText = touched && error && <h3 style={{ color: 'red' }}>{error}</h3>

  return (
    <div>
      {label}:
      <input {...input} type={type} />
      {errText}
    </div>
  )
}

export default ErrorField
