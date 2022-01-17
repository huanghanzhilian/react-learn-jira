import React from "react";

import { User } from "./search-panel";

interface Preject {
  id: number;
  personId: number;
  name: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Preject[];
  users: User[];
}

const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
