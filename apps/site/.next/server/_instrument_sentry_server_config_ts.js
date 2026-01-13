"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_instrument_sentry_server_config_ts";
exports.ids = ["_instrument_sentry_server_config_ts"];
exports.modules = {

/***/ "(instrument)/./sentry.server.config.ts":
/*!*********************************!*\
  !*** ./sentry.server.config.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/nextjs */ \"(instrument)/../../node_modules/.pnpm/@sentry+nextjs@10.32.1_@ope_0e841fdffa6a7be19c93ed14d6cdbd6b/node_modules/@sentry/nextjs/build/cjs/index.server.js\");\n/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);\n// This file configures the initialization of Sentry on the server.\n// The config you add here will be used whenever the server handles a request.\n// https://docs.sentry.io/platforms/javascript/guides/nextjs/\n\n_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.init({\n    dsn: process.env.SENTRY_DSN,\n    // Performance Monitoring - 10% em produção, 100% em desenvolvimento\n    tracesSampleRate:  false ? 0 : 1.0,\n    // Ambiente\n    environment: \"development\" || 0,\n    // Apenas capturar erros em produção quando DSN estiver configurado\n    enabled:  false && 0\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc2VudHJ5LnNlcnZlci5jb25maWcudHMiLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUVBQW1FO0FBQ25FLDhFQUE4RTtBQUM5RSw2REFBNkQ7QUFFcEI7QUFFekNBLGdEQUFXLENBQUM7SUFDVkUsS0FBS0MsUUFBUUMsR0FBRyxDQUFDQyxVQUFVO0lBRTNCLG9FQUFvRTtJQUNwRUMsa0JBQWtCSCxNQUF5QixHQUFlLENBQUcsR0FBRztJQUVoRSxXQUFXO0lBQ1hJLGFBQWFKLGlCQUF3QjtJQUVyQyxtRUFBbUU7SUFDbkVLLFNBQVNMLE1BQXlCLElBQWdCLENBQXdCO0FBQzVFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2l0ZS8uL3NlbnRyeS5zZXJ2ZXIuY29uZmlnLnRzP2RjZGIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBmaWxlIGNvbmZpZ3VyZXMgdGhlIGluaXRpYWxpemF0aW9uIG9mIFNlbnRyeSBvbiB0aGUgc2VydmVyLlxuLy8gVGhlIGNvbmZpZyB5b3UgYWRkIGhlcmUgd2lsbCBiZSB1c2VkIHdoZW5ldmVyIHRoZSBzZXJ2ZXIgaGFuZGxlcyBhIHJlcXVlc3QuXG4vLyBodHRwczovL2RvY3Muc2VudHJ5LmlvL3BsYXRmb3Jtcy9qYXZhc2NyaXB0L2d1aWRlcy9uZXh0anMvXG5cbmltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9uZXh0anNcIjtcblxuU2VudHJ5LmluaXQoe1xuICBkc246IHByb2Nlc3MuZW52LlNFTlRSWV9EU04sXG5cbiAgLy8gUGVyZm9ybWFuY2UgTW9uaXRvcmluZyAtIDEwJSBlbSBwcm9kdcOnw6NvLCAxMDAlIGVtIGRlc2Vudm9sdmltZW50b1xuICB0cmFjZXNTYW1wbGVSYXRlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gMC4xIDogMS4wLFxuXG4gIC8vIEFtYmllbnRlXG4gIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAnZGV2ZWxvcG1lbnQnLFxuXG4gIC8vIEFwZW5hcyBjYXB0dXJhciBlcnJvcyBlbSBwcm9kdcOnw6NvIHF1YW5kbyBEU04gZXN0aXZlciBjb25maWd1cmFkb1xuICBlbmFibGVkOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nICYmICEhcHJvY2Vzcy5lbnYuU0VOVFJZX0RTTixcbn0pO1xuIl0sIm5hbWVzIjpbIlNlbnRyeSIsImluaXQiLCJkc24iLCJwcm9jZXNzIiwiZW52IiwiU0VOVFJZX0RTTiIsInRyYWNlc1NhbXBsZVJhdGUiLCJlbnZpcm9ubWVudCIsImVuYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(instrument)/./sentry.server.config.ts\n");

/***/ })

};
;