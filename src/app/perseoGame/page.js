"use client";

import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const PerseoGame = () => {
  const canvasRef = useRef(null);
  const playerRef = useRef({ x: 180, y: 440, width: 50, height: 60 });
  const foodRef = useRef([]);
  const scoreRef = useRef(0);

  // Velocidades ajustadas por segundo
  const playerSpeedPerSecond = 800;
  const foodSpeedPerSecond = 400;

  const keysPressedRef = useRef({});
  const router = useRouter();

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  const [isLevelCompleteModalOpen, setIsLevelCompleteModalOpen] =
    useState(false);

  const playerImageRef = useRef(null);
  const foodImageRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const ctxRef = useRef(null);

  const handleButtonPress = (key, isDown) => {
    keysPressedRef.current[key] = isDown;
  };

  const handleNextLevel = () => {
    setIsLevelCompleteModalOpen(false);
    router.push("/question");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    let animationFrameId;
    let isGameRunning = true;
    let lastTime = null;

    const handleImageLoad = () => {
      setImagesLoaded((prev) => prev + 1);
    };

    // ------------------------------------
    // 1. DEFINICIÓN DE FUNCIONES DE DIBUJO Y JUEGO
    // ------------------------------------

    const drawBackground = () => {
      const ctx = ctxRef.current;
      if (backgroundImageRef.current && backgroundImageRef.current.complete) {
        ctx.drawImage(
          backgroundImageRef.current,
          0,
          0,
          canvas.width,
          canvas.height
        );
      } else {
        // Fallback si la imagen no carga
        ctx.fillStyle = "#f0f0f0";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    const drawPlayer = () => {
      const ctx = ctxRef.current;
      if (playerImageRef.current && playerImageRef.current.complete) {
        ctx.drawImage(
          playerImageRef.current,
          playerRef.current.x,
          playerRef.current.y,
          playerRef.current.width,
          playerRef.current.height
        );
      } else {
        // Fallback
        ctx.fillStyle = "gray";
        ctx.fillRect(
          playerRef.current.x,
          playerRef.current.y,
          playerRef.current.width,
          playerRef.current.height
        );
      }
    };

    const drawFood = () => {
      const ctx = ctxRef.current;
      const foodWidth = 40;
      const foodHeight = 50;

      if (foodImageRef.current && foodImageRef.current.complete) {
        foodRef.current.forEach((food) => {
          ctx.drawImage(
            foodImageRef.current,
            food.x - foodWidth / 2,
            food.y,
            foodWidth,
            foodHeight
          );
        });
      } else {
        // Fallback
        ctx.fillStyle = "brown";
        foodRef.current.forEach((food) => {
          ctx.beginPath();
          ctx.arc(food.x, food.y, 10, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    };

    const drawScore = () => {
      const ctx = ctxRef.current;
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.fillText("Puntos: " + scoreRef.current, 8, 20);
    };

    // --- Loop Principal con Delta Time ---
    const update = (currentTime) => {
      // Si la modal está abierta, detenemos la actualización visual del juego.
      if (!isGameRunning || isLevelCompleteModalOpen) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      // Cálculo de Delta Time
      if (lastTime === null) {
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const playerDistance = playerSpeedPerSecond * (deltaTime / 1000);
      const foodDistance = foodSpeedPerSecond * (deltaTime / 1000);

      // DIBUJAR EL FONDO
      drawBackground();

      // --- Mover Jugador ---
      // ... (Lógica de movimiento del jugador)
      if (keysPressedRef.current["ArrowLeft"] || keysPressedRef.current["a"]) {
        playerRef.current.x -= playerDistance;
      }
      if (keysPressedRef.current["ArrowRight"] || keysPressedRef.current["d"]) {
        playerRef.current.x += playerDistance;
      }

      // Límites del Canvas
      if (playerRef.current.x < 0) {
        playerRef.current.x = 0;
      }
      if (playerRef.current.x + playerRef.current.width > canvas.width) {
        playerRef.current.x = canvas.width - playerRef.current.width;
      }

      const foodWidth = 25; // Usado para colisión y dibujo

      // Mover comida y colisiones
      foodRef.current.forEach((food, i) => {
        food.y += foodDistance;

        // Lógica de Colisión (ajustada para el ancho/alto del jugador)
        if (
          food.y + foodWidth / 2 > playerRef.current.y &&
          food.y < playerRef.current.y + playerRef.current.height &&
          food.x > playerRef.current.x &&
          food.x < playerRef.current.x + playerRef.current.width
        ) {
          scoreRef.current += 1;
          foodRef.current.splice(i, 1);

          if (scoreRef.current >= 40) {
            isGameRunning = false;
            // Detener el bucle de requestAnimationFrame completamente
            cancelAnimationFrame(animationFrameId);

            // Usamos un setTimeout para asegurar que el estado se actualice
            // después de que el splice se complete, aunque no es estrictamente necesario.
            setTimeout(() => {
              setIsLevelCompleteModalOpen(true);
            }, 0);

            return; // Salir de la función update
          }
        } else if (food.y > canvas.height) {
          foodRef.current.splice(i, 1);
        }
      });

      // Generación de comida
      if (Math.random() < 0.03) {
        foodRef.current.push({
          x: Math.random() * (canvas.width - 20) + 10,
          y: 0,
        });
      }

      drawPlayer();
      drawFood();
      drawScore();

      animationFrameId = requestAnimationFrame(update);
    };

    // ------------------------------------
    // 2. Lógica de Carga y Arranque
    // ------------------------------------
    // ... (Lógica de carga de imágenes e inicialización permanece igual)
    if (imagesLoaded === 0) {
      playerImageRef.current = new Image();
      foodImageRef.current = new Image();
      backgroundImageRef.current = new Image();

      playerImageRef.current.onload = handleImageLoad;
      playerImageRef.current.onerror = handleImageLoad;
      playerImageRef.current.src = "/perseo-pixel.png";

      foodImageRef.current.onload = handleImageLoad;
      foodImageRef.current.onerror = handleImageLoad;
      foodImageRef.current.src = "/food-pixel.png";

      backgroundImageRef.current.onload = handleImageLoad;
      backgroundImageRef.current.onerror = handleImageLoad;
      backgroundImageRef.current.src = "/background.png";
    }

    if (imagesLoaded === 3 && canvas && !isInitialized) {
      ctxRef.current = canvas.getContext("2d");

      requestAnimationFrame(update);
      setIsInitialized(true);
    }

    // --- Manejo de Eventos y Limpieza ---
    const handleKey = (e, isDown) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
      }
      keysPressedRef.current[e.key] = isDown;
    };

    const handleKeyDown = (e) => handleKey(e, true);
    const handleKeyUp = (e) => handleKey(e, false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    if (isInitialized) {
      requestAnimationFrame(update);
    }

    return () => {
      isGameRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [router, imagesLoaded, isInitialized, isLevelCompleteModalOpen]); // Dependencia de la modal

  // --- JSX de Retorno ---
  return (
    <div className={styles.container}>
      {/* Mensaje de Carga para el usuario */}
      {imagesLoaded < 3 && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "1.2em",
          }}
        >
          Preparando el nivel... ({imagesLoaded}/3)
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={styles.page}
        width={300}
        height={500}
        style={{
          border: "1px solid black",
          display: isInitialized ? "block" : "none",
          margin: "0 auto",
          // Desenfocar o aplicar un filtro si la modal está abierta para dar efecto de pausa
          filter: isLevelCompleteModalOpen ? "blur(3px)" : "none",
        }}
      />

      {/* Controles Virtuales para Móvil */}
      <div
        className={styles.controls}
        style={{ display: isInitialized ? "flex" : "none" }}
      >
        <button
          className={styles.controlButton}
          onTouchStart={() => handleButtonPress("ArrowLeft", true)}
          onMouseDown={() => handleButtonPress("ArrowLeft", true)}
          onTouchEnd={() => handleButtonPress("ArrowLeft", false)}
          onMouseUp={() => handleButtonPress("ArrowLeft", false)}
          onTouchCancel={() => handleButtonPress("ArrowLeft", false)}
        >
          &larr; Izquierda
        </button>

        <button
          className={styles.controlButton}
          onTouchStart={() => handleButtonPress("ArrowRight", true)}
          onMouseDown={() => handleButtonPress("ArrowRight", true)}
          onTouchEnd={() => handleButtonPress("ArrowRight", false)}
          onMouseUp={() => handleButtonPress("ArrowRight", false)}
          onTouchCancel={() => handleButtonPress("ArrowRight", false)}
        >
          &rarr; Derecha
        </button>
      </div>

      {/* ========================================================= */}
      {/* ✨ MODAL DE NIVEL COMPLETADO */}
      {/* ========================================================= */}
      {isLevelCompleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>¡NIVEL COMPLETADO!</h3>
            <br />
            <p>
              ¡Felicidades, Nachito! <br /> <br />
              La misión de alimentar a Perseo ha terminado con éxito.
              <br /> <br />
              Has desbloqueado la siguiente aventura...
            </p>
            <div className={styles.modalButtons}>
              <button
                className={styles.modalConfirmButton}
                onClick={handleNextLevel}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerseoGame;
