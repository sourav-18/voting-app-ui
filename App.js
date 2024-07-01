
import { Provider, useSelector } from 'react-redux'
import { store } from './app/store'
import MainApp from './MainApp'


const App = () => {
  // useEffect(()=>{

  // },[])
 
  return (
  <Provider store={store}>
   <MainApp/>
  </Provider>
  )
}

export default App
