import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider} from "react-query";
import './App.css';
// layout 
// import { ReactQueryDevtools } from 'react-query/devtools';
import 'antd/dist/antd.css'
// components 
import LayoutPattern from './components/layout/LayoutPattern'
import LoginPage from './components/utility_pages/LoginPage'
import FileUpload from './components/utility_pages/FileUpload'
import EmailStage from './components/emailStage/EmailStage'
const Dashboard = lazy(()=> import('./components/dashboard/Dashboard'))
const EmailedList = lazy(()=> import('./components/emailedList/EmailedList'))
const WithEmails = lazy(()=> import('./components/emailStage/WithEmails'))
const WithoutEmails = lazy(()=> import('./components/emailStage/WithoutEmails'))
const Connections = lazy(()=> import('./components/connections/Connections'))

const App = ()=> {

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       suspense: true,
  //     },
  //   },
  // })

  return (
    <div className="App">
      <Router>  
      <Suspense fallback={(<div className="lds-hourglass">Waiting</div>)}> 
        <Switch>
            {/* <QueryClientProvider client={queryClient}> */}
              <Route exact path='/' component={LoginPage} />
              <LayoutPattern>
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/emailed_list' component={EmailedList} />
                <Route exact path= '/email_stage' component={EmailStage} />
                <Route path='/withEmails' component={WithEmails} />
                <Route path='/withoutEmails' component={WithoutEmails} />
                <Route exact path='/connections' component={Connections} />
                <Route exact path='/file_upload' component={FileUpload} />
              </LayoutPattern>
              {/* <Route exact path='/ingredients' component={IngredientsList} />
              <Route exact path='/ingredients-detail/:ingredient' component={IngredientDetail} /> */}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            {/* </QueryClientProvider> */}
        </Switch>
      </Suspense>
    </Router>
    </div>
  );
}

export default App;
