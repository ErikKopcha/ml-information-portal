class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=b8edc1e2fb6943c2772b745402fa988d';

  getResource = async url => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`,
    );

    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async id => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`,
    );

    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = char => {
    if (!char)
      return console.error('_transformCharacter: char info is not defined');

    const { name, description, thumbnail, urls } = char;

    return {
      name: name,
      description: `${
        description
          ? `${description.slice(0, 210)}...`
          : `There is no description for this character`
      }`,
      thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
      homepage: urls[0].url,
      wiki: urls[1].url,
    };
  };
}

export default MarvelService;
