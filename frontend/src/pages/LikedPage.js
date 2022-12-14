import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../component/Nav';
import "../sass/index.scss";
import "../css/likedPage.css";
import { MovieCard } from '../component';
import { useDidMountEffect } from '../utils/hooks';

const { _, REACT_APP_BASE_BACKEND_URL } = process.env;

const LikedPage = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({ movieTitle: ''});

    const [likedata, setLikedata] = useState([]);
    const [loading, setLoading] = useState(false);


    const onChange = e => {
        const {name, value} = e.target;
        setData({
            ...data, [name]: value
        });
    };

    const sendTitle = async () => {
        navigate("/recommend", { state: data });
    }

    const fetchF = async (url, method, data) => {
        return fetch(url,
        {
            method: method,
            headers: {
                "Content-Type": "application/json; charset=utf8",
            },
            body: JSON.stringify(data),
        }).then(response=>response.json())
        .then(function(response) {
            return response;
        }).catch((error)=> {
            console.log(error);
            setLoading(false);
        });
    }

  const updateLiked = async (data) => {
    if (data.liked === 0){
        let url = REACT_APP_BASE_BACKEND_URL + "/service/insertLiked/";
        const response = await fetchF(url, "POST", data);
        update();
        }

    else {
        let url = REACT_APP_BASE_BACKEND_URL + "/service/deleteLiked/";
        const response = await fetchF(url, "POST", data);
        update();
    }


  }

    const update = async () => {
        let url = REACT_APP_BASE_BACKEND_URL + '/service/getLikedMoive/' ;
        const response = await fetchF(url, "POST", {'uid': sessionStorage.getItem("UID")});

        if(response && response.data)
        {
            setLikedata(response.data.movieList);
            setLoading(true);
        }
    };


    useDidMountEffect(() => {
        console.log(sessionStorage.getItem("UID"));
        if (sessionStorage.getItem("UID") === null || sessionStorage.getItem("UID") === undefined ||
        sessionStorage.getItem("UID") === "null" || sessionStorage.getItem("UID") === "undefined") {
            console.log("navigate")
            navigate('/login');
        }
        else {
            update();
        }
    }, []);

    useEffect(() => {
        update();
    }, [])


    return (
        <div id="movieContents">
            <div id="head">
                <Nav onChange={onChange} sendTitle={sendTitle} />
            </div>
            <div>
            <div id="movie">
                <div className="movieTable" id="movieTablei">
                    {likedata.map((resDataE) => <MovieCard propFunction={updateLiked} key={resDataE.movie_content_seq} liked={resDataE.liked} movieTitle={resDataE.movieTitle} movieNum={resDataE.movie_content_id}></MovieCard>)}
                </div>
            </div>
            </div>


        </div>
    )
}

export default LikedPage;