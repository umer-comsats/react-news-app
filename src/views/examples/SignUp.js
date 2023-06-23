import React from "react"
import { Link } from "react-router-dom"
import {
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardHeader,
  CardFooter,
  Container,
  CardBody,
  Button,
  Input,
  Card,
  Form,

  Col
} from "reactstrap"
import { useNavigate } from "react-router-dom";
import Spinner from 'components/Spinner'

function SignUp() {
  const [firstFocus, setFirstFocus] = React.useState(false)
  const [lastFocus, setLastFocus] = React.useState(false)
  const [emailFocus, setEmailFocus] = React.useState(false)
  const [passFocus, setPassFocus] = React.useState(false)
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [token, setToken] = React.useState('')
  const [preferredCategory, setPreferredCategory] = React.useState('')
  const [preferredAuthor, setPreferredAuthor] = React.useState('')
  const [preferredSource, setPreferredSource] = React.useState('')
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false)

  const navigate = useNavigate(); // Navigate hook to redirect the user

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

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
      name: firstName + ' ' + lastName,
      email,
      password,
    };
    console.log(data)
    fetch('http://localhost:8000/api/auth/register', {
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
          setMessage("Can't signup !")
        }
      })
      .catch(error => {
        console.error('Error:', error);
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
    }
  }, [loading, message, token, preferredSource, preferredAuthor, preferredCategory])

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
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
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name"
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
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
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
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
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (passFocus ? " input-group-focus" : "")
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
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
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
                      Create Account
                    </Button>
                    <div className="">
                      <h6>
                        <Link
                          className="link"
                          to="/login-page"
                          tag={Link}
                        >
                          Login
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
  )
}

export default SignUp