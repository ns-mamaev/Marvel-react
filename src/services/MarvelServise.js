class MarvelService {
  constructor(apiKey) {
    this._apiBase = 'https://gateway.marvel.com:443/v1/public';
    this._apiKey = `apikey=${apiKey}`;
  }

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, err status ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`,
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    const normalizedDescription = char.description
      ? char.description.slice(0, 200) + '...'
      : 'There is no description for this character';
    return {
      name: char.name,
      description: normalizedDescription,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

const marvelService = new MarvelService('81c5036f31c4fae340b48a096669caea');

export default marvelService;
