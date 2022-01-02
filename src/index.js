import { Suspense } from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import './scss/style.scss';

const Main = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  )
}

ReactDOM.render(
  <Main />,
  document.querySelector('#root')
)