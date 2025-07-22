const Notification = ({ message, notificationType }) => {
  let divStyle = {
    minHeight: '1.2em',
    padding: '7px 0 8px 13px',
    border: '1px solid white'
  }
  
  if (notificationType === 'success') {
    divStyle = {
      ...divStyle,
      color: 'green',
      border: '1px solid green',
      background: '#e6ffe6'
    }
  } else if (notificationType === 'error') {
    divStyle = {
      ...divStyle,
      color: 'red',
      border: '1px solid red',
      background: '#ffe6e6'
    }
  }

  return (
    <div style={divStyle}>
      {message}
    </div>
  )
}

export default Notification