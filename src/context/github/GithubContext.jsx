import { createContext, useReducer, useState } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get Search users from API
  // const searchUsers = async (text) => {
  //   setLoading();
  //   const params = new URLSearchParams({
  //     q: text,
  //   });
  //   const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const { items } = await response.json();
  //   dispatch({
  //     type: "GET_USERS",
  //     payload: items,
  //   });
  // };
  const searchUsers = async (text) => {
    setLoading();
    try {
      const params = new URLSearchParams({ q: text });

      const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        headers: {
          Authorization: GITHUB_TOKEN ? `token ${GITHUB_TOKEN}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const { items } = await response.json();
      dispatch({ type: "GET_USERS", payload: items });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const userRepos = async (login) => {
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    setLoading();
    const resp = await fetch(
      `https://api.github.com/users/${login}/repos?${params}`
    );
    const data = await resp.json();
    dispatch({
      type: "GET_USER_REPOS",
      payload: data,
    });
  };

  // Get a single Search users from API
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`https://api.github.com/users/${login}`);
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  // Clear search list
  const clearUsers = () =>
    dispatch({
      type: "CLEAR_USERS",
    });

  // Set loading
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        Loading: state.Loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        userRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
