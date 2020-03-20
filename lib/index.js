"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var INITIAL_CEP = {
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    unidade: "",
    ibge: "",
    gia: ""
};
var getViaCep = function (cep) { return "https://viacep.com.br/ws/" + cep + "/json"; };
var useViaCep = function (search) {
    var cleanCep = react_1.useMemo(function () { return search && search.replace(/\D+/g, ""); }, [
        search
    ]);
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(INITIAL_CEP), cep = _b[0], setCep = _b[1];
    var _c = react_1.useState(null), error = _c[0], setError = _c[1];
    var searchCep = react_1.useCallback(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var response, responseJson, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(getViaCep(cleanCep))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseJson = _a.sent();
                    setCep(responseJson);
                    setLoading(false);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    setError(error_1);
                    setLoading(false);
                    setCep(INITIAL_CEP);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
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
exports.default = useViaCep;
