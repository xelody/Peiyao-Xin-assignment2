import React from 'react';
import Nav from './Nav'
import '../styles/common.css';

const Credits = () => {
  return (
    <div>
        <Nav />
        <main>
            <h1>Credits</h1>
            <div className='content-box'>
                <p>Created by Peiyao Xin</p>
                <p>Please find the source code on GitHub: <a href="https://github.com/xelody/Peiyao-Xin-assignment2">GitHub Repo</a></p>
            </div>
        </main>
    </div>
  );
}

export default Credits;
