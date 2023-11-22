import { Link } from 'react-router-dom'

function Home() {

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const textCenterStyle = {
    textAlign: 'center',
    color: 'white'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '24px',
    padding: '10px 20px'
  };

  return (
    <div style={containerStyle}>
      <div style={textCenterStyle}>
      <Link to="/todos" style={linkStyle}>
          <h2>Oh crap! where're my Priorities?</h2>
        </Link>
        <Link to="/todos" style={linkStyle}>
          <h6>* Click me to get organized! *</h6>
        </Link>
    </div>
    </div>
  );
}
export default Home;