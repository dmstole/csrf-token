"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("Diogo");
  const [age, setAge] = useState(12);

  const getCsfrToken = async () => {
    const requestOptions: any = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    };

    const response = await fetch(
      "http://localhost:5085/api/v1",
      requestOptions
    );

    console.log(response.headers.get('set-cookie'));

    const result = await response.json();
    return result.token;
  };

  const handleSubmit = async () => {
    const payload = {
      name,
      age,
    };

    const csfrToken = await getCsfrToken();

    const requestOptions: any = {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": csfrToken,
      },
      body: JSON.stringify({
        ...payload,
      }),
    };

    fetch("http://localhost:5085/api/v1/create", requestOptions).then(
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <label htmlFor="name">
          <span>Nome</span>
          <br />
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Informe o nome"
            onChange={(ev) => setName(ev.target.value)}
          />
        </label>

        <label htmlFor="age">
          <span>Idade</span>
          <br />
          <input
            type="number"
            name="age"
            value={age}
            placeholder="Informe a idade"
            onChange={(ev) => setAge(parseInt(ev.target.value))}
          />
        </label>

        <br />

        <button type="button" onClick={() => handleSubmit()}>
          Salvar
        </button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
