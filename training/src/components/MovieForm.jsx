import React from "react";
import { useState } from "react";
import InputField from "./InputField";

function MovieForm({ addMovie }) {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [titleError, setTitleError] = useState("");
  const [yearError, setYearError] = useState("");

  const resestForm = () => {
    setMovieTitle("");
    setMovieYear("");
  };

  const validateForm = () => {
    resetErrors();
    let validated = true;
    if (!movieTitle) {
      setTitleError("영화제목을 넣어주세요");
      validated = false;
    }
    if (!movieYear) {
      setYearError("개봉년도를  넣어주세요");
      validated = false;
    }

    return validated;
  };

  const resetErrors = () => {
    setTitleError(" ");
    setYearError("  ");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      addMovie({
        id: Date.now(),
        title: movieTitle,
        year: movieYear,
      });
      resetErrors();

      resestForm();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <InputField
        type="text"
        value={movieTitle}
        placeholder="영화제목"
        onChange={(e) => setMovieTitle(e.target.value)}
        errorMessage={titleError}
      />
      {/* <input
        type="text"
        value={movieTitle}
        placeholder="영화제목"
        onChange={(e) => setMovieTitle(e.target.value)}
      ></input>
      <br />{" "}
      <div
        style={{
          color: "red",
        }}
      >
        {titleError}
      </div> */}

      <InputField
        type="number"
        value={movieYear}
        placeholder="개봉년도"
        onChange={(e) => setMovieYear(e.target.value)}
        errorMessage={yearError}
      />
      {/* <input
        type="number"
        value={movieYear}
        placeholder="개봉년도"
        onChange={(e) => setMovieYear(e.target.value)}
      ></input>
      <br />
      <div
        style={{
          color: "red",
        }}
      >
        {yearError}
      </div> */}
      <button type="submit">영화 추가</button>
    </form>
  );
}

export default MovieForm;
