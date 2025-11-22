import moment from "moment";
import { google, ics } from "calendar-link";
import Link from "next/link";
import styles from "./page.module.css";

export default function AnswerYes() {
  const now = moment().locale("es").format("D [de] MMMM");
  const today = moment().format("YYYY-MM-DD");

  const googleUrl = google({
    title: "Aniversario Nachito y Luigito",
    description: "Cumplimos un año más de novios",
    start: today,
    allDay: true,
    rRule: "FREQ=YEARLY;INTERVAL=1;BYMONTH=11;BYMONTHDAY=15",
    uid: "novios",
  });

  const appleUrl = ics({
    title: "Aniversario Nachito y Luigito",
    description: "Cumplimos un año más de novios",
    start: today,
    allDay: true,
    rRule: "FREQ=YEARLY;INTERVAL=1;BYMONTH=11;BYMONTHDAY=15",
    uid: "novios",
  });
  return (
    <div className={styles.page}>
      <main style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 className={styles.title}>¡VICTORIA DESBLOQUEADA!</h1>
        <div className={styles.greeting}>
          <div className={styles.greetingCard}>
            <p>
              A partir del 16 de noviembre de 2025, somos un equipo oficial. Y estás en
              mi corazón como <b>player 1.</b>
            </p>
            <div className={styles.imgContainer}>
              <img src="/family.png" style={{ width: "300px" }} />
            </div>
          </div>
        </div>
        <div className={styles.containerButtons} style={{ marginTop: "20px" }}>
          <Link href={googleUrl}>
            <div className={styles.button}>
              <p>Guardar fecha</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
