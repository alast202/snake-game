import { useState, useRef, useEffect } from 'react';
import './App.css';
import AppleLogo from './apple.png';
import Monitor from './oldMonitor.png';
import useInterval from './useInterval';

const canvasX = 1000;
const canvasY = 1000;
const initialSnake = [[4, 10], [4, 10]]; // Initial positions of the snake's body segments
const initialApple = [14, 10]; // Initial position of the apple
const scale = 50; // Scale factor for rendering on the canvas
const timeDelay = 100; // Delay between each game tick

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(initialSnake);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState([0, -1]); // Initial direction of the snake
  const [delay, setDelay] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useInterval(() => runGame(), delay);

  useEffect(() => {
    let fruit = document.getElementById("fruit") as HTMLCanvasElement;
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        ctx.fillStyle = "#a3d001";
        snake.forEach(([x, y]) => ctx.fillRect(x, y, 1, 1));
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1);
      }
    }
  }, [snake, apple, gameOver]);

  function handleSetScore() {
    if (score > Number(localStorage.getItem("snakeScore"))) {
      localStorage.setItem("snakeScore", JSON.stringify(score));
    }
  }

  function play() {
    setSnake(initialSnake);
    setApple(initialApple);
    setDirection([1, 0]);
    setDelay(timeDelay);
    setScore(0);
    setGameOver(false);
  }

  function checkCollision(head: number[]) {
    for (let i = 0; i < head.length; i++) {
      if (head[i] < 0 || head[i] * scale >= canvasX) return true; // Check if snake collided with the boundaries of the canvas
    }
    for (const s of snake) {
      if (head[0] === s[0] && head[1] === s[1]) return true; // Check if snake collided with its own body
    }
    return false;
  }

  function appleAte(newSnake: number[][]) {
    let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale));
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = coord;
      setScore(score + 1);
      setApple(newApple);
      return true; // Apple was eaten
    }
    return false;
  }

  function runGame() {
    const newSnake = [...snake];
    const newSnakeHead = [newSnake[0][0] + direction[0], newSnake[0][1] + direction[1]];
    newSnake.unshift(newSnakeHead);

    if (checkCollision(newSnakeHead)) {
      setDelay(null);
      setGameOver(true);
      handleSetScore();
    }

    if (!appleAte(newSnake)) {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function changeDirection(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowLeft":
        setDirection([-1, 0]);
        break;
      case "ArrowUp":
        setDirection([0, -1]);
        break;
      case "ArrowRight":
        setDirection([1, 0]);
        break;
      case "ArrowDown":
        setDirection([0, 1]);
        break;
    }
  }

  return (
    <div onKeyDown={(e) => changeDirection(e)}>
      <img id="fruit" src={AppleLogo} alt="apple-logo" width="30" />
      <img src={Monitor} alt="apple-logo" width="4000" className="monitor" />
      <canvas className="playArea" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
      {gameOver && <div className="gameOver">Game Over</div>}
      <button onClick={play} className="playButton">
        Play
      </button>

      <div className="scoreBox">
        <h2>Score: {score}</h2>
        <h2>High Score: {localStorage.getItem("snakeScore")}</h2>
      </div>
    </div>
  );
}

export default App;
