import React from 'react'
// reactstrap components
import {
    Container,
    Button,
    Row,
    Col
} from "reactstrap";
import { useNavigate } from 'react-router-dom'


const SingleNews = (props) => {

    const [token, setToken] = React.useState(localStorage.getItem('token'))
  
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
    }, [token])
    
    const handleGoBack = () => {
        navigate(-1)
        // Handle the action when the back button is clicked
    };

    const contentStyle = {
        flex: '1', // Allow content to grow and take up remaining vertical space
    }

    return (
        <div className="section section-about-us " style={contentStyle}>
            <Container>
                <Row>
                    <Col md="12" style={{ padding: '0' }}>
                        
                        <div className="d-flex justify-content-start" style={{ padding: '0 20%' }}>
                        <Button color="info" size="sm" onClick={handleGoBack}>
                            Back
                        </Button>
                            {/* <img src={props.news.urlToImage ? props.news.urlToImage : "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"} style={{ width: '100%', height: 'auto' }} alt="News Image" /> */}
                        </div>
                    </Col>
                </Row>
                <Row className=''>
                    <Col md="12" style={{ padding: '0' }}>
                        <div className="d-flex justify-content-center" style={{ padding: '0 20%' }}>
                            <img src={props.news.urlToImage ? props.news.urlToImage : "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg"} style={{ width: '100%', height: 'auto' }} alt="News Image" />
                        </div>
                    </Col>
                    <Col md='12' className='mt-5' style={{ padding: '0 20%' }}>
                        <h3>
                            {props.news.title ? props.news.title : 'No Title'}
                        </h3>
                        <h6>Description</h6>
                        <p>
                            {props.news.description ? props.news.description : 'No Description'}
                        </p>
                        <h6>Content</h6>
                        <p>
                            {props.news.content ? props.news.content : 'No Content'}
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col md='6' className='mt-5' style={{ padding: '0 20%' }}>
                        <h6>Author</h6>
                        <p>
                            {props.news.publishedAt ? props.news.author : 'No Author'}
                        </p>
                    </Col>
                    <Col md='6' className='mt-5' style={{ padding: '0 20%' }}>
                        <h6>publishedAt</h6>
                        <p>
                            {props.news.publishedAt ? new Date(props.news.publishedAt).toUTCString() : 'No Author'}
                        </p>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default SingleNews
