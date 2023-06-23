import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom'

// import {
//     Button
// } from "reactstrap"
// import NewsSingle from './NewsSingle';
const NewsItem = (props) => {
  const navigate = useNavigate(); // Navigate hook to redirect the user


    const openSingleNews = () => {
        console.log('clicked')
        navigate("/news-single")
        // Handle the action when the back button is clicked
    };

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
        // width: 'clamp(20rem, calc(20rem + 2vw), 22rem)',
        overflow: 'hidden',
        boxShadow: '0 .1rem 1rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1em',
        // background: 'linear-gradient(to right, #FFFFFF, #ECE9E6)',
    };

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '100%',
        marginBlock: '2rem',
        gap: '2rem',
    };

    const imgStyle = {
        maxWidth: '100%',
        display: 'block',
        objectFit: 'cover',
    };

    const bodyStyle = {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
    };

    const tagStyle = {
        alignSelf: 'flex-start',
        padding: '.25em .75em',
        borderRadius: '1em',
        fontSize: '.75rem',
    };

    const blueTagStyle = {
        ...tagStyle,
        background: 'linear-gradient(to bottom, #2F80ED, #56CCF2)',
        color: '#fafafa',
    };

    // const brownTagStyle = {
    //     ...tagStyle,
    //     background: 'linear-gradient(to bottom, #FFD194, #D1913C)',
    //     color: '#fafafa',
    // };

    // const redTagStyle = {
    //     ...tagStyle,
    //     background: 'linear-gradient(to bottom, #ef473a, #cb2d3e)',
    //     color: '#fafafa',
    // };

    const footerStyle = {
        display: 'flex',
        padding: '1rem',
        marginTop: 'auto',
    };

    const userStyle = {
        display: 'flex',
        gap: '.5rem',
    };

    const userImageStyle = {
        width: '50px',
        height: 'auto',
        borderRadius: '100%',
    };

    const userInfoStyle = {
        color: '#666',
    };

    const newsData = {
        category: props.category,
        news: props.news
    };
    return (
        <Link
            style={{ color: 'black', textDecoration: 'none' }}
            to="/news-single" state={newsData}
        >
            <div style={cardStyle}>
                <img src={!props.news.urlToImage ? "https://hesolutions.com.pk/wp-content/uploads/2019/01/picture-not-available.jpg" : props.news.urlToImage} alt="News Image" style={imgStyle} />
                <div style={bodyStyle}>
                    <span style={blueTagStyle}>{props.category}</span>
                    <h4 style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>{props.news.title}</h4>
                    <div style={tagStyle}>{props.news.description ? props.news.description : 'No description'}</div>
                </div>
                <div style={footerStyle}>
                    <div style={userStyle} className="user">
                        <img src={'https://svgsilh.com/svg_v2/659651.svg'} alt="User" style={userImageStyle} />
                        <div style={userInfoStyle} className="user__info">
                            <small>{props.news.author ? props.news.author : 'No author'}</small><br />
                            <small>{props.news.publishedAt ? new Date(props.news.publishedAt).toUTCString() : ''}</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NewsItem
