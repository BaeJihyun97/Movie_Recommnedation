import { Link } from 'react-router-dom';
import '../sass/Nav.scss';
import React from 'react';

function Nav(props) {

    return (
        <header>
            <nav>
                <div className="menu">
                    <Link to="/mainpage">
                        <img src="./img/l_movie.png" />
                    </Link> 
                    <ul className="ul-none d-flex">
                        <li><a href="#">홈</a></li>
                        <li><a href="#">시리즈</a></li>
                        <li><a href="#">영화</a></li>
                        <li><a href="#">NEW! 요즘 대세 콘텐츠</a></li>
                        <li><a href="#">내가 찜한 콘텐츠</a></li>
                        <li><a href="#">언어별로 찾아보기</a></li>
                    </ul>
                </div>
                <div className="right-menu">
                    <div className="search-box">
                        <i className="bi bi-search" onClick={props.sendTitle}></i>
                        <input name="movieTitle" type="text" placeholder="영화 제목을 입력하세요." value={props.movieTitle} onChange={props.onChange} />
                    </div>
                    <i className="bi bi-person-fill"></i>
                </div>
            </nav>
        </header>
    );
}
  
export default Nav;