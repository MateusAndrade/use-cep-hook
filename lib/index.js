"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var cep_promise_1 = tslib_1.__importDefault(require("cep-promise"));
var INITIAL_CEP = {
    cep: "",
    state: "",
    city: "",
    street: "",
    neighborhood: ""
};
var useCep = function (search) {
    var cleanCep = react_1.useMemo(function () { return String(search).replace(/\D+/g, ""); }, [
        search
    ]);
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(INITIAL_CEP), cep = _b[0], setCep = _b[1];
    var _c = react_1.useState({ hasError: false, message: "" }), error = _c[0], setError = _c[1];
    var searchCep = react_1.useCallback(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var response, error_1, message;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError({ hasError: false, message: "" });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cep_promise_1.default(cleanCep)];
                case 2:
                    response = _a.sent();
                    setCep(response);
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    message = error_1 instanceof Object ? String(error_1) : error_1;
                    setCep(INITIAL_CEP);
                    setError({ hasError: true, message: message });
                    setLoading(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [cleanCep]);
    react_1.useEffect(function () {
        if (cleanCep.length === 8) {
            searchCep();
        }
    }, [cleanCep, searchCep]);
    return [loading, cep, error];
};
exports.default = useCep;
