import Home from "features/booking/pages/Home";
import Detail from "features/booking/pages/Detail";
import Booking from "features/booking/pages/Booking";
import Payment from "features/booking/pages/Payment";
import Signin from "features/authentication/pages/Signin/Index";
import Signup from "features/authentication/pages/Signup/Index";
import MovieManagement from "features/movies/pages/MovieManagement/Index";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "common/components/Header";
import PageNotFound from "common/components/404";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/booking" component={Booking} />
        <Route path="/payment" component={Payment} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/movies" component={MovieManagement} />
        <Route path="*" component={PageNotFound} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
