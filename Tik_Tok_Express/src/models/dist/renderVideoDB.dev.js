"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var configDB = require('../config/database');

function renderVideoDB(lastId) {
  var _ref, _ref2, results;

  return regeneratorRuntime.async(function renderVideoDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(configDB.query( // truy vấn này lấy ra comment, like , bookmar , path của video 
          "\n      SELECT \n        v.id_video, \n        v.path,\n        COALESCE(l.quantity, 0) AS likes,\n        COALESCE(cc.quantity, 0) AS comments,\n        COALESCE(b.quantity, 0) AS bookmarks\n      FROM video v\n      LEFT JOIN `like` l ON v.id_video = l.id_video\n      LEFT JOIN comment_count cc ON v.id_video = cc.id_video\n      LEFT JOIN bookmark b ON v.id_video = b.id_video\n      WHERE v.visibility = 'public' AND v.id_video > ?\n      ORDER BY v.id_video ASC\n      LIMIT 5\n      ", [lastId]));

        case 3:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          results = _ref2[0];
          return _context.abrupt("return", results);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Lỗi truy vấn:", _context.t0);
          return _context.abrupt("return", {
            success: false,
            message: 'Lỗi hệ thống'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

module.exports = {
  renderVideoDB: renderVideoDB
};