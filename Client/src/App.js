import React, { Component } from 'react'
import Page from './Components/Page'
import PageNotFound from './Components/PageNotFound'
import   {BrowserRouter,Route,Switch} from 'react-router-dom'


class  App extends Component{
  constructor(props) {
    super(props)
    this.state={

    }
}

render() {
    return (
        <>
        <div className="App">
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Page}/>
              <Route path='*' component={PageNotFound}></Route>
            </Switch>
          </BrowserRouter>
        </div>
        </>
    )
}
}

export default App;
