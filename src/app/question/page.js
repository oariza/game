"use client";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react"; // ✨ Importar useState y useEffect

export default function Question() {
  // ✨ NUEVO ESTADO: Controla la visibilidad de los botones
  const [showButtons, setShowButtons] = useState(false);

  // ✨ NUEVO EFECTO: Usa setTimeout para mostrar los botones después de 3 segundos
  useEffect(() => {
    // Definir el tiempo de espera (3000 milisegundos = 3 segundos)
    const timer = setTimeout(() => {
      setShowButtons(true); // Cambia el estado a 'true' para mostrar los botones
    }, 3000);

    // Función de limpieza: Limpia el temporizador si el componente se desmonta antes
    return () => clearTimeout(timer);
  }, []); // El array de dependencia vacío ([]) asegura que esto solo se ejecute al montar.

  const sendEmailYes = () => {
    emailjs
      .sendForm(
        "service_novios",
        "template_d13e367",
        // El tercer argumento (#email-form-yes) funciona porque definiste los <form>
        "#email-form-yes"
        // Si no usaste emailjs.init(), tu Public Key iría aquí como cuarto argumento (string)
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
      .sendForm("service_novios", "template_zw8hgjj", "#email-form-no")
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
        <h1 className={styles.title}>NIVEL COMPLETADO!</h1>
        <div className={styles.greeting}>
          <div className={styles.greetingCard}>
            <p>
              Perseo ya comió su alimento... Y a Luigito le gustaría{" "}
              <b>pasar al siguiente nivel contigo.</b>
            </p>
            <p>
              Me encantas, me haces feliz y quiero que sigamos construyendo esto
              juntos...
            </p>
          </div>
        </div>

        {/* ✨ CAMBIO PRINCIPAL: Renderizado condicional basado en showButtons */}
        {showButtons && (
          <div>
            <h2 className={styles.question}>¿Quieres ser mi novio?</h2>
            <div
              className={styles.containerButtons}
              style={{ marginTop: "40px" }}
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

        {/* Los formularios invisibles deben estar fuera del renderizado condicional */}
        <form id="email-form-yes"></form>
        <form id="email-form-no"></form>
      </main>
    </div>
  );
}
