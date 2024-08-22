import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import { lazy, Suspense } from "react";
// import MovieVideoList from "./components/MovieVideoList";
import Footer from "./components/Footer";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MovieReviews = lazy(() => import("./components/MovieReviews"));
const MovieCast = lazy(() => import("./components/MovieCast"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const PersonDetailsPage = lazy(() => import("./pages/PersonDetailsPage"));
const MovieVideoList = lazy(() => import("./components/MovieVideoList"));

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/:type/:id" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            <Route path="videos" element={<MovieVideoList />} />
          </Route>
          <Route path="/person/:id" element={<PersonDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
