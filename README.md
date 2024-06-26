This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Run:
```
pip install -r requirements.txt
npm install
```
Doing this will make sure that you have all the necessary packages and dependencies installed for the project.

Next, run the ChromaDB server:
```Chroma run```

Lastly, run the Uvicorn server for FastAPI:

```python app.py```

## Files
The app.py file contains the db connection and the FastAPI connection and queries the vector index for quicker responses
The middleware.js file redirects users who are not authenticated by GitHub login to the "Sign In" screen.
The components folder has the files of react components used on the front-end, the nav bar and chat UI are components in this folder
The auth.js file initializes the nextAuth providers to use and page.
The data folder has a .pdf version of our class textbook and is used to train the model

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# Next-template
