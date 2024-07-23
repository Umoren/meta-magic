"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
require("react-toastify/dist/ReactToastify.css");
exports.metadata = {
    title: "Meta Content Generator",
    description: "Generate metadata for your articles"
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", null,
            React.createElement("div", { className: "flex-grow  flex-1" }, children))));
}
exports["default"] = RootLayout;
