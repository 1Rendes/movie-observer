import { Navigate, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import { lazy, Suspense } from "react";
import Footer from "./components/Footer/Footer";
import Container from "./components/Container/Container";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const PersonDetailsPage = lazy(() => import("./pages/PersonDetailsPage"));
const MovieVideoList = lazy(() =>
  import("./components/MovieVideoList/MovieVideoList")
);

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Container>Loading page...</Container>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/:type/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="videos" element={<MovieVideoList />} />
          </Route>
          <Route path="/person/:id" element={<PersonDetailsPage />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
