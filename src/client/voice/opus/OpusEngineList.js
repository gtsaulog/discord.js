const { Error } = require('../../../errors');

const list = [
  require('./NodeOpusEngine'),
  require('./OpusScriptEngine'),
];

let opusEngineFound;

function fetch(Encoder, engineOptions) {
  try {
    return new Encoder(engineOptions);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') return null;

    // The Opus engine exists, but another error occurred.
    throw err;
  }
}

exports.add = encoder => {
  list.push(encoder);
};

exports.fetch = engineOptions => {
  for (const encoder of list) {
    const fetched = fetch(encoder, engineOptions);
    if (fetched) return fetched;
  }
  return null;
};

exports.guaranteeOpusEngine = () => {
  if (typeof opusEngineFound === 'undefined') opusEngineFound = Boolean(exports.fetch());
  if (!opusEngineFound) throw new Error('OPUS_ENGINE_MISSING');
};
