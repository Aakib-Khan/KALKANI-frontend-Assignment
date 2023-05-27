import React from "react";

export interface AnimeCharacter {
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

interface AnimeCharacterProps {
  character: AnimeCharacter;
}

const AnimeCharacter: React.FC<AnimeCharacterProps> = ({ character }) => {
  console.log({ character });
  return (
    <div className="  glassmorphism bg-white shadow-lg hover:shadow-2xl hover:shadow-rose-500 rounded-lg px-4 py-2 border-2 border-black flex items-center">
      <div
        // className="w-24 rounded-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105"
        className="mr-4 border-[3px] hover:rotate-6   border-rose-600 px-2  py-2  rounded-lg transition-transform duration-300 transform hover:-translate-y-1 hover:scale-105"
      >
        <img
          src={character?.images?.webp?.image_url}
          alt={character?.name}
          className="w-24 rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="mb-5">
          <div className="flex items-center justify-between relative  ">
            <div className="text-sm sm:text-lg md:text-lg text-black font-bold lg:text-xl ">
              {character?.name}
            </div>
            <div className="flex items-center sm:ml-[250px] absolute ml-[160px] lg:ml-[600px]">
              <span className=" text-red-500 mr-1 hover:scale-150 text-sm lg:text-2xl">
                &#x2764;
              </span>
              <span className="text-red-500 font-mono text-sm lg:text-2xl">
                {character.favorites}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap   gap-2">
          {character?.nicknames && character.nicknames.length > 0 ? (
            character.nicknames.slice(0, 3).map((nickname, index) => (
              <span
                key={index}
                className="bg-pink-500 lg:px-3 lg:py-1 py-1 px-[5px]  rounded-lg font-mono text-xs lg:text-lg text-white"
              >
                {nickname}
              </span>
            ))
          ) : (
            <span className="bg-pink-500 px-3 py-1 rounded-lg font-mono text-white">
              No nicknames
            </span>
          )}
        </div>
      </div>
      {/* <div className="relative" > */}
      <div className="ml-4 border-2 border-l border-black h-[159px]  lg:absolute lg:right-[220px] sm:absolute sm:right-[140px]  "></div>
      <a
        title="Click me"
        className="ml-4 hover:scale-150  text-[50px] text-blue-700 sm:absolute sm:right-[50px] lg:absolute lg:right-[100px] xs:absolute xs:right-[200px] "
        href={character?.url}
      >
        &#x2192;
      </a>

      
    </div>
    // </div>
    
  );
};

export default AnimeCharacter;
