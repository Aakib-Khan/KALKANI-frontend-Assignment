import React, { useState, useEffect } from "react";
import AnimeCharacter from "./AnimeCharacter";

interface AnimeCharacter {
  mal_id: number;
  about: string;
  favorites: number;
  nicknames: string[];
  name: string;
  url: string;

  images: {
    webp: {
      image_url: string;
    };
    jpg: {
      image_url: string;
    };
  };
}

interface ApiResponse {
  data: AnimeCharacter[];
  warning: string;
}

const AnimeCharacterSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [characters, setCharacters] = useState<AnimeCharacter[]>([]);
  const [warning, setWarning] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    fetchCharacters();
  }, [page, searchQuery]); // Fetch characters when the page or search query changes

  const fetchCharacters = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/characters?page=${
          page - 1
        }&limit=15&q=${searchQuery}&order_by=favorites&sort=desc`
      );
      const data: ApiResponse = await response.json();
      if (response.status === 429) {
        setWarning("Rate limit exceeded. Please try again later.");
        setCharacters([]);
        setTotalResults(0);
      } else {
        setCharacters(data.data);
        setWarning(data.warning);
        setTotalResults(data.data.length);
      }
      // if (response.status === 429) {
      //   setWarning("Rate limit exceeded. Please try again later.");
      // }
      // console.log({ data });
      // setCharacters(data.data);
      // setWarning(data.warning);
      // setTotalResults(data.data.length);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
      setWarning("An error occurred while fetching characters.");
      setTotalResults(0);
    }

    setIsLoading(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset page when search query changes
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="">
      <h1 className="font-bold text-6xl">Search Anime Characters</h1>
      <div className="relative flex items-center sm:ml-[200px] mt-[50px] sm:mt-[50px] xs:ml-[300px] lg:ml-[480px] lg:mt-[50px] ">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="py-2 pl-10 pr-4 border-black w-[300px] border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search"
        />
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg">
          <svg
            className="w-5 h-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a4 4 0 11-8 0 4 4 0 018 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.5 17l4 4"
            />
          </svg>
        </span>
      </div>

      {warning && <p className="lg:ml-[100px] mt-7"  >{warning}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {searchQuery  && totalResults > 0  ? (
            <p className="lg:ml-[50px] mt-7 ">
              Total {totalResults} matching anime characters found
            </p>
          ) : (
            <p className="lg:ml-[50px] mt-7">
              Total {totalResults} matching anime characters found
              {/* {searchQuery && totalResults === 0 && "0"} */}
            </p>
          )}
          <div className="space-y-5 mt-[125px]">
            {characters.map((character) => (
              <AnimeCharacter key={character.mal_id} character={character} />
            ))}
          </div>
        </>
      )}

      {totalResults >= 15 && (
        <div className="space-x-4 mt-7">
          <button
            className="font-mono text-xl bg-purple-500 px-4 py-2 rounded-lg text-white"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="font-mono text-xl bg-purple-500 px-4 py-2 rounded-lg text-white"
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}
      

      <div className="">
  {/* Content */}

  
</div>



    </div>
  );
};

export default AnimeCharacterSearch;
