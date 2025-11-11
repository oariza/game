"use client";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.title}>PERSEO TIENE HAMBRE</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.greeting}>
          <div className={styles.greetingCard}>
            <h2>&#129505; Hola, Nachito! &#129505;</h2>
            <p>
              Ayuda a Perseo a atrapar su comida favorita. Si lo haces bien, podrás{" "}
              <b>pasar al siguiente nivel.</b>
            </p>
          </div>
        </div>
        <div className={styles.instructions}>
          <h3>&#127775; Instrucciones para la misión &#127775;</h3>
          <p>
            1. Toca los botones en tu pantalla para mover a Perseo.
          </p>
          <p>
            2. Atrapa 50 pollos fritos, para avanzar al siguiente nivel.
          </p>
        </div>
        <Link href="/perseoGame">
          <div className={styles.button}>
            <p>COMENZAR EL JUEGO</p>
          </div>
        </Link>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.instagram.com/corake"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hecho con mucho cariño, por Luigito &#128153;
        </a>
      </footer>
    </div>
  );
}
