/**
 * JavaScript Library
 */

/**
 * IE8 HotFix
 */
if (typeof Array.prototype.indexOf !== 'function') {
	Array.prototype.indexOf = function(item) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] === item) {
				return i;
			}
		}
		return -1;
	};
}

window.jsl = (function() {
	function Jsl(els) {
		for (var i = 0; i < els.length; i++) {
			this[i] = els[i];
		}
		this.length = els.length;
	}
	// ========= UTILS =========
	Jsl.prototype.forEach = function(callback) {
		this.map(callback);
		return this;
	};

	Jsl.prototype.map = function(callback) {
		var results = [];
		for (var i = 0; i < this.length; i++) {
			results.push(callback.call(this, this[i], i));
		}
		return results; // .length > 1 ? results : results[0];
	};
	Jsl.prototype.mapOne = function(callback) {
		var m = this.map(callback);
		return m.length > 1 ? m : m[0];
	};

	// ========== DOM OBJECT EVENT ==========
	Jsl.prototype.on = function(event, callback, preventDefault) {
		var names = [ "afterprint", "beforeprint", "beforeunload", "error",
				"hashchange", "load", "message", "offline", "line", "pagehide",
				"pageshow", "popstate", "resize", "storage", "unload", "blur",
				"change", "ctextmenu", "focus", "input", "invalid", "reset",
				"search", "select", "submit", "keydown", "keypress", "keyup",
				"click", "dblclick", "drag", "dragend", "dragenter",
				"dragleave", "dragover", "dragstart", "drop", "mousedown",
				"mousemove", "mouseout", "mouseover", "mouseup", "mousewheel",
				"scroll", "wheel", "copy", "cut", "paste", "abort", "canplay",
				"canplaythrough", "cuechange", "duratichange", "emptied",
				"ended", "error", "loadeddata", "loadedmetadata", "loadstart",
				"pause", "play", "playing", "progress", "ratechange", "seeked",
				"seeking", "stalled", "suspend", "timeupdate", "volumechange",
				"waiting", "error", "show", "toggle" ];
		var events = [ "onafterprint", "onbeforeprint", "onbeforeunload",
				"onerror", "onhashchange", "onload", "onmessage", "onoffline",
				"ononline", "onpagehide", "onpageshow", "onpopstate",
				"onresize", "onstorage", "onunload", "onblur", "onchange",
				"oncontextmenu", "onfocus", "oninput", "oninvalid", "onreset",
				"onsearch", "onselect", "onsubmit", "onkeydown", "onkeypress",
				"onkeyup", "onclick", "ondblclick", "ondrag", "ondragend",
				"ondragenter", "ondragleave", "ondragover", "ondragstart",
				"ondrop", "onmousedown", "onmousemove", "onmouseout",
				"onmouseover", "onmouseup", "onmousewheel", "onscroll",
				"onwheel", "oncopy", "oncut", "onpaste", "onabort",
				"oncanplay", "oncanplaythrough", "oncuechange",
				"ondurationchange", "onemptied", "onended", "onerror",
				"onloadeddata", "onloadedmetadata", "onloadstart", "onpause",
				"onplay", "onplaying", "onprogress", "onratechange",
				"onseeked", "onseeking", "onstalled", "onsuspend",
				"ontimeupdate", "onvolumechange", "onwaiting", "onerror",
				"onshow", "ontoggle" ];
		var matched = -1;
		for (var int = 0; int < names.length; int++) {
			if (event === names[i]) {
				matched = i;
			}
		}
		if (matched != -1) {
			if (typeof callback != "undefined" && this[0] != null) {
				this[0].addEventListener(events[matched], callback, false);
			}
		}
	};

	// ========== DOM MANIPULATION ==========
	Jsl.prototype.text = function(text) {
		if (typeof text !== "undefined") {
			return this.forEach(function(el) {
				el.innerText = text;
			});
		} else {
			return this.mapOne(function(el) {
				return el.innerText;
			});
		}
	};

	Jsl.prototype.html = function(html) {
		if (typeof html !== "undefined") {
			return this.forEach(function(el) {
				el.innerHTML = html;
			});
		} else {
			return this.mapOne(function(el) {
				return el.innerHTML;
			});
		}
	};

	Jsl.prototype.addClass = function(classes) {
		var className = "";
		if (typeof classes !== 'string') {
			for (var i = 0; i < classes.length; i++) {
				className += " " + classes[i];
			}
		} else {
			className = " " + classes;
		}
		return this.forEach(function(el) {
			el.className += className;
		});
	};

	Jsl.prototype.removeClass = function(clazz) {
		return this.forEach(function(el) {
			var cs = el.className.split(' '), i;

			while ((i = cs.indexOf(clazz)) > -1) {
				cs = cs.slice(0, i).concat(cs.slice(++i));
			}
			el.className = cs.join(' ');
		});
	};

	Jsl.prototype.attr = function(attr, val) {
		if (typeof val !== 'undefined') {
			return this.forEach(function(el) {
				el.setAttribute(attr, val);
			});
		} else {
			return this.mapOne(function(el) {
				return el.getAttribute(attr);
			});
		}
	};

	Jsl.prototype.append = function(els) {
		return this.forEach(function(parEl, i) {
			els.forEach(function(childEl) {
				parEl.appendChild((i > 0) ? childEl.cloneNode(true) : childEl);
			});
		});
	};

	Jsl.prototype.prepend = function(els) {
		return this.forEach(function(parEl, i) {
			for (var j = els.length - 1; j > -1; j--) {
				parEl.insertBefore((i > 0) ? els[j].cloneNode(true) : els[j],
						parEl.firstChild);
			}
		});
	};

	Jsl.prototype.remove = function() {
		return this.forEach(function(el) {
			return el.parentNode.removeChild(el);
		});
	};

	Jsl.prototype.on = (function() {
		if (document.addEventListener) {
			return function(evt, fn) {
				return this.forEach(function(el) {
					el.addEventListener(evt, fn, false);
				});
			};
		} else if (document.attachEvent) {
			return function(evt, fn) {
				return this.forEach(function(el) {
					el.attachEvent("on" + evt, fn);
				});
			};
		} else {
			return function(evt, fn) {
				return this.forEach(function(el) {
					el["on" + evt] = fn;
				});
			};
		}
	}());

	Jsl.prototype.off = (function() {
		if (document.removeEventListener) {
			return function(evt, fn) {
				return this.forEach(function(el) {
					el.removeEventListener(evt, fn, false);
				});
			};
		} else if (document.detachEvent) {
			return function(evt, fn) {
				return this.forEach(function(el) {
					el.detachEvent("on" + evt, fn);
				});
			};
		} else {
			return function(evt, fn) {
				return this.forEach(function(el) {
					el["on" + evt] = null;
				});
			};
		}
	}());

	var jsl = {
			
		local_save : function(key, value) {
			localStorage.setItem(key, value)
		},
		local_load : function(key) {
			return localStorage.getItem(key);
		},
		session_save : function(key, value) {
			sessionStorage.setItem(key, value);
		},
		session_load : function(key) {
			return sessionStorage.getItem(key);
		},
		exist : function(selector) {
			var els = this.get(selector);
			if (els.length == 0) {
				return false;
			}
			return true;
		},
		load : function(callback) {
			if (typeof callback != "undefined") {
				window.addEventListener("load", callback, false);
			}
		},
		get : function(selector) {
			try {
				var els;
				if (typeof selector === 'string') {
					els = document.querySelectorAll(selector);
				} else if (selector.length) {
					els = selector;
				} else {
					els = [ selector ];
				}
				return new Jsl(els);
			} catch (err) {
				console.log(err);
			}
			return null;
		},
		create : function(tagName, attrs) {
			var el = new Jsl([ document.createElement(tagName) ]);
			if (attrs) {
				if (attrs.className) {
					el.addClass(attrs.className);
					delete attrs.className;
				}
				if (attrs.text) {
					el.text(attrs.text);
					delete attrs.text;
				}
				for ( var key in attrs) {
					if (attrs.hasOwnProperty(key)) {
						el.attr(key, attrs[key]);
					}
				}
			}
			return el;
		}
	};
	return jsl;
}());