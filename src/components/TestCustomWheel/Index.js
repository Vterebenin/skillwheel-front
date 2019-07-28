import React, { Component } from 'react'
import './style.css';

export default class Index extends Component {

  handleMouseEnter(e) {
    console.log(e.target.dataset.group);
    console.log(document.getElementById(`chunk${e.target.dataset.group}`))
    const thisChunk = document.getElementById(`chunk${e.target.dataset.group}`);
    // const svgNode = document.getElementById('skill-wheel').childNodes;
    thisChunk.parentNode.appendChild(thisChunk);
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i=0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    
    
    return (
      <div>
        <svg
          id="skill-wheel"
          xmlns="http://www.w3.org/2000/svg"
          width="605"
          height="604"
          viewBox="0 0 605 604"
          fill="none"
        >
          <g id="chunk2" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="2" d="M372.86 371.31C392.167 348.192 399.201 333.295 401.144 301.307H551.758C546.547 384.758 526.407 423.303 478.926 477.376L372.86 371.31Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="2" d="M372.86 371.31C393.001 348.357 398.676 332.78 401.144 301.307H501.553C498.725 361.411 486.704 393.231 443.57 442.021L372.86 371.31Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="2" d="M408.215 406.666C438.201 374.374 448.52 351.511 451.349 301.307H401.144C399.023 331.005 393.979 346.816 372.86 371.31L408.215 406.666Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          <g id="chunk1" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="1" d="M401.5 301C398.805 271.001 393.245 255.492 372 231.5L478.5 125C533.824 187.694 546.839 229.189 551.5 301H401.5Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="1" d="M401.5 301C399.512 270.528 392.51 255.5 372 231.5L443 160.5C483.5 205 497.5 236 501.5 301H401.5Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="1" d="M451.5 301C449.869 256.963 441 233.5 407.5 196L372 231.5C391.5 254 399.113 268.746 401.5 301H451.5Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          <g id="chunk3" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="3" d="M303 400.5C332.999 397.805 348.508 392.245 372.5 371L479 477.5C416.306 532.824 374.811 545.839 303 550.5L303 400.5Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="3" d="M303 400.5C333.472 398.512 348.5 391.51 372.5 371L443.5 442C399 482.5 368 496.5 303 500.5L303 400.5Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="3" d="M303 450.5C347.037 448.869 370.5 440 408 406.5L372.5 371C350 390.5 335.254 398.113 303 400.5L303 450.5Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          <g id="chunk4" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="4" d="M232.224 372.073C255.342 391.38 270.24 398.415 302.227 400.357V550.971C218.776 545.76 180.232 525.621 126.158 478.139L232.224 372.073Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="4" d="M232.224 372.073C255.177 392.214 270.754 397.889 302.227 400.357V500.767C242.123 497.938 210.304 485.917 161.513 442.784L232.224 372.073Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="4" d="M196.869 407.428C229.16 437.414 252.023 447.734 302.227 450.562V400.357C272.529 398.236 256.719 393.192 232.224 372.073L196.869 407.428Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          <g id="chunk5" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="5" d="M202.759 302.104C205.453 332.104 211.013 347.612 232.259 371.604L125.759 478.104C70.4343 415.41 57.4201 373.915 52.7587 302.104L202.759 302.104Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="5" d="M202.759 302.104C204.747 332.576 211.749 347.604 232.259 371.604L161.259 442.604C120.759 398.104 106.759 367.104 102.759 302.104L202.759 302.104Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="5" d="M152.759 302.104C154.389 346.141 163.259 369.604 196.759 407.104L232.259 371.604C212.759 349.104 205.146 334.358 202.759 302.104L152.759 302.104Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          <g id="chunk6" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="6" d="M231.517 232.066C212.21 255.184 205.175 270.082 203.233 302.07L52.6188 302.07C57.8298 218.618 77.9691 180.074 125.451 126L231.517 232.066Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="6" d="M231.517 232.066C211.376 255.019 205.701 270.596 203.233 302.07L102.823 302.07C105.652 241.966 117.673 210.146 160.806 161.355L231.517 232.066Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="6" d="M196.161 196.711C166.176 229.002 155.856 251.865 153.028 302.07L203.233 302.07C205.354 272.371 210.398 256.561 231.517 232.066L196.161 196.711Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          <g id="chunk7" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="7" d="M301 203C271.001 205.695 255.492 211.255 231.5 232.5L125 126C187.694 70.6756 229.189 57.6614 301 53L301 203Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="7" d="M301 203C270.528 204.988 255.5 211.99 231.5 232.5L160.5 161.5C205 121 236 107 301 103L301 203Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="7" d="M301 153C256.963 154.631 233.5 163.5 196 197L231.5 232.5C254 213 268.746 205.387 301 203L301 153Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          <g id="chunk8" className="skill-wheel__kusok"  onMouseEnter={(e, index) => this.handleMouseEnter(e, index)}>
            <path data-group="8" d="M372.31 231.517C349.192 212.209 334.295 205.175 302.307 203.233V52.6188C385.758 57.8298 424.303 77.9691 478.376 125.451L372.31 231.517Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="8" d="M372.31 231.517C349.357 211.376 333.78 205.701 302.307 203.233V102.823C362.411 105.652 394.231 117.673 443.021 160.806L372.31 231.517Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
            <path data-group="8" d="M407.666 196.161C375.374 166.176 352.511 155.856 302.307 153.028V203.233C332.005 205.354 347.816 210.398 372.31 231.517L407.666 196.161Z" fill={this.getRandomColor()} stroke={this.getRandomColor()} />
          </g>
          {/* <use id="use" href="#chunk1" /> */}
        </svg>
      </div>
    )
  }
}
