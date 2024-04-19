"use client";

import { User } from "@/type/type";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./menu.scss";
import { LogOut } from "lucide-react";

const BASE_CLASS = "menu";

export default function Menu() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load currentUser from localStorage when the component mounts
  useEffect(() => {
    const storedUser = sessionStorage.getItem("currentUser");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing currentUser from localStorage:", error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
  };
  return (
    <div className={BASE_CLASS}>
      <div>
        <Image
          src="https://i.ibb.co/rZvjsTm/logo.png"
          width={250}
          height={80}
          alt="livewell"
        />
      </div>
      <div className={`${BASE_CLASS}-currentUser`}>
        {currentUser && (
          <>
            <Image
              src={currentUser.avatar_url}
              width={40}
              height={40}
              alt="user"
            />
            <h3>{currentUser.name}</h3>
            <a href="/">
              <button
                type="button"
                className="btn-trans logout"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
