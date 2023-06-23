import React from 'react'
import Datetime from "react-datetime"

import {
    Container,
    FormGroup,
    Button,
    Row,
    Col,
} from "reactstrap"
import PropTypes from 'prop-types'

import NewsItem from 'components/NewsItem'
import Spinner from 'components/Spinner'

const resultsPerPage = 3;

const News = (props) => {
    const [token, setToken] = React.useState(localStorage.getItem('token'))
    const [articles, setArticles] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    // const [totalResults, setTotalResults] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1);
    const [preferredCategory, setPreferredCategory] = React.useState(localStorage.getItem('preferred_category'))
    const [preferredSource, setPreferredSource] = React.useState(localStorage.getItem('preferred_source'))

    const [selectedCategory, setSelectedCategory] = React.useState(preferredCategory != 'null' ? preferredCategory : 'general')
    const [selectedSource, setSelectedSource] = React.useState(preferredSource != 'null' ? preferredSource : '')
    const [selectedDate, setSelectedDate] = React.useState('')


    // Calculate the total number of pages
    const totalPages = Math.ceil(articles.length / resultsPerPage);

    // Calculate the starting and ending index of the articles for the current page
    const startIndex = (currentPage - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDateChange = (moment) => {
        setSelectedDate(new Date(moment));
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value)
    }

    const handleSourceChange = (e) => {
        setSelectedSource(e.target.value)
    }

    React.useEffect(() => {
        fetchData(selectedCategory, selectedDate, selectedSource)
    }, [currentPage, selectedCategory, selectedDate, selectedSource])

    const fetchData = async (selectedCategory, selectedDate, selectedSource) => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${selectedCategory}&apiKey=de4c02a0a6604947b51fd07e3877aae9&page=1`
        // setLoading(true)

        // try {
        //     let data = await fetch(url)
        //     let parsedData = await data.json()
        //     setArticles(parsedData.articles)
        //     setLoading(false)
        // } catch (error) {
        //     console.log(error)
        // }

        setLoading(true)
        const data = {
            category: selectedCategory,
            date: selectedDate,
            source: selectedSource
        };
        console.log(data)
        fetch('http://127.0.0.1:8000/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false)
                if (result.success == true) {
                    setArticles(result.articles)
                }
            })
            .catch(error => {
                setLoading(false)
                console.error('Error:', error);
            });
    }

    const contentStyle = {
        flex: '1', // Allow content to grow and take up remaining vertical space
    }

    const noArticlesMessageStyle = {
        textAlign: 'center',
        fontSize: '18px',
        color: '#555',
    };

    return (
        <div className="wrapper" style={contentStyle}>
            <div className='container'>
                <Row>
                    <Col className='' md='2'>
                        <div className='form-group'>
                            <label htmlFor="category" className="form-label">Category:</label>
                            <select id="category" className="form-control" onChange={handleCategoryChange} value={selectedCategory}>
                                <option value="">Select Category</option>
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
                    <Col className='' md="2">
                        <div className="datepicker-container">
                            <label htmlFor="date" className="form-label">Date:</label>
                            <FormGroup>
                                <Datetime
                                    timeFormat={false}
                                    inputProps={{ placeholder: "Datetime Picker Here" }}
                                    onChange={handleDateChange}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                    <Col className='' md='2'>
                        <div className='form-group'>
                            <label htmlFor="source" className="form-label">Source:</label>
                            <select id="source" className="form-control" onChange={handleSourceChange} value={selectedSource}>
                                <option value="">Select Source</option>
                                <option value="content.guardianapis.com">Guardians Api</option>
                                <option value="api.nytimes.com">NewYork Times Api</option>
                                <option value="newsapi.org">News Api</option>
                            </select>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="section section-team">
                <Container>
                    <div className="team">
                        {loading && <Spinner />}
                        <Row>
                            {!loading && articles.length > 0 ? (
                                <>
                                    {articles.slice(startIndex, endIndex).map((element) => (
                                        <Col md='4' key={element.url}>
                                            <div className="team-player">
                                                <NewsItem news={element} category={selectedCategory} />
                                            </div>
                                        </Col>
                                    ))}
                                </>
                            ) : (
                                <Col md='12' className='mt-5'>
                                    <p style={noArticlesMessageStyle}>No articles found.</p>
                                </Col>
                            )}
                        </Row>
                        <div className="container d-flex justify-content-end mt-5">
                            <ul className="pagination">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index + 1)}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}


News.defaultProps = {
    country: "in",
}

News.propTypes =
{
    country: PropTypes.string,
}

export default News
