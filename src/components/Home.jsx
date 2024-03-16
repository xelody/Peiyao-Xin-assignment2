// Home.js

import React from 'react';
import Nav from './Nav'
import '../styles/Home.css';
import '../styles/common.css';

const Home = () => {
    return (
        <div>
            <Nav />
            <main>
                <section className="intro-wrapper">
                    <h1>Welcome to Conway's Game of Life!</h1>
                    <div className='content-box'>
                        <p>The Game of Life, commonly referred to as Life, is a cellular automaton introduced by British mathematician John Horton Conway
                             in 1970. Classified as a zero-player game, it operates without the need for external input once its initial state is established. 
                             Players interact with Life by setting up an initial configuration and then observing how it evolves over subsequent generations. 
                             Notably, Life exhibits Turing completeness, allowing it to simulate a universal constructor and various other Turing machines.</p>
                        <p>In the realm of the Game of Life, there exists an infinite, two-dimensional orthogonal grid comprising square cells. 
                            Each cell can exist in one of two states: live or dead. The game follows four simple rules:</p>
                        <ol>
                            <li>A living cell with fewer than two live neighbors dies.</li>
                            <li>A living cell with two or three live neighbors lives on to the next generation.</li>
                            <li>A living cell with more than three live neighbors dies.</li>
                            <li>A dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
                        </ol>
                    </div>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Conway's Game of Life</p>
            </footer>
        </div>
    );
};

export default Home;
