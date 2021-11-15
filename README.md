#strapi provider email sparkpost



in `config/plugins.js`:
```
  email: {
    provider: 'sparkpost',
    providerOptions: {
      apiKey: env('SPARKPOST_API_KEY'),
    },
    settings: {
      defaultFrom: 'sender@example.com',
      defaultReplyTo: 'sender@example.com',
      testAddress: 'test@example.com',
    },
  },

```
