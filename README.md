# Project 8: L'Oréal Chatbot

L’Oréal is exploring the power of AI, and your job is to showcase what's possible. Your task is to build a chatbot that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations.

## 🚀 Launch via GitHub Codespaces

1. In the GitHub repo, click the **Code** button and select **Open with Codespaces → New codespace**.
2. Once your codespace is ready, open the `index.html` file via the live preview.

## ☁️ Cloudflare Note

When deploying through Cloudflare, make sure your API request body (in `script.js`) includes a `messages` array and handle the response by extracting `data.choices[0].message.content`.

## Secure Worker Setup Checklist

Follow these rules for a secure deployment:

1. Create a Cloudflare Worker for your project.
2. Copy the helper code from `RESOURCE_cloudflare-worker.js` into your Worker.
3. In Cloudflare, open your Worker and go to **Settings > Variables and Secrets**.
4. Add a secret named `OPENAI_API_KEY` and paste your OpenAI key there.
5. Deploy the Worker.
6. Copy the Worker URL shown after deployment (example: `https://your-worker.your-subdomain.workers.dev`).
7. Paste that URL into `secrets.js` as `CLOUDFLARE_WORKER_URL`.

If you need a refresher on secure deployment, watch **Protecting Your API Key with Cloudflare** in the 🍿 AI Privacy and Safety Skillbuilder.

Important:

- Do not put OpenAI API keys in `script.js`, `index.html`, or any browser code.
- Only the Worker should use `OPENAI_API_KEY` from Cloudflare secrets.

## Five Required Checks

Use this quick checklist to confirm your project follows all five requirements:

1. **Create a Cloudflare Worker for your project**
   - Done when your Worker exists in the Cloudflare dashboard.
2. **Securely store your API key in Cloudflare Variables and Secrets**
   - Done when `OPENAI_API_KEY` is saved as a secret in Worker settings.
3. **Deploy your Cloudflare Worker using the helper script**
   - Done when the Worker code is based on `RESOURCE_cloudflare-worker.js` and deployed.
4. **Watch the refresher video if needed**
   - Review _Protecting Your API Key with Cloudflare_ in the 🍿 AI Privacy and Safety Skillbuilder.
5. **Note the Worker URL after deployment**
   - Paste that URL into `secrets.js` as `CLOUDFLARE_WORKER_URL`.

Enjoy building your L’Oréal beauty assistant! 💄
