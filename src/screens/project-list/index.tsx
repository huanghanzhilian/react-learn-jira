import React, { useState, useEffect } from "react";

import qs from "qs";

import { useMount, useDebounce, cleanObject } from "../../utils";

import { SearchPanel } from "./search-panel";
import List from "./list";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`)
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          setUsers(await response.json());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="test">
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};

export default ProjectListScreen;
