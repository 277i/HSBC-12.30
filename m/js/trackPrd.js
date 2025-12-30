window.jQuery && window.$ ? function () {
    jQuery(function () {
        var r = new e({
            prd: ""
        });
        if (r.queryVal) {
            var n = function (e) {
                var n = $(e.currentTarget).attr("href");
                null === n.match(r.merge) && $(e.currentTarget).attr("href", n + r.merge)
            };
            setTimeout(function () {
                0 !== $(".apply").length ? $(".apply").on("click", n) : console.warn("找不到此DOM节点\n请检查一下结构中是否存在正确的DOM\n=====")
            }, 360), $.fn.extend({
                addTrack: function (e) {
                    return this.on("click", n), console.log("%c 已绑定点击事件", "color:cyan"), this
                }
            })
        } else console.log("%c 参数跟踪为空", "color:#FF5B65")
    });
    var e = function () {
        function e(r) {
            var n = r.prefix,
                t = r.prd,
                o = r.queryVal;
            e.prefix = null != n ? n : "wz_", e.prd = t || e.getProductName(), e.queryVal = null != o ? o : e.getFrom("from"), e.merge = "&prd=" + e.prefix + e.prd + "_" + e.queryVal
        }
        return e.getFrom = function (e) {
            for (var r = decodeURIComponent(window.location.search.substring(1)).split("&"), n = 0; n < r.length; n++) {
                var t = r[n].split("=");
                if (t[0] === e) return t[1]
            }
            return ""
        }, e.getProductName = function () {
            return null === window.location.pathname.match(/\/(?!test\/)\w+\//g) ? window.location.hostname.replace(/\./g, "-") : window.location.pathname.match(/\/(?!test\/)\w+\//g)[0].replace(/\//g, "")
        }, Object.defineProperty(e.prototype, "queryVal", {
            get: function () {
                return e.queryVal
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "merge", {
            get: function () {
                return e.merge
            },
            enumerable: !1,
            configurable: !0
        }), e
    }();
    Function.prototype.before = function (e) {
        var r = this;
        return function () {
            return e.apply(this, arguments), r.apply(this, arguments)
        }
    }, Function.prototype.after = function (e) {
        var r = this;
        return function () {
            var n = r.apply(this, arguments);
            return e.apply(this, arguments), n
        }
    }
}() : console.warn("请检查是否正确引入JQuery");