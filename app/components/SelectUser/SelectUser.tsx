import { users } from "@/app/data";
import { User } from "@/type/type";
import { useEffect } from "react";

type Props = {
  isDB: boolean;
};

const BASE_CLASS = "selectuser";

export default function SelectUser({ isDB }: Props) {
  useEffect(() => {
    if (isDB) {
      //fetcha Data();
    }
  }, [isDB]);

  const handleSaveUser = (user: User) => {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <div className={BASE_CLASS}>
      <h2>Select User</h2>
      {isDB ? (
        <></>
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
        </>
      )}
    </div>
  );
}
