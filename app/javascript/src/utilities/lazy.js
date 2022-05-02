import React, { Suspense } from "react";

import Preview from "../components/shared/Skeleton";

function LazyComponent(Component) {
  return (props) => (
    <Suspense fallback={<Preview />}>
      <Component {...props} />
    </Suspense>
  );
}

export default LazyComponent;
