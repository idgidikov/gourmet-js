import React from 'react'

function NavigationAbc({searchLetter}) {

  return (
    <div className="navigation-abs">
        <ul className="menu menu-horizontal lg:menu-horizontal bg-base-100 rounded-box">
            <li><a onClick={() => searchLetter('a')}>A</a></li>
            <li onClick={() => searchLetter('b')}><a>B</a></li>
            <li onClick={() => searchLetter('c')}><a>C</a></li>
            <li onClick={() => searchLetter('d')}><a>D</a></li>
            <li onClick={() => searchLetter('e')}><a>E</a></li>
            <li onClick={() => searchLetter('f')}><a>F</a></li>
            <li onClick={() => searchLetter('g')}><a>G</a></li>
            <li onClick={() => searchLetter('h')}><a>H</a></li>
            <li onClick={() => searchLetter('j')}><a>J</a></li>
            <li onClick={() => searchLetter('k')}><a>K</a></li>
            <li onClick={() => searchLetter('l')}><a>L</a></li>
            <li onClick={() => searchLetter('m')}><a>M</a></li>
            <li onClick={() => searchLetter('n')}><a>N</a></li>
            <li onClick={() => searchLetter('o')}><a>O</a></li>
            <li onClick={() => searchLetter('p')}><a>P</a></li>
            <li onClick={() => searchLetter('q')}><a>Q</a></li>
            <li onClick={() => searchLetter('r')}><a>R</a></li>
            <li onClick={() => searchLetter('s')}><a>S</a></li>
            <li onClick={() => searchLetter('t')}><a>T</a></li>
            <li onClick={() => searchLetter('u')}><a>U</a></li>
            <li onClick={() => searchLetter('v')}><a>V</a></li>
            <li onClick={() => searchLetter('w')}><a>W</a></li>
            <li onClick={() => searchLetter('x')}><a>X</a></li>
            <li onClick={() => searchLetter('y')}><a>Y</a></li>
            <li onClick={() => searchLetter('z')}><a>Z</a></li>
        </ul>
    </div>
  )
}

export default NavigationAbc