import React from "react";

export const DynamicIndex = React.lazy(() => import("./pages/index"));
export const DynamicProductsIndex = React.lazy(() => import("./pages/products/index"));
export const DynamicProductsId = React.lazy(() => import("./pages/products/[id]"));
export const DynamicCartId = React.lazy(() => import("./pages/cart/index"));
