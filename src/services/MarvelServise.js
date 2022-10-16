import useHttp from "../hooks/http.hooks";

export default function useMarvelService() {
  const { loading, request, error, clearError } = useHttp()
  const _apiBase = 'https://gateway.marvel.com:443/v1/public';
  const _apiKey = 'apikey=81c5036f31c4fae340b48a096669caea';
  const _baseCharsOffset = 210;

  const getAllCharacters = async (offset = _baseCharsOffset) => {
    const res = await request(
      `${_apiBase}/characters?limit=9&offset=${offset}&${_apiKey}`,
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    const normalizedDescription = char.description
      ? char.description.slice(0, 200) + '...'
      : 'There is no description for this character';
    return {
      name: char.name,
      description: normalizedDescription,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getCharacter, clearError }
}
