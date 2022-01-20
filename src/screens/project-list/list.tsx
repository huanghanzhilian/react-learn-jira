import { Table } from "antd";
import dayjs from "dayjs";
import React from "react";

import { User } from "./search-panel";

interface Preject {
  id: number;
  personId: number;
  name: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  list: Preject[];
  users: User[];
}

const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render: (value, project) => {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render: (value, project) => {
            return (
              <span>{value ? dayjs(value).format("YYYY-MM-DD") : "无"}</span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};

export default List;
