import useHttp from "../hooks/http.hooks";

export default function useMarvelService() {
  const { loading, request, error, clearError } = useHttp()
  const _apiBase = 'https://gateway.marvel.com:443/v1/public';
  const _apiKey = 'apikey=81c5036f31c4fae340b48a096669caea';
  const _baseCharsOffset = 210;
  const _baseComicsOffset = 300;

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

  const getAllComics = async (offset = _baseComicsOffset) => {
    const res = await request(`${_apiBase}/comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const getComics = async (id) => {
    const res = await request(`${_apiBase}/comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const _normalizeDescription = (item) => {
    const normalizedDescr = item.description
      ? item.description.slice(0, 200) + '...'
      : 'There is no description for this item';

    return normalizedDescr;
  };

  const _transformCharacter = (char) => {
    return {
      name: char.name,
      description: _normalizeDescription(char),
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      id: char.id,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      title: comics.title,
      price: comics.prices[0].price,
      description: _normalizeDescription(comics),
      pageCount: comics.pageCount,
      language: comics.textObjects.language || 'en-us',
    }
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComics,
    clearError,
  }
}
