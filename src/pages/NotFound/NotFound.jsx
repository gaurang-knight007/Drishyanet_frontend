import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import logo from "../../assets/logo1.png";

function NotFound() {
  const navigate = useNavigate();
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [obsKey, setObsKey] = useState(0);

  const prevObsRightRef = useRef(null);
  const pollingRef = useRef(null);


  const doJump = useCallback(() => {
    if (isJumping || gameOver) return;
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 600);
  }, [isJumping, gameOver]);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.code === "Space" && !isJumping && !gameOver) {
      e.preventDefault();
      doJump();
    }
  };
  window.addEventListener("keydown", handleKeyDown);

  return () => window.removeEventListener("keydown", handleKeyDown);
}, [isJumping, gameOver, doJump]);

  useEffect(() => {
    if (gameOver) {
      // stop polling if game over
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    prevObsRightRef.current = null;
    pollingRef.current = setInterval(() => {
      const char = document.querySelector(".character");
      const obs = document.querySelector(".obstacle");
      if (!char || !obs) return;

      const charRect = char.getBoundingClientRect();
      const obsRect = obs.getBoundingClientRect();

      const collided =
        charRect.right > obsRect.left &&
        charRect.left < obsRect.right &&
        charRect.bottom > obsRect.top &&
        charRect.top < obsRect.bottom;

      if (collided) {
        setGameOver(true);
        return;
      }

      const prevRight = prevObsRightRef.current;
      if (prevRight !== null) {
        if (prevRight > charRect.left && obsRect.right <= charRect.left) {
          setScore((s) => s + 2);
        }
      }
      prevObsRightRef.current = obsRect.right;
    }, 40);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [gameOver, obsKey]);

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setIsJumping(false);
    prevObsRightRef.current = null;
    setObsKey((k) => k + 2);
  };

  const handleGoBack = () => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
    else navigate("/");
  };

  return (
    <div className="notfound-container">
      <div className="notfound-header">
        <img src={logo} alt="Logo" className="notfound-logo" />
        <button className="go-back-btn" onClick={handleGoBack}>
          Go Back
        </button>
      </div>

      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-text">Oops! This page does not exist.</p>

      <div className="instructions">
        <small>Press <b>Space</b> or <b>tap / click</b> the game area to jump.</small>
      </div>

      {!gameOver && <div className="score">Score: {score}</div>}

      <div
        className="game-area"
        onPointerDown={() => doJump()}
        role="button"
        tabIndex={0}
        aria-label="Game area - tap to jump"
      >
        <div className={`character ${isJumping ? "jump" : ""}`} />
        <div key={obsKey} className={`obstacle ${gameOver ? "stopped" : ""}`} />
      </div>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your Score: <strong>{score}</strong></p>
          <div className="game-over-actions">
            <button onClick={restartGame} className="restart-btn">Restart</button>
            <button onClick={handleGoBack} className="home-btn">Go Back</button>
          </div>
          <p className="try-again-note">Press Space or tap to play again after restart.</p>
        </div>
      )}
    </div>
  );
}

export default NotFound;
