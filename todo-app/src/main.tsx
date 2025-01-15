import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './store.ts'
import { PersistGate } from 'redux-persist/integration/react'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // </StrictMode>,
  <Provider store={store}>
    <PersistGate persistor={persistor} >
    <App />
    </PersistGate>
  </Provider>
)



// https://bolt.new/~/sb1-s3qnchy5

// https://maasir554.github.io/todo-ts/
// https://todotify.vercel.app/
// https://todotify.vercel.app/