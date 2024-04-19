import { getUser } from "@/app/action/user";
import { users } from "@/app/data";
import { User } from "@/type/type";
import { useEffect, useState } from "react";

type Props = {
  isDB: boolean;
};

const BASE_CLASS = "selectuser";

export default function SelectUser({ isDB }: Props) {
  const [dbUsers, setDBUsers] = useState<User[]>();
  useEffect(() => {
    if (isDB) {
      fetchUser();
    }
  }, [isDB]);
  const fetchUser = async () => {
    try {
      const users = await getUser();
      setDBUsers(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSaveUser = (user: User) => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };
  const handleFlushLocal = () => {
    localStorage.clear();
  };

  return (
    <div className={BASE_CLASS}>
      <h2>Select User</h2>
      {isDB ? (
        <>
          {dbUsers &&
            dbUsers.map((user, index) => (
              <a href="/dbchat" key={`${index}-${user.id}`}>
                <button
                  type="button"
                  className="btn-lg btn-blue"
                  onClick={() => {
                    handleSaveUser(user);
                  }}
                >
                  {user.name}
                </button>
              </a>
            ))}
        </>
      ) : (
        <>
          {users.map((user, index) => (
            <a href="/chat" key={`${index}-${user.id}`}>
              <button
                type="button"
                className="btn-lg btn-blue"
                onClick={() => {
                  handleSaveUser(user);
                }}
              >
                {user.name}
              </button>
            </a>
          ))}
          <button
            type="button"
            className="btn-lg btn-black"
            onClick={handleFlushLocal}
          >
            Flush Local Storage
          </button>
        </>
      )}
    </div>
  );
}
