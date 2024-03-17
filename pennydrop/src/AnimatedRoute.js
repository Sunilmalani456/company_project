import React from "react";
import { Routes, Route, useLocation, Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Homee from "./components/Homee";
import Cards from "./compound/Cards";
import Upi from "./components/Upi";
import Neft from "./components/Neft";
import Imps from "./components/Imps";
import PageNotFound from "./components/PageNotFound";
import Transitions from "./components/Transitions";
import Upload from "./compound/Upload";

const AnimatedRoute = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes key={location.pathname} location={location}>
        <Route path="/" exact element={<Homee />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/upi" element={<Upi />} />
        <Route path="/neft" element={<Neft />} />
        <Route path="/imps" element={<Imps />} />
        <Route path="/transitions" element={<Transitions />} />
        <Route path="fileupload" element={<Upload />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoute;
