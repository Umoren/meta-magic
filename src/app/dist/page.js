"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var google_1 = require("next/font/google");
var actions_1 = require("./actions");
var react_toastify_1 = require("react-toastify");
var fi_1 = require("react-icons/fi");
var MetaInfoCard_1 = require("./ui/components/MetaInfoCard");
var ShimmerEffect_1 = require("./ui/components/ShimmerEffect");
var latoBody = google_1.Lato({
    weight: ['700', '400', '300'],
    subsets: ['latin-ext'],
    display: 'swap'
});
var latoHead = google_1.Lato({
    style: 'italic',
    weight: ['700', '400', '300'],
    subsets: ['latin-ext'],
    display: 'swap'
});
function Home() {
    var _this = this;
    var _a = react_1.useState(null), result = _a[0], setResult = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    var onSubmit = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var formData, metaInfo, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    setLoading(true);
                    setResult(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    formData = new FormData(event.currentTarget);
                    return [4 /*yield*/, actions_1.generateMeta(formData)];
                case 2:
                    metaInfo = _a.sent();
                    setResult(metaInfo);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error generating meta information:", error_1);
                    react_toastify_1.toast.error("Failed to generate meta information. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var copyToClipboard = function (text, field) {
        navigator.clipboard.writeText(text).then(function () {
            react_toastify_1.toast.success(field + " copied to clipboard!");
        }, function (err) {
            react_toastify_1.toast.error('Failed to copy text');
        });
    };
    var copyAllToClipboard = function () {
        if (result) {
            var allText = ("\nMeta Title: " + result.metaTitle + "\nMeta Description: " + result.metaDescription + "\nSEO Keywords: " + result.seoKeywords.join(', ') + "\nURL Slug: " + result.urlSlug + "\n      ").trim();
            navigator.clipboard.writeText(allText).then(function () {
                react_toastify_1.toast.success("All meta information copied to clipboard!");
            }, function (err) {
                react_toastify_1.toast.error('Failed to copy all information');
            });
        }
    };
    return (React.createElement("main", { className: "flex min-h-screen flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 " + latoBody.className },
        React.createElement("div", { className: "w-full max-w-4xl" },
            React.createElement("div", { className: "sm:flex justify-between items-center mb-8" },
                React.createElement("h1", { className: "text-4xl sm:text-5xl font-bold " + latoBody.className },
                    "meet ",
                    React.createElement("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600  " + latoHead.className }, "metaeenfo.")),
                React.createElement("a", { href: "https://buymeacoffee.com/sammy365", target: "_blank", rel: "noopener noreferrer", className: "flex items-center px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full hover:bg-yellow-300 transition-colors duration-300" },
                    React.createElement(fi_1.FiCoffee, { className: "mr-2" }),
                    " Buy me a coffee")),
            React.createElement("p", { className: "text-center text-gray-600 mb-8" }, "AI-Powered Meta Information Generator. No More SEO Guesswork \uD83D\uDD2E"),
            React.createElement("form", { onSubmit: onSubmit, className: "flex flex-col sm:flex-row items-center mb-8" },
                React.createElement("input", { type: "text", id: "blogTitle", name: "blogTitle", required: true, placeholder: "Enter your blog post title here", className: "w-full sm:w-auto flex-grow py-3 px-4 mb-2 sm:mb-0 sm:mr-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" }),
                React.createElement("button", { type: "submit", className: "w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center shadow-md", disabled: loading }, loading ? (React.createElement(React.Fragment, null,
                    React.createElement("svg", { className: "animate-spin h-5 w-5 mr-2", viewBox: "0 0 24 24" },
                        React.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                        React.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })),
                    "Optimizing...")) : (React.createElement(React.Fragment, null,
                    React.createElement(fi_1.FiZap, { className: "mr-2" }),
                    "SEO Boost")))),
            loading && React.createElement(ShimmerEffect_1["default"], null),
            !loading && result && (React.createElement("div", { className: "bg-white rounded-lg p-6 mb-8 w-full shadow-lg" },
                React.createElement("div", { className: "flex justify-between items-center mb-4" },
                    React.createElement("h2", { className: "text-2xl font-semibold" }, "Generated Meta Information"),
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("span", { className: "mr-2" }, "SEO Score:"),
                        React.createElement("span", { className: "font-bold " + (result.seoScore >= 75 ? 'text-green-500' : result.seoScore >= 50 ? 'text-yellow-500' : 'text-red-500') },
                            result.seoScore,
                            "/100")),
                    React.createElement("button", { onClick: copyAllToClipboard, className: "px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300 flex items-center" },
                        React.createElement(fi_1.FiCopy, { className: "mr-2" }),
                        " Copy All")),
                React.createElement("div", { className: "space-y-6" },
                    React.createElement(MetaInfoCard_1["default"], { title: "Meta Title", content: result.metaTitle, characterCount: result.metaTitle.length, maxCharacters: 60, onCopy: function () { return copyToClipboard(result.metaTitle, 'Meta Title'); } }),
                    React.createElement(MetaInfoCard_1["default"], { title: "Meta Description", content: result.metaDescription, characterCount: result.metaDescription.length, maxCharacters: 160, onCopy: function () { return copyToClipboard(result.metaDescription, 'Meta Description'); } }),
                    React.createElement("div", null,
                        React.createElement("h3", { className: "font-medium text-gray-700 mb-2" }, "SEO Keywords:"),
                        React.createElement("div", { className: "flex flex-wrap gap-2 mb-2" }, result.seoKeywords.map(function (keyword, index) { return (React.createElement("span", { key: index, className: "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm" }, keyword)); })),
                        React.createElement("button", { onClick: function () { return copyToClipboard(result.seoKeywords.join(', '), 'SEO Keywords'); }, className: "text-blue-500 hover:text-blue-600 transition-colors duration-300 flex items-center" },
                            React.createElement(fi_1.FiCopy, { className: "mr-1" }),
                            " Copy Keywords")),
                    React.createElement(MetaInfoCard_1["default"], { title: "URL Slug", content: result.urlSlug, onCopy: function () { return copyToClipboard(result.urlSlug, 'URL Slug'); }, footer: React.createElement("p", { className: "text-sm text-gray-500 mt-1" },
                            "Preview: https://yourdomain.com/",
                            React.createElement("span", { className: "font-semibold" }, result.urlSlug)) }))))),
        React.createElement(react_toastify_1.ToastContainer, { position: "bottom-right" })));
}
exports["default"] = Home;
