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
        <h1 className={styles.title}>LA AVENTURA CONTINUA</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.greeting}>
          <div className={styles.greetingCard}>
            <h2>&#129505; Hola, Nachito! &#129505;</h2>
            <p>
              Tengo una mision muy especial para ti. Perseito salio a pasear, y
              ahora tiene mucha hambre. Es muy importante que lo alimentes, para{" "}
              <b>pasar al siguiente nivel.</b>
            </p>
          </div>
        </div>
        <div className={styles.instructions}>
          <h3>&#127775; Instrucciones para la mision &#127775;</h3>
          <p>
            1. Toca la parte derecha o izquierda para mover a Perseito de un
            lado a otro.
          </p>
          <p>
            2. Atrapa 20 croquetas, para que puedas pasar al siguiente nivel.
          </p>
        </div>
        <Link href="/perseoGame">
          <div className={styles.button}>
            <p>EMPIEZA LA AVENTURA!</p>
          </div>
        </Link>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.instagram.com/corake"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hecho con mucho carino, por Luigito &#128153;
        </a>
      </footer>
    </div>
  );
}
