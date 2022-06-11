import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const { loading, error, request, clearError } = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/',
    _apiKey = 'apikey=b8edc1e2fb6943c2772b745402fa988d',
    _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request({
      url: `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`,
    });

    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async id => {
    const res = await request({
      url: `${_apiBase}characters/${id}?${_apiKey}`,
    });

    return _transformCharacter(res.data.results[0]);
  };

  const _transformCharacter = char => {
    if (!char)
      return console.error('_transformCharacter: char info is not defined');

    const { name, description, thumbnail, urls, id, comics } = char;

    return {
      id,
      name: name,
      description: `${
        description
          ? `${description.slice(0, 210)}...`
          : `There is no description for this character`
      }`,
      thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
      homepage: urls[0].url,
      wiki: urls[1].url,
      comics: comics.items,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter
  }
}

export default useMarvelService;
