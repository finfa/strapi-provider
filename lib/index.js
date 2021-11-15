const _ = require('lodash');
const SparkPost = require('sparkpost');

module.exports = {
  init: (providerOptions = {}, settings = {}) => {

    const client = new SparkPost(providerOptions.apiKey);

    return {
      send: async options => {
        options = _.isObject(options) ? options : {};
        options.from = options.from || settings.defaultFrom;
        options.fromName = options.fromName || settings.defaultFrom;
        options.replyTo = options.replyTo || settings.defaultReplyTo;
        options.text = options.text || settings.html;
        options.html = options.html || settings.text;

        client.transmissions.send({
          content: {
            from: {
              name: options.fromName,
              email: options.from
            },
            subject: options.subject,
            html: options.html,
            reply_to: options.replyTo,
            text: options.text
          },
          recipients: [
            {address: options.to}
          ]
        })
          .then(data => {
            resolve();
          })
          .catch(result => {
            const messages = result.errors.map(error => `${error.code}: ${error.message} - ${error.description}`)
            let err = new Error(messages.join("\n"));
            err.stack = `\nCaused By:\n` + result.stack;
            throw err;
          });
      },
    };
  },
};

