webpackHotUpdate("main",{

/***/ "./src/components/Statusbar/index.tsx":
/*!********************************************!*\
  !*** ./src/components/Statusbar/index.tsx ***!
  \********************************************/
/*! exports provided: StatusbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StatusbarComponent\", function() { return StatusbarComponent; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _LinearIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../LinearIcon */ \"./src/components/LinearIcon/index.tsx\");\n/* harmony import */ var pollenium_buttercup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pollenium-buttercup */ \"./node_modules/pollenium-buttercup/node/index.js\");\n/* harmony import */ var pollenium_buttercup__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(pollenium_buttercup__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _globals_bellflower__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../globals/bellflower */ \"./src/globals/bellflower.ts\");\n/* harmony import */ var _globals_accountsManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../globals/accountsManager */ \"./src/globals/accountsManager.ts\");\n/* harmony import */ var _globals_dai__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../globals/dai */ \"./src/globals/dai.ts\");\n/* harmony import */ var _globals_modalManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../globals/modalManager */ \"./src/globals/modalManager.ts\");\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.scss */ \"./src/components/Statusbar/index.scss\");\n/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_7__);\nvar __extends = undefined && undefined.__extends || function () {\n  var _extendStatics = function extendStatics(d, b) {\n    _extendStatics = Object.setPrototypeOf || {\n      __proto__: []\n    } instanceof Array && function (d, b) {\n      d.__proto__ = b;\n    } || function (d, b) {\n      for (var p in b) {\n        if (b.hasOwnProperty(p)) d[p] = b[p];\n      }\n    };\n\n    return _extendStatics(d, b);\n  };\n\n  return function (d, b) {\n    _extendStatics(d, b);\n\n    function __() {\n      this.constructor = d;\n    }\n\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n  };\n}();\n\nvar __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {\n  function adopt(value) {\n    return value instanceof P ? value : new P(function (resolve) {\n      resolve(value);\n    });\n  }\n\n  return new (P || (P = Promise))(function (resolve, reject) {\n    function fulfilled(value) {\n      try {\n        step(generator.next(value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function rejected(value) {\n      try {\n        step(generator[\"throw\"](value));\n      } catch (e) {\n        reject(e);\n      }\n    }\n\n    function step(result) {\n      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);\n    }\n\n    step((generator = generator.apply(thisArg, _arguments || [])).next());\n  });\n};\n\nvar __generator = undefined && undefined.__generator || function (thisArg, body) {\n  var _ = {\n    label: 0,\n    sent: function sent() {\n      if (t[0] & 1) throw t[1];\n      return t[1];\n    },\n    trys: [],\n    ops: []\n  },\n      f,\n      y,\n      t,\n      g;\n  return g = {\n    next: verb(0),\n    \"throw\": verb(1),\n    \"return\": verb(2)\n  }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function () {\n    return this;\n  }), g;\n\n  function verb(n) {\n    return function (v) {\n      return step([n, v]);\n    };\n  }\n\n  function step(op) {\n    if (f) throw new TypeError(\"Generator is already executing.\");\n\n    while (_) {\n      try {\n        if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n        if (y = 0, t) op = [op[0] & 2, t.value];\n\n        switch (op[0]) {\n          case 0:\n          case 1:\n            t = op;\n            break;\n\n          case 4:\n            _.label++;\n            return {\n              value: op[1],\n              done: false\n            };\n\n          case 5:\n            _.label++;\n            y = op[1];\n            op = [0];\n            continue;\n\n          case 7:\n            op = _.ops.pop();\n\n            _.trys.pop();\n\n            continue;\n\n          default:\n            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {\n              _ = 0;\n              continue;\n            }\n\n            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {\n              _.label = op[1];\n              break;\n            }\n\n            if (op[0] === 6 && _.label < t[1]) {\n              _.label = t[1];\n              t = op;\n              break;\n            }\n\n            if (t && _.label < t[2]) {\n              _.label = t[2];\n\n              _.ops.push(op);\n\n              break;\n            }\n\n            if (t[2]) _.ops.pop();\n\n            _.trys.pop();\n\n            continue;\n        }\n\n        op = body.call(thisArg, _);\n      } catch (e) {\n        op = [6, e];\n        y = 0;\n      } finally {\n        f = t = 0;\n      }\n    }\n\n    if (op[0] & 5) throw op[1];\n    return {\n      value: op[0] ? op[1] : void 0,\n      done: true\n    };\n  }\n};\n\n\n\n\n\n\n\n\n\n\nvar StatusbarComponent =\n/** @class */\nfunction (_super) {\n  __extends(StatusbarComponent, _super);\n\n  function StatusbarComponent(props) {\n    var _this = _super.call(this, props) || this;\n\n    _this.state = {\n      account: _globals_accountsManager__WEBPACK_IMPORTED_MODULE_4__[\"accountsManager\"].getAccount(),\n      daiBalance: _globals_accountsManager__WEBPACK_IMPORTED_MODULE_4__[\"accountsManager\"].getEngineBalance(_globals_dai__WEBPACK_IMPORTED_MODULE_5__[\"dai\"]),\n      blockNumber: null\n    };\n    _globals_bellflower__WEBPACK_IMPORTED_MODULE_3__[\"bellflower\"].blockSnowdrop.addHandle(function (block) {\n      _this.setState({\n        blockNumber: new pollenium_buttercup__WEBPACK_IMPORTED_MODULE_2__[\"Uint256\"](block.number)\n      });\n    });\n    _globals_accountsManager__WEBPACK_IMPORTED_MODULE_4__[\"accountsManager\"].fetchEngineBalance(_globals_dai__WEBPACK_IMPORTED_MODULE_5__[\"dai\"]).then(function (daiBalance) {\n      _this.setState({\n        daiBalance: daiBalance\n      });\n    });\n    _globals_accountsManager__WEBPACK_IMPORTED_MODULE_4__[\"accountsManager\"].accountSnowdrop.addHandle(function (account) {\n      return __awaiter(_this, void 0, void 0, function () {\n        var _a, _b;\n\n        return __generator(this, function (_c) {\n          switch (_c.label) {\n            case 0:\n              _a = this.setState;\n              _b = {\n                account: account\n              };\n              return [4\n              /*yield*/\n              , _globals_accountsManager__WEBPACK_IMPORTED_MODULE_4__[\"accountsManager\"].fetchEngineBalance(_globals_dai__WEBPACK_IMPORTED_MODULE_5__[\"dai\"])];\n\n            case 1:\n              _a.apply(this, [(_b.daiBalance = _c.sent(), _b)]);\n\n              return [2\n              /*return*/\n              ];\n          }\n        });\n      });\n    });\n    return _this;\n  }\n\n  StatusbarComponent.prototype.render = function () {\n    return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", {\n      className: \"statusbar\"\n    }, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", {\n      className: \"container pad-small-vertical pad-horizontal-if-narrow flex-columns\"\n    }, react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", {\n      className: \"width-third\"\n    }, \"BBlock #\", this.state.blockNumber ? this.state.blockNumber.toNumberString(10) : ''), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", {\n      className: \"width-third text-center\"\n    }, this.getDaiBalanceElement()), react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"div\", {\n      className: \"flex-grow text-right text-brighter-on-hover cursor-pointer\",\n      onClick: function onClick() {\n        _globals_modalManager__WEBPACK_IMPORTED_MODULE_6__[\"modalManager\"].openAccounts();\n      }\n    }, this.getAccountElement())));\n  };\n\n  StatusbarComponent.prototype.getAccountElement = function () {\n    if (this.state.account === null) {\n      return null;\n    } else {\n      return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", null, this.state.account.keypair.getAddress().uu.toHex().substr(0, 8) + '…', react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](_LinearIcon__WEBPACK_IMPORTED_MODULE_1__[\"LinearIconComponent\"], {\n        icon: \"user\"\n      }));\n    }\n  };\n\n  StatusbarComponent.prototype.getDaiBalanceElement = function () {\n    return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"span\", null, \"Dai Balance $\", this.state.daiBalance === null ? '…' : this.state.daiBalance.toNumberString(10));\n  };\n\n  return StatusbarComponent;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n\n\n; /* eslint-disable global-require, import/no-unresolved */ (function register() { /* react-hot-loader/webpack */ const reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default; if (!reactHotLoader) { return } /* eslint-disable camelcase, no-undef */ const webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', \"/Users/aakilfernandes/projects/pollenium/rainlily/src/components/Statusbar/index.tsx\"); return } /* eslint-disable no-restricted-syntax */ for (const key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue } let namedExport; try { namedExport = webpackExports[key]; } catch (err) { continue } reactHotLoader.register(namedExport, key, \"/Users/aakilfernandes/projects/pollenium/rainlily/src/components/Statusbar/index.tsx\"); } })(); //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9TdGF0dXNiYXIvaW5kZXgudHN4P2M4ZDciXSwibmFtZXMiOlsiX19leHRlbmRzIiwiZXh0ZW5kU3RhdGljcyIsImQiLCJiIiwiT2JqZWN0Iiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJBcnJheSIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsIl9fIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJhZG9wdCIsInZhbHVlIiwicmVzb2x2ZSIsIlByb21pc2UiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsImUiLCJyZWplY3RlZCIsInJlc3VsdCIsImRvbmUiLCJ0aGVuIiwiYXBwbHkiLCJfX2dlbmVyYXRvciIsImJvZHkiLCJfIiwibGFiZWwiLCJzZW50IiwidCIsInRyeXMiLCJvcHMiLCJmIiwieSIsImciLCJ2ZXJiIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJuIiwidiIsIm9wIiwiVHlwZUVycm9yIiwiY2FsbCIsInBvcCIsImxlbmd0aCIsInB1c2giLCJTdGF0dXNiYXJDb21wb25lbnQiLCJfc3VwZXIiLCJwcm9wcyIsIl90aGlzIiwic3RhdGUiLCJhY2NvdW50IiwiYWNjb3VudHNNYW5hZ2VyIiwiZ2V0QWNjb3VudCIsImRhaUJhbGFuY2UiLCJnZXRFbmdpbmVCYWxhbmNlIiwiZGFpIiwiYmxvY2tOdW1iZXIiLCJiZWxsZmxvd2VyIiwiYmxvY2tTbm93ZHJvcCIsImFkZEhhbmRsZSIsImJsb2NrIiwic2V0U3RhdGUiLCJVaW50MjU2IiwibnVtYmVyIiwiZmV0Y2hFbmdpbmVCYWxhbmNlIiwiYWNjb3VudFNub3dkcm9wIiwiX2EiLCJfYiIsIl9jIiwicmVuZGVyIiwiUmVhY3QiLCJjbGFzc05hbWUiLCJ0b051bWJlclN0cmluZyIsImdldERhaUJhbGFuY2VFbGVtZW50Iiwib25DbGljayIsIm1vZGFsTWFuYWdlciIsIm9wZW5BY2NvdW50cyIsImdldEFjY291bnRFbGVtZW50Iiwia2V5cGFpciIsImdldEFkZHJlc3MiLCJ1dSIsInRvSGV4Iiwic3Vic3RyIiwiTGluZWFySWNvbkNvbXBvbmVudCIsImljb24iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFBSUEsU0FBUyxHQUFJLFNBQUksSUFBSSxTQUFJLENBQUNBLFNBQWQsSUFBNkIsWUFBWTtBQUNyRCxNQUFJQyxjQUFhLEdBQUcsdUJBQVVDLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNoQ0Ysa0JBQWEsR0FBR0csTUFBTSxDQUFDQyxjQUFQLElBQ1g7QUFBRUMsZUFBUyxFQUFFO0FBQWIsaUJBQTZCQyxLQUE3QixJQUFzQyxVQUFVTCxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFBRUQsT0FBQyxDQUFDSSxTQUFGLEdBQWNILENBQWQ7QUFBa0IsS0FEL0QsSUFFWixVQUFVRCxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFBRSxXQUFLLElBQUlLLENBQVQsSUFBY0wsQ0FBZDtBQUFpQixZQUFJQSxDQUFDLENBQUNNLGNBQUYsQ0FBaUJELENBQWpCLENBQUosRUFBeUJOLENBQUMsQ0FBQ00sQ0FBRCxDQUFELEdBQU9MLENBQUMsQ0FBQ0ssQ0FBRCxDQUFSO0FBQTFDO0FBQXdELEtBRjlFOztBQUdBLFdBQU9QLGNBQWEsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLENBQXBCO0FBQ0gsR0FMRDs7QUFNQSxTQUFPLFVBQVVELENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNuQkYsa0JBQWEsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLENBQWI7O0FBQ0EsYUFBU08sRUFBVCxHQUFjO0FBQUUsV0FBS0MsV0FBTCxHQUFtQlQsQ0FBbkI7QUFBdUI7O0FBQ3ZDQSxLQUFDLENBQUNVLFNBQUYsR0FBY1QsQ0FBQyxLQUFLLElBQU4sR0FBYUMs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QThCO0FBQWhJLEtBQTNCLEVBQStKLEtBQUtDLGlCQUFMLEVBQS9KLENBTEosQ0FESSxDQUFSO0FBT0gsR0FSRDs7QUFTQWhDLG9CQUFrQixDQUFDM0MsU0FBbkIsQ0FBNkIyRSxpQkFBN0IsR0FBaUQsWUFBWTtBQUN6RCxRQUFJLEtBQUs1QixLQUFMLENBQVdDLE9BQVgsS0FBdUIsSUFBM0IsRUFBaUM7QUFDN0IsYUFBTyxJQUFQO0FBQ0gsS0FGRCxNQUdLO0FBQ0QsYUFBUW9CLG1EQUFBLENBQW9CLE1BQXBCLEVBQTRCLElBQTVCLEVBQ0osS0FBS3JCLEtBQUwsQ0FBV0MsT0FBWCxDQUFtQjRCLE9BQW5CLENBQTJCQyxVQUEzQixHQUF3Q0MsRUFBeEMsQ0FBMkNDLEtBQTNDLEdBQW1EQyxNQUFuRCxDQUEwRCxDQUExRCxFQUE2RCxDQUE3RCxJQUFrRSxHQUQ5RCxFQUVKWixtREFBQSxDQUFvQmEsK0RBQXBCLEVBQXlDO0FBQUVDLFlBQUksRUFBRTtBQUFSLE9BQXpDLENBRkksQ0FBUjtBQUdIO0FBQ0osR0FURDs7QUFVQXZDLG9CQUFrQixDQUFDM0MsU0FBbkIsQ0FBNkJ1RSxvQkFBN0IsR0FBb0QsWUFBWTtBQUM1RCxXQUFRSCxtREFBQSxDQUFvQixNQUFwQixFQUE0QixJQUE1QixFQUNKLGVBREksRUFFSixLQUFLckIsS0FBTCxDQUFXSSxVQUFYLEtBQTBCLElBQTFCLEdBQWlDLEdBQWpDLEdBQXVDLEtBQUtKLEtBQUwsQ0FBV0ksVUFBWCxDQUFzQm1CLGNBQXRCLENBQXFDLEVBQXJDLENBRm5DLENBQVI7QUFHSCxHQUpEOztBQUtBLFNBQU8zQixrQkFBUDtBQUNILENBN0R1QyxDQTZEdEN5QiwrQ0E3RHNDLENBQXhDIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvU3RhdHVzYmFyL2luZGV4LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IExpbmVhckljb25Db21wb25lbnQgfSBmcm9tICcuLi9MaW5lYXJJY29uJztcbmltcG9ydCB7IFVpbnQyNTYgfSBmcm9tICdwb2xsZW5pdW0tYnV0dGVyY3VwJztcbmltcG9ydCB7IGJlbGxmbG93ZXIgfSBmcm9tICcuLi8uLi9nbG9iYWxzL2JlbGxmbG93ZXInO1xuaW1wb3J0IHsgYWNjb3VudHNNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vZ2xvYmFscy9hY2NvdW50c01hbmFnZXInO1xuaW1wb3J0IHsgZGFpIH0gZnJvbSAnLi4vLi4vZ2xvYmFscy9kYWknO1xuaW1wb3J0IHsgbW9kYWxNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vZ2xvYmFscy9tb2RhbE1hbmFnZXInO1xuaW1wb3J0ICcuL2luZGV4LnNjc3MnO1xudmFyIFN0YXR1c2JhckNvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3RhdHVzYmFyQ29tcG9uZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFN0YXR1c2JhckNvbXBvbmVudChwcm9wcykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBwcm9wcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBhY2NvdW50OiBhY2NvdW50c01hbmFnZXIuZ2V0QWNjb3VudCgpLFxuICAgICAgICAgICAgZGFpQmFsYW5jZTogYWNjb3VudHNNYW5hZ2VyLmdldEVuZ2luZUJhbGFuY2UoZGFpKSxcbiAgICAgICAgICAgIGJsb2NrTnVtYmVyOiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIGJlbGxmbG93ZXIuYmxvY2tTbm93ZHJvcC5hZGRIYW5kbGUoZnVuY3Rpb24gKGJsb2NrKSB7XG4gICAgICAgICAgICBfdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYmxvY2tOdW1iZXI6IG5ldyBVaW50MjU2KGJsb2NrLm51bWJlcilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgYWNjb3VudHNNYW5hZ2VyLmZldGNoRW5naW5lQmFsYW5jZShkYWkpLnRoZW4oZnVuY3Rpb24gKGRhaUJhbGFuY2UpIHtcbiAgICAgICAgICAgIF90aGlzLnNldFN0YXRlKHsgZGFpQmFsYW5jZTogZGFpQmFsYW5jZSB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFjY291bnRzTWFuYWdlci5hY2NvdW50U25vd2Ryb3AuYWRkSGFuZGxlKGZ1bmN0aW9uIChhY2NvdW50KSB7IHJldHVybiBfX2F3YWl0ZXIoX3RoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2EgPSB0aGlzLnNldFN0YXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjb3VudDogYWNjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGFjY291bnRzTWFuYWdlci5mZXRjaEVuZ2luZUJhbGFuY2UoZGFpKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmFwcGx5KHRoaXMsIFsoX2IuZGFpQmFsYW5jZSA9IF9jLnNlbnQoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2IpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pOyB9KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdGF0dXNiYXJDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcInN0YXR1c2JhclwiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImNvbnRhaW5lciBwYWQtc21hbGwtdmVydGljYWwgcGFkLWhvcml6b250YWwtaWYtbmFycm93IGZsZXgtY29sdW1uc1wiIH0sXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJ3aWR0aC10aGlyZFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIFwiQkJsb2NrICNcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5ibG9ja051bWJlciA/IHRoaXMuc3RhdGUuYmxvY2tOdW1iZXIudG9OdW1iZXJTdHJpbmcoMTApIDogJycpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwid2lkdGgtdGhpcmQgdGV4dC1jZW50ZXJcIiB9LCB0aGlzLmdldERhaUJhbGFuY2VFbGVtZW50KCkpLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmxleC1ncm93IHRleHQtcmlnaHQgdGV4dC1icmlnaHRlci1vbi1ob3ZlciBjdXJzb3ItcG9pbnRlclwiLCBvbkNsaWNrOiBmdW5jdGlvbiAoKSB7IG1vZGFsTWFuYWdlci5vcGVuQWNjb3VudHMoKTsgfSB9LCB0aGlzLmdldEFjY291bnRFbGVtZW50KCkpKSkpO1xuICAgIH07XG4gICAgU3RhdHVzYmFyQ29tcG9uZW50LnByb3RvdHlwZS5nZXRBY2NvdW50RWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWNjb3VudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hY2NvdW50LmtleXBhaXIuZ2V0QWRkcmVzcygpLnV1LnRvSGV4KCkuc3Vic3RyKDAsIDgpICsgJ+KApicsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMaW5lYXJJY29uQ29tcG9uZW50LCB7IGljb246IFwidXNlclwiIH0pKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN0YXR1c2JhckNvbXBvbmVudC5wcm90b3R5cGUuZ2V0RGFpQmFsYW5jZUVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChcInNwYW5cIiwgbnVsbCxcbiAgICAgICAgICAgIFwiRGFpIEJhbGFuY2UgJFwiLFxuICAgICAgICAgICAgdGhpcy5zdGF0ZS5kYWlCYWxhbmNlID09PSBudWxsID8gJ+KApicgOiB0aGlzLnN0YXRlLmRhaUJhbGFuY2UudG9OdW1iZXJTdHJpbmcoMTApKSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3RhdHVzYmFyQ29tcG9uZW50O1xufShSZWFjdC5Db21wb25lbnQpKTtcbmV4cG9ydCB7IFN0YXR1c2JhckNvbXBvbmVudCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Statusbar/index.tsx\n");

/***/ })

})