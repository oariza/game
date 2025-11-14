"use client";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react"; // ✨ Importar useState y useEffect

export default function Question() {
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendEmailYes = () => {
    emailjs
      .sendForm(
        "service_novios",
        "template_d13e367",
        "#email-form-yes"
        //"WfRDVv67X_diREBoP"
      )
      .then(
        (result) => {
          console.log("¡Correo enviado con éxito!", result.text);
        },
        (error) => {
          console.log("Fallo al enviar el correo...", error);
        }
      );
  };

  const sendEmailNo = () => {
    emailjs
      .sendForm(
        "service_novios",
        "template_zw8hgjj",
        "#email-form-no",
        //"WfRDVv67X_diREBoP"
      )
      .then(
        (result) => {
          console.log("¡Correo enviado con éxito!", result.text);
        },
        (error) => {
          console.log("Fallo al enviar el correo...", error);
        }
      );
  };

  return (
    <div className={styles.page}>
      <main style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 className={styles.title}>¡NIVEL COMPLETADO!</h1>
        <div className={styles.greeting}>
          <div className={styles.greetingCard}>
            <p>
              Hemos pasado un tiempo coleccionando momentos, risas, aventuras y muchos, muchos pollos fritos. Eres mi mejor compañero de juego y quisiera {" "}
              <b>pasar al siguiente nivel contigo.</b>
            </p>
          </div>
        </div>
        {showButtons && (
          <div>
            <h2 className={styles.question}>¿Quieres ser mi novio?</h2>
            <div
              className={styles.containerButtons}
              style={{ marginTop: "20px" }}
            >
              <Link href="/answerYes">
                <div className={styles.button} onClick={sendEmailYes}>
                  <p>Claro que sí</p>
                </div>
              </Link>
              <Link href="/answerNo">
                <div className={styles.secondaryButton} onClick={sendEmailNo}>
                  <p>Creo que no</p>
                </div>
              </Link>
            </div>
          </div>
        )}
        <form id="email-form-yes"></form>
        <form id="email-form-no"></form>
      </main>
    </div>
  );
}
