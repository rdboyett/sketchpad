/*! rgbHex - v1.1.2 - 2013-09-27 */
window.rgbHex = function() {
    function a(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }

    function b(a) {
        return a.replace(/^\s+|\s+$/g, "")
    }

    function c(c) {
        return c = b(c), a(c) && c >= 0 && 255 >= c
    }

    function d(a) {
        return /^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(b(a))
    }

    function e(a) {
        return a = parseInt(a, 10).toString(16), 1 === a.length ? "0" + a : a
    }

    function f(a) {
        return parseInt(a, 16).toString()
    }

    function g(b) {
        return b = b.split(","), (3 === b.length || 4 === b.length) && c(b[0]) && c(b[1]) && c(b[2]) ? 4 !== b.length || a(b[3]) ? "#" + e(b[0]).toUpperCase() + e(b[1]).toUpperCase() + e(b[2]).toUpperCase() : null : null
    }

    function h(a) {
        return d(a) ? (3 === a.length && (a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2)), "rgb(" + f(a.substr(0, 2)) + "," + f(a.substr(2, 2)) + "," + f(a.substr(4, 2)) + ")") : void 0
    }

    function i(a) {
        return a.replace(/\s/g, "")
    }
    return function(a) {
        if (!a) return null;
        var c = null,
            d = /^rgba?\((.*)\);?$/,
            e = /^#/;
        return a = b(a.toString()), "transparent" === a || "rgba(0,0,0,0)" === i(a) ? "transparent" : d.test(a) ? g(a.match(d)[1]) : e.test(a) ? h(a.split("#").reverse()[0]) : (c = a.split(","), 1 === c.length ? h(a) : 3 === c.length || 4 === c.length ? g(a) : void 0)
    }
}(), jQuery && jQuery.extend({
    rgbHex: function(a) {
        return window.rgbHex(a)
    }
});
/*! wColorPicker - v2.1.7 - 2013-09-27 */
! function(a) {
    function b(b, c) {
        this.$el = a(b), this.options = c, this.init = !1, this.generate()
    }
    b.prototype = {
        generate: function() {
            return this.$colorPicker || (this.$noneColorPalette = this._createPalette("none", [
                ["transparent"]
            ]), this.$simpleColorPalette = this._createPalette("simple", a.fn.wColorPicker.simpleColors), this.$mixedColorPalette = this._createPalette("mixed", a.fn.wColorPicker.mixedColors), this.$colorTarget = a('<div class="wColorPicker-color-target"></div>'), this.$customInput = a('<input type="text" class="wColorPicker-custom-input"/>').keyup(a.proxy(this._customInputKeyup, this)), this.options.dropperButton && (this.$dropperButton = this._createDropperButton()), this.$colorPickerPalettesHolder = a('<div class="wColorPicker-palettes-holder"></div>').append(this.$noneColorPalette).append(this.$colorTarget).append(this.$customInput).append(this.$dropperButton).append("<br/>").append(this.$simpleColorPalette).append(this.$mixedColorPalette), this.$colorPickerHolder = a('<div class="wColorPicker-holder"></div>').append(this.$colorPickerPalettesHolder), this.$colorPickerBg = a('<div class="wColorPicker-bg"></div>'), this.$colorPicker = a('<div class="wColorPicker" title=""></div>').mouseenter(function(a) {
                a.stopPropagation()
            }).bind("mouseenter mousemove click", function(a) {
                a.stopPropagation()
            }).append(this.$colorPickerBg).append(this.$colorPickerHolder), this.setOpacity(this.options.opacity), this.setTheme(this.options.theme), this.setColor(this.options.color), a("body").append(this.$colorPicker), this.width = this.$colorPickerPalettesHolder.width(), this.height = this.$colorPickerPalettesHolder.height(), this.$colorPickerPalettesHolder.width(this.width), this.$colorPickerPalettesHolder.height(this.height), this.$el.append(this.$colorPicker), this.setMode(this.options.mode), this.setPosition(this.options.position)), this.init = !0, this
        },
        setTheme: function(a) {
            this.$colorPicker.attr("class", this.$colorPicker.attr("class").replace(/wColorPicker-theme-.+\s|wColorPicker-theme-.+$/, "")), this.$colorPicker.addClass("wColorPicker-theme-" + a)
        },
        setOpacity: function(a) {
            this.$colorPickerBg.css("opacity", a)
        },
        setColor: function(a) {
            return window.rgbHex(a) ? (this.options.color = a, this.$colorTarget.css("backgroundColor", a), this.$customInput.val(a), this.init && this.options.onSelect && this.options.onSelect.apply(this, [a]), void 0) : !0
        },
        setMode: function(b) {
            var c = this,
                d = function() {
                    c._toggleEffect("show")
                }, e = function() {
                    c._toggleEffect("hide")
                };
            if ("flat" === b ? this.$colorPicker.removeClass("wColorPicker-zindex").css({
                position: "relative",
                display: ""
            }) : this.$colorPicker.addClass("wColorPicker-zindex").css({
                position: "absolute"
            }).hide(), this.$el.find("wColorPicker-button").remove(), this.$el.unbind("mouseenter", d).unbind("mouseleave", e), a(document).unbind("click", e), "flat" !== b) {
                var f = null,
                    g = null,
                    h = function(a) {
                        a.stopPropagation(), c.options.generateButton && g.css("backgroundColor", c.options.color), c._toggleEffect()
                    };
                this.options.generateButton && (f = a('<div class="wColorPicker-button"></div>'), g = a('<div class="wColorPicker-button-color"></div>').css("backgroundColor", this.options.color), this.$el.append(f), f.append(g.height(this.$el.height() - f.outerHeight(!0)))), this.$noneColorPalette.bind("click", h), this.$simpleColorPalette.bind("click", h), this.$mixedColorPalette.bind("click", h)
            }
            "click" === b ? (this.$el.click(function(a) {
                c._toggleEffect(), a.stopPropagation()
            }), this.$colorPicker.click(function(a) {
                a.stopPropagation()
            }), a(document).bind("click", e)) : "hover" === b && this.$el.bind("mouseenter", d).bind("mouseleave", e)
        },
        setEffect: function(a) {
            return "flat" === this.options.mode ? !0 : (this.$colorPicker.css("opacity", 1), this.$colorPickerHolder.width(this.width).height(this.height), "fade" === a ? this.$colorPicker.css("opacity", 0) : "slide" === a && this.$colorPickerHolder.width("x" === this.positionAxis ? 0 : this.width).height("y" === this.positionAxis ? 0 : this.height), void 0)
        },
        setPosition: function(a) {
            if ("flat" === this.options.mode) return !0;
            var b = this.$el.outerWidth(),
                c = this.$el.outerHeight(),
                d = this.$el.outerWidth() / 2 - this.$colorPicker.outerWidth() / 2,
                e = this.$el.outerHeight() / 2 - this.$colorPicker.outerHeight() / 2,
                f = {
                    left: "",
                    right: "",
                    top: "",
                    bottom: ""
                }, g = this.options.position.charAt(0);
            switch ("t" === g || "b" === g ? this.positionAxis = "y" : ("l" === g || "r" === g) && (this.positionAxis = "x"), a) {
                case "tl":
                    f.left = 0, f.bottom = c;
                    break;
                case "tc":
                    f.left = d, f.bottom = c;
                    break;
                case "tr":
                    f.right = 0, f.bottom = c;
                    break;
                case "rt":
                    f.left = b, f.top = 0;
                    break;
                case "rm":
                    f.left = b, f.top = e;
                    break;
                case "rb":
                    f.left = b, f.bottom = 0;
                    break;
                case "br":
                    f.right = 0, f.top = c;
                    break;
                case "bc":
                    f.left = d, f.top = c;
                    break;
                case "bl":
                    f.left = 0, f.top = c;
                    break;
                case "lb":
                    f.right = b, f.bottom = 0;
                    break;
                case "lm":
                    f.right = b, f.top = e;
                    break;
                case "lt":
                    f.right = b, f.top = 0
            }
            this.$colorPicker.css(f), this.setEffect(this.options.effect)
        },
        _createPalette: function(b, c) {
            var d = 0,
                e = 0,
                f = 0,
                g = 0,
                h = null,
                i = a('<div class="wColorPicker-palette wColorPicker-palette-' + b + '"></div>');
            for (d = 0, e = c.length; e > d; d++) {
                for (f = 0, g = c[d].length; g > f; f++) h = this._createColor(f, c[d][f]), 0 === d && h.addClass("wColorPicker-palette-color-top"), 0 === f && h.addClass("wColorPicker-palette-color-left"), i.append(h);
                e > d && i.append("<br/>")
            }
            return i
        },
        _createColor: function(b, c) {
            var d = this;
            return a('<div class="wColorPicker-palette-color"></div>').attr("id", "wColorPicker-palette-color-" + b).addClass("wColorPicker-palette-color-" + b).css("backgroundColor", c).hover(function() {
                d._colorMouseenter(a(this))
            }, function() {
                d._colorMouseleave(a(this))
            }).click(function() {
                d.setColor(window.rgbHex(a(this).css("backgroundColor")))
            })
        },
        _createDropperButton: function() {
            return a('<div class="wColorPicker-dropper"></div>').click(a.proxy(this.options.onDropper, this))
        },
        _customInputKeyup: function(b) {
            var c = a(b.target).val();
            window.rgbHex(c) && (this.$colorTarget.css("backgroundColor", c), 13 === b.keyCode && this.setColor(c))
        },
        _colorMouseenter: function(a) {
            var b = window.rgbHex(a.css("backgroundColor"));
            a.addClass("active").prev().addClass("active-right"), a.prevAll("." + a.attr("id") + ":first").addClass("active-bottom"), this.$colorTarget.css("backgroundColor", b), this.$customInput.val(b), this.options.onMouseover && this.options.onMouseover.apply(this, [b])
        },
        _colorMouseleave: function(a) {
            a.removeClass("active").prev().removeClass("active-right"), a.prevAll("." + a.attr("id") + ":first").removeClass("active-bottom"), this.$colorTarget.css("backgroundColor", this.options.color), this.$customInput.val(this.options.color), this.options.onMouseout && this.options.onMouseout.apply(this, [this.options.color])
        },
        _toggleEffect: function(a) {
            var b = this.$colorPicker.hasClass("wColorPicker-visible");
            (!a || "show" === a && b === !1 || "hide" === a && b === !0) && (b || this.setPosition(this.options.position), this["_" + this.options.effect + "Effect" + (b ? "Hide" : "Show")](), this.$colorPicker.toggleClass("wColorPicker-visible"))
        },
        _noneEffectShow: function() {
            this.$colorPicker.css("display", "inline-block")
        },
        _noneEffectHide: function() {
            this.$colorPicker.hide()
        },
        _fadeEffectShow: function() {
            this.$colorPicker.stop(!0, !1).css({
                display: "inline-block"
            }).animate({
                opacity: 1
            }, this.options.showSpeed)
        },
        _fadeEffectHide: function() {
            this.$colorPicker.stop(!0, !1).animate({
                opacity: 0
            }, this.options.hideSpeed, a.proxy(function() {
                this.$colorPicker.hide()
            }, this))
        },
        _slideEffectShow: function() {
            var a = "y" === this.positionAxis ? {
                height: this.height
            } : {
                width: this.width
            };
            this.$colorPicker.css("display", "inline-block"), this.$colorPickerHolder.stop(!0, !1).animate(a, this.options.showSpeed)
        },
        _slideEffectHide: function() {
            var b = "y" === this.positionAxis ? {
                height: 0
            } : {
                width: 0
            };
            this.$colorPickerHolder.stop(!0, !1).animate(b, this.options.hideSpeed, a.proxy(function() {
                this.$colorPicker.hide()
            }, this))
        }
    }, a.fn.wColorPicker = function(c, d) {
        function e(d) {
            var e, f = a.data(d, "wColorPicker");
            return f || (e = a.extend({}, a.fn.wColorPicker.defaults, c), e.color = window.rgbHex(e.color) ? e.color : "transparent", f = new b(d, e), a.data(d, "wColorPicker", f)), f
        }
        if ("string" == typeof c) {
            var f = [],
                g = null,
                h = null,
                i = null;
            return h = this.each(function() {
                g = a(this).data("wColorPicker"), g && (i = (d ? "set" : "get") + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase(), g[c] ? f.push(g[c].apply(g, [d])) : d ? (g[i] && g[i].apply(g, [d]), g.options[c] && (g.options[c] = d)) : g[i] ? f.push(g[i].apply(g, [d])) : g.options[c] ? f.push(g.options[c]) : f.push(null))
            }), 1 === f.length ? f[0] : f.length > 0 ? f : h
        }
        return this.each(function() {
            e(this)
        })
    }, a.fn.wColorPicker.defaults = {
        theme: "classic",
        opacity: .9,
        color: "#FF0000",
        mode: "flat",
        position: "bl",
        generateButton: !0,
        dropperButton: !1,
        effect: "slide",
        showSpeed: 500,
        hideSpeed: 500,
        onMouseover: null,
        onMouseout: null,
        onSelect: null,
        onDropper: null
    }, a.fn.wColorPicker.mixedColors = [
        ["#000000", "#003300", "#006600", "#009900", "#00CC00", "#00FF00", "#330000", "#333300", "#336600", "#339900", "#33CC00", "#33FF00", "#660000", "#663300", "#666600", "#669900", "#66CC00", "#66FF00"],
        ["#000033", "#003333", "#006633", "#009933", "#00CC33", "#00FF33", "#330033", "#333333", "#336633", "#339933", "#33CC33", "#33FF33", "#660033", "#663333", "#666633", "#669933", "#66CC33", "#66FF33"],
        ["#000066", "#003366", "#006666", "#009966", "#00CC66", "#00FF66", "#330066", "#333366", "#336666", "#339966", "#33CC66", "#33FF66", "#660066", "#663366", "#666666", "#669966", "#66CC66", "#66FF66"],
        ["#000099", "#003399", "#006699", "#009999", "#00CC99", "#00FF99", "#330099", "#333399", "#336699", "#339999", "#33CC99", "#33FF99", "#660099", "#663399", "#666699", "#669999", "#66CC99", "#66FF99"],
        ["#0000CC", "#0033CC", "#0066CC", "#0099CC", "#00CCCC", "#00FFCC", "#3300CC", "#3333CC", "#3366CC", "#3399CC", "#33CCCC", "#33FFCC", "#6600CC", "#6633CC", "#6666CC", "#6699CC", "#66CCCC", "#66FFCC"],
        ["#0000FF", "#0033FF", "#0066FF", "#0099FF", "#00CCFF", "#00FFFF", "#3300FF", "#3333FF", "#3366FF", "#3399FF", "#33CCFF", "#33FFFF", "#6600FF", "#6633FF", "#6666FF", "#6699FF", "#66CCFF", "#66FFFF"],
        ["#990000", "#993300", "#996600", "#999900", "#99CC00", "#99FF00", "#CC0000", "#CC3300", "#CC6600", "#CC9900", "#CCCC00", "#CCFF00", "#FF0000", "#FF3300", "#FF6600", "#FF9900", "#FFCC00", "#FFFF00"],
        ["#990033", "#993333", "#996633", "#999933", "#99CC33", "#99FF33", "#CC0033", "#CC3333", "#CC6633", "#CC9933", "#CCCC33", "#CCFF33", "#FF0033", "#FF3333", "#FF6633", "#FF9933", "#FFCC33", "#FFFF33"],
        ["#990066", "#993366", "#996666", "#999966", "#99CC66", "#99FF66", "#CC0066", "#CC3366", "#CC6666", "#CC9966", "#CCCC66", "#CCFF66", "#FF0066", "#FF3366", "#FF6666", "#FF9966", "#FFCC66", "#FFFF66"],
        ["#990099", "#993399", "#996699", "#999999", "#99CC99", "#99FF99", "#CC0099", "#CC3399", "#CC6699", "#CC9999", "#CCCC99", "#CCFF99", "#FF0099", "#FF3399", "#FF6699", "#FF9999", "#FFCC99", "#FFFF99"],
        ["#9900CC", "#9933CC", "#9966CC", "#9999CC", "#99CCCC", "#99FFCC", "#CC00CC", "#CC33CC", "#CC66CC", "#CC99CC", "#CCCCCC", "#CCFFCC", "#FF00CC", "#FF33CC", "#FF66CC", "#FF99CC", "#FFCCCC", "#FFFFCC"],
        ["#9900FF", "#9933FF", "#9966FF", "#9999FF", "#99CCFF", "#99FFFF", "#CC00FF", "#CC33FF", "#CC66FF", "#CC99FF", "#CCCCFF", "#CCFFFF", "#FF00FF", "#FF33FF", "#FF66FF", "#FF99FF", "#FFCCFF", "#FFFFFF"]
    ], a.fn.wColorPicker.simpleColors = [
        ["#000000"],
        ["#333333"],
        ["#666666"],
        ["#999999"],
        ["#CCCCCC"],
        ["#FFFFFF"],
        ["#FF0000"],
        ["#00FF00"],
        ["#0000FF"],
        ["#FFFF00"],
        ["#00FFFF"],
        ["#FF00FF"]
    ]
}(jQuery);
