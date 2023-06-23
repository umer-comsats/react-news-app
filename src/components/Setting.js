import React from "react"

// reactstrap components
import {
  Container,
  Button,
  Alert,
  Row,
  Col,
} from "reactstrap"
function Setting() {
  const [token, setToken] = React.useState(localStorage.getItem('token'))
  const [selectedCategory, setSelectedCategory] = React.useState(localStorage.getItem('preferred_category'))
  const [selectedSource, setSelectedSource] = React.useState(localStorage.getItem('preferred_source'))
  const [selectedAuthor, setSelectedAuthor] = React.useState(localStorage.getItem('preferred_author'))
  const [alert1, setAlert1] = React.useState(false);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setSelectedCategory(selectedCategory)
  }

  const handleSourceChange = (e) => {
    const selectedSource = e.target.value
    setSelectedSource(selectedSource)
  }

  const handleAuthorChange = (e) => {
    const selectedAuthor = e.target.value
    setSelectedAuthor(selectedAuthor)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const data = {
      preferred_category: selectedCategory != 'null' ? selectedCategory : 'general',
      preferred_source: selectedSource != 'null' ? selectedSource : '',
      preferred_author: selectedAuthor != 'null' ? selectedAuthor : ''
    };
    console.log(data)
    fetch('http://127.0.0.1:8000/api/personalize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {
          try {
            setAlert1(true)
            console.log(result)
            localStorage.setItem('preferred_category', selectedCategory)
            localStorage.setItem('preferred_author', selectedAuthor)
            localStorage.setItem('preferred_source', selectedSource)
            setSelectedAuthor(selectedAuthor)
            setSelectedCategory(selectedCategory)
            setSelectedSource(selectedSource)
          } catch (error) {
            console.log("Error updating user preferrence", error);
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  React.useEffect(() => {

    if (alert1) {
      const timeoutId = setTimeout(() => {
        setAlert1(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [alert1, token, selectedCategory, selectedSource, selectedAuthor])
  const contentStyle = {
    flex: '1', // Allow content to grow and take up remaining vertical space
  }
  return (
    <>
      <div className="section section-basic" id="basic-elements" style={contentStyle}>
        <Container>
          <Alert color="success" isOpen={alert1}>
            <Container>
              <div className="alert-icon">
                <i className="now-ui-icons ui-2_like"></i>
              </div>
              <strong>preference updated!</strong>
              <button
                type="button"
                className="close"
                onClick={() => setAlert1(false)}
              >
                <span aria-hidden="true">
                  <i className="now-ui-icons ui-1_simple-remove"></i>
                </span>
              </button>
            </Container>
          </Alert>
          <h3 className="title">Set your news preferences here</h3>
          {/* <div className="space-70"></div> */}
          <div id="inputs" className="">
            <Row className="">
              <Col lg="3">
                <div className='form-group'>
                  <label htmlFor="category" className="form-label">Category:</label>
                  <select id="category" className="form-control" onChange={handleCategoryChange} value={selectedCategory}>
                    <option value='null'>Select Category</option>
                    <option value="general">General</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="3">
                <div className='form-group'>
                  <label htmlFor="category" className="form-label">Source:</label>
                  <select id="source" className="form-control" onChange={handleSourceChange} value={selectedSource}>
                    <option value="">Select Source</option>
                    <option value="content.guardianapis.com">Guardians Api</option>
                    <option value="api.nytimes.com">NewYork Times Api</option>
                    <option value="newsapi.org">News Api</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="3">
                <div className='form-group'>
                  <label htmlFor="author" className="form-label">Author:</label>
                  <select id="author" className="form-control" onChange={handleAuthorChange} value={selectedAuthor}>
                    <option value="null">Select Author</option>
                    <option value="BILD">BILD</option>
                    <option value="finanzen.net">finanzen.net</option>
                    <option value="Gagadget De">Gagadget De</option>
                    <option value="Gagadget De">Gagadget De</option>
                    <option value="heise online">heise online</option>
                    <option value="Golem.de">Golem.de</option>
                    <option value="Caschys Blog">Caschys Blog</option>
                  </select>
                </div>
              </Col>
            </Row>
            <Row className="section">
              <Col>
                <Button color="info" onClick={handleSubmit}>
                  Save
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Setting
