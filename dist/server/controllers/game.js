"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../models/game");
var base_1 = require("./base");
var GameCtrl = /** @class */ (function (_super) {
    __extends(GameCtrl, _super);
    function GameCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = game_1.default;
        _this.initiate = function(req, res) {
            var userList = req.body.userList;
            var title = req.body.title;
            var userListLen = userList.length;
            var possibleSizes = {
                    traditional: [2,4,8,16,32],
                }
            var count = 0;
            //Generate initial Round
            for(var i=0; i<userListLen; i+=2) {
                count++;
                _this.insert({
                    game_id: title + count,
                    user1: userList[i],
                    user2: userList[i+1]
                })
            }
        }
        return _this;
    }
    return GameCtrl;
}(base_1.default));
exports.default = GameCtrl;
//# sourceMappingURL=game.js.map