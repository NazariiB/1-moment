"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/wagmi";
exports.ids = ["vendor-chunks/wagmi"];
exports.modules = {

/***/ "(ssr)/./node_modules/wagmi/dist/esm/context.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/context.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WagmiContext: () => (/* binding */ WagmiContext),\n/* harmony export */   WagmiProvider: () => (/* binding */ WagmiProvider)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _hydrate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hydrate.js */ \"(ssr)/./node_modules/wagmi/dist/esm/hydrate.js\");\n/* __next_internal_client_entry_do_not_use__ WagmiContext,WagmiProvider auto */ \n\nconst WagmiContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);\nfunction WagmiProvider(parameters) {\n    const { children, config } = parameters;\n    const props = {\n        value: config\n    };\n    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_hydrate_js__WEBPACK_IMPORTED_MODULE_1__.Hydrate, parameters, /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WagmiContext.Provider, props, children));\n} //# sourceMappingURL=context.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vY29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O2dGQUdvRDtBQUNkO0FBRS9CLE1BQU1HLDZCQUFlSCxvREFBQUEsQ0FFMUJJLFdBQVU7QUFRTixTQUFVQyxjQUNkQyxVQUF1RDtJQUV2RCxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxFQUFFLEdBQUdGO0lBRTdCLE1BQU1HLFFBQVE7UUFBRUMsT0FBT0Y7SUFBTTtJQUM3QixxQkFBT1Asb0RBQUFBLENBQ0xDLGdEQUFBQSxFQUNBSSwwQkFDQUwsb0RBQUFBLENBQWNFLGFBQWFRLFFBQVEsRUFBRUYsT0FBT0Y7QUFFaEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8xLW1vbWVudC1taW5pLWFwcC8uLi8uLi9zcmMvY29udGV4dC50cz9iZjZmIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJjcmVhdGVFbGVtZW50IiwiSHlkcmF0ZSIsIldhZ21pQ29udGV4dCIsInVuZGVmaW5lZCIsIldhZ21pUHJvdmlkZXIiLCJwYXJhbWV0ZXJzIiwiY2hpbGRyZW4iLCJjb25maWciLCJwcm9wcyIsInZhbHVlIiwiUHJvdmlkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/context.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/errors/base.js":
/*!****************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/errors/base.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseError: () => (/* binding */ BaseError)\n/* harmony export */ });\n/* harmony import */ var _wagmi_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wagmi/core */ \"(ssr)/./node_modules/@wagmi/core/dist/esm/errors/base.js\");\n/* harmony import */ var _utils_getVersion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getVersion.js */ \"(ssr)/./node_modules/wagmi/dist/esm/utils/getVersion.js\");\n\n\nclass BaseError extends _wagmi_core__WEBPACK_IMPORTED_MODULE_0__.BaseError {\n    constructor() {\n        super(...arguments);\n        Object.defineProperty(this, \"name\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: 'WagmiError'\n        });\n    }\n    get docsBaseUrl() {\n        return 'https://wagmi.sh/react';\n    }\n    get version() {\n        return (0,_utils_getVersion_js__WEBPACK_IMPORTED_MODULE_1__.getVersion)();\n    }\n}\n//# sourceMappingURL=base.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vZXJyb3JzL2Jhc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXFEO0FBQ0Q7QUFDN0Msd0JBQXdCLGtEQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdFQUFVO0FBQ3pCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLzEtbW9tZW50LW1pbmktYXBwLy4vbm9kZV9tb2R1bGVzL3dhZ21pL2Rpc3QvZXNtL2Vycm9ycy9iYXNlLmpzPzlkYzgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVycm9yIGFzIENvcmVFcnJvciB9IGZyb20gJ0B3YWdtaS9jb3JlJztcbmltcG9ydCB7IGdldFZlcnNpb24gfSBmcm9tICcuLi91dGlscy9nZXRWZXJzaW9uLmpzJztcbmV4cG9ydCBjbGFzcyBCYXNlRXJyb3IgZXh0ZW5kcyBDb3JlRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiAnV2FnbWlFcnJvcidcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBkb2NzQmFzZVVybCgpIHtcbiAgICAgICAgcmV0dXJuICdodHRwczovL3dhZ21pLnNoL3JlYWN0JztcbiAgICB9XG4gICAgZ2V0IHZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiBnZXRWZXJzaW9uKCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YmFzZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/errors/base.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/errors/context.js":
/*!*******************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/errors/context.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WagmiProviderNotFoundError: () => (/* binding */ WagmiProviderNotFoundError)\n/* harmony export */ });\n/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ \"(ssr)/./node_modules/wagmi/dist/esm/errors/base.js\");\n\nclass WagmiProviderNotFoundError extends _base_js__WEBPACK_IMPORTED_MODULE_0__.BaseError {\n    constructor() {\n        super('`useConfig` must be used within `WagmiProvider`.', {\n            docsPath: '/api/WagmiProvider',\n        });\n        Object.defineProperty(this, \"name\", {\n            enumerable: true,\n            configurable: true,\n            writable: true,\n            value: 'WagmiProviderNotFoundError'\n        });\n    }\n}\n//# sourceMappingURL=context.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vZXJyb3JzL2NvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBc0M7QUFDL0IseUNBQXlDLCtDQUFTO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLzEtbW9tZW50LW1pbmktYXBwLy4vbm9kZV9tb2R1bGVzL3dhZ21pL2Rpc3QvZXNtL2Vycm9ycy9jb250ZXh0LmpzPzM3ZjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSAnLi9iYXNlLmpzJztcbmV4cG9ydCBjbGFzcyBXYWdtaVByb3ZpZGVyTm90Rm91bmRFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCdgdXNlQ29uZmlnYCBtdXN0IGJlIHVzZWQgd2l0aGluIGBXYWdtaVByb3ZpZGVyYC4nLCB7XG4gICAgICAgICAgICBkb2NzUGF0aDogJy9hcGkvV2FnbWlQcm92aWRlcicsXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiAnV2FnbWlQcm92aWRlck5vdEZvdW5kRXJyb3InXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRleHQuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/errors/context.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/hooks/useConfig.js":
/*!********************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/hooks/useConfig.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useConfig: () => (/* binding */ useConfig)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context.js */ \"(ssr)/./node_modules/wagmi/dist/esm/context.js\");\n/* harmony import */ var _errors_context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors/context.js */ \"(ssr)/./node_modules/wagmi/dist/esm/errors/context.js\");\n/* __next_internal_client_entry_do_not_use__ useConfig auto */ \n\n\n/** https://wagmi.sh/react/api/hooks/useConfig */ function useConfig(parameters = {}) {\n    const config = parameters.config ?? (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_js__WEBPACK_IMPORTED_MODULE_1__.WagmiContext);\n    if (!config) throw new _errors_context_js__WEBPACK_IMPORTED_MODULE_2__.WagmiProviderNotFoundError();\n    return config;\n} //# sourceMappingURL=useConfig.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vaG9va3MvdXNlQ29uZmlnLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7K0RBR2tDO0FBRVU7QUFDcUI7QUFRakUsa0RBQ00sU0FBVUcsVUFDZEMsYUFBMEMsRUFBRTtJQUU1QyxNQUFNQyxTQUFTRCxXQUFXQyxNQUFNLElBQUlMLGlEQUFBQSxDQUFXQyxxREFBQUE7SUFDL0MsSUFBSSxDQUFDSSxRQUFRLE1BQU0sSUFBSUgsMEVBQUFBO0lBQ3ZCLE9BQU9HO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8xLW1vbWVudC1taW5pLWFwcC8uLi8uLi8uLi9zcmMvaG9va3MvdXNlQ29uZmlnLnRzP2VhNmUiXSwibmFtZXMiOlsidXNlQ29udGV4dCIsIldhZ21pQ29udGV4dCIsIldhZ21pUHJvdmlkZXJOb3RGb3VuZEVycm9yIiwidXNlQ29uZmlnIiwicGFyYW1ldGVycyIsImNvbmZpZyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/hooks/useConfig.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/hydrate.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/hydrate.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hydrate: () => (/* binding */ Hydrate)\n/* harmony export */ });\n/* harmony import */ var _wagmi_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wagmi/core */ \"(ssr)/./node_modules/@wagmi/core/dist/esm/hydrate.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* __next_internal_client_entry_do_not_use__ Hydrate auto */ \n\nfunction Hydrate(parameters) {\n    const { children, config, initialState, reconnectOnMount = true } = parameters;\n    const { onMount } = (0,_wagmi_core__WEBPACK_IMPORTED_MODULE_1__.hydrate)(config, {\n        initialState,\n        reconnectOnMount\n    });\n    // Hydrate for non-SSR\n    if (!config._internal.ssr) onMount();\n    // Hydrate for SSR\n    const active = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);\n    // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!active.current) return;\n        if (!config._internal.ssr) return;\n        onMount();\n        return ()=>{\n            active.current = false;\n        };\n    }, []);\n    return children;\n} //# sourceMappingURL=hydrate.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vaHlkcmF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7NkRBRXdFO0FBQ1o7QUFRdEQsU0FBVUcsUUFBUUMsVUFBaUQ7SUFDdkUsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLE1BQU0sRUFBRUMsWUFBWSxFQUFFQyxtQkFBbUIsSUFBSSxFQUFFLEdBQUdKO0lBRXBFLE1BQU0sRUFBRUssT0FBTyxFQUFFLEdBQUdULG9EQUFBQSxDQUFRTSxRQUFRO1FBQ2xDQztRQUNBQzs7SUFHRixzQkFBc0I7SUFDdEIsSUFBSSxDQUFDRixPQUFPSSxTQUFTLENBQUNDLEdBQUcsRUFBRUY7SUFFM0Isa0JBQWtCO0lBQ2xCLE1BQU1HLFNBQVNWLDZDQUFBQSxDQUFPO0lBQ3RCLG1GQUFtRjtJQUNuRkQsZ0RBQUFBLENBQVU7UUFDUixJQUFJLENBQUNXLE9BQU9DLE9BQU8sRUFBRTtRQUNyQixJQUFJLENBQUNQLE9BQU9JLFNBQVMsQ0FBQ0MsR0FBRyxFQUFFO1FBQzNCRjtRQUNBLE9BQU87WUFDTEcsT0FBT0MsT0FBTyxHQUFHO1FBQ25CO0lBQ0YsR0FBRyxFQUFFO0lBRUwsT0FBT1I7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovLzEtbW9tZW50LW1pbmktYXBwLy4uLy4uL3NyYy9oeWRyYXRlLnRzPzI1M2IiXSwibmFtZXMiOlsiaHlkcmF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkh5ZHJhdGUiLCJwYXJhbWV0ZXJzIiwiY2hpbGRyZW4iLCJjb25maWciLCJpbml0aWFsU3RhdGUiLCJyZWNvbm5lY3RPbk1vdW50Iiwib25Nb3VudCIsIl9pbnRlcm5hbCIsInNzciIsImFjdGl2ZSIsImN1cnJlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/hydrate.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/utils/getVersion.js":
/*!*********************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/utils/getVersion.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getVersion: () => (/* binding */ getVersion)\n/* harmony export */ });\n/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../version.js */ \"(ssr)/./node_modules/wagmi/dist/esm/version.js\");\n\nconst getVersion = () => `wagmi@${_version_js__WEBPACK_IMPORTED_MODULE_0__.version}`;\n//# sourceMappingURL=getVersion.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vdXRpbHMvZ2V0VmVyc2lvbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUF3QztBQUNqQyxrQ0FBa0MsZ0RBQU8sQ0FBQztBQUNqRCIsInNvdXJjZXMiOlsid2VicGFjazovLzEtbW9tZW50LW1pbmktYXBwLy4vbm9kZV9tb2R1bGVzL3dhZ21pL2Rpc3QvZXNtL3V0aWxzL2dldFZlcnNpb24uanM/NzIxYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vdmVyc2lvbi5qcyc7XG5leHBvcnQgY29uc3QgZ2V0VmVyc2lvbiA9ICgpID0+IGB3YWdtaUAke3ZlcnNpb259YDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWdldFZlcnNpb24uanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/utils/getVersion.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/version.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/version.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   version: () => (/* binding */ version)\n/* harmony export */ });\nconst version = '2.14.16';\n//# sourceMappingURL=version.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vdmVyc2lvbi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUCIsInNvdXJjZXMiOlsid2VicGFjazovLzEtbW9tZW50LW1pbmktYXBwLy4vbm9kZV9tb2R1bGVzL3dhZ21pL2Rpc3QvZXNtL3ZlcnNpb24uanM/NWY1MyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgdmVyc2lvbiA9ICcyLjE0LjE2Jztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXZlcnNpb24uanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/version.js\n");

/***/ })

};
;