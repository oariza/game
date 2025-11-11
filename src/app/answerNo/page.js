import Link from "next/link";
import styles from "./page.module.css";

export default function Question() {
  return (
    <div className={styles.page}>
      <main style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 className={styles.title}>GAME OVER</h1>
        <div className={styles.greeting}>
          <div className={styles.greetingCard}>
            <p>A veces el camino lleva a niveles distintos. Y está bien.</p>
            <p>Me quedo con lo bonito que compartimos.</p>
            <div>
              <img
                src="/no-family.png"
                style={{ width: "300px" }}
              />
            </div>
          </div>
        </div>
        <div className={styles.containerButtons} style={{ marginTop: "40px" }}>
          <Link href="/answerNo">
            <div className={styles.secondaryButton}>
              <p>Cerrar</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
