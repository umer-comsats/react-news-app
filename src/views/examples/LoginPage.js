import React from "react"

// reactstrap components
import {
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardFooter,
  CardHeader,
  Container,
  CardBody,
  Button,
  Input,
  Card,
  Form,
  Col
} from "reactstrap"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import Spinner from 'components/Spinner'


function LoginPage() {
  const [emailFocus, setEmailFocus] = React.useState(false)
  const [lastFocus, setLastFocus] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [token, setToken] = React.useState('')
  const [preferredCategory, setPreferredCategory] = React.useState('')
  const [preferredAuthor, setPreferredAuthor] = React.useState('')
  const [preferredSource, setPreferredSource] = React.useState('')
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate(); // Navigate hook to redirect the user

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const data = {
      email,
      password
    };

    fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {
          setLoading(false)
          localStorage.setItem('token', result.token)
          localStorage.setItem('preferred_category', result.user.preferred_category)
          localStorage.setItem('preferred_author', result.user.preferred_author)
          localStorage.setItem('preferred_source', result.user.preferred_source)
          navigate("/");
        } else {
          setLoading(false)
          setMessage('Wrong Credentials !')
        }
      })
      .catch(error => {
        setLoading(false)
        setMessage('Error occurred !')
      });
  }
  React.useEffect(() => {
    let timeoutId
    if (message) {
      timeoutId = setTimeout(() => {
        setLoading(false)
        setMessage('')
      }, 3000);
    }
    const token = localStorage.getItem('token')
    const preferredCategory = localStorage.getItem('preferred_category')
    const preferredAuthor = localStorage.getItem('preferred_author')
    const preferredSource = localStorage.getItem('preferred_source')
    // setUser(user)
    setToken(token)
    setPreferredCategory(preferredCategory)
    setPreferredAuthor(preferredAuthor)
    setPreferredSource(preferredSource)

    if (token) {
      navigate("/");
    }
    document.body.classList.add("login-page")
    window.scrollTo(0, 0)
    document.body.scrollTop = 0
    return function cleanup() {
      clearTimeout(timeoutId);
      document.body.classList.remove("login-page")
    };
  }, [loading, message, token, preferredSource, preferredAuthor, preferredCategory]);

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form className="form">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody style={{ padding: 0 }}>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons objects_key-25"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      href="#pablo"
                      onClick={handleSubmit}
                      size="lg"
                    >
                      Login
                    </Button>
                    <div className="">
                      <h6>
                        <Link
                          className="link"
                          to="/signup-page"
                          tag={Link}
                        >
                          Create Account
                        </Link>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
                <Container className="mt-5">
                  {loading ? <Spinner /> : <strong>{message}</strong>}
                </Container>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
