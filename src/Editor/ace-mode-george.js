/*
 * Adapted from
 * https://www.student.cs.uwaterloo.ca/~se212/george/ask-george/js/mode-george_highlighting.js
 */

/* eslint-disable */
ace.define("ace/mode/george_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";
    var r = e("../lib/oop")
      , i = e("./text_highlight_rules").TextHighlightRules
      , s = function() {
        this.$rules = {
            start: [{
                token: "constant.other.source.grg",
                regex: /#q|#u|#a/,
                push: [{
                    token: "constant.other.source.grg",
                    regex: /$/,
                    next: "pop"
                }, {
                    defaultToken: "constant.other.source.grg"
                }]
            }, {
                token: "constant.other.source.grg",
                regex: /#check\s+(PROP|ND|PC|Z|TP|ST|PRED|NONE)\b/
            }, {
                token: "comment.line.percentage.source.grg",
                regex: /%/,
                push: [{
                    token: "comment.line.percentage.source.grg",
                    regex: /$/,
                    next: "pop"
                }, {
                    defaultToken: "comment.line.percentage.source.grg"
                }]
            }, {
                token: "support.type.source.grg",
                regex: /\b(?:by|on|forall|exists|schema|pred|end|proc|fun|assert|if|then|else|while|do)\b/
            }, {
                token: "string.source.grg",
                regex: /\b(?:true|false|empty|univ|N)\b/
            }, {
                token: "constant.language.source.grg",
                regex: /\b(?:and_i|and_e|or_i|or_e|lem|imp_e|not_e|not_not_i|not_not_e|iff_i|iff_e|trans|iff_mp|exists_i|forall_e|eq_i|eq_e|premise|raa|cases|imp_i|forall_i|exists_e|disprove|case|assume|for every|for some|and_nb|not_and_br|or_br|not_or_nb|imp_br|not_imp_nb|not_not_nb|iff_br|not_iff_br|forall_nb|not_forall_nb|exists_nb|not_exists_nb|closed|comm_assoc|contr|lem|impl|contrapos|simp1|simp2|distr|dm|neg|equiv|idemp|forall_over_and|exists_over_or|swap_vars|move_exists|move_forall|set|arith|Delta|Xi)\b/
            }, {
                token: "constant.numeric.source.grg",
                regex: /\b(?:in|sube|sub|pow|union|inter|card|gen_U|dom|ran|id|iter|seq)\b/
            }, {
                token: "constant.numeric.source.grg",
                regex: /&|\|=|\|-?>?|<-?\||<->|>?-->>?|>?-\|->>?|<?=>|\!=?|<==>|==|\(\+\)|;|::?=/
            }, {
                token: "variable.language.source.grg",
                regex: /^\s*?\d+\)/
            }, {
                token: "variable.language.source.grg",
                regex: /\b\d+\b/
            }, {
                token: "string.regexp.source.grg",
                regex: /\bmagic\b/
            }]
        },
        this.normalizeRules()
    };
    s.metaData = {
        fileTypes: ["grg"],
        name: "George Highlighting",
        scopeName: "source.grg"
    },
    r.inherits(s, i),
    t.GeorgeHighlightingHighlightRules = s
}),
ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t, n) {
    "use strict";
    var r = e("../../lib/oop")
      , i = e("../../range").Range
      , s = e("./fold_mode").FoldMode
      , o = t.FoldMode = function(e) {
        e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)),
        this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
    }
    ;
    r.inherits(o, s),
    function() {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/,
        this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,
        this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/,
        this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/,
        this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/,
        this._getFoldWidgetBase = this.getFoldWidget,
        this.getFoldWidget = function(e, t, n) {
            var r = e.getLine(n);
            if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r))
                return "";
            var i = this._getFoldWidgetBase(e, t, n);
            return !i && this.startRegionRe.test(r) ? "start" : i
        }
        ,
        this.getFoldWidgetRange = function(e, t, n, r) {
            var i = e.getLine(n);
            if (this.startRegionRe.test(i))
                return this.getCommentRegionBlock(e, i, n);
            var s = i.match(this.foldingStartMarker);
            if (s) {
                var o = s.index;
                if (s[1])
                    return this.openingBracketBlock(e, s[1], n, o);
                var u = e.getCommentFoldRange(n, o + s[0].length, 1);
                return u && !u.isMultiLine() && (r ? u = this.getSectionRange(e, n) : t != "all" && (u = null)),
                u
            }
            if (t === "markbegin")
                return;
            var s = i.match(this.foldingStopMarker);
            if (s) {
                var o = s.index + s[0].length;
                return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1)
            }
        }
        ,
        this.getSectionRange = function(e, t) {
            var n = e.getLine(t)
              , r = n.search(/\S/)
              , s = t
              , o = n.length;
            t += 1;
            var u = t
              , a = e.getLength();
            while (++t < a) {
                n = e.getLine(t);
                var f = n.search(/\S/);
                if (f === -1)
                    continue;
                if (r > f)
                    break;
                var l = this.getFoldWidgetRange(e, "all", t);
                if (l) {
                    if (l.start.row <= s)
                        break;
                    if (l.isMultiLine())
                        t = l.end.row;
                    else if (r == f)
                        break
                }
                u = t
            }
            return new i(s,o,u,e.getLine(u).length)
        }
        ,
        this.getCommentRegionBlock = function(e, t, n) {
            var r = t.search(/\s*$/)
              , s = e.getLength()
              , o = n
              , u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/
              , a = 1;
            while (++n < s) {
                t = e.getLine(n);
                var f = u.exec(t);
                if (!f)
                    continue;
                f[1] ? a-- : a++;
                if (!a)
                    break
            }
            var l = n;
            if (l > o)
                return new i(o,r,l,t.length)
        }
    }
    .call(o.prototype)
}),
ace.define("ace/mode/george", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/george_highlight_rules", "ace/mode/folding/cstyle"], function(e, t, n) {
    "use strict";
    var r = e("../lib/oop")
      , i = e("./text").Mode
      , s = e("./george_highlight_rules").GeorgeHighlightingHighlightRules
      , o = e("./folding/cstyle").FoldMode
      , u = function() {
        this.HighlightRules = s,
        this.foldingRules = new o
    };
    r.inherits(u, i),
    function() {
        this.$id = "ace/mode/george"
    }
    .call(u.prototype),
    t.Mode = u
})

