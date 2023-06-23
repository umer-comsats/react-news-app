import React from "react"
import { useNavigate } from 'react-router-dom'


// core components
import DefaultNavbar from "components/Navbars/DefaultNavbar"
import Setting from "components/Setting"
import DefaultFooter from "components/Footers/DefaultFooter.js"

function Settings(props) {

  const [token, setToken] = React.useState(localStorage.getItem('token'))
  const [preferredCategory, setPreferredCategory] = React.useState(localStorage.getItem('preferred_category'))
  const [preferredAuthor, setPreferredAuthor] = React.useState(localStorage.getItem('preferred_author'))
  const [preferredSource, setPreferredSource] = React.useState(localStorage.getItem('preferred_source'))
  const navigate = useNavigate(); // Navigate hook to redirect the user


  React.useEffect(() => {
    if (!token) {
      navigate("/login-page");
    }
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [token, preferredSource, preferredAuthor, preferredCategory])

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh', // Set the container to fill the entire viewport height
    minWidth: '100vw', // Set the container to fill the entire viewport height
  }

  return (
    <div style={containerStyle}>
      <DefaultNavbar />
      <Setting />
      <DefaultFooter />
    </div>
  );
}

export default Settings;
