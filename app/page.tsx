"use client";

import Image from "next/image";
import React, { useState } from "react";
import SelectUser from "./components/SelectUser/SelectUser";
const BASE_CLASS = "home";
export default function Page() {
  const [isDB, setIsDB] = useState<boolean>(false);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  return (
    <div className={BASE_CLASS}>
      <Image
        src="https://i.ibb.co/rZvjsTm/logo.png"
        width={250}
        height={80}
        alt="livewell"
      />
      {isSelect ? (
        <>
          <SelectUser isDB={isDB} />
        </>
      ) : (
        <>
          <h2>Select DB Type</h2>
          <button
            type="button"
            className="btn-lg btn-blue"
            onClick={() => {
              setIsSelect(true);
              setIsDB(false);
            }}
          >
            Local
          </button>
          <button
            type="button"
            className="btn-lg btn-blue"
            onClick={() => {
              setIsDB(true);
            }}
          >
            Mongo DB
          </button>
        </>
      )}
    </div>
  );
}
