import React, { useState } from "react";
import api from "../api";


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const renderPhrase = (number) => {
        const lastOne = Number(number.toString());
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "людини затусить";
        if (lastOne === 1) return "людина затусить";
        return "людей затусить";
    };

    return (
        <>
            <h2>
                <span
                    className={"badge " + (users.length > 0 ? "bg-success" : "bg-danger")}
                >
                    {users.length > 0
                        ? `${users.length + " " + renderPhrase(users.length)} з тобою сьгодні`
                        : "Ніхто не затусить"}
                </span>
            </h2>

            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Ім'я</th>
                            <th scope="col">Якості</th>
                            <th scope="col">Професія</th>
                            <th scope="col">Зустрілися, разів</th>
                            <th scope="col">Рейтинг</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((item) => (
                                    <span className={"badge m-1 bg-" + item.color} key={item._id}>
                                        {item.name}
                                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate} /5</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="btn btn-danger"
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};


export default Users;