import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import 'normalize.css'
import 'react-quill/dist/quill.snow.css'
import '@/styles/index.scss'
import router from '@/router'
import store from '@/store'

async function enableMocking(): Promise<void> {
  const enabled = import.meta.env.VITE_ENABLE_MOCK !== 'false'
  if (!enabled) return
  const { worker } = await import('@/mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

void enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )
})
