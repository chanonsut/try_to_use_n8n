"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from2, except, desc) => {
    if (from2 && typeof from2 === "object" || typeof from2 === "function") {
      for (let key of __getOwnPropNames(from2))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@esbuild-plugins/node-globals-polyfill/_virtual-process-polyfill_.js
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e2) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e3) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e2) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e3) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  }
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  function noop() {
  }
  function binding(name) {
    throw new Error("process.binding is not supported");
  }
  function cwd() {
    return "/";
  }
  function chdir(dir) {
    throw new Error("process.chdir is not supported");
  }
  function umask() {
    return 0;
  }
  function hrtime(previousTimestamp) {
    var clocktime = performanceNow.call(performance) * 1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor(clocktime % 1 * 1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds < 0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds, nanoseconds];
  }
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1e3;
  }
  var cachedSetTimeout, cachedClearTimeout, queue, draining, currentQueue, queueIndex, title, platform, browser, env, argv, version, versions, release, config, on, addListener, once, off, removeListener, removeAllListeners, emit, performance, performanceNow, startTime, process, defines;
  var init_virtual_process_polyfill = __esm({
    "node_modules/@esbuild-plugins/node-globals-polyfill/_virtual-process-polyfill_.js"() {
      cachedSetTimeout = defaultSetTimout;
      cachedClearTimeout = defaultClearTimeout;
      if (typeof globalThis.setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      }
      if (typeof globalThis.clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      }
      queue = [];
      draining = false;
      queueIndex = -1;
      Item.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      title = "browser";
      platform = "browser";
      browser = true;
      env = {};
      argv = [];
      version = "";
      versions = {};
      release = {};
      config = {};
      on = noop;
      addListener = noop;
      once = noop;
      off = noop;
      removeListener = noop;
      removeAllListeners = noop;
      emit = noop;
      performance = globalThis.performance || {};
      performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
        return new Date().getTime();
      };
      startTime = new Date();
      process = {
        nextTick,
        title,
        browser,
        env,
        argv,
        version,
        versions,
        on,
        addListener,
        once,
        off,
        removeListener,
        removeAllListeners,
        emit,
        binding,
        cwd,
        chdir,
        umask,
        hrtime,
        platform,
        release,
        config,
        uptime
      };
      defines = {};
      Object.keys(defines).forEach((key) => {
        const segs = key.split(".");
        let target = process;
        for (let i = 0; i < segs.length; i++) {
          const seg = segs[i];
          if (i === segs.length - 1) {
            target[seg] = defines[key];
          } else {
            target = target[seg] || (target[seg] = {});
          }
        }
      });
    }
  });

  // node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js
  function init() {
    inited = true;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
  }
  function base64toByteArray(b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;
    if (len % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    placeHolders = b64[len - 2] === "=" ? 2 : b64[len - 1] === "=" ? 1 : 0;
    arr = new Arr(len * 3 / 4 - placeHolders);
    l = placeHolders > 0 ? len - 4 : len;
    var L = 0;
    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = tmp >> 16 & 255;
      arr[L++] = tmp >> 8 & 255;
      arr[L++] = tmp & 255;
    }
    if (placeHolders === 2) {
      tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
      arr[L++] = tmp & 255;
    } else if (placeHolders === 1) {
      tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
      arr[L++] = tmp >> 8 & 255;
      arr[L++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
      output.push(tripletToBase64(tmp));
    }
    return output.join("");
  }
  function base64fromByteArray(uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3;
    var output = "";
    var parts = [];
    var maxChunkLength = 16383;
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(
        encodeChunk(
          uint8,
          i,
          i + maxChunkLength > len2 ? len2 : i + maxChunkLength
        )
      );
    }
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup[tmp >> 2];
      output += lookup[tmp << 4 & 63];
      output += "==";
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + uint8[len - 1];
      output += lookup[tmp >> 10];
      output += lookup[tmp >> 4 & 63];
      output += lookup[tmp << 2 & 63];
      output += "=";
    }
    parts.push(output);
    return parts.join("");
  }
  function kMaxLength() {
    return Buffer2.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function createBuffer(that, length) {
    if (kMaxLength() < length) {
      throw new RangeError("Invalid typed array length");
    }
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      that = new Uint8Array(length);
      that.__proto__ = Buffer2.prototype;
    } else {
      if (that === null) {
        that = new Buffer2(length);
      }
      that.length = length;
    }
    return that;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (!Buffer2.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer2)) {
      return new Buffer2(arg, encodingOrOffset, length);
    }
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new Error(
          "If encoding is specified then the first argument must be a string"
        );
      }
      return allocUnsafe(this, arg);
    }
    return from(this, arg, encodingOrOffset, length);
  }
  function from(that, value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError('"value" argument must not be a number');
    }
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length);
    }
    if (typeof value === "string") {
      return fromString(that, value, encodingOrOffset);
    }
    return fromObject(that, value);
  }
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError('"size" argument must be a number');
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative');
    }
  }
  function alloc(that, size, fill2, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size);
    }
    if (fill2 !== void 0) {
      return typeof encoding === "string" ? createBuffer(that, size).fill(fill2, encoding) : createBuffer(that, size).fill(fill2);
    }
    return createBuffer(that, size);
  }
  function allocUnsafe(that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer2.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that;
  }
  function fromString(that, string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding');
    }
    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);
    var actual = that.write(string, encoding);
    if (actual !== length) {
      that = that.slice(0, actual);
    }
    return that;
  }
  function fromArrayLike(that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that;
  }
  function fromArrayBuffer(that, array, byteOffset, length) {
    array.byteLength;
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds");
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds");
    }
    if (byteOffset === void 0 && length === void 0) {
      array = new Uint8Array(array);
    } else if (length === void 0) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }
    if (Buffer2.TYPED_ARRAY_SUPPORT) {
      that = array;
      that.__proto__ = Buffer2.prototype;
    } else {
      that = fromArrayLike(that, array);
    }
    return that;
  }
  function fromObject(that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);
      if (that.length === 0) {
        return that;
      }
      obj.copy(that, 0, 0, len);
      return that;
    }
    if (obj) {
      if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
        if (typeof obj.length !== "number" || isnan(obj.length)) {
          return createBuffer(that, 0);
        }
        return fromArrayLike(that, obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(that, obj.data);
      }
    }
    throw new TypeError(
      "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
    );
  }
  function checked(length) {
    if (length >= kMaxLength()) {
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes"
      );
    }
    return length | 0;
  }
  function internalIsBuffer(b) {
    return !!(b != null && b._isBuffer);
  }
  function byteLength(string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length;
    }
    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      string = "" + string;
    }
    var len = string.length;
    if (len === 0)
      return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
        case void 0:
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase)
            return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding)
      encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase)
            throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0)
      return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0)
      byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir)
        return -1;
      else
        byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir)
        byteOffset = 0;
      else
        return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (internalIsBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (Buffer2.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(
            buffer,
            val,
            byteOffset
          );
        } else {
          return Uint8Array.prototype.lastIndexOf.call(
            buffer,
            val,
            byteOffset
          );
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i2) {
      if (indexSize === 1) {
        return buf[i2];
      } else {
        return buf.readUInt16BE(i2 * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1)
            foundIndex = i;
          if (i - foundIndex + 1 === valLength)
            return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1)
            i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength)
        byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found)
          return i;
      }
    }
    return -1;
  }
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0)
      throw new TypeError("Invalid hex string");
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed))
        return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(
      utf8ToBytes(string, buf.length - offset),
      buf,
      offset,
      length
    );
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function latin1Write(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(
      utf16leToBytes(string, buf.length - offset),
      buf,
      offset,
      length
    );
  }
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64fromByteArray(buf);
    } else {
      return base64fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0)
      start = 0;
    if (!end || end < 0 || end > len)
      end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0)
      throw new RangeError("offset is not uint");
    if (offset + ext > length)
      throw new RangeError("Trying to access beyond buffer length");
  }
  function checkInt(buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min)
      throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
  }
  function objectWriteUInt16(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 65535 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
    }
  }
  function objectWriteUInt32(buf, value, offset, littleEndian) {
    if (value < 0)
      value = 4294967295 + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
    }
  }
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length)
      throw new RangeError("Index out of range");
    if (offset < 0)
      throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(
        buf,
        value,
        offset,
        4,
        34028234663852886e22,
        -34028234663852886e22
      );
    }
    ieee754write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(
        buf,
        value,
        offset,
        8,
        17976931348623157e292,
        -17976931348623157e292
      );
    }
    ieee754write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, "");
    if (str.length < 2)
      return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function stringtrim(str) {
    if (str.trim)
      return str.trim();
    return str.replace(/^\s+|\s+$/g, "");
  }
  function toHex(n) {
    if (n < 16)
      return "0" + n.toString(16);
    return n.toString(16);
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1)
          bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0)
          break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0)
          break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0)
          break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0)
          break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0)
        break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length)
        break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isnan(val) {
    return val !== val;
  }
  function isBuffer(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj));
  }
  function isFastBuffer(obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
  }
  function isSlowBuffer(obj) {
    return typeof obj.readFloatLE === "function" && typeof obj.slice === "function" && isFastBuffer(obj.slice(0, 0));
  }
  function ieee754read(buffer, offset, isLE, mLen, nBytes) {
    var e2, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e2 = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e2 = e2 * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    m = e2 & (1 << -nBits) - 1;
    e2 >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
    }
    if (e2 === 0) {
      e2 = 1 - eBias;
    } else if (e2 === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e2 = e2 - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e2 - mLen);
  }
  function ieee754write(buffer, value, offset, isLE, mLen, nBytes) {
    var e2, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e2 = eMax;
    } else {
      e2 = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e2)) < 1) {
        e2--;
        c *= 2;
      }
      if (e2 + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e2++;
        c /= 2;
      }
      if (e2 + eBias >= eMax) {
        m = 0;
        e2 = eMax;
      } else if (e2 + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e2 = e2 + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e2 = 0;
      }
    }
    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e2 = e2 << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e2 & 255, i += d, e2 /= 256, eLen -= 8) {
    }
    buffer[offset + i - d] |= s * 128;
  }
  var lookup, revLookup, Arr, inited, MAX_ARGUMENTS_LENGTH, INVALID_BASE64_RE;
  var init_Buffer = __esm({
    "node_modules/@esbuild-plugins/node-globals-polyfill/Buffer.js"() {
      init_virtual_process_polyfill();
      init_buffer();
      lookup = [];
      revLookup = [];
      Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      inited = false;
      Buffer2.TYPED_ARRAY_SUPPORT = globalThis.TYPED_ARRAY_SUPPORT !== void 0 ? globalThis.TYPED_ARRAY_SUPPORT : true;
      Buffer2.poolSize = 8192;
      Buffer2._augment = function(arr) {
        arr.__proto__ = Buffer2.prototype;
        return arr;
      };
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(null, value, encodingOrOffset, length);
      };
      Buffer2.kMaxLength = kMaxLength();
      if (Buffer2.TYPED_ARRAY_SUPPORT) {
        Buffer2.prototype.__proto__ = Uint8Array.prototype;
        Buffer2.__proto__ = Uint8Array;
        if (typeof Symbol !== "undefined" && Symbol.species && Buffer2[Symbol.species] === Buffer2) {
        }
      }
      Buffer2.alloc = function(size, fill2, encoding) {
        return alloc(null, size, fill2, encoding);
      };
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(null, size);
      };
      Buffer2.isBuffer = isBuffer;
      Buffer2.compare = function compare(a, b) {
        if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
          throw new TypeError("Arguments must be Buffers");
        }
        if (a === b)
          return 0;
        var x = a.length;
        var y = b.length;
        for (var i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        var i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        var buffer = Buffer2.allocUnsafe(length);
        var pos = 0;
        for (i = 0; i < list.length; ++i) {
          var buf = list[i];
          if (!internalIsBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          }
          buf.copy(buffer, pos);
          pos += buf.length;
        }
        return buffer;
      };
      Buffer2.byteLength = byteLength;
      Buffer2.prototype._isBuffer = true;
      Buffer2.prototype.swap16 = function swap16() {
        var len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (var i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        var len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (var i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        var len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (var i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        var length = this.length | 0;
        if (length === 0)
          return "";
        if (arguments.length === 0)
          return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.equals = function equals(b) {
        if (!internalIsBuffer(b))
          throw new TypeError("Argument must be a Buffer");
        if (this === b)
          return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.compare = function compare2(target, start, end, thisStart, thisEnd) {
        if (!internalIsBuffer(target)) {
          throw new TypeError("Argument must be a Buffer");
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target)
          return 0;
        var x = thisEnd - thisStart;
        var y = end - start;
        var len = Math.min(x, y);
        var thisCopy = this.slice(thisStart, thisEnd);
        var targetCopy = target.slice(start, end);
        for (var i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y)
          return -1;
        if (y < x)
          return 1;
        return 0;
      };
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset | 0;
          if (isFinite(length)) {
            length = length | 0;
            if (encoding === void 0)
              encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        var remaining = this.length - offset;
        if (length === void 0 || length > remaining)
          length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding)
          encoding = "utf8";
        var loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
              return asciiWrite(this, string, offset, length);
            case "latin1":
            case "binary":
              return latin1Write(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase)
                throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      MAX_ARGUMENTS_LENGTH = 4096;
      Buffer2.prototype.slice = function slice(start, end) {
        var len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0)
            start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0)
            end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start)
          end = start;
        var newBuf;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          newBuf = this.subarray(start, end);
          newBuf.__proto__ = Buffer2.prototype;
        } else {
          var sliceLen = end - start;
          newBuf = new Buffer2(sliceLen, void 0);
          for (var i = 0; i < sliceLen; ++i) {
            newBuf[i] = this[i + start];
          }
        }
        return newBuf;
      };
      Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        var val = this[offset + --byteLength2];
        var mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var val = this[offset];
        var mul = 1;
        var i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert)
          checkOffset(offset, byteLength2, this.length);
        var i = byteLength2;
        var mul = 1;
        var val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul)
          val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128))
          return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 2, this.length);
        var val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 4, this.length);
        return ieee754read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        if (!noAssert)
          checkOffset(offset, 8, this.length);
        return ieee754read(this, offset, false, 52, 8);
      };
      Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var mul = 1;
        var i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        byteLength2 = byteLength2 | 0;
        if (!noAssert) {
          var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 255, 0);
        if (!Buffer2.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 65535, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset + 3] = value >>> 24;
          this[offset + 2] = value >>> 16;
          this[offset + 1] = value >>> 8;
          this[offset] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 4294967295, 0);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = 0;
        var mul = 1;
        var sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert) {
          var limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        var i = byteLength2 - 1;
        var mul = 1;
        var sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 1, 127, -128);
        if (!Buffer2.TYPED_ARRAY_SUPPORT)
          value = Math.floor(value);
        if (value < 0)
          value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
        } else {
          objectWriteUInt16(this, value, offset, true);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 2, 32767, -32768);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 8;
          this[offset + 1] = value & 255;
        } else {
          objectWriteUInt16(this, value, offset, false);
        }
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value & 255;
          this[offset + 1] = value >>> 8;
          this[offset + 2] = value >>> 16;
          this[offset + 3] = value >>> 24;
        } else {
          objectWriteUInt32(this, value, offset, true);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset | 0;
        if (!noAssert)
          checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0)
          value = 4294967295 + value + 1;
        if (Buffer2.TYPED_ARRAY_SUPPORT) {
          this[offset] = value >>> 24;
          this[offset + 1] = value >>> 16;
          this[offset + 2] = value >>> 8;
          this[offset + 3] = value & 255;
        } else {
          objectWriteUInt32(this, value, offset, false);
        }
        return offset + 4;
      };
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!start)
          start = 0;
        if (!end && end !== 0)
          end = this.length;
        if (targetStart >= target.length)
          targetStart = target.length;
        if (!targetStart)
          targetStart = 0;
        if (end > 0 && end < start)
          end = start;
        if (end === start)
          return 0;
        if (target.length === 0 || this.length === 0)
          return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (end < 0)
          throw new RangeError("sourceEnd out of bounds");
        if (end > this.length)
          end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        var len = end - start;
        var i;
        if (this === target && start < targetStart && targetStart < end) {
          for (i = len - 1; i >= 0; --i) {
            target[i + targetStart] = this[i + start];
          }
        } else if (len < 1e3 || !Buffer2.TYPED_ARRAY_SUPPORT) {
          for (i = 0; i < len; ++i) {
            target[i + targetStart] = this[i + start];
          }
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, start + len),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (code < 256) {
              val = code;
            }
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
        } else if (typeof val === "number") {
          val = val & 255;
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val)
          val = 0;
        var i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          var bytes = internalIsBuffer(val) ? val : utf8ToBytes(new Buffer2(val, encoding).toString());
          var len = bytes.length;
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
    }
  });

  // node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js
  var init_buffer = __esm({
    "node_modules/@esbuild-plugins/node-globals-polyfill/_buffer.js"() {
      init_Buffer();
    }
  });

  // node_modules/joi/dist/joi-browser.min.js
  var require_joi_browser_min = __commonJS({
    "node_modules/joi/dist/joi-browser.min.js"(exports, module) {
      init_virtual_process_polyfill();
      init_buffer();
      !function(e2, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.joi = t() : e2.joi = t();
      }(self, () => {
        return e2 = { 7629: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(9474), i = r(1687), o = r(8652), l = r(8160), c = r(3292), u = r(6354), f = r(8901), h = r(9708), d = r(6914), m = r(2294), p = r(6133), g = r(1152), y = r(8863), b = r(2036), v = { Base: class {
            constructor(e4) {
              this.type = e4, this.$_root = null, this._definition = {}, this._reset();
            }
            _reset() {
              this._ids = new m.Ids(), this._preferences = null, this._refs = new p.Manager(), this._cache = null, this._valids = null, this._invalids = null, this._flags = {}, this._rules = [], this._singleRules = /* @__PURE__ */ new Map(), this.$_terms = {}, this.$_temp = { ruleset: null, whens: {} };
            }
            describe() {
              return s("function" == typeof h.describe, "Manifest functionality disabled"), h.describe(this);
            }
            allow() {
              for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
                t3[r2] = arguments[r2];
              return l.verifyFlat(t3, "allow"), this._values(t3, "_valids");
            }
            alter(e4) {
              s(e4 && "object" == typeof e4 && !Array.isArray(e4), "Invalid targets argument"), s(!this._inRuleset(), "Cannot set alterations inside a ruleset");
              const t3 = this.clone();
              t3.$_terms.alterations = t3.$_terms.alterations || [];
              for (const r2 in e4) {
                const n2 = e4[r2];
                s("function" == typeof n2, "Alteration adjuster for", r2, "must be a function"), t3.$_terms.alterations.push({ target: r2, adjuster: n2 });
              }
              return t3.$_temp.ruleset = false, t3;
            }
            artifact(e4) {
              return s(void 0 !== e4, "Artifact cannot be undefined"), s(!this._cache, "Cannot set an artifact with a rule cache"), this.$_setFlag("artifact", e4);
            }
            cast(e4) {
              return s(false === e4 || "string" == typeof e4, "Invalid to value"), s(false === e4 || this._definition.cast[e4], "Type", this.type, "does not support casting to", e4), this.$_setFlag("cast", false === e4 ? void 0 : e4);
            }
            default(e4, t3) {
              return this._default("default", e4, t3);
            }
            description(e4) {
              return s(e4 && "string" == typeof e4, "Description must be a non-empty string"), this.$_setFlag("description", e4);
            }
            empty(e4) {
              const t3 = this.clone();
              return void 0 !== e4 && (e4 = t3.$_compile(e4, { override: false })), t3.$_setFlag("empty", e4, { clone: false });
            }
            error(e4) {
              return s(e4, "Missing error"), s(e4 instanceof Error || "function" == typeof e4, "Must provide a valid Error object or a function"), this.$_setFlag("error", e4);
            }
            example(e4) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return s(void 0 !== e4, "Missing example"), l.assertOptions(t3, ["override"]), this._inner("examples", e4, { single: true, override: t3.override });
            }
            external(e4, t3) {
              return "object" == typeof e4 && (s(!t3, "Cannot combine options with description"), t3 = e4.description, e4 = e4.method), s("function" == typeof e4, "Method must be a function"), s(void 0 === t3 || t3 && "string" == typeof t3, "Description must be a non-empty string"), this._inner("externals", { method: e4, description: t3 }, { single: true });
            }
            failover(e4, t3) {
              return this._default("failover", e4, t3);
            }
            forbidden() {
              return this.presence("forbidden");
            }
            id(e4) {
              return e4 ? (s("string" == typeof e4, "id must be a non-empty string"), s(/^[^\.]+$/.test(e4), "id cannot contain period character"), this.$_setFlag("id", e4)) : this.$_setFlag("id", void 0);
            }
            invalid() {
              for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
                t3[r2] = arguments[r2];
              return this._values(t3, "_invalids");
            }
            label(e4) {
              return s(e4 && "string" == typeof e4, "Label name must be a non-empty string"), this.$_setFlag("label", e4);
            }
            meta(e4) {
              return s(void 0 !== e4, "Meta cannot be undefined"), this._inner("metas", e4, { single: true });
            }
            note() {
              for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
                t3[r2] = arguments[r2];
              s(t3.length, "Missing notes");
              for (const e5 of t3)
                s(e5 && "string" == typeof e5, "Notes must be non-empty strings");
              return this._inner("notes", t3);
            }
            only() {
              let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              return s("boolean" == typeof e4, "Invalid mode:", e4), this.$_setFlag("only", e4);
            }
            optional() {
              return this.presence("optional");
            }
            prefs(e4) {
              s(e4, "Missing preferences"), s(void 0 === e4.context, "Cannot override context"), s(void 0 === e4.externals, "Cannot override externals"), s(void 0 === e4.warnings, "Cannot override warnings"), s(void 0 === e4.debug, "Cannot override debug"), l.checkPreferences(e4);
              const t3 = this.clone();
              return t3._preferences = l.preferences(t3._preferences, e4), t3;
            }
            presence(e4) {
              return s(["optional", "required", "forbidden"].includes(e4), "Unknown presence mode", e4), this.$_setFlag("presence", e4);
            }
            raw() {
              let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              return this.$_setFlag("result", e4 ? "raw" : void 0);
            }
            result(e4) {
              return s(["raw", "strip"].includes(e4), "Unknown result mode", e4), this.$_setFlag("result", e4);
            }
            required() {
              return this.presence("required");
            }
            strict(e4) {
              const t3 = this.clone(), r2 = void 0 !== e4 && !e4;
              return t3._preferences = l.preferences(t3._preferences, { convert: r2 }), t3;
            }
            strip() {
              let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
              return this.$_setFlag("result", e4 ? "strip" : void 0);
            }
            tag() {
              for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
                t3[r2] = arguments[r2];
              s(t3.length, "Missing tags");
              for (const e5 of t3)
                s(e5 && "string" == typeof e5, "Tags must be non-empty strings");
              return this._inner("tags", t3);
            }
            unit(e4) {
              return s(e4 && "string" == typeof e4, "Unit name must be a non-empty string"), this.$_setFlag("unit", e4);
            }
            valid() {
              for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
                t3[r2] = arguments[r2];
              l.verifyFlat(t3, "valid");
              const s2 = this.allow(...t3);
              return s2.$_setFlag("only", !!s2._valids, { clone: false }), s2;
            }
            when(e4, t3) {
              const r2 = this.clone();
              r2.$_terms.whens || (r2.$_terms.whens = []);
              const n2 = c.when(r2, e4, t3);
              if (!["any", "link"].includes(r2.type)) {
                const e5 = n2.is ? [n2] : n2.switch;
                for (const t4 of e5)
                  s(!t4.then || "any" === t4.then.type || t4.then.type === r2.type, "Cannot combine", r2.type, "with", t4.then && t4.then.type), s(!t4.otherwise || "any" === t4.otherwise.type || t4.otherwise.type === r2.type, "Cannot combine", r2.type, "with", t4.otherwise && t4.otherwise.type);
              }
              return r2.$_terms.whens.push(n2), r2.$_mutateRebuild();
            }
            cache(e4) {
              s(!this._inRuleset(), "Cannot set caching inside a ruleset"), s(!this._cache, "Cannot override schema cache"), s(void 0 === this._flags.artifact, "Cannot cache a rule with an artifact");
              const t3 = this.clone();
              return t3._cache = e4 || o.provider.provision(), t3.$_temp.ruleset = false, t3;
            }
            clone() {
              const e4 = Object.create(Object.getPrototypeOf(this));
              return this._assign(e4);
            }
            concat(e4) {
              s(l.isSchema(e4), "Invalid schema object"), s("any" === this.type || "any" === e4.type || e4.type === this.type, "Cannot merge type", this.type, "with another type:", e4.type), s(!this._inRuleset(), "Cannot concatenate onto a schema with open ruleset"), s(!e4._inRuleset(), "Cannot concatenate a schema with open ruleset");
              let t3 = this.clone();
              if ("any" === this.type && "any" !== e4.type) {
                const r2 = e4.clone();
                for (const e5 of Object.keys(t3))
                  "type" !== e5 && (r2[e5] = t3[e5]);
                t3 = r2;
              }
              t3._ids.concat(e4._ids), t3._refs.register(e4, p.toSibling), t3._preferences = t3._preferences ? l.preferences(t3._preferences, e4._preferences) : e4._preferences, t3._valids = b.merge(t3._valids, e4._valids, e4._invalids), t3._invalids = b.merge(t3._invalids, e4._invalids, e4._valids);
              for (const r2 of e4._singleRules.keys())
                t3._singleRules.has(r2) && (t3._rules = t3._rules.filter((e5) => e5.keep || e5.name !== r2), t3._singleRules.delete(r2));
              for (const r2 of e4._rules)
                e4._definition.rules[r2.method].multi || t3._singleRules.set(r2.name, r2), t3._rules.push(r2);
              if (t3._flags.empty && e4._flags.empty) {
                t3._flags.empty = t3._flags.empty.concat(e4._flags.empty);
                const r2 = Object.assign({}, e4._flags);
                delete r2.empty, i(t3._flags, r2);
              } else if (e4._flags.empty) {
                t3._flags.empty = e4._flags.empty;
                const r2 = Object.assign({}, e4._flags);
                delete r2.empty, i(t3._flags, r2);
              } else
                i(t3._flags, e4._flags);
              for (const r2 in e4.$_terms) {
                const s2 = e4.$_terms[r2];
                s2 ? t3.$_terms[r2] ? t3.$_terms[r2] = t3.$_terms[r2].concat(s2) : t3.$_terms[r2] = s2.slice() : t3.$_terms[r2] || (t3.$_terms[r2] = s2);
              }
              return this.$_root._tracer && this.$_root._tracer._combine(t3, [this, e4]), t3.$_mutateRebuild();
            }
            extend(e4) {
              return s(!e4.base, "Cannot extend type with another base"), f.type(this, e4);
            }
            extract(e4) {
              return e4 = Array.isArray(e4) ? e4 : e4.split("."), this._ids.reach(e4);
            }
            fork(e4, t3) {
              s(!this._inRuleset(), "Cannot fork inside a ruleset");
              let r2 = this;
              for (let s2 of [].concat(e4))
                s2 = Array.isArray(s2) ? s2 : s2.split("."), r2 = r2._ids.fork(s2, t3, r2);
              return r2.$_temp.ruleset = false, r2;
            }
            rule(e4) {
              const t3 = this._definition;
              l.assertOptions(e4, Object.keys(t3.modifiers)), s(false !== this.$_temp.ruleset, "Cannot apply rules to empty ruleset or the last rule added does not support rule properties");
              const r2 = null === this.$_temp.ruleset ? this._rules.length - 1 : this.$_temp.ruleset;
              s(r2 >= 0 && r2 < this._rules.length, "Cannot apply rules to empty ruleset");
              const a2 = this.clone();
              for (let i2 = r2; i2 < a2._rules.length; ++i2) {
                const r3 = a2._rules[i2], o2 = n(r3);
                for (const n2 in e4)
                  t3.modifiers[n2](o2, e4[n2]), s(o2.name === r3.name, "Cannot change rule name");
                a2._rules[i2] = o2, a2._singleRules.get(o2.name) === r3 && a2._singleRules.set(o2.name, o2);
              }
              return a2.$_temp.ruleset = false, a2.$_mutateRebuild();
            }
            get ruleset() {
              s(!this._inRuleset(), "Cannot start a new ruleset without closing the previous one");
              const e4 = this.clone();
              return e4.$_temp.ruleset = e4._rules.length, e4;
            }
            get $() {
              return this.ruleset;
            }
            tailor(e4) {
              e4 = [].concat(e4), s(!this._inRuleset(), "Cannot tailor inside a ruleset");
              let t3 = this;
              if (this.$_terms.alterations)
                for (const { target: r2, adjuster: n2 } of this.$_terms.alterations)
                  e4.includes(r2) && (t3 = n2(t3), s(l.isSchema(t3), "Alteration adjuster for", r2, "failed to return a schema object"));
              return t3 = t3.$_modify({ each: (t4) => t4.tailor(e4), ref: false }), t3.$_temp.ruleset = false, t3.$_mutateRebuild();
            }
            tracer() {
              return g.location ? g.location(this) : this;
            }
            validate(e4, t3) {
              return y.entry(e4, this, t3);
            }
            validateAsync(e4, t3) {
              return y.entryAsync(e4, this, t3);
            }
            $_addRule(e4) {
              "string" == typeof e4 && (e4 = { name: e4 }), s(e4 && "object" == typeof e4, "Invalid options"), s(e4.name && "string" == typeof e4.name, "Invalid rule name");
              for (const t4 in e4)
                s("_" !== t4[0], "Cannot set private rule properties");
              const t3 = Object.assign({}, e4);
              t3._resolve = [], t3.method = t3.method || t3.name;
              const r2 = this._definition.rules[t3.method], n2 = t3.args;
              s(r2, "Unknown rule", t3.method);
              const a2 = this.clone();
              if (n2) {
                s(1 === Object.keys(n2).length || Object.keys(n2).length === this._definition.rules[t3.name].args.length, "Invalid rule definition for", this.type, t3.name);
                for (const e5 in n2) {
                  let i2 = n2[e5];
                  if (r2.argsByName) {
                    const o2 = r2.argsByName.get(e5);
                    if (o2.ref && l.isResolvable(i2))
                      t3._resolve.push(e5), a2.$_mutateRegister(i2);
                    else if (o2.normalize && (i2 = o2.normalize(i2), n2[e5] = i2), o2.assert) {
                      const t4 = l.validateArg(i2, e5, o2);
                      s(!t4, t4, "or reference");
                    }
                  }
                  void 0 !== i2 ? n2[e5] = i2 : delete n2[e5];
                }
              }
              return r2.multi || (a2._ruleRemove(t3.name, { clone: false }), a2._singleRules.set(t3.name, t3)), false === a2.$_temp.ruleset && (a2.$_temp.ruleset = null), r2.priority ? a2._rules.unshift(t3) : a2._rules.push(t3), a2;
            }
            $_compile(e4, t3) {
              return c.schema(this.$_root, e4, t3);
            }
            $_createError(e4, t3, r2, s2, n2) {
              let a2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
              const i2 = false !== a2.flags ? this._flags : {}, o2 = a2.messages ? d.merge(this._definition.messages, a2.messages) : this._definition.messages;
              return new u.Report(e4, t3, r2, i2, o2, s2, n2);
            }
            $_getFlag(e4) {
              return this._flags[e4];
            }
            $_getRule(e4) {
              return this._singleRules.get(e4);
            }
            $_mapLabels(e4) {
              return e4 = Array.isArray(e4) ? e4 : e4.split("."), this._ids.labels(e4);
            }
            $_match(e4, t3, r2, s2) {
              (r2 = Object.assign({}, r2)).abortEarly = true, r2._externals = false, t3.snapshot();
              const n2 = !y.validate(e4, this, t3, r2, s2).errors;
              return t3.restore(), n2;
            }
            $_modify(e4) {
              return l.assertOptions(e4, ["each", "once", "ref", "schema"]), m.schema(this, e4) || this;
            }
            $_mutateRebuild() {
              return s(!this._inRuleset(), "Cannot add this rule inside a ruleset"), this._refs.reset(), this._ids.reset(), this.$_modify({ each: (e4, t3) => {
                let { source: r2, name: s2, path: n2, key: a2 } = t3;
                const i2 = this._definition[r2][s2] && this._definition[r2][s2].register;
                false !== i2 && this.$_mutateRegister(e4, { family: i2, key: a2 });
              } }), this._definition.rebuild && this._definition.rebuild(this), this.$_temp.ruleset = false, this;
            }
            $_mutateRegister(e4) {
              let { family: t3, key: r2 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              this._refs.register(e4, t3), this._ids.register(e4, { key: r2 });
            }
            $_property(e4) {
              return this._definition.properties[e4];
            }
            $_reach(e4) {
              return this._ids.reach(e4);
            }
            $_rootReferences() {
              return this._refs.roots();
            }
            $_setFlag(e4, t3) {
              let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              s("_" === e4[0] || !this._inRuleset(), "Cannot set flag inside a ruleset");
              const n2 = this._definition.flags[e4] || {};
              if (a(t3, n2.default) && (t3 = void 0), a(t3, this._flags[e4]))
                return this;
              const i2 = false !== r2.clone ? this.clone() : this;
              return void 0 !== t3 ? (i2._flags[e4] = t3, i2.$_mutateRegister(t3)) : delete i2._flags[e4], "_" !== e4[0] && (i2.$_temp.ruleset = false), i2;
            }
            $_parent(e4) {
              for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), s2 = 1; s2 < t3; s2++)
                r2[s2 - 1] = arguments[s2];
              return this[e4][l.symbols.parent].call(this, ...r2);
            }
            $_validate(e4, t3, r2) {
              return y.validate(e4, this, t3, r2);
            }
            _assign(e4) {
              e4.type = this.type, e4.$_root = this.$_root, e4.$_temp = Object.assign({}, this.$_temp), e4.$_temp.whens = {}, e4._ids = this._ids.clone(), e4._preferences = this._preferences, e4._valids = this._valids && this._valids.clone(), e4._invalids = this._invalids && this._invalids.clone(), e4._rules = this._rules.slice(), e4._singleRules = n(this._singleRules, { shallow: true }), e4._refs = this._refs.clone(), e4._flags = Object.assign({}, this._flags), e4._cache = null, e4.$_terms = {};
              for (const t3 in this.$_terms)
                e4.$_terms[t3] = this.$_terms[t3] ? this.$_terms[t3].slice() : null;
              e4.$_super = {};
              for (const t3 in this.$_super)
                e4.$_super[t3] = this._super[t3].bind(e4);
              return e4;
            }
            _bare() {
              const e4 = this.clone();
              e4._reset();
              const t3 = e4._definition.terms;
              for (const r2 in t3) {
                const s2 = t3[r2];
                e4.$_terms[r2] = s2.init;
              }
              return e4.$_mutateRebuild();
            }
            _default(e4, t3) {
              let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              return l.assertOptions(r2, "literal"), s(void 0 !== t3, "Missing", e4, "value"), s("function" == typeof t3 || !r2.literal, "Only function value supports literal option"), "function" == typeof t3 && r2.literal && (t3 = { [l.symbols.literal]: true, literal: t3 }), this.$_setFlag(e4, t3);
            }
            _generate(e4, t3, r2) {
              if (!this.$_terms.whens)
                return { schema: this };
              const s2 = [], n2 = [];
              for (let a3 = 0; a3 < this.$_terms.whens.length; ++a3) {
                const i3 = this.$_terms.whens[a3];
                if (i3.concat) {
                  s2.push(i3.concat), n2.push(`${a3}.concat`);
                  continue;
                }
                const o2 = i3.ref ? i3.ref.resolve(e4, t3, r2) : e4, l2 = i3.is ? [i3] : i3.switch, c2 = n2.length;
                for (let c3 = 0; c3 < l2.length; ++c3) {
                  const { is: u2, then: f2, otherwise: h2 } = l2[c3], d2 = `${a3}${i3.switch ? "." + c3 : ""}`;
                  if (u2.$_match(o2, t3.nest(u2, `${d2}.is`), r2)) {
                    if (f2) {
                      const a4 = t3.localize([...t3.path, `${d2}.then`], t3.ancestors, t3.schemas), { schema: i4, id: o3 } = f2._generate(e4, a4, r2);
                      s2.push(i4), n2.push(`${d2}.then${o3 ? `(${o3})` : ""}`);
                      break;
                    }
                  } else if (h2) {
                    const a4 = t3.localize([...t3.path, `${d2}.otherwise`], t3.ancestors, t3.schemas), { schema: i4, id: o3 } = h2._generate(e4, a4, r2);
                    s2.push(i4), n2.push(`${d2}.otherwise${o3 ? `(${o3})` : ""}`);
                    break;
                  }
                }
                if (i3.break && n2.length > c2)
                  break;
              }
              const a2 = n2.join(", ");
              if (t3.mainstay.tracer.debug(t3, "rule", "when", a2), !a2)
                return { schema: this };
              if (!t3.mainstay.tracer.active && this.$_temp.whens[a2])
                return { schema: this.$_temp.whens[a2], id: a2 };
              let i2 = this;
              this._definition.generate && (i2 = this._definition.generate(this, e4, t3, r2));
              for (const e5 of s2)
                i2 = i2.concat(e5);
              return this.$_root._tracer && this.$_root._tracer._combine(i2, [this, ...s2]), this.$_temp.whens[a2] = i2, { schema: i2, id: a2 };
            }
            _inner(e4, t3) {
              let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
              s(!this._inRuleset(), `Cannot set ${e4} inside a ruleset`);
              const n2 = this.clone();
              return n2.$_terms[e4] && !r2.override || (n2.$_terms[e4] = []), r2.single ? n2.$_terms[e4].push(t3) : n2.$_terms[e4].push(...t3), n2.$_temp.ruleset = false, n2;
            }
            _inRuleset() {
              return null !== this.$_temp.ruleset && false !== this.$_temp.ruleset;
            }
            _ruleRemove(e4) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if (!this._singleRules.has(e4))
                return this;
              const r2 = false !== t3.clone ? this.clone() : this;
              r2._singleRules.delete(e4);
              const s2 = [];
              for (let t4 = 0; t4 < r2._rules.length; ++t4) {
                const n2 = r2._rules[t4];
                n2.name !== e4 || n2.keep ? s2.push(n2) : r2._inRuleset() && t4 < r2.$_temp.ruleset && --r2.$_temp.ruleset;
              }
              return r2._rules = s2, r2;
            }
            _values(e4, t3) {
              l.verifyFlat(e4, t3.slice(1, -1));
              const r2 = this.clone(), n2 = e4[0] === l.symbols.override;
              if (n2 && (e4 = e4.slice(1)), !r2[t3] && e4.length ? r2[t3] = new b() : n2 && (r2[t3] = e4.length ? new b() : null, r2.$_mutateRebuild()), !r2[t3])
                return r2;
              n2 && r2[t3].override();
              for (const n3 of e4) {
                s(void 0 !== n3, "Cannot call allow/valid/invalid with undefined"), s(n3 !== l.symbols.override, "Override must be the first value");
                const e5 = "_invalids" === t3 ? "_valids" : "_invalids";
                r2[e5] && (r2[e5].remove(n3), r2[e5].length || (s("_valids" === t3 || !r2._flags.only, "Setting invalid value", n3, "leaves schema rejecting all values due to previous valid rule"), r2[e5] = null)), r2[t3].add(n3, r2._refs);
              }
              return r2;
            }
          } };
          v.Base.prototype[l.symbols.any] = { version: l.version, compile: c.compile, root: "$_root" }, v.Base.prototype.isImmutable = true, v.Base.prototype.deny = v.Base.prototype.invalid, v.Base.prototype.disallow = v.Base.prototype.invalid, v.Base.prototype.equal = v.Base.prototype.valid, v.Base.prototype.exist = v.Base.prototype.required, v.Base.prototype.not = v.Base.prototype.invalid, v.Base.prototype.options = v.Base.prototype.prefs, v.Base.prototype.preferences = v.Base.prototype.prefs, e3.exports = new v.Base();
        }, 8652: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(8160), i = { max: 1e3, supported: /* @__PURE__ */ new Set(["undefined", "boolean", "number", "string"]) };
          t2.provider = { provision: (e4) => new i.Cache(e4) }, i.Cache = class {
            constructor() {
              let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              a.assertOptions(e4, ["max"]), s(void 0 === e4.max || e4.max && e4.max > 0 && isFinite(e4.max), "Invalid max cache size"), this._max = e4.max || i.max, this._map = /* @__PURE__ */ new Map(), this._list = new i.List();
            }
            get length() {
              return this._map.size;
            }
            set(e4, t3) {
              if (null !== e4 && !i.supported.has(typeof e4))
                return;
              let r2 = this._map.get(e4);
              if (r2)
                return r2.value = t3, void this._list.first(r2);
              r2 = this._list.unshift({ key: e4, value: t3 }), this._map.set(e4, r2), this._compact();
            }
            get(e4) {
              const t3 = this._map.get(e4);
              if (t3)
                return this._list.first(t3), n(t3.value);
            }
            _compact() {
              if (this._map.size > this._max) {
                const e4 = this._list.pop();
                this._map.delete(e4.key);
              }
            }
          }, i.List = class {
            constructor() {
              this.tail = null, this.head = null;
            }
            unshift(e4) {
              return e4.next = null, e4.prev = this.head, this.head && (this.head.next = e4), this.head = e4, this.tail || (this.tail = e4), e4;
            }
            first(e4) {
              e4 !== this.head && (this._remove(e4), this.unshift(e4));
            }
            pop() {
              return this._remove(this.tail);
            }
            _remove(e4) {
              const { next: t3, prev: r2 } = e4;
              return t3.prev = r2, r2 && (r2.next = t3), e4 === this.tail && (this.tail = t3), e4.prev = null, e4.next = null, e4;
            }
          };
        }, 8160: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(7916), a = r(5934);
          let i, o;
          const l = { isoDate: /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/ };
          t2.version = a.version, t2.defaults = { abortEarly: true, allowUnknown: false, artifacts: false, cache: true, context: null, convert: true, dateFormat: "iso", errors: { escapeHtml: false, label: "path", language: null, render: true, stack: false, wrap: { label: '"', array: "[]" } }, externals: true, messages: {}, nonEnumerables: false, noDefaults: false, presence: "optional", skipFunctions: false, stripUnknown: false, warnings: false }, t2.symbols = { any: Symbol.for("@hapi/joi/schema"), arraySingle: Symbol("arraySingle"), deepDefault: Symbol("deepDefault"), errors: Symbol("errors"), literal: Symbol("literal"), override: Symbol("override"), parent: Symbol("parent"), prefs: Symbol("prefs"), ref: Symbol("ref"), template: Symbol("template"), values: Symbol("values") }, t2.assertOptions = function(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "Options";
            s(e4 && "object" == typeof e4 && !Array.isArray(e4), "Options must be of type object");
            const n2 = Object.keys(e4).filter((e5) => !t3.includes(e5));
            s(0 === n2.length, `${r2} contain unknown keys: ${n2}`);
          }, t2.checkPreferences = function(e4) {
            o = o || r(3378);
            const t3 = o.preferences.validate(e4);
            if (t3.error)
              throw new n([t3.error.details[0].message]);
          }, t2.compare = function(e4, t3, r2) {
            switch (r2) {
              case "=":
                return e4 === t3;
              case ">":
                return e4 > t3;
              case "<":
                return e4 < t3;
              case ">=":
                return e4 >= t3;
              case "<=":
                return e4 <= t3;
            }
          }, t2.default = function(e4, t3) {
            return void 0 === e4 ? t3 : e4;
          }, t2.isIsoDate = function(e4) {
            return l.isoDate.test(e4);
          }, t2.isNumber = function(e4) {
            return "number" == typeof e4 && !isNaN(e4);
          }, t2.isResolvable = function(e4) {
            return !!e4 && (e4[t2.symbols.ref] || e4[t2.symbols.template]);
          }, t2.isSchema = function(e4) {
            let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            const n2 = e4 && e4[t2.symbols.any];
            return !!n2 && (s(r2.legacy || n2.version === t2.version, "Cannot mix different versions of joi schemas"), true);
          }, t2.isValues = function(e4) {
            return e4[t2.symbols.values];
          }, t2.limit = function(e4) {
            return Number.isSafeInteger(e4) && e4 >= 0;
          }, t2.preferences = function(e4, s2) {
            i = i || r(6914), e4 = e4 || {}, s2 = s2 || {};
            const n2 = Object.assign({}, e4, s2);
            return s2.errors && e4.errors && (n2.errors = Object.assign({}, e4.errors, s2.errors), n2.errors.wrap = Object.assign({}, e4.errors.wrap, s2.errors.wrap)), s2.messages && (n2.messages = i.compile(s2.messages, e4.messages)), delete n2[t2.symbols.prefs], n2;
          }, t2.tryWithPath = function(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            try {
              return e4();
            } catch (e5) {
              throw void 0 !== e5.path ? e5.path = t3 + "." + e5.path : e5.path = t3, r2.append && (e5.message = `${e5.message} (${e5.path})`), e5;
            }
          }, t2.validateArg = function(e4, r2, s2) {
            let { assert: n2, message: a2 } = s2;
            if (t2.isSchema(n2)) {
              const t3 = n2.validate(e4);
              if (!t3.error)
                return;
              return t3.error.message;
            }
            if (!n2(e4))
              return r2 ? `${r2} ${a2}` : a2;
          }, t2.verifyFlat = function(e4, t3) {
            for (const r2 of e4)
              s(!Array.isArray(r2), "Method no longer accepts array arguments:", t3);
          };
        }, 3292: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8160), a = r(6133), i = {};
          t2.schema = function(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            n.assertOptions(r2, ["appendPath", "override"]);
            try {
              return i.schema(e4, t3, r2);
            } catch (e5) {
              throw r2.appendPath && void 0 !== e5.path && (e5.message = `${e5.message} (${e5.path})`), e5;
            }
          }, i.schema = function(e4, t3, r2) {
            s(void 0 !== t3, "Invalid undefined schema"), Array.isArray(t3) && (s(t3.length, "Invalid empty array schema"), 1 === t3.length && (t3 = t3[0]));
            const a2 = function(t4) {
              for (var s2 = arguments.length, n2 = new Array(s2 > 1 ? s2 - 1 : 0), a3 = 1; a3 < s2; a3++)
                n2[a3 - 1] = arguments[a3];
              return false !== r2.override ? t4.valid(e4.override, ...n2) : t4.valid(...n2);
            };
            if (i.simple(t3))
              return a2(e4, t3);
            if ("function" == typeof t3)
              return e4.custom(t3);
            if (s("object" == typeof t3, "Invalid schema content:", typeof t3), n.isResolvable(t3))
              return a2(e4, t3);
            if (n.isSchema(t3))
              return t3;
            if (Array.isArray(t3)) {
              for (const r3 of t3)
                if (!i.simple(r3))
                  return e4.alternatives().try(...t3);
              return a2(e4, ...t3);
            }
            return t3 instanceof RegExp ? e4.string().regex(t3) : t3 instanceof Date ? a2(e4.date(), t3) : (s(Object.getPrototypeOf(t3) === Object.getPrototypeOf({}), "Schema can only contain plain objects"), e4.object().keys(t3));
          }, t2.ref = function(e4, t3) {
            return a.isRef(e4) ? e4 : a.create(e4, t3);
          }, t2.compile = function(e4, r2) {
            let a2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            n.assertOptions(a2, ["legacy"]);
            const o = r2 && r2[n.symbols.any];
            if (o)
              return s(a2.legacy || o.version === n.version, "Cannot mix different versions of joi schemas:", o.version, n.version), r2;
            if ("object" != typeof r2 || !a2.legacy)
              return t2.schema(e4, r2, { appendPath: true });
            const l = i.walk(r2);
            return l ? l.compile(l.root, r2) : t2.schema(e4, r2, { appendPath: true });
          }, i.walk = function(e4) {
            if ("object" != typeof e4)
              return null;
            if (Array.isArray(e4)) {
              for (const t4 of e4) {
                const e5 = i.walk(t4);
                if (e5)
                  return e5;
              }
              return null;
            }
            const t3 = e4[n.symbols.any];
            if (t3)
              return { root: e4[t3.root], compile: t3.compile };
            s(Object.getPrototypeOf(e4) === Object.getPrototypeOf({}), "Schema can only contain plain objects");
            for (const t4 in e4) {
              const r2 = i.walk(e4[t4]);
              if (r2)
                return r2;
            }
            return null;
          }, i.simple = function(e4) {
            return null === e4 || ["boolean", "string", "number"].includes(typeof e4);
          }, t2.when = function(e4, r2, o) {
            if (void 0 === o && (s(r2 && "object" == typeof r2, "Missing options"), o = r2, r2 = a.create(".")), Array.isArray(o) && (o = { switch: o }), n.assertOptions(o, ["is", "not", "then", "otherwise", "switch", "break"]), n.isSchema(r2))
              return s(void 0 === o.is, '"is" can not be used with a schema condition'), s(void 0 === o.not, '"not" can not be used with a schema condition'), s(void 0 === o.switch, '"switch" can not be used with a schema condition'), i.condition(e4, { is: r2, then: o.then, otherwise: o.otherwise, break: o.break });
            if (s(a.isRef(r2) || "string" == typeof r2, "Invalid condition:", r2), s(void 0 === o.not || void 0 === o.is, 'Cannot combine "is" with "not"'), void 0 === o.switch) {
              let l2 = o;
              void 0 !== o.not && (l2 = { is: o.not, then: o.otherwise, otherwise: o.then, break: o.break });
              let c = void 0 !== l2.is ? e4.$_compile(l2.is) : e4.$_root.invalid(null, false, 0, "").required();
              return s(void 0 !== l2.then || void 0 !== l2.otherwise, 'options must have at least one of "then", "otherwise", or "switch"'), s(void 0 === l2.break || void 0 === l2.then || void 0 === l2.otherwise, "Cannot specify then, otherwise, and break all together"), void 0 === o.is || a.isRef(o.is) || n.isSchema(o.is) || (c = c.required()), i.condition(e4, { ref: t2.ref(r2), is: c, then: l2.then, otherwise: l2.otherwise, break: l2.break });
            }
            s(Array.isArray(o.switch), '"switch" must be an array'), s(void 0 === o.is, 'Cannot combine "switch" with "is"'), s(void 0 === o.not, 'Cannot combine "switch" with "not"'), s(void 0 === o.then, 'Cannot combine "switch" with "then"');
            const l = { ref: t2.ref(r2), switch: [], break: o.break };
            for (let t3 = 0; t3 < o.switch.length; ++t3) {
              const r3 = o.switch[t3], i2 = t3 === o.switch.length - 1;
              n.assertOptions(r3, i2 ? ["is", "then", "otherwise"] : ["is", "then"]), s(void 0 !== r3.is, 'Switch statement missing "is"'), s(void 0 !== r3.then, 'Switch statement missing "then"');
              const c = { is: e4.$_compile(r3.is), then: e4.$_compile(r3.then) };
              if (a.isRef(r3.is) || n.isSchema(r3.is) || (c.is = c.is.required()), i2) {
                s(void 0 === o.otherwise || void 0 === r3.otherwise, 'Cannot specify "otherwise" inside and outside a "switch"');
                const t4 = void 0 !== o.otherwise ? o.otherwise : r3.otherwise;
                void 0 !== t4 && (s(void 0 === l.break, "Cannot specify both otherwise and break"), c.otherwise = e4.$_compile(t4));
              }
              l.switch.push(c);
            }
            return l;
          }, i.condition = function(e4, t3) {
            for (const r2 of ["then", "otherwise"])
              void 0 === t3[r2] ? delete t3[r2] : t3[r2] = e4.$_compile(t3[r2]);
            return t3;
          };
        }, 6354: (e3, t2, r) => {
          "use strict";
          const s = r(5688), n = r(8160), a = r(3328);
          t2.Report = class {
            constructor(e4, r2, s2, n2, a2, i, o) {
              if (this.code = e4, this.flags = n2, this.messages = a2, this.path = i.path, this.prefs = o, this.state = i, this.value = r2, this.message = null, this.template = null, this.local = s2 || {}, this.local.label = t2.label(this.flags, this.state, this.prefs, this.messages), void 0 === this.value || this.local.hasOwnProperty("value") || (this.local.value = this.value), this.path.length) {
                const e5 = this.path[this.path.length - 1];
                "object" != typeof e5 && (this.local.key = e5);
              }
            }
            _setTemplate(e4) {
              if (this.template = e4, !this.flags.label && 0 === this.path.length) {
                const e5 = this._template(this.template, "root");
                e5 && (this.local.label = e5);
              }
            }
            toString() {
              if (this.message)
                return this.message;
              const e4 = this.code;
              if (!this.prefs.errors.render)
                return this.code;
              const t3 = this._template(this.template) || this._template(this.prefs.messages) || this._template(this.messages);
              return void 0 === t3 ? `Error code "${e4}" is not defined, your custom type is missing the correct messages definition` : (this.message = t3.render(this.value, this.state, this.prefs, this.local, { errors: this.prefs.errors, messages: [this.prefs.messages, this.messages] }), this.prefs.errors.label || (this.message = this.message.replace(/^"" /, "").trim()), this.message);
            }
            _template(e4, r2) {
              return t2.template(this.value, e4, r2 || this.code, this.state, this.prefs);
            }
          }, t2.path = function(e4) {
            let t3 = "";
            for (const r2 of e4)
              "object" != typeof r2 && ("string" == typeof r2 ? (t3 && (t3 += "."), t3 += r2) : t3 += `[${r2}]`);
            return t3;
          }, t2.template = function(e4, t3, r2, s2, i) {
            if (!t3)
              return;
            if (a.isTemplate(t3))
              return "root" !== r2 ? t3 : null;
            let o = i.errors.language;
            if (n.isResolvable(o) && (o = o.resolve(e4, s2, i)), o && t3[o]) {
              if (void 0 !== t3[o][r2])
                return t3[o][r2];
              if (void 0 !== t3[o]["*"])
                return t3[o]["*"];
            }
            return t3[r2] ? t3[r2] : t3["*"];
          }, t2.label = function(e4, r2, s2, n2) {
            if (e4.label)
              return e4.label;
            if (!s2.errors.label)
              return "";
            let a2 = r2.path;
            "key" === s2.errors.label && r2.path.length > 1 && (a2 = r2.path.slice(-1));
            return t2.path(a2) || t2.template(null, s2.messages, "root", r2, s2) || n2 && t2.template(null, n2, "root", r2, s2) || "value";
          }, t2.process = function(e4, r2, s2) {
            if (!e4)
              return null;
            const { override: n2, message: a2, details: i } = t2.details(e4);
            if (n2)
              return n2;
            if (s2.errors.stack)
              return new t2.ValidationError(a2, i, r2);
            const o = Error.stackTraceLimit;
            Error.stackTraceLimit = 0;
            const l = new t2.ValidationError(a2, i, r2);
            return Error.stackTraceLimit = o, l;
          }, t2.details = function(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = [];
            const s2 = [];
            for (const n2 of e4) {
              if (n2 instanceof Error) {
                if (false !== t3.override)
                  return { override: n2 };
                const e6 = n2.toString();
                r2.push(e6), s2.push({ message: e6, type: "override", context: { error: n2 } });
                continue;
              }
              const e5 = n2.toString();
              r2.push(e5), s2.push({ message: e5, path: n2.path.filter((e6) => "object" != typeof e6), type: n2.code, context: n2.local });
            }
            return r2.length > 1 && (r2 = [...new Set(r2)]), { message: r2.join(". "), details: s2 };
          }, t2.ValidationError = class extends Error {
            constructor(e4, t3, r2) {
              super(e4), this._original = r2, this.details = t3;
            }
            static isError(e4) {
              return e4 instanceof t2.ValidationError;
            }
          }, t2.ValidationError.prototype.isJoi = true, t2.ValidationError.prototype.name = "ValidationError", t2.ValidationError.prototype.annotate = s.error;
        }, 8901: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(8160), i = r(6914), o = {};
          t2.type = function(e4, t3) {
            const r2 = Object.getPrototypeOf(e4), l = n(r2), c = e4._assign(Object.create(l)), u = Object.assign({}, t3);
            delete u.base, l._definition = u;
            const f = r2._definition || {};
            u.messages = i.merge(f.messages, u.messages), u.properties = Object.assign({}, f.properties, u.properties), c.type = u.type, u.flags = Object.assign({}, f.flags, u.flags);
            const h = Object.assign({}, f.terms);
            if (u.terms)
              for (const e5 in u.terms) {
                const t4 = u.terms[e5];
                s(void 0 === c.$_terms[e5], "Invalid term override for", u.type, e5), c.$_terms[e5] = t4.init, h[e5] = t4;
              }
            u.terms = h, u.args || (u.args = f.args), u.prepare = o.prepare(u.prepare, f.prepare), u.coerce && ("function" == typeof u.coerce && (u.coerce = { method: u.coerce }), u.coerce.from && !Array.isArray(u.coerce.from) && (u.coerce = { method: u.coerce.method, from: [].concat(u.coerce.from) })), u.coerce = o.coerce(u.coerce, f.coerce), u.validate = o.validate(u.validate, f.validate);
            const d = Object.assign({}, f.rules);
            if (u.rules)
              for (const e5 in u.rules) {
                const t4 = u.rules[e5];
                s("object" == typeof t4, "Invalid rule definition for", u.type, e5);
                let r3 = t4.method;
                if (void 0 === r3 && (r3 = function() {
                  return this.$_addRule(e5);
                }), r3 && (s(!l[e5], "Rule conflict in", u.type, e5), l[e5] = r3), s(!d[e5], "Rule conflict in", u.type, e5), d[e5] = t4, t4.alias) {
                  const e6 = [].concat(t4.alias);
                  for (const r4 of e6)
                    l[r4] = t4.method;
                }
                t4.args && (t4.argsByName = /* @__PURE__ */ new Map(), t4.args = t4.args.map((e6) => ("string" == typeof e6 && (e6 = { name: e6 }), s(!t4.argsByName.has(e6.name), "Duplicated argument name", e6.name), a.isSchema(e6.assert) && (e6.assert = e6.assert.strict().label(e6.name)), t4.argsByName.set(e6.name, e6), e6)));
              }
            u.rules = d;
            const m = Object.assign({}, f.modifiers);
            if (u.modifiers)
              for (const e5 in u.modifiers) {
                s(!l[e5], "Rule conflict in", u.type, e5);
                const t4 = u.modifiers[e5];
                s("function" == typeof t4, "Invalid modifier definition for", u.type, e5);
                const r3 = function(t5) {
                  return this.rule({ [e5]: t5 });
                };
                l[e5] = r3, m[e5] = t4;
              }
            if (u.modifiers = m, u.overrides) {
              l._super = r2, c.$_super = {};
              for (const e5 in u.overrides)
                s(r2[e5], "Cannot override missing", e5), u.overrides[e5][a.symbols.parent] = r2[e5], c.$_super[e5] = r2[e5].bind(c);
              Object.assign(l, u.overrides);
            }
            u.cast = Object.assign({}, f.cast, u.cast);
            const p = Object.assign({}, f.manifest, u.manifest);
            return p.build = o.build(u.manifest && u.manifest.build, f.manifest && f.manifest.build), u.manifest = p, u.rebuild = o.rebuild(u.rebuild, f.rebuild), c;
          }, o.build = function(e4, t3) {
            return e4 && t3 ? function(r2, s2) {
              return t3(e4(r2, s2), s2);
            } : e4 || t3;
          }, o.coerce = function(e4, t3) {
            return e4 && t3 ? { from: e4.from && t3.from ? [.../* @__PURE__ */ new Set([...e4.from, ...t3.from])] : null, method(r2, s2) {
              let n2;
              if ((!t3.from || t3.from.includes(typeof r2)) && (n2 = t3.method(r2, s2), n2)) {
                if (n2.errors || void 0 === n2.value)
                  return n2;
                r2 = n2.value;
              }
              if (!e4.from || e4.from.includes(typeof r2)) {
                const t4 = e4.method(r2, s2);
                if (t4)
                  return t4;
              }
              return n2;
            } } : e4 || t3;
          }, o.prepare = function(e4, t3) {
            return e4 && t3 ? function(r2, s2) {
              const n2 = e4(r2, s2);
              if (n2) {
                if (n2.errors || void 0 === n2.value)
                  return n2;
                r2 = n2.value;
              }
              return t3(r2, s2) || n2;
            } : e4 || t3;
          }, o.rebuild = function(e4, t3) {
            return e4 && t3 ? function(r2) {
              t3(r2), e4(r2);
            } : e4 || t3;
          }, o.validate = function(e4, t3) {
            return e4 && t3 ? function(r2, s2) {
              const n2 = t3(r2, s2);
              if (n2) {
                if (n2.errors && (!Array.isArray(n2.errors) || n2.errors.length))
                  return n2;
                r2 = n2.value;
              }
              return e4(r2, s2) || n2;
            } : e4 || t3;
          };
        }, 5107: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(8652), i = r(8160), o = r(3292), l = r(6354), c = r(8901), u = r(9708), f = r(6133), h = r(3328), d = r(1152);
          let m;
          const p = { types: { alternatives: r(4946), any: r(8068), array: r(546), boolean: r(4937), date: r(7500), function: r(390), link: r(8785), number: r(3832), object: r(8966), string: r(7417), symbol: r(8826) }, aliases: { alt: "alternatives", bool: "boolean", func: "function" }, root: function() {
            const e4 = { _types: new Set(Object.keys(p.types)) };
            for (const t3 of e4._types)
              e4[t3] = function() {
                for (var e5 = arguments.length, r2 = new Array(e5), n2 = 0; n2 < e5; n2++)
                  r2[n2] = arguments[n2];
                return s(!r2.length || ["alternatives", "link", "object"].includes(t3), "The", t3, "type does not allow arguments"), p.generate(this, p.types[t3], r2);
              };
            for (const t3 of ["allow", "custom", "disallow", "equal", "exist", "forbidden", "invalid", "not", "only", "optional", "options", "prefs", "preferences", "required", "strip", "valid", "when"])
              e4[t3] = function() {
                return this.any()[t3](...arguments);
              };
            Object.assign(e4, p.methods);
            for (const t3 in p.aliases) {
              const r2 = p.aliases[t3];
              e4[t3] = e4[r2];
            }
            return e4.x = e4.expression, d.setup && d.setup(e4), e4;
          } };
          p.methods = { ValidationError: l.ValidationError, version: i.version, cache: a.provider, assert(e4, t3) {
            for (var r2 = arguments.length, s2 = new Array(r2 > 2 ? r2 - 2 : 0), n2 = 2; n2 < r2; n2++)
              s2[n2 - 2] = arguments[n2];
            p.assert(e4, t3, true, s2);
          }, attempt(e4, t3) {
            for (var r2 = arguments.length, s2 = new Array(r2 > 2 ? r2 - 2 : 0), n2 = 2; n2 < r2; n2++)
              s2[n2 - 2] = arguments[n2];
            return p.assert(e4, t3, false, s2);
          }, build(e4) {
            return s("function" == typeof u.build, "Manifest functionality disabled"), u.build(this, e4);
          }, checkPreferences(e4) {
            i.checkPreferences(e4);
          }, compile(e4, t3) {
            return o.compile(this, e4, t3);
          }, defaults(e4) {
            s("function" == typeof e4, "modifier must be a function");
            const t3 = Object.assign({}, this);
            for (const r2 of t3._types) {
              const n2 = e4(t3[r2]());
              s(i.isSchema(n2), "modifier must return a valid schema object"), t3[r2] = function() {
                for (var e5 = arguments.length, t4 = new Array(e5), r3 = 0; r3 < e5; r3++)
                  t4[r3] = arguments[r3];
                return p.generate(this, n2, t4);
              };
            }
            return t3;
          }, expression() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            return new h(...t3);
          }, extend() {
            for (var e4 = arguments.length, t3 = new Array(e4), n2 = 0; n2 < e4; n2++)
              t3[n2] = arguments[n2];
            i.verifyFlat(t3, "extend"), m = m || r(3378), s(t3.length, "You need to provide at least one extension"), this.assert(t3, m.extensions);
            const a2 = Object.assign({}, this);
            a2._types = new Set(a2._types);
            for (let e5 of t3) {
              "function" == typeof e5 && (e5 = e5(a2)), this.assert(e5, m.extension);
              const t4 = p.expandExtension(e5, a2);
              for (const e6 of t4) {
                s(void 0 === a2[e6.type] || a2._types.has(e6.type), "Cannot override name", e6.type);
                const t5 = e6.base || this.any(), r2 = c.type(t5, e6);
                a2._types.add(e6.type), a2[e6.type] = function() {
                  for (var e7 = arguments.length, t6 = new Array(e7), s2 = 0; s2 < e7; s2++)
                    t6[s2] = arguments[s2];
                  return p.generate(this, r2, t6);
                };
              }
            }
            return a2;
          }, isError: l.ValidationError.isError, isExpression: h.isTemplate, isRef: f.isRef, isSchema: i.isSchema, in() {
            return f.in(...arguments);
          }, override: i.symbols.override, ref() {
            return f.create(...arguments);
          }, types() {
            const e4 = {};
            for (const t3 of this._types)
              e4[t3] = this[t3]();
            for (const t3 in p.aliases)
              e4[t3] = this[t3]();
            return e4;
          } }, p.assert = function(e4, t3, r2, s2) {
            const a2 = s2[0] instanceof Error || "string" == typeof s2[0] ? s2[0] : null, o2 = null !== a2 ? s2[1] : s2[0], c2 = t3.validate(e4, i.preferences({ errors: { stack: true } }, o2 || {}));
            let u2 = c2.error;
            if (!u2)
              return c2.value;
            if (a2 instanceof Error)
              throw a2;
            const f2 = r2 && "function" == typeof u2.annotate ? u2.annotate() : u2.message;
            throw u2 instanceof l.ValidationError == 0 && (u2 = n(u2)), u2.message = a2 ? `${a2} ${f2}` : f2, u2;
          }, p.generate = function(e4, t3, r2) {
            return s(e4, "Must be invoked on a Joi instance."), t3.$_root = e4, t3._definition.args && r2.length ? t3._definition.args(t3, ...r2) : t3;
          }, p.expandExtension = function(e4, t3) {
            if ("string" == typeof e4.type)
              return [e4];
            const r2 = [];
            for (const s2 of t3._types)
              if (e4.type.test(s2)) {
                const n2 = Object.assign({}, e4);
                n2.type = s2, n2.base = t3[s2](), r2.push(n2);
              }
            return r2;
          }, e3.exports = p.root();
        }, 6914: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(3328);
          t2.compile = function(e4, t3) {
            if ("string" == typeof e4)
              return s(!t3, "Cannot set single message string"), new a(e4);
            if (a.isTemplate(e4))
              return s(!t3, "Cannot set single message template"), e4;
            s("object" == typeof e4 && !Array.isArray(e4), "Invalid message options"), t3 = t3 ? n(t3) : {};
            for (let r2 in e4) {
              const n2 = e4[r2];
              if ("root" === r2 || a.isTemplate(n2)) {
                t3[r2] = n2;
                continue;
              }
              if ("string" == typeof n2) {
                t3[r2] = new a(n2);
                continue;
              }
              s("object" == typeof n2 && !Array.isArray(n2), "Invalid message for", r2);
              const i = r2;
              for (r2 in t3[i] = t3[i] || {}, n2) {
                const e5 = n2[r2];
                "root" === r2 || a.isTemplate(e5) ? t3[i][r2] = e5 : (s("string" == typeof e5, "Invalid message for", r2, "in", i), t3[i][r2] = new a(e5));
              }
            }
            return t3;
          }, t2.decompile = function(e4) {
            const t3 = {};
            for (let r2 in e4) {
              const s2 = e4[r2];
              if ("root" === r2) {
                t3.root = s2;
                continue;
              }
              if (a.isTemplate(s2)) {
                t3[r2] = s2.describe({ compact: true });
                continue;
              }
              const n2 = r2;
              for (r2 in t3[n2] = {}, s2) {
                const e5 = s2[r2];
                "root" !== r2 ? t3[n2][r2] = e5.describe({ compact: true }) : t3[n2].root = e5;
              }
            }
            return t3;
          }, t2.merge = function(e4, r2) {
            if (!e4)
              return t2.compile(r2);
            if (!r2)
              return e4;
            if ("string" == typeof r2)
              return new a(r2);
            if (a.isTemplate(r2))
              return r2;
            const i = n(e4);
            for (let e5 in r2) {
              const t3 = r2[e5];
              if ("root" === e5 || a.isTemplate(t3)) {
                i[e5] = t3;
                continue;
              }
              if ("string" == typeof t3) {
                i[e5] = new a(t3);
                continue;
              }
              s("object" == typeof t3 && !Array.isArray(t3), "Invalid message for", e5);
              const n2 = e5;
              for (e5 in i[n2] = i[n2] || {}, t3) {
                const r3 = t3[e5];
                "root" === e5 || a.isTemplate(r3) ? i[n2][e5] = r3 : (s("string" == typeof r3, "Invalid message for", e5, "in", n2), i[n2][e5] = new a(r3));
              }
            }
            return i;
          };
        }, 2294: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8160), a = r(6133), i = {};
          t2.Ids = i.Ids = class {
            constructor() {
              this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = false;
            }
            clone() {
              const e4 = new i.Ids();
              return e4._byId = new Map(this._byId), e4._byKey = new Map(this._byKey), e4._schemaChain = this._schemaChain, e4;
            }
            concat(e4) {
              e4._schemaChain && (this._schemaChain = true);
              for (const [t3, r2] of e4._byId.entries())
                s(!this._byKey.has(t3), "Schema id conflicts with existing key:", t3), this._byId.set(t3, r2);
              for (const [t3, r2] of e4._byKey.entries())
                s(!this._byId.has(t3), "Schema key conflicts with existing id:", t3), this._byKey.set(t3, r2);
            }
            fork(e4, t3, r2) {
              const a2 = this._collect(e4);
              a2.push({ schema: r2 });
              const o = a2.shift();
              let l = { id: o.id, schema: t3(o.schema) };
              s(n.isSchema(l.schema), "adjuster function failed to return a joi schema type");
              for (const e5 of a2)
                l = { id: e5.id, schema: i.fork(e5.schema, l.id, l.schema) };
              return l.schema;
            }
            labels(e4) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
              const r2 = e4[0], s2 = this._get(r2);
              if (!s2)
                return [...t3, ...e4].join(".");
              const n2 = e4.slice(1);
              return t3 = [...t3, s2.schema._flags.label || r2], n2.length ? s2.schema._ids.labels(n2, t3) : t3.join(".");
            }
            reach(e4) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
              const r2 = e4[0], n2 = this._get(r2);
              s(n2, "Schema does not contain path", [...t3, ...e4].join("."));
              const a2 = e4.slice(1);
              return a2.length ? n2.schema._ids.reach(a2, [...t3, r2]) : n2.schema;
            }
            register(e4) {
              let { key: t3 } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if (!e4 || !n.isSchema(e4))
                return;
              (e4.$_property("schemaChain") || e4._ids._schemaChain) && (this._schemaChain = true);
              const r2 = e4._flags.id;
              if (r2) {
                const t4 = this._byId.get(r2);
                s(!t4 || t4.schema === e4, "Cannot add different schemas with the same id:", r2), s(!this._byKey.has(r2), "Schema id conflicts with existing key:", r2), this._byId.set(r2, { schema: e4, id: r2 });
              }
              t3 && (s(!this._byKey.has(t3), "Schema already contains key:", t3), s(!this._byId.has(t3), "Schema key conflicts with existing id:", t3), this._byKey.set(t3, { schema: e4, id: t3 }));
            }
            reset() {
              this._byId = /* @__PURE__ */ new Map(), this._byKey = /* @__PURE__ */ new Map(), this._schemaChain = false;
            }
            _collect(e4) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
              const n2 = e4[0], a2 = this._get(n2);
              s(a2, "Schema does not contain path", [...t3, ...e4].join(".")), r2 = [a2, ...r2];
              const i2 = e4.slice(1);
              return i2.length ? a2.schema._ids._collect(i2, [...t3, n2], r2) : r2;
            }
            _get(e4) {
              return this._byId.get(e4) || this._byKey.get(e4);
            }
          }, i.fork = function(e4, r2, s2) {
            const n2 = t2.schema(e4, { each: (e5, t3) => {
              let { key: n3 } = t3;
              if (r2 === (e5._flags.id || n3))
                return s2;
            }, ref: false });
            return n2 ? n2.$_mutateRebuild() : e4;
          }, t2.schema = function(e4, t3) {
            let r2;
            for (const s2 in e4._flags) {
              if ("_" === s2[0])
                continue;
              const n2 = i.scan(e4._flags[s2], { source: "flags", name: s2 }, t3);
              void 0 !== n2 && (r2 = r2 || e4.clone(), r2._flags[s2] = n2);
            }
            for (let s2 = 0; s2 < e4._rules.length; ++s2) {
              const n2 = e4._rules[s2], a2 = i.scan(n2.args, { source: "rules", name: n2.name }, t3);
              if (void 0 !== a2) {
                r2 = r2 || e4.clone();
                const t4 = Object.assign({}, n2);
                t4.args = a2, r2._rules[s2] = t4, r2._singleRules.get(n2.name) === n2 && r2._singleRules.set(n2.name, t4);
              }
            }
            for (const s2 in e4.$_terms) {
              if ("_" === s2[0])
                continue;
              const n2 = i.scan(e4.$_terms[s2], { source: "terms", name: s2 }, t3);
              void 0 !== n2 && (r2 = r2 || e4.clone(), r2.$_terms[s2] = n2);
            }
            return r2;
          }, i.scan = function(e4, t3, r2, s2, o) {
            const l = s2 || [];
            if (null === e4 || "object" != typeof e4)
              return;
            let c;
            if (Array.isArray(e4)) {
              for (let s3 = 0; s3 < e4.length; ++s3) {
                const n2 = "terms" === t3.source && "keys" === t3.name && e4[s3].key, a2 = i.scan(e4[s3], t3, r2, [s3, ...l], n2);
                void 0 !== a2 && (c = c || e4.slice(), c[s3] = a2);
              }
              return c;
            }
            if (false !== r2.schema && n.isSchema(e4) || false !== r2.ref && a.isRef(e4)) {
              const s3 = r2.each(e4, { ...t3, path: l, key: o });
              if (s3 === e4)
                return;
              return s3;
            }
            for (const s3 in e4) {
              if ("_" === s3[0])
                continue;
              const n2 = i.scan(e4[s3], t3, r2, [s3, ...l], o);
              void 0 !== n2 && (c = c || Object.assign({}, e4), c[s3] = n2);
            }
            return c;
          };
        }, 6133: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(9621), i = r(8160);
          let o;
          const l = { symbol: Symbol("ref"), defaults: { adjust: null, in: false, iterables: null, map: null, separator: ".", type: "value" } };
          t2.create = function(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            s("string" == typeof e4, "Invalid reference key:", e4), i.assertOptions(t3, ["adjust", "ancestor", "in", "iterables", "map", "prefix", "render", "separator"]), s(!t3.prefix || "object" == typeof t3.prefix, "options.prefix must be of type object");
            const r2 = Object.assign({}, l.defaults, t3);
            delete r2.prefix;
            const n2 = r2.separator, a2 = l.context(e4, n2, t3.prefix);
            if (r2.type = a2.type, e4 = a2.key, "value" === r2.type)
              if (a2.root && (s(!n2 || e4[0] !== n2, "Cannot specify relative path with root prefix"), r2.ancestor = "root", e4 || (e4 = null)), n2 && n2 === e4)
                e4 = null, r2.ancestor = 0;
              else if (void 0 !== r2.ancestor)
                s(!n2 || !e4 || e4[0] !== n2, "Cannot combine prefix with ancestor option");
              else {
                const [t4, s2] = l.ancestor(e4, n2);
                s2 && "" === (e4 = e4.slice(s2)) && (e4 = null), r2.ancestor = t4;
              }
            return r2.path = n2 ? null === e4 ? [] : e4.split(n2) : [e4], new l.Ref(r2);
          }, t2.in = function(e4) {
            let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return t2.create(e4, { ...r2, in: true });
          }, t2.isRef = function(e4) {
            return !!e4 && !!e4[i.symbols.ref];
          }, l.Ref = class {
            constructor(e4) {
              s("object" == typeof e4, "Invalid reference construction"), i.assertOptions(e4, ["adjust", "ancestor", "in", "iterables", "map", "path", "render", "separator", "type", "depth", "key", "root", "display"]), s([false, void 0].includes(e4.separator) || "string" == typeof e4.separator && 1 === e4.separator.length, "Invalid separator"), s(!e4.adjust || "function" == typeof e4.adjust, "options.adjust must be a function"), s(!e4.map || Array.isArray(e4.map), "options.map must be an array"), s(!e4.map || !e4.adjust, "Cannot set both map and adjust options"), Object.assign(this, l.defaults, e4), s("value" === this.type || void 0 === this.ancestor, "Non-value references cannot reference ancestors"), Array.isArray(this.map) && (this.map = new Map(this.map)), this.depth = this.path.length, this.key = this.path.length ? this.path.join(this.separator) : null, this.root = this.path[0], this.updateDisplay();
            }
            resolve(e4, t3, r2, n2) {
              let a2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
              return s(!this.in || a2.in, "Invalid in() reference usage"), "global" === this.type ? this._resolve(r2.context, t3, a2) : "local" === this.type ? this._resolve(n2, t3, a2) : this.ancestor ? "root" === this.ancestor ? this._resolve(t3.ancestors[t3.ancestors.length - 1], t3, a2) : (s(this.ancestor <= t3.ancestors.length, "Invalid reference exceeds the schema root:", this.display), this._resolve(t3.ancestors[this.ancestor - 1], t3, a2)) : this._resolve(e4, t3, a2);
            }
            _resolve(e4, t3, r2) {
              let s2;
              if ("value" === this.type && t3.mainstay.shadow && false !== r2.shadow && (s2 = t3.mainstay.shadow.get(this.absolute(t3))), void 0 === s2 && (s2 = a(e4, this.path, { iterables: this.iterables, functions: true })), this.adjust && (s2 = this.adjust(s2)), this.map) {
                const e5 = this.map.get(s2);
                void 0 !== e5 && (s2 = e5);
              }
              return t3.mainstay && t3.mainstay.tracer.resolve(t3, this, s2), s2;
            }
            toString() {
              return this.display;
            }
            absolute(e4) {
              return [...e4.path.slice(0, -this.ancestor), ...this.path];
            }
            clone() {
              return new l.Ref(this);
            }
            describe() {
              const e4 = { path: this.path };
              "value" !== this.type && (e4.type = this.type), "." !== this.separator && (e4.separator = this.separator), "value" === this.type && 1 !== this.ancestor && (e4.ancestor = this.ancestor), this.map && (e4.map = [...this.map]);
              for (const t3 of ["adjust", "iterables", "render"])
                null !== this[t3] && void 0 !== this[t3] && (e4[t3] = this[t3]);
              return false !== this.in && (e4.in = true), { ref: e4 };
            }
            updateDisplay() {
              const e4 = null !== this.key ? this.key : "";
              if ("value" !== this.type)
                return void (this.display = `ref:${this.type}:${e4}`);
              if (!this.separator)
                return void (this.display = `ref:${e4}`);
              if (!this.ancestor)
                return void (this.display = `ref:${this.separator}${e4}`);
              if ("root" === this.ancestor)
                return void (this.display = `ref:root:${e4}`);
              if (1 === this.ancestor)
                return void (this.display = `ref:${e4 || ".."}`);
              const t3 = new Array(this.ancestor + 1).fill(this.separator).join("");
              this.display = `ref:${t3}${e4 || ""}`;
            }
          }, l.Ref.prototype[i.symbols.ref] = true, t2.build = function(e4) {
            return "value" === (e4 = Object.assign({}, l.defaults, e4)).type && void 0 === e4.ancestor && (e4.ancestor = 1), new l.Ref(e4);
          }, l.context = function(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (e4 = e4.trim(), r2) {
              const s2 = void 0 === r2.global ? "$" : r2.global;
              if (s2 !== t3 && e4.startsWith(s2))
                return { key: e4.slice(s2.length), type: "global" };
              const n2 = void 0 === r2.local ? "#" : r2.local;
              if (n2 !== t3 && e4.startsWith(n2))
                return { key: e4.slice(n2.length), type: "local" };
              const a2 = void 0 === r2.root ? "/" : r2.root;
              if (a2 !== t3 && e4.startsWith(a2))
                return { key: e4.slice(a2.length), type: "value", root: true };
            }
            return { key: e4, type: "value" };
          }, l.ancestor = function(e4, t3) {
            if (!t3)
              return [1, 0];
            if (e4[0] !== t3)
              return [1, 0];
            if (e4[1] !== t3)
              return [0, 1];
            let r2 = 2;
            for (; e4[r2] === t3; )
              ++r2;
            return [r2 - 1, r2];
          }, t2.toSibling = 0, t2.toParent = 1, t2.Manager = class {
            constructor() {
              this.refs = [];
            }
            register(e4, s2) {
              if (e4)
                if (s2 = void 0 === s2 ? t2.toParent : s2, Array.isArray(e4))
                  for (const t3 of e4)
                    this.register(t3, s2);
                else if (i.isSchema(e4))
                  for (const t3 of e4._refs.refs)
                    t3.ancestor - s2 >= 0 && this.refs.push({ ancestor: t3.ancestor - s2, root: t3.root });
                else
                  t2.isRef(e4) && "value" === e4.type && e4.ancestor - s2 >= 0 && this.refs.push({ ancestor: e4.ancestor - s2, root: e4.root }), o = o || r(3328), o.isTemplate(e4) && this.register(e4.refs(), s2);
            }
            get length() {
              return this.refs.length;
            }
            clone() {
              const e4 = new t2.Manager();
              return e4.refs = n(this.refs), e4;
            }
            reset() {
              this.refs = [];
            }
            roots() {
              return this.refs.filter((e4) => !e4.ancestor).map((e4) => e4.root);
            }
          };
        }, 3378: (e3, t2, r) => {
          "use strict";
          const s = r(5107), n = {};
          n.wrap = s.string().min(1).max(2).allow(false), t2.preferences = s.object({ allowUnknown: s.boolean(), abortEarly: s.boolean(), artifacts: s.boolean(), cache: s.boolean(), context: s.object(), convert: s.boolean(), dateFormat: s.valid("date", "iso", "string", "time", "utc"), debug: s.boolean(), errors: { escapeHtml: s.boolean(), label: s.valid("path", "key", false), language: [s.string(), s.object().ref()], render: s.boolean(), stack: s.boolean(), wrap: { label: n.wrap, array: n.wrap, string: n.wrap } }, externals: s.boolean(), messages: s.object(), noDefaults: s.boolean(), nonEnumerables: s.boolean(), presence: s.valid("required", "optional", "forbidden"), skipFunctions: s.boolean(), stripUnknown: s.object({ arrays: s.boolean(), objects: s.boolean() }).or("arrays", "objects").allow(true, false), warnings: s.boolean() }).strict(), n.nameRx = /^[a-zA-Z0-9]\w*$/, n.rule = s.object({ alias: s.array().items(s.string().pattern(n.nameRx)).single(), args: s.array().items(s.string(), s.object({ name: s.string().pattern(n.nameRx).required(), ref: s.boolean(), assert: s.alternatives([s.function(), s.object().schema()]).conditional("ref", { is: true, then: s.required() }), normalize: s.function(), message: s.string().when("assert", { is: s.function(), then: s.required() }) })), convert: s.boolean(), manifest: s.boolean(), method: s.function().allow(false), multi: s.boolean(), validate: s.function() }), t2.extension = s.object({ type: s.alternatives([s.string(), s.object().regex()]).required(), args: s.function(), cast: s.object().pattern(n.nameRx, s.object({ from: s.function().maxArity(1).required(), to: s.function().minArity(1).maxArity(2).required() })), base: s.object().schema().when("type", { is: s.object().regex(), then: s.forbidden() }), coerce: [s.function().maxArity(3), s.object({ method: s.function().maxArity(3).required(), from: s.array().items(s.string()).single() })], flags: s.object().pattern(n.nameRx, s.object({ setter: s.string(), default: s.any() })), manifest: { build: s.function().arity(2) }, messages: [s.object(), s.string()], modifiers: s.object().pattern(n.nameRx, s.function().minArity(1).maxArity(2)), overrides: s.object().pattern(n.nameRx, s.function()), prepare: s.function().maxArity(3), rebuild: s.function().arity(1), rules: s.object().pattern(n.nameRx, n.rule), terms: s.object().pattern(n.nameRx, s.object({ init: s.array().allow(null).required(), manifest: s.object().pattern(/.+/, [s.valid("schema", "single"), s.object({ mapped: s.object({ from: s.string().required(), to: s.string().required() }).required() })]) })), validate: s.function().maxArity(3) }).strict(), t2.extensions = s.array().items(s.object(), s.function().arity(1)).strict(), n.desc = { buffer: s.object({ buffer: s.string() }), func: s.object({ function: s.function().required(), options: { literal: true } }), override: s.object({ override: true }), ref: s.object({ ref: s.object({ type: s.valid("value", "global", "local"), path: s.array().required(), separator: s.string().length(1).allow(false), ancestor: s.number().min(0).integer().allow("root"), map: s.array().items(s.array().length(2)).min(1), adjust: s.function(), iterables: s.boolean(), in: s.boolean(), render: s.boolean() }).required() }), regex: s.object({ regex: s.string().min(3) }), special: s.object({ special: s.valid("deep").required() }), template: s.object({ template: s.string().required(), options: s.object() }), value: s.object({ value: s.alternatives([s.object(), s.array()]).required() }) }, n.desc.entity = s.alternatives([s.array().items(s.link("...")), s.boolean(), s.function(), s.number(), s.string(), n.desc.buffer, n.desc.func, n.desc.ref, n.desc.regex, n.desc.special, n.desc.template, n.desc.value, s.link("/")]), n.desc.values = s.array().items(null, s.boolean(), s.function(), s.number().allow(1 / 0, -1 / 0), s.string().allow(""), s.symbol(), n.desc.buffer, n.desc.func, n.desc.override, n.desc.ref, n.desc.regex, n.desc.template, n.desc.value), n.desc.messages = s.object().pattern(/.+/, [s.string(), n.desc.template, s.object().pattern(/.+/, [s.string(), n.desc.template])]), t2.description = s.object({ type: s.string().required(), flags: s.object({ cast: s.string(), default: s.any(), description: s.string(), empty: s.link("/"), failover: n.desc.entity, id: s.string(), label: s.string(), only: true, presence: ["optional", "required", "forbidden"], result: ["raw", "strip"], strip: s.boolean(), unit: s.string() }).unknown(), preferences: { allowUnknown: s.boolean(), abortEarly: s.boolean(), artifacts: s.boolean(), cache: s.boolean(), convert: s.boolean(), dateFormat: ["date", "iso", "string", "time", "utc"], errors: { escapeHtml: s.boolean(), label: ["path", "key"], language: [s.string(), n.desc.ref], wrap: { label: n.wrap, array: n.wrap } }, externals: s.boolean(), messages: n.desc.messages, noDefaults: s.boolean(), nonEnumerables: s.boolean(), presence: ["required", "optional", "forbidden"], skipFunctions: s.boolean(), stripUnknown: s.object({ arrays: s.boolean(), objects: s.boolean() }).or("arrays", "objects").allow(true, false), warnings: s.boolean() }, allow: n.desc.values, invalid: n.desc.values, rules: s.array().min(1).items({ name: s.string().required(), args: s.object().min(1), keep: s.boolean(), message: [s.string(), n.desc.messages], warn: s.boolean() }), keys: s.object().pattern(/.*/, s.link("/")), link: n.desc.ref }).pattern(/^[a-z]\w*$/, s.any());
        }, 493: (e3, t2, r) => {
          "use strict";
          const s = r(8571), n = r(9621), a = r(8160), i = { value: Symbol("value") };
          e3.exports = i.State = class {
            constructor(e4, t3, r2) {
              this.path = e4, this.ancestors = t3, this.mainstay = r2.mainstay, this.schemas = r2.schemas, this.debug = null;
            }
            localize(e4) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
              const s2 = new i.State(e4, t3, this);
              return r2 && s2.schemas && (s2.schemas = [i.schemas(r2), ...s2.schemas]), s2;
            }
            nest(e4, t3) {
              const r2 = new i.State(this.path, this.ancestors, this);
              return r2.schemas = r2.schemas && [i.schemas(e4), ...r2.schemas], r2.debug = t3, r2;
            }
            shadow(e4, t3) {
              this.mainstay.shadow = this.mainstay.shadow || new i.Shadow(), this.mainstay.shadow.set(this.path, e4, t3);
            }
            snapshot() {
              this.mainstay.shadow && (this._snapshot = s(this.mainstay.shadow.node(this.path)));
            }
            restore() {
              this.mainstay.shadow && (this.mainstay.shadow.override(this.path, this._snapshot), this._snapshot = void 0);
            }
          }, i.schemas = function(e4) {
            return a.isSchema(e4) ? { schema: e4 } : e4;
          }, i.Shadow = class {
            constructor() {
              this._values = null;
            }
            set(e4, t3, r2) {
              if (!e4.length)
                return;
              if ("strip" === r2 && "number" == typeof e4[e4.length - 1])
                return;
              this._values = this._values || /* @__PURE__ */ new Map();
              let s2 = this._values;
              for (let t4 = 0; t4 < e4.length; ++t4) {
                const r3 = e4[t4];
                let n2 = s2.get(r3);
                n2 || (n2 = /* @__PURE__ */ new Map(), s2.set(r3, n2)), s2 = n2;
              }
              s2[i.value] = t3;
            }
            get(e4) {
              const t3 = this.node(e4);
              if (t3)
                return t3[i.value];
            }
            node(e4) {
              if (this._values)
                return n(this._values, e4, { iterables: true });
            }
            override(e4, t3) {
              if (!this._values)
                return;
              const r2 = e4.slice(0, -1), s2 = e4[e4.length - 1], a2 = n(this._values, r2, { iterables: true });
              t3 ? a2.set(s2, t3) : a2 && a2.delete(s2);
            }
          };
        }, 3328: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(5277), i = r(1447), o = r(8160), l = r(6354), c = r(6133), u = { symbol: Symbol("template"), opens: new Array(1e3).join("\0"), closes: new Array(1e3).join(""), dateFormat: { date: Date.prototype.toDateString, iso: Date.prototype.toISOString, string: Date.prototype.toString, time: Date.prototype.toTimeString, utc: Date.prototype.toUTCString } };
          e3.exports = u.Template = class {
            constructor(e4, t3) {
              s("string" == typeof e4, "Template source must be a string"), s(!e4.includes("\0") && !e4.includes(""), "Template source cannot contain reserved control characters"), this.source = e4, this.rendered = e4, this._template = null, this._settings = n(t3), this._parse();
            }
            _parse() {
              if (!this.source.includes("{"))
                return;
              const e4 = u.encode(this.source), t3 = u.split(e4);
              let r2 = false;
              const s2 = [], n2 = t3.shift();
              n2 && s2.push(n2);
              for (const e5 of t3) {
                const t4 = "{" !== e5[0], n3 = t4 ? "}" : "}}", a2 = e5.indexOf(n3);
                if (-1 === a2 || "{" === e5[1]) {
                  s2.push(`{${u.decode(e5)}`);
                  continue;
                }
                let i2 = e5.slice(t4 ? 0 : 1, a2);
                const o2 = ":" === i2[0];
                o2 && (i2 = i2.slice(1));
                const l2 = this._ref(u.decode(i2), { raw: t4, wrapped: o2 });
                s2.push(l2), "string" != typeof l2 && (r2 = true);
                const c2 = e5.slice(a2 + n3.length);
                c2 && s2.push(u.decode(c2));
              }
              r2 ? this._template = s2 : this.rendered = s2.join("");
            }
            static date(e4, t3) {
              return u.dateFormat[t3.dateFormat].call(e4);
            }
            describe() {
              let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (!this._settings && e4.compact)
                return this.source;
              const t3 = { template: this.source };
              return this._settings && (t3.options = this._settings), t3;
            }
            static build(e4) {
              return new u.Template(e4.template, e4.options);
            }
            isDynamic() {
              return !!this._template;
            }
            static isTemplate(e4) {
              return !!e4 && !!e4[o.symbols.template];
            }
            refs() {
              if (!this._template)
                return;
              const e4 = [];
              for (const t3 of this._template)
                "string" != typeof t3 && e4.push(...t3.refs);
              return e4;
            }
            resolve(e4, t3, r2, s2) {
              return this._template && 1 === this._template.length ? this._part(this._template[0], e4, t3, r2, s2, {}) : this.render(e4, t3, r2, s2);
            }
            _part(e4) {
              for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), s2 = 1; s2 < t3; s2++)
                r2[s2 - 1] = arguments[s2];
              return e4.ref ? e4.ref.resolve(...r2) : e4.formula.evaluate(r2);
            }
            render(e4, t3, r2, s2) {
              let n2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
              if (!this.isDynamic())
                return this.rendered;
              const i2 = [];
              for (const o2 of this._template)
                if ("string" == typeof o2)
                  i2.push(o2);
                else {
                  const l2 = this._part(o2, e4, t3, r2, s2, n2), c2 = u.stringify(l2, e4, t3, r2, s2, n2);
                  if (void 0 !== c2) {
                    const e5 = o2.raw || false === (n2.errors && n2.errors.escapeHtml) ? c2 : a(c2);
                    i2.push(u.wrap(e5, o2.wrapped && r2.errors.wrap.label));
                  }
                }
              return i2.join("");
            }
            _ref(e4, t3) {
              let { raw: r2, wrapped: s2 } = t3;
              const n2 = [], a2 = (e5) => {
                const t4 = c.create(e5, this._settings);
                return n2.push(t4), (e6) => t4.resolve(...e6);
              };
              try {
                var o2 = new i.Parser(e4, { reference: a2, functions: u.functions, constants: u.constants });
              } catch (t4) {
                throw t4.message = `Invalid template variable "${e4}" fails due to: ${t4.message}`, t4;
              }
              if (o2.single) {
                if ("reference" === o2.single.type) {
                  const e5 = n2[0];
                  return { ref: e5, raw: r2, refs: n2, wrapped: s2 || "local" === e5.type && "label" === e5.key };
                }
                return u.stringify(o2.single.value);
              }
              return { formula: o2, raw: r2, refs: n2 };
            }
            toString() {
              return this.source;
            }
          }, u.Template.prototype[o.symbols.template] = true, u.Template.prototype.isImmutable = true, u.encode = function(e4) {
            return e4.replace(/\\(\{+)/g, (e5, t3) => u.opens.slice(0, t3.length)).replace(/\\(\}+)/g, (e5, t3) => u.closes.slice(0, t3.length));
          }, u.decode = function(e4) {
            return e4.replace(/\u0000/g, "{").replace(/\u0001/g, "}");
          }, u.split = function(e4) {
            const t3 = [];
            let r2 = "";
            for (let s2 = 0; s2 < e4.length; ++s2) {
              const n2 = e4[s2];
              if ("{" === n2) {
                let n3 = "";
                for (; s2 + 1 < e4.length && "{" === e4[s2 + 1]; )
                  n3 += "{", ++s2;
                t3.push(r2), r2 = n3;
              } else
                r2 += n2;
            }
            return t3.push(r2), t3;
          }, u.wrap = function(e4, t3) {
            return t3 ? 1 === t3.length ? `${t3}${e4}${t3}` : `${t3[0]}${e4}${t3[1]}` : e4;
          }, u.stringify = function(e4, t3, r2, s2, n2) {
            let a2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
            const i2 = typeof e4, o2 = s2 && s2.errors && s2.errors.wrap || {};
            let l2 = false;
            if (c.isRef(e4) && e4.render && (l2 = e4.in, e4 = e4.resolve(t3, r2, s2, n2, { in: e4.in, ...a2 })), null === e4)
              return "null";
            if ("string" === i2)
              return u.wrap(e4, a2.arrayItems && o2.string);
            if ("number" === i2 || "function" === i2 || "symbol" === i2)
              return e4.toString();
            if ("object" !== i2)
              return JSON.stringify(e4);
            if (e4 instanceof Date)
              return u.Template.date(e4, s2);
            if (e4 instanceof Map) {
              const t4 = [];
              for (const [r3, s3] of e4.entries())
                t4.push(`${r3.toString()} -> ${s3.toString()}`);
              e4 = t4;
            }
            if (!Array.isArray(e4))
              return e4.toString();
            const f = [];
            for (const i3 of e4)
              f.push(u.stringify(i3, t3, r2, s2, n2, { arrayItems: true, ...a2 }));
            return u.wrap(f.join(", "), !l2 && o2.array);
          }, u.constants = { true: true, false: false, null: null, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5 }, u.functions = { if: (e4, t3, r2) => e4 ? t3 : r2, length: (e4) => "string" == typeof e4 ? e4.length : e4 && "object" == typeof e4 ? Array.isArray(e4) ? e4.length : Object.keys(e4).length : null, msg(e4) {
            const [t3, r2, s2, n2, a2] = this, i2 = a2.messages;
            if (!i2)
              return "";
            const o2 = l.template(t3, i2[0], e4, r2, s2) || l.template(t3, i2[1], e4, r2, s2);
            return o2 ? o2.render(t3, r2, s2, n2, a2) : "";
          }, number: (e4) => "number" == typeof e4 ? e4 : "string" == typeof e4 ? parseFloat(e4) : "boolean" == typeof e4 ? e4 ? 1 : 0 : e4 instanceof Date ? e4.getTime() : null };
        }, 4946: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(1687), a = r(8068), i = r(8160), o = r(3292), l = r(6354), c = r(6133), u = {};
          e3.exports = a.extend({ type: "alternatives", flags: { match: { default: "any" } }, terms: { matches: { init: [], register: c.toSibling } }, args(e4) {
            for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), s2 = 1; s2 < t3; s2++)
              r2[s2 - 1] = arguments[s2];
            return 1 === r2.length && Array.isArray(r2[0]) ? e4.try(...r2[0]) : e4.try(...r2);
          }, validate(e4, t3) {
            const { schema: r2, error: s2, state: a2, prefs: i2 } = t3;
            if (r2._flags.match) {
              const t4 = [], o3 = [];
              for (let s3 = 0; s3 < r2.$_terms.matches.length; ++s3) {
                const n2 = r2.$_terms.matches[s3], l2 = a2.nest(n2.schema, `match.${s3}`);
                l2.snapshot();
                const c3 = n2.schema.$_validate(e4, l2, i2);
                c3.errors ? (o3.push(c3.errors), l2.restore()) : t4.push(c3.value);
              }
              if (0 === t4.length)
                return { errors: s2("alternatives.any", { details: o3.map((e5) => l.details(e5, { override: false })) }) };
              if ("one" === r2._flags.match)
                return 1 === t4.length ? { value: t4[0] } : { errors: s2("alternatives.one") };
              if (t4.length !== r2.$_terms.matches.length)
                return { errors: s2("alternatives.all", { details: o3.map((e5) => l.details(e5, { override: false })) }) };
              const c2 = (e5) => e5.$_terms.matches.some((e6) => "object" === e6.schema.type || "alternatives" === e6.schema.type && c2(e6.schema));
              return c2(r2) ? { value: t4.reduce((e5, t5) => n(e5, t5, { mergeArrays: false })) } : { value: t4[t4.length - 1] };
            }
            const o2 = [];
            for (let t4 = 0; t4 < r2.$_terms.matches.length; ++t4) {
              const s3 = r2.$_terms.matches[t4];
              if (s3.schema) {
                const r3 = a2.nest(s3.schema, `match.${t4}`);
                r3.snapshot();
                const n3 = s3.schema.$_validate(e4, r3, i2);
                if (!n3.errors)
                  return n3;
                r3.restore(), o2.push({ schema: s3.schema, reports: n3.errors });
                continue;
              }
              const n2 = s3.ref ? s3.ref.resolve(e4, a2, i2) : e4, l2 = s3.is ? [s3] : s3.switch;
              for (let r3 = 0; r3 < l2.length; ++r3) {
                const o3 = l2[r3], { is: c2, then: u2, otherwise: f } = o3, h = `match.${t4}${s3.switch ? "." + r3 : ""}`;
                if (c2.$_match(n2, a2.nest(c2, `${h}.is`), i2)) {
                  if (u2)
                    return u2.$_validate(e4, a2.nest(u2, `${h}.then`), i2);
                } else if (f)
                  return f.$_validate(e4, a2.nest(f, `${h}.otherwise`), i2);
              }
            }
            return u.errors(o2, t3);
          }, rules: { conditional: { method(e4, t3) {
            s(!this._flags._endedSwitch, "Unreachable condition"), s(!this._flags.match, "Cannot combine match mode", this._flags.match, "with conditional rule"), s(void 0 === t3.break, "Cannot use break option with alternatives conditional");
            const r2 = this.clone(), n2 = o.when(r2, e4, t3), a2 = n2.is ? [n2] : n2.switch;
            for (const e5 of a2)
              if (e5.then && e5.otherwise) {
                r2.$_setFlag("_endedSwitch", true, { clone: false });
                break;
              }
            return r2.$_terms.matches.push(n2), r2.$_mutateRebuild();
          } }, match: { method(e4) {
            if (s(["any", "one", "all"].includes(e4), "Invalid alternatives match mode", e4), "any" !== e4)
              for (const t3 of this.$_terms.matches)
                s(t3.schema, "Cannot combine match mode", e4, "with conditional rules");
            return this.$_setFlag("match", e4);
          } }, try: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            s(t3.length, "Missing alternative schemas"), i.verifyFlat(t3, "try"), s(!this._flags._endedSwitch, "Unreachable condition");
            const n2 = this.clone();
            for (const e5 of t3)
              n2.$_terms.matches.push({ schema: n2.$_compile(e5) });
            return n2.$_mutateRebuild();
          } } }, overrides: { label(e4) {
            return this.$_parent("label", e4).$_modify({ each: (t3, r2) => "is" !== r2.path[0] ? t3.label(e4) : void 0, ref: false });
          } }, rebuild(e4) {
            e4.$_modify({ each: (t3) => {
              i.isSchema(t3) && "array" === t3.type && e4.$_setFlag("_arrayItems", true, { clone: false });
            } });
          }, manifest: { build(e4, t3) {
            if (t3.matches)
              for (const r2 of t3.matches) {
                const { schema: t4, ref: s2, is: n2, not: a2, then: i2, otherwise: o2 } = r2;
                e4 = t4 ? e4.try(t4) : s2 ? e4.conditional(s2, { is: n2, then: i2, not: a2, otherwise: o2, switch: r2.switch }) : e4.conditional(n2, { then: i2, otherwise: o2 });
              }
            return e4;
          } }, messages: { "alternatives.all": "{{#label}} does not match all of the required types", "alternatives.any": "{{#label}} does not match any of the allowed types", "alternatives.match": "{{#label}} does not match any of the allowed types", "alternatives.one": "{{#label}} matches more than one allowed type", "alternatives.types": "{{#label}} must be one of {{#types}}" } }), u.errors = function(e4, t3) {
            let { error: r2, state: s2 } = t3;
            if (!e4.length)
              return { errors: r2("alternatives.any") };
            if (1 === e4.length)
              return { errors: e4[0].reports };
            const n2 = /* @__PURE__ */ new Set(), a2 = [];
            for (const { reports: t4, schema: i2 } of e4) {
              if (t4.length > 1)
                return u.unmatched(e4, r2);
              const o2 = t4[0];
              if (o2 instanceof l.Report == 0)
                return u.unmatched(e4, r2);
              if (o2.state.path.length !== s2.path.length) {
                a2.push({ type: i2.type, report: o2 });
                continue;
              }
              if ("any.only" === o2.code) {
                for (const e5 of o2.local.valids)
                  n2.add(e5);
                continue;
              }
              const [c2, f] = o2.code.split(".");
              "base" === f ? n2.add(c2) : a2.push({ type: i2.type, report: o2 });
            }
            return a2.length ? 1 === a2.length ? { errors: a2[0].report } : u.unmatched(e4, r2) : { errors: r2("alternatives.types", { types: [...n2] }) };
          }, u.unmatched = function(e4, t3) {
            const r2 = [];
            for (const t4 of e4)
              r2.push(...t4.reports);
            return { errors: t3("alternatives.match", l.details(r2, { override: false })) };
          };
        }, 8068: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(7629), a = r(8160), i = r(6914);
          e3.exports = n.extend({ type: "any", flags: { only: { default: false } }, terms: { alterations: { init: null }, examples: { init: null }, externals: { init: null }, metas: { init: [] }, notes: { init: [] }, shared: { init: null }, tags: { init: [] }, whens: { init: null } }, rules: { custom: { method(e4, t3) {
            return s("function" == typeof e4, "Method must be a function"), s(void 0 === t3 || t3 && "string" == typeof t3, "Description must be a non-empty string"), this.$_addRule({ name: "custom", args: { method: e4, description: t3 } });
          }, validate(e4, t3, r2) {
            let { method: s2 } = r2;
            try {
              return s2(e4, t3);
            } catch (e5) {
              return t3.error("any.custom", { error: e5 });
            }
          }, args: ["method", "description"], multi: true }, messages: { method(e4) {
            return this.prefs({ messages: e4 });
          } }, shared: { method(e4) {
            s(a.isSchema(e4) && e4._flags.id, "Schema must be a schema with an id");
            const t3 = this.clone();
            return t3.$_terms.shared = t3.$_terms.shared || [], t3.$_terms.shared.push(e4), t3.$_mutateRegister(e4), t3;
          } }, warning: { method(e4, t3) {
            return s(e4 && "string" == typeof e4, "Invalid warning code"), this.$_addRule({ name: "warning", args: { code: e4, local: t3 }, warn: true });
          }, validate(e4, t3, r2) {
            let { code: s2, local: n2 } = r2;
            return t3.error(s2, n2);
          }, args: ["code", "local"], multi: true } }, modifiers: { keep(e4) {
            let t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            e4.keep = t3;
          }, message(e4, t3) {
            e4.message = i.compile(t3);
          }, warn(e4) {
            let t3 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            e4.warn = t3;
          } }, manifest: { build(e4, t3) {
            for (const r2 in t3) {
              const s2 = t3[r2];
              if (["examples", "externals", "metas", "notes", "tags"].includes(r2))
                for (const t4 of s2)
                  e4 = e4[r2.slice(0, -1)](t4);
              else if ("alterations" !== r2)
                if ("whens" !== r2) {
                  if ("shared" === r2)
                    for (const t4 of s2)
                      e4 = e4.shared(t4);
                } else
                  for (const t4 of s2) {
                    const { ref: r3, is: s3, not: n2, then: a2, otherwise: i2, concat: o } = t4;
                    e4 = o ? e4.concat(o) : r3 ? e4.when(r3, { is: s3, not: n2, then: a2, otherwise: i2, switch: t4.switch, break: t4.break }) : e4.when(s3, { then: a2, otherwise: i2, break: t4.break });
                  }
              else {
                const t4 = {};
                for (const { target: e5, adjuster: r3 } of s2)
                  t4[e5] = r3;
                e4 = e4.alter(t4);
              }
            }
            return e4;
          } }, messages: { "any.custom": "{{#label}} failed custom validation because {{#error.message}}", "any.default": "{{#label}} threw an error when running default method", "any.failover": "{{#label}} threw an error when running failover method", "any.invalid": "{{#label}} contains an invalid value", "any.only": '{{#label}} must be {if(#valids.length == 1, "", "one of ")}{{#valids}}', "any.ref": "{{#label}} {{#arg}} references {{:#ref}} which {{#reason}}", "any.required": "{{#label}} is required", "any.unknown": "{{#label}} is not allowed" } });
        }, 546: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(9474), a = r(9621), i = r(8068), o = r(8160), l = r(3292), c = {};
          e3.exports = i.extend({ type: "array", flags: { single: { default: false }, sparse: { default: false } }, terms: { items: { init: [], manifest: "schema" }, ordered: { init: [], manifest: "schema" }, _exclusions: { init: [] }, _inclusions: { init: [] }, _requireds: { init: [] } }, coerce: { from: "object", method(e4, t3) {
            let { schema: r2, state: s2, prefs: n2 } = t3;
            if (!Array.isArray(e4))
              return;
            const a2 = r2.$_getRule("sort");
            return a2 ? c.sort(r2, e4, a2.args.options, s2, n2) : void 0;
          } }, validate(e4, t3) {
            let { schema: r2, error: s2 } = t3;
            if (!Array.isArray(e4)) {
              if (r2._flags.single) {
                const t4 = [e4];
                return t4[o.symbols.arraySingle] = true, { value: t4 };
              }
              return { errors: s2("array.base") };
            }
            if (r2.$_getRule("items") || r2.$_terms.externals)
              return { value: e4.slice() };
          }, rules: { has: { method(e4) {
            e4 = this.$_compile(e4, { appendPath: true });
            const t3 = this.$_addRule({ name: "has", args: { schema: e4 } });
            return t3.$_mutateRegister(e4), t3;
          }, validate(e4, t3, r2) {
            let { state: s2, prefs: n2, error: a2 } = t3, { schema: i2 } = r2;
            const o2 = [e4, ...s2.ancestors];
            for (let t4 = 0; t4 < e4.length; ++t4) {
              const r3 = s2.localize([...s2.path, t4], o2, i2);
              if (i2.$_match(e4[t4], r3, n2))
                return e4;
            }
            const l2 = i2._flags.label;
            return l2 ? a2("array.hasKnown", { patternLabel: l2 }) : a2("array.hasUnknown", null);
          }, multi: true }, items: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            o.verifyFlat(t3, "items");
            const s2 = this.$_addRule("items");
            for (let e5 = 0; e5 < t3.length; ++e5) {
              const r3 = o.tryWithPath(() => this.$_compile(t3[e5]), e5, { append: true });
              s2.$_terms.items.push(r3);
            }
            return s2.$_mutateRebuild();
          }, validate(e4, t3) {
            let { schema: r2, error: s2, state: n2, prefs: a2, errorsArray: i2 } = t3;
            const l2 = r2.$_terms._requireds.slice(), u = r2.$_terms.ordered.slice(), f = [...r2.$_terms._inclusions, ...l2], h = !e4[o.symbols.arraySingle];
            delete e4[o.symbols.arraySingle];
            const d = i2();
            let m = e4.length;
            for (let t4 = 0; t4 < m; ++t4) {
              const i3 = e4[t4];
              let o2 = false, p = false;
              const g = h ? t4 : new Number(t4), y = [...n2.path, g];
              if (!r2._flags.sparse && void 0 === i3) {
                if (d.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), a2.abortEarly)
                  return d;
                u.shift();
                continue;
              }
              const b = [e4, ...n2.ancestors];
              for (const e5 of r2.$_terms._exclusions)
                if (e5.$_match(i3, n2.localize(y, b, e5), a2, { presence: "ignore" })) {
                  if (d.push(s2("array.excludes", { pos: t4, value: i3 }, n2.localize(y))), a2.abortEarly)
                    return d;
                  o2 = true, u.shift();
                  break;
                }
              if (o2)
                continue;
              if (r2.$_terms.ordered.length) {
                if (u.length) {
                  const o3 = u.shift(), l3 = o3.$_validate(i3, n2.localize(y, b, o3), a2);
                  if (l3.errors) {
                    if (d.push(...l3.errors), a2.abortEarly)
                      return d;
                  } else if ("strip" === o3._flags.result)
                    c.fastSplice(e4, t4), --t4, --m;
                  else {
                    if (!r2._flags.sparse && void 0 === l3.value) {
                      if (d.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), a2.abortEarly)
                        return d;
                      continue;
                    }
                    e4[t4] = l3.value;
                  }
                  continue;
                }
                if (!r2.$_terms.items.length) {
                  if (d.push(s2("array.orderedLength", { pos: t4, limit: r2.$_terms.ordered.length })), a2.abortEarly)
                    return d;
                  break;
                }
              }
              const v = [];
              let _ = l2.length;
              for (let o3 = 0; o3 < _; ++o3) {
                const u2 = n2.localize(y, b, l2[o3]);
                u2.snapshot();
                const f2 = l2[o3].$_validate(i3, u2, a2);
                if (v[o3] = f2, !f2.errors) {
                  if (e4[t4] = f2.value, p = true, c.fastSplice(l2, o3), --o3, --_, !r2._flags.sparse && void 0 === f2.value && (d.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), a2.abortEarly))
                    return d;
                  break;
                }
                u2.restore();
              }
              if (p)
                continue;
              const w = a2.stripUnknown && !!a2.stripUnknown.arrays || false;
              _ = f.length;
              for (const u2 of f) {
                let f2;
                const h2 = l2.indexOf(u2);
                if (-1 !== h2)
                  f2 = v[h2];
                else {
                  const l3 = n2.localize(y, b, u2);
                  if (l3.snapshot(), f2 = u2.$_validate(i3, l3, a2), !f2.errors) {
                    "strip" === u2._flags.result ? (c.fastSplice(e4, t4), --t4, --m) : r2._flags.sparse || void 0 !== f2.value ? e4[t4] = f2.value : (d.push(s2("array.sparse", { key: g, path: y, pos: t4, value: void 0 }, n2.localize(y))), o2 = true), p = true;
                    break;
                  }
                  l3.restore();
                }
                if (1 === _) {
                  if (w) {
                    c.fastSplice(e4, t4), --t4, --m, p = true;
                    break;
                  }
                  if (d.push(...f2.errors), a2.abortEarly)
                    return d;
                  o2 = true;
                  break;
                }
              }
              if (!o2 && (r2.$_terms._inclusions.length || r2.$_terms._requireds.length) && !p) {
                if (w) {
                  c.fastSplice(e4, t4), --t4, --m;
                  continue;
                }
                if (d.push(s2("array.includes", { pos: t4, value: i3 }, n2.localize(y))), a2.abortEarly)
                  return d;
              }
            }
            return l2.length && c.fillMissedErrors(r2, d, l2, e4, n2, a2), u.length && (c.fillOrderedErrors(r2, d, u, e4, n2, a2), d.length || c.fillDefault(u, e4, n2, a2)), d.length ? d : e4;
          }, priority: true, manifest: false }, length: { method(e4) {
            return this.$_addRule({ name: "length", args: { limit: e4 }, operator: "=" });
          }, validate(e4, t3, r2, s2) {
            let { limit: n2 } = r2, { name: a2, operator: i2, args: l2 } = s2;
            return o.compare(e4.length, n2, i2) ? e4 : t3.error("array." + a2, { limit: l2.limit, value: e4 });
          }, args: [{ name: "limit", ref: true, assert: o.limit, message: "must be a positive integer" }] }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "length", args: { limit: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "length", args: { limit: e4 }, operator: ">=" });
          } }, ordered: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            o.verifyFlat(t3, "ordered");
            const s2 = this.$_addRule("items");
            for (let e5 = 0; e5 < t3.length; ++e5) {
              const r3 = o.tryWithPath(() => this.$_compile(t3[e5]), e5, { append: true });
              c.validateSingle(r3, s2), s2.$_mutateRegister(r3), s2.$_terms.ordered.push(r3);
            }
            return s2.$_mutateRebuild();
          } }, single: { method(e4) {
            const t3 = void 0 === e4 || !!e4;
            return s(!t3 || !this._flags._arrayItems, "Cannot specify single rule when array has array items"), this.$_setFlag("single", t3);
          } }, sort: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            o.assertOptions(e4, ["by", "order"]);
            const t3 = { order: e4.order || "ascending" };
            return e4.by && (t3.by = l.ref(e4.by, { ancestor: 0 }), s(!t3.by.ancestor, "Cannot sort by ancestor")), this.$_addRule({ name: "sort", args: { options: t3 } });
          }, validate(e4, t3, r2) {
            let { error: s2, state: n2, prefs: a2, schema: i2 } = t3, { options: o2 } = r2;
            const { value: l2, errors: u } = c.sort(i2, e4, o2, n2, a2);
            if (u)
              return u;
            for (let t4 = 0; t4 < e4.length; ++t4)
              if (e4[t4] !== l2[t4])
                return s2("array.sort", { order: o2.order, by: o2.by ? o2.by.key : "value" });
            return e4;
          }, convert: true }, sparse: { method(e4) {
            const t3 = void 0 === e4 || !!e4;
            return this._flags.sparse === t3 ? this : (t3 ? this.clone() : this.$_addRule("items")).$_setFlag("sparse", t3, { clone: false });
          } }, unique: { method(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            s(!e4 || "function" == typeof e4 || "string" == typeof e4, "comparator must be a function or a string"), o.assertOptions(t3, ["ignoreUndefined", "separator"]);
            const r2 = { name: "unique", args: { options: t3, comparator: e4 } };
            if (e4)
              if ("string" == typeof e4) {
                const s2 = o.default(t3.separator, ".");
                r2.path = s2 ? e4.split(s2) : [e4];
              } else
                r2.comparator = e4;
            return this.$_addRule(r2);
          }, validate(e4, t3, r2, i2) {
            let { state: o2, error: l2, schema: c2 } = t3, { comparator: u, options: f } = r2, { comparator: h, path: d } = i2;
            const m = { string: /* @__PURE__ */ Object.create(null), number: /* @__PURE__ */ Object.create(null), undefined: /* @__PURE__ */ Object.create(null), boolean: /* @__PURE__ */ Object.create(null), object: /* @__PURE__ */ new Map(), function: /* @__PURE__ */ new Map(), custom: /* @__PURE__ */ new Map() }, p = h || n, g = f.ignoreUndefined;
            for (let t4 = 0; t4 < e4.length; ++t4) {
              const r3 = d ? a(e4[t4], d) : e4[t4], n2 = h ? m.custom : m[typeof r3];
              if (s(n2, "Failed to find unique map container for type", typeof r3), n2 instanceof Map) {
                const s2 = n2.entries();
                let a2;
                for (; !(a2 = s2.next()).done; )
                  if (p(a2.value[0], r3)) {
                    const r4 = o2.localize([...o2.path, t4], [e4, ...o2.ancestors]), s3 = { pos: t4, value: e4[t4], dupePos: a2.value[1], dupeValue: e4[a2.value[1]] };
                    return d && (s3.path = u), l2("array.unique", s3, r4);
                  }
                n2.set(r3, t4);
              } else {
                if ((!g || void 0 !== r3) && void 0 !== n2[r3]) {
                  const s2 = { pos: t4, value: e4[t4], dupePos: n2[r3], dupeValue: e4[n2[r3]] };
                  return d && (s2.path = u), l2("array.unique", s2, o2.localize([...o2.path, t4], [e4, ...o2.ancestors]));
                }
                n2[r3] = t4;
              }
            }
            return e4;
          }, args: ["comparator", "options"], multi: true } }, cast: { set: { from: Array.isArray, to: (e4, t3) => new Set(e4) } }, rebuild(e4) {
            e4.$_terms._inclusions = [], e4.$_terms._exclusions = [], e4.$_terms._requireds = [];
            for (const t3 of e4.$_terms.items)
              c.validateSingle(t3, e4), "required" === t3._flags.presence ? e4.$_terms._requireds.push(t3) : "forbidden" === t3._flags.presence ? e4.$_terms._exclusions.push(t3) : e4.$_terms._inclusions.push(t3);
            for (const t3 of e4.$_terms.ordered)
              c.validateSingle(t3, e4);
          }, manifest: { build: (e4, t3) => (t3.items && (e4 = e4.items(...t3.items)), t3.ordered && (e4 = e4.ordered(...t3.ordered)), e4) }, messages: { "array.base": "{{#label}} must be an array", "array.excludes": "{{#label}} contains an excluded value", "array.hasKnown": "{{#label}} does not contain at least one required match for type {:#patternLabel}", "array.hasUnknown": "{{#label}} does not contain at least one required match", "array.includes": "{{#label}} does not match any of the allowed types", "array.includesRequiredBoth": "{{#label}} does not contain {{#knownMisses}} and {{#unknownMisses}} other required value(s)", "array.includesRequiredKnowns": "{{#label}} does not contain {{#knownMisses}}", "array.includesRequiredUnknowns": "{{#label}} does not contain {{#unknownMisses}} required value(s)", "array.length": "{{#label}} must contain {{#limit}} items", "array.max": "{{#label}} must contain less than or equal to {{#limit}} items", "array.min": "{{#label}} must contain at least {{#limit}} items", "array.orderedLength": "{{#label}} must contain at most {{#limit}} items", "array.sort": "{{#label}} must be sorted in {#order} order by {{#by}}", "array.sort.mismatching": "{{#label}} cannot be sorted due to mismatching types", "array.sort.unsupported": "{{#label}} cannot be sorted due to unsupported type {#type}", "array.sparse": "{{#label}} must not be a sparse array item", "array.unique": "{{#label}} contains a duplicate value" } }), c.fillMissedErrors = function(e4, t3, r2, s2, n2, a2) {
            const i2 = [];
            let o2 = 0;
            for (const e5 of r2) {
              const t4 = e5._flags.label;
              t4 ? i2.push(t4) : ++o2;
            }
            i2.length ? o2 ? t3.push(e4.$_createError("array.includesRequiredBoth", s2, { knownMisses: i2, unknownMisses: o2 }, n2, a2)) : t3.push(e4.$_createError("array.includesRequiredKnowns", s2, { knownMisses: i2 }, n2, a2)) : t3.push(e4.$_createError("array.includesRequiredUnknowns", s2, { unknownMisses: o2 }, n2, a2));
          }, c.fillOrderedErrors = function(e4, t3, r2, s2, n2, a2) {
            const i2 = [];
            for (const e5 of r2)
              "required" === e5._flags.presence && i2.push(e5);
            i2.length && c.fillMissedErrors(e4, t3, i2, s2, n2, a2);
          }, c.fillDefault = function(e4, t3, r2, s2) {
            const n2 = [];
            let a2 = true;
            for (let i2 = e4.length - 1; i2 >= 0; --i2) {
              const o2 = e4[i2], l2 = [t3, ...r2.ancestors], c2 = o2.$_validate(void 0, r2.localize(r2.path, l2, o2), s2).value;
              if (a2) {
                if (void 0 === c2)
                  continue;
                a2 = false;
              }
              n2.unshift(c2);
            }
            n2.length && t3.push(...n2);
          }, c.fastSplice = function(e4, t3) {
            let r2 = t3;
            for (; r2 < e4.length; )
              e4[r2++] = e4[r2];
            --e4.length;
          }, c.validateSingle = function(e4, t3) {
            ("array" === e4.type || e4._flags._arrayItems) && (s(!t3._flags.single, "Cannot specify array item with single rule enabled"), t3.$_setFlag("_arrayItems", true, { clone: false }));
          }, c.sort = function(e4, t3, r2, s2, n2) {
            const a2 = "ascending" === r2.order ? 1 : -1, i2 = -1 * a2, o2 = a2, l2 = (l3, u) => {
              let f = c.compare(l3, u, i2, o2);
              if (null !== f)
                return f;
              if (r2.by && (l3 = r2.by.resolve(l3, s2, n2), u = r2.by.resolve(u, s2, n2)), f = c.compare(l3, u, i2, o2), null !== f)
                return f;
              const h = typeof l3;
              if (h !== typeof u)
                throw e4.$_createError("array.sort.mismatching", t3, null, s2, n2);
              if ("number" !== h && "string" !== h)
                throw e4.$_createError("array.sort.unsupported", t3, { type: h }, s2, n2);
              return "number" === h ? (l3 - u) * a2 : l3 < u ? i2 : o2;
            };
            try {
              return { value: t3.slice().sort(l2) };
            } catch (e5) {
              return { errors: e5 };
            }
          }, c.compare = function(e4, t3, r2, s2) {
            return e4 === t3 ? 0 : void 0 === e4 ? 1 : void 0 === t3 ? -1 : null === e4 ? s2 : null === t3 ? r2 : null;
          };
        }, 4937: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8068), a = r(8160), i = r(2036), o = { isBool: function(e4) {
            return "boolean" == typeof e4;
          } };
          e3.exports = n.extend({ type: "boolean", flags: { sensitive: { default: false } }, terms: { falsy: { init: null, manifest: "values" }, truthy: { init: null, manifest: "values" } }, coerce(e4, t3) {
            let { schema: r2 } = t3;
            if ("boolean" != typeof e4) {
              if ("string" == typeof e4) {
                const t4 = r2._flags.sensitive ? e4 : e4.toLowerCase();
                e4 = "true" === t4 || "false" !== t4 && e4;
              }
              return "boolean" != typeof e4 && (e4 = r2.$_terms.truthy && r2.$_terms.truthy.has(e4, null, null, !r2._flags.sensitive) || (!r2.$_terms.falsy || !r2.$_terms.falsy.has(e4, null, null, !r2._flags.sensitive)) && e4), { value: e4 };
            }
          }, validate(e4, t3) {
            let { error: r2 } = t3;
            if ("boolean" != typeof e4)
              return { value: e4, errors: r2("boolean.base") };
          }, rules: { truthy: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            a.verifyFlat(t3, "truthy");
            const n2 = this.clone();
            n2.$_terms.truthy = n2.$_terms.truthy || new i();
            for (let e5 = 0; e5 < t3.length; ++e5) {
              const r3 = t3[e5];
              s(void 0 !== r3, "Cannot call truthy with undefined"), n2.$_terms.truthy.add(r3);
            }
            return n2;
          } }, falsy: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            a.verifyFlat(t3, "falsy");
            const n2 = this.clone();
            n2.$_terms.falsy = n2.$_terms.falsy || new i();
            for (let e5 = 0; e5 < t3.length; ++e5) {
              const r3 = t3[e5];
              s(void 0 !== r3, "Cannot call falsy with undefined"), n2.$_terms.falsy.add(r3);
            }
            return n2;
          } }, sensitive: { method() {
            let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return this.$_setFlag("sensitive", e4);
          } } }, cast: { number: { from: o.isBool, to: (e4, t3) => e4 ? 1 : 0 }, string: { from: o.isBool, to: (e4, t3) => e4 ? "true" : "false" } }, manifest: { build: (e4, t3) => (t3.truthy && (e4 = e4.truthy(...t3.truthy)), t3.falsy && (e4 = e4.falsy(...t3.falsy)), e4) }, messages: { "boolean.base": "{{#label}} must be a boolean" } });
        }, 7500: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8068), a = r(8160), i = r(3328), o = { isDate: function(e4) {
            return e4 instanceof Date;
          } };
          e3.exports = n.extend({ type: "date", coerce: { from: ["number", "string"], method(e4, t3) {
            let { schema: r2 } = t3;
            return { value: o.parse(e4, r2._flags.format) || e4 };
          } }, validate(e4, t3) {
            let { schema: r2, error: s2, prefs: n2 } = t3;
            if (e4 instanceof Date && !isNaN(e4.getTime()))
              return;
            const a2 = r2._flags.format;
            return n2.convert && a2 && "string" == typeof e4 ? { value: e4, errors: s2("date.format", { format: a2 }) } : { value: e4, errors: s2("date.base") };
          }, rules: { compare: { method: false, validate(e4, t3, r2, s2) {
            let { date: n2 } = r2, { name: i2, operator: o2, args: l } = s2;
            const c = "now" === n2 ? Date.now() : n2.getTime();
            return a.compare(e4.getTime(), c, o2) ? e4 : t3.error("date." + i2, { limit: l.date, value: e4 });
          }, args: [{ name: "date", ref: true, normalize: (e4) => "now" === e4 ? e4 : o.parse(e4), assert: (e4) => null !== e4, message: "must have a valid date format" }] }, format: { method(e4) {
            return s(["iso", "javascript", "unix"].includes(e4), "Unknown date format", e4), this.$_setFlag("format", e4);
          } }, greater: { method(e4) {
            return this.$_addRule({ name: "greater", method: "compare", args: { date: e4 }, operator: ">" });
          } }, iso: { method() {
            return this.format("iso");
          } }, less: { method(e4) {
            return this.$_addRule({ name: "less", method: "compare", args: { date: e4 }, operator: "<" });
          } }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "compare", args: { date: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "compare", args: { date: e4 }, operator: ">=" });
          } }, timestamp: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "javascript";
            return s(["javascript", "unix"].includes(e4), '"type" must be one of "javascript, unix"'), this.format(e4);
          } } }, cast: { number: { from: o.isDate, to: (e4, t3) => e4.getTime() }, string: { from: o.isDate, to(e4, t3) {
            let { prefs: r2 } = t3;
            return i.date(e4, r2);
          } } }, messages: { "date.base": "{{#label}} must be a valid date", "date.format": '{{#label}} must be in {msg("date.format." + #format) || #format} format', "date.greater": "{{#label}} must be greater than {{:#limit}}", "date.less": "{{#label}} must be less than {{:#limit}}", "date.max": "{{#label}} must be less than or equal to {{:#limit}}", "date.min": "{{#label}} must be greater than or equal to {{:#limit}}", "date.format.iso": "ISO 8601 date", "date.format.javascript": "timestamp or number of milliseconds", "date.format.unix": "timestamp or number of seconds" } }), o.parse = function(e4, t3) {
            if (e4 instanceof Date)
              return e4;
            if ("string" != typeof e4 && (isNaN(e4) || !isFinite(e4)))
              return null;
            if (/^\s*$/.test(e4))
              return null;
            if ("iso" === t3)
              return a.isIsoDate(e4) ? o.date(e4.toString()) : null;
            const r2 = e4;
            if ("string" == typeof e4 && /^[+-]?\d+(\.\d+)?$/.test(e4) && (e4 = parseFloat(e4)), t3) {
              if ("javascript" === t3)
                return o.date(1 * e4);
              if ("unix" === t3)
                return o.date(1e3 * e4);
              if ("string" == typeof r2)
                return null;
            }
            return o.date(e4);
          }, o.date = function(e4) {
            const t3 = new Date(e4);
            return isNaN(t3.getTime()) ? null : t3;
          };
        }, 390: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(7824);
          e3.exports = n.extend({ type: "function", properties: { typeof: "function" }, rules: { arity: { method(e4) {
            return s(Number.isSafeInteger(e4) && e4 >= 0, "n must be a positive integer"), this.$_addRule({ name: "arity", args: { n: e4 } });
          }, validate(e4, t3, r2) {
            let { n: s2 } = r2;
            return e4.length === s2 ? e4 : t3.error("function.arity", { n: s2 });
          } }, class: { method() {
            return this.$_addRule("class");
          }, validate: (e4, t3) => /^\s*class\s/.test(e4.toString()) ? e4 : t3.error("function.class", { value: e4 }) }, minArity: { method(e4) {
            return s(Number.isSafeInteger(e4) && e4 > 0, "n must be a strict positive integer"), this.$_addRule({ name: "minArity", args: { n: e4 } });
          }, validate(e4, t3, r2) {
            let { n: s2 } = r2;
            return e4.length >= s2 ? e4 : t3.error("function.minArity", { n: s2 });
          } }, maxArity: { method(e4) {
            return s(Number.isSafeInteger(e4) && e4 >= 0, "n must be a positive integer"), this.$_addRule({ name: "maxArity", args: { n: e4 } });
          }, validate(e4, t3, r2) {
            let { n: s2 } = r2;
            return e4.length <= s2 ? e4 : t3.error("function.maxArity", { n: s2 });
          } } }, messages: { "function.arity": "{{#label}} must have an arity of {{#n}}", "function.class": "{{#label}} must be a class", "function.maxArity": "{{#label}} must have an arity lesser or equal to {{#n}}", "function.minArity": "{{#label}} must have an arity greater or equal to {{#n}}" } });
        }, 7824: (e3, t2, r) => {
          "use strict";
          const s = r(978), n = r(375), a = r(8571), i = r(3652), o = r(8068), l = r(8160), c = r(3292), u = r(6354), f = r(6133), h = r(3328), d = { renameDefaults: { alias: false, multiple: false, override: false } };
          e3.exports = o.extend({ type: "_keys", properties: { typeof: "object" }, flags: { unknown: { default: false } }, terms: { dependencies: { init: null }, keys: { init: null, manifest: { mapped: { from: "schema", to: "key" } } }, patterns: { init: null }, renames: { init: null } }, args: (e4, t3) => e4.keys(t3), validate(e4, t3) {
            let { schema: r2, error: s2, state: n2, prefs: a2 } = t3;
            if (!e4 || typeof e4 !== r2.$_property("typeof") || Array.isArray(e4))
              return { value: e4, errors: s2("object.base", { type: r2.$_property("typeof") }) };
            if (!(r2.$_terms.renames || r2.$_terms.dependencies || r2.$_terms.keys || r2.$_terms.patterns || r2.$_terms.externals))
              return;
            e4 = d.clone(e4, a2);
            const i2 = [];
            if (r2.$_terms.renames && !d.rename(r2, e4, n2, a2, i2))
              return { value: e4, errors: i2 };
            if (!r2.$_terms.keys && !r2.$_terms.patterns && !r2.$_terms.dependencies)
              return { value: e4, errors: i2 };
            const o2 = new Set(Object.keys(e4));
            if (r2.$_terms.keys) {
              const t4 = [e4, ...n2.ancestors];
              for (const s3 of r2.$_terms.keys) {
                const r3 = s3.key, l2 = e4[r3];
                o2.delete(r3);
                const c2 = n2.localize([...n2.path, r3], t4, s3), u2 = s3.schema.$_validate(l2, c2, a2);
                if (u2.errors) {
                  if (a2.abortEarly)
                    return { value: e4, errors: u2.errors };
                  void 0 !== u2.value && (e4[r3] = u2.value), i2.push(...u2.errors);
                } else
                  "strip" === s3.schema._flags.result || void 0 === u2.value && void 0 !== l2 ? delete e4[r3] : void 0 !== u2.value && (e4[r3] = u2.value);
              }
            }
            if (o2.size || r2._flags._hasPatternMatch) {
              const t4 = d.unknown(r2, e4, o2, i2, n2, a2);
              if (t4)
                return t4;
            }
            if (r2.$_terms.dependencies)
              for (const t4 of r2.$_terms.dependencies) {
                if (null !== t4.key && false === d.isPresent(t4.options)(t4.key.resolve(e4, n2, a2, null, { shadow: false })))
                  continue;
                const s3 = d.dependencies[t4.rel](r2, t4, e4, n2, a2);
                if (s3) {
                  const t5 = r2.$_createError(s3.code, e4, s3.context, n2, a2);
                  if (a2.abortEarly)
                    return { value: e4, errors: t5 };
                  i2.push(t5);
                }
              }
            return { value: e4, errors: i2 };
          }, rules: { and: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            return l.verifyFlat(t3, "and"), d.dependency(this, "and", null, t3);
          } }, append: { method(e4) {
            return null == e4 || 0 === Object.keys(e4).length ? this : this.keys(e4);
          } }, assert: { method(e4, t3, r2) {
            h.isTemplate(e4) || (e4 = c.ref(e4)), n(void 0 === r2 || "string" == typeof r2, "Message must be a string"), t3 = this.$_compile(t3, { appendPath: true });
            const s2 = this.$_addRule({ name: "assert", args: { subject: e4, schema: t3, message: r2 } });
            return s2.$_mutateRegister(e4), s2.$_mutateRegister(t3), s2;
          }, validate(e4, t3, r2) {
            let { error: s2, prefs: n2, state: a2 } = t3, { subject: i2, schema: o2, message: l2 } = r2;
            const c2 = i2.resolve(e4, a2, n2), u2 = f.isRef(i2) ? i2.absolute(a2) : [];
            return o2.$_match(c2, a2.localize(u2, [e4, ...a2.ancestors], o2), n2) ? e4 : s2("object.assert", { subject: i2, message: l2 });
          }, args: ["subject", "schema", "message"], multi: true }, instance: { method(e4, t3) {
            return n("function" == typeof e4, "constructor must be a function"), t3 = t3 || e4.name, this.$_addRule({ name: "instance", args: { constructor: e4, name: t3 } });
          }, validate(e4, t3, r2) {
            let { constructor: s2, name: n2 } = r2;
            return e4 instanceof s2 ? e4 : t3.error("object.instance", { type: n2, value: e4 });
          }, args: ["constructor", "name"] }, keys: { method(e4) {
            n(void 0 === e4 || "object" == typeof e4, "Object schema must be a valid object"), n(!l.isSchema(e4), "Object schema cannot be a joi schema");
            const t3 = this.clone();
            if (e4)
              if (Object.keys(e4).length) {
                t3.$_terms.keys = t3.$_terms.keys ? t3.$_terms.keys.filter((t4) => !e4.hasOwnProperty(t4.key)) : new d.Keys();
                for (const r2 in e4)
                  l.tryWithPath(() => t3.$_terms.keys.push({ key: r2, schema: this.$_compile(e4[r2]) }), r2);
              } else
                t3.$_terms.keys = new d.Keys();
            else
              t3.$_terms.keys = null;
            return t3.$_mutateRebuild();
          } }, length: { method(e4) {
            return this.$_addRule({ name: "length", args: { limit: e4 }, operator: "=" });
          }, validate(e4, t3, r2, s2) {
            let { limit: n2 } = r2, { name: a2, operator: i2, args: o2 } = s2;
            return l.compare(Object.keys(e4).length, n2, i2) ? e4 : t3.error("object." + a2, { limit: o2.limit, value: e4 });
          }, args: [{ name: "limit", ref: true, assert: l.limit, message: "must be a positive integer" }] }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "length", args: { limit: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "length", args: { limit: e4 }, operator: ">=" });
          } }, nand: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            return l.verifyFlat(t3, "nand"), d.dependency(this, "nand", null, t3);
          } }, or: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            return l.verifyFlat(t3, "or"), d.dependency(this, "or", null, t3);
          } }, oxor: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            return d.dependency(this, "oxor", null, t3);
          } }, pattern: { method(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            const s2 = e4 instanceof RegExp;
            s2 || (e4 = this.$_compile(e4, { appendPath: true })), n(void 0 !== t3, "Invalid rule"), l.assertOptions(r2, ["fallthrough", "matches"]), s2 && n(!e4.flags.includes("g") && !e4.flags.includes("y"), "pattern should not use global or sticky mode"), t3 = this.$_compile(t3, { appendPath: true });
            const a2 = this.clone();
            a2.$_terms.patterns = a2.$_terms.patterns || [];
            const i2 = { [s2 ? "regex" : "schema"]: e4, rule: t3 };
            return r2.matches && (i2.matches = this.$_compile(r2.matches), "array" !== i2.matches.type && (i2.matches = i2.matches.$_root.array().items(i2.matches)), a2.$_mutateRegister(i2.matches), a2.$_setFlag("_hasPatternMatch", true, { clone: false })), r2.fallthrough && (i2.fallthrough = true), a2.$_terms.patterns.push(i2), a2.$_mutateRegister(t3), a2;
          } }, ref: { method() {
            return this.$_addRule("ref");
          }, validate: (e4, t3) => f.isRef(e4) ? e4 : t3.error("object.refType", { value: e4 }) }, regex: { method() {
            return this.$_addRule("regex");
          }, validate: (e4, t3) => e4 instanceof RegExp ? e4 : t3.error("object.regex", { value: e4 }) }, rename: { method(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            n("string" == typeof e4 || e4 instanceof RegExp, "Rename missing the from argument"), n("string" == typeof t3 || t3 instanceof h, "Invalid rename to argument"), n(t3 !== e4, "Cannot rename key to same name:", e4), l.assertOptions(r2, ["alias", "ignoreUndefined", "override", "multiple"]);
            const a2 = this.clone();
            a2.$_terms.renames = a2.$_terms.renames || [];
            for (const t4 of a2.$_terms.renames)
              n(t4.from !== e4, "Cannot rename the same key multiple times");
            return t3 instanceof h && a2.$_mutateRegister(t3), a2.$_terms.renames.push({ from: e4, to: t3, options: s(d.renameDefaults, r2) }), a2;
          } }, schema: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "any";
            return this.$_addRule({ name: "schema", args: { type: e4 } });
          }, validate(e4, t3, r2) {
            let { type: s2 } = r2;
            return !l.isSchema(e4) || "any" !== s2 && e4.type !== s2 ? t3.error("object.schema", { type: s2 }) : e4;
          } }, unknown: { method(e4) {
            return this.$_setFlag("unknown", false !== e4);
          } }, with: { method(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d.dependency(this, "with", e4, t3, r2);
          } }, without: { method(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d.dependency(this, "without", e4, t3, r2);
          } }, xor: { method() {
            for (var e4 = arguments.length, t3 = new Array(e4), r2 = 0; r2 < e4; r2++)
              t3[r2] = arguments[r2];
            return l.verifyFlat(t3, "xor"), d.dependency(this, "xor", null, t3);
          } } }, overrides: { default(e4, t3) {
            return void 0 === e4 && (e4 = l.symbols.deepDefault), this.$_parent("default", e4, t3);
          } }, rebuild(e4) {
            if (e4.$_terms.keys) {
              const t3 = new i.Sorter();
              for (const r2 of e4.$_terms.keys)
                l.tryWithPath(() => t3.add(r2, { after: r2.schema.$_rootReferences(), group: r2.key }), r2.key);
              e4.$_terms.keys = new d.Keys(...t3.nodes);
            }
          }, manifest: { build(e4, t3) {
            if (t3.keys && (e4 = e4.keys(t3.keys)), t3.dependencies)
              for (const { rel: r2, key: s2 = null, peers: n2, options: a2 } of t3.dependencies)
                e4 = d.dependency(e4, r2, s2, n2, a2);
            if (t3.patterns)
              for (const { regex: r2, schema: s2, rule: n2, fallthrough: a2, matches: i2 } of t3.patterns)
                e4 = e4.pattern(r2 || s2, n2, { fallthrough: a2, matches: i2 });
            if (t3.renames)
              for (const { from: r2, to: s2, options: n2 } of t3.renames)
                e4 = e4.rename(r2, s2, n2);
            return e4;
          } }, messages: { "object.and": "{{#label}} contains {{#presentWithLabels}} without its required peers {{#missingWithLabels}}", "object.assert": '{{#label}} is invalid because {if(#subject.key, `"` + #subject.key + `" failed to ` + (#message || "pass the assertion test"), #message || "the assertion failed")}', "object.base": "{{#label}} must be of type {{#type}}", "object.instance": "{{#label}} must be an instance of {{:#type}}", "object.length": '{{#label}} must have {{#limit}} key{if(#limit == 1, "", "s")}', "object.max": '{{#label}} must have less than or equal to {{#limit}} key{if(#limit == 1, "", "s")}', "object.min": '{{#label}} must have at least {{#limit}} key{if(#limit == 1, "", "s")}', "object.missing": "{{#label}} must contain at least one of {{#peersWithLabels}}", "object.nand": "{{:#mainWithLabel}} must not exist simultaneously with {{#peersWithLabels}}", "object.oxor": "{{#label}} contains a conflict between optional exclusive peers {{#peersWithLabels}}", "object.pattern.match": "{{#label}} keys failed to match pattern requirements", "object.refType": "{{#label}} must be a Joi reference", "object.regex": "{{#label}} must be a RegExp object", "object.rename.multiple": "{{#label}} cannot rename {{:#from}} because multiple renames are disabled and another key was already renamed to {{:#to}}", "object.rename.override": "{{#label}} cannot rename {{:#from}} because override is disabled and target {{:#to}} exists", "object.schema": "{{#label}} must be a Joi schema of {{#type}} type", "object.unknown": "{{#label}} is not allowed", "object.with": "{{:#mainWithLabel}} missing required peer {{:#peerWithLabel}}", "object.without": "{{:#mainWithLabel}} conflict with forbidden peer {{:#peerWithLabel}}", "object.xor": "{{#label}} contains a conflict between exclusive peers {{#peersWithLabels}}" } }), d.clone = function(e4, t3) {
            if ("object" == typeof e4) {
              if (t3.nonEnumerables)
                return a(e4, { shallow: true });
              const r3 = Object.create(Object.getPrototypeOf(e4));
              return Object.assign(r3, e4), r3;
            }
            const r2 = function() {
              for (var t4 = arguments.length, r3 = new Array(t4), s2 = 0; s2 < t4; s2++)
                r3[s2] = arguments[s2];
              return e4.apply(this, r3);
            };
            return r2.prototype = a(e4.prototype), Object.defineProperty(r2, "name", { value: e4.name, writable: false }), Object.defineProperty(r2, "length", { value: e4.length, writable: false }), Object.assign(r2, e4), r2;
          }, d.dependency = function(e4, t3, r2, s2, a2) {
            n(null === r2 || "string" == typeof r2, t3, "key must be a strings"), a2 || (a2 = s2.length > 1 && "object" == typeof s2[s2.length - 1] ? s2.pop() : {}), l.assertOptions(a2, ["separator", "isPresent"]), s2 = [].concat(s2);
            const i2 = l.default(a2.separator, "."), o2 = [];
            for (const e5 of s2)
              n("string" == typeof e5, t3, "peers must be strings"), o2.push(c.ref(e5, { separator: i2, ancestor: 0, prefix: false }));
            null !== r2 && (r2 = c.ref(r2, { separator: i2, ancestor: 0, prefix: false }));
            const u2 = e4.clone();
            return u2.$_terms.dependencies = u2.$_terms.dependencies || [], u2.$_terms.dependencies.push(new d.Dependency(t3, r2, o2, s2, a2)), u2;
          }, d.dependencies = { and(e4, t3, r2, s2, n2) {
            const a2 = [], i2 = [], o2 = t3.peers.length, l2 = d.isPresent(t3.options);
            for (const e5 of t3.peers)
              false === l2(e5.resolve(r2, s2, n2, null, { shadow: false })) ? a2.push(e5.key) : i2.push(e5.key);
            if (a2.length !== o2 && i2.length !== o2)
              return { code: "object.and", context: { present: i2, presentWithLabels: d.keysToLabels(e4, i2), missing: a2, missingWithLabels: d.keysToLabels(e4, a2) } };
          }, nand(e4, t3, r2, s2, n2) {
            const a2 = [], i2 = d.isPresent(t3.options);
            for (const e5 of t3.peers)
              i2(e5.resolve(r2, s2, n2, null, { shadow: false })) && a2.push(e5.key);
            if (a2.length !== t3.peers.length)
              return;
            const o2 = t3.paths[0], l2 = t3.paths.slice(1);
            return { code: "object.nand", context: { main: o2, mainWithLabel: d.keysToLabels(e4, o2), peers: l2, peersWithLabels: d.keysToLabels(e4, l2) } };
          }, or(e4, t3, r2, s2, n2) {
            const a2 = d.isPresent(t3.options);
            for (const e5 of t3.peers)
              if (a2(e5.resolve(r2, s2, n2, null, { shadow: false })))
                return;
            return { code: "object.missing", context: { peers: t3.paths, peersWithLabels: d.keysToLabels(e4, t3.paths) } };
          }, oxor(e4, t3, r2, s2, n2) {
            const a2 = [], i2 = d.isPresent(t3.options);
            for (const e5 of t3.peers)
              i2(e5.resolve(r2, s2, n2, null, { shadow: false })) && a2.push(e5.key);
            if (!a2.length || 1 === a2.length)
              return;
            const o2 = { peers: t3.paths, peersWithLabels: d.keysToLabels(e4, t3.paths) };
            return o2.present = a2, o2.presentWithLabels = d.keysToLabels(e4, a2), { code: "object.oxor", context: o2 };
          }, with(e4, t3, r2, s2, n2) {
            const a2 = d.isPresent(t3.options);
            for (const i2 of t3.peers)
              if (false === a2(i2.resolve(r2, s2, n2, null, { shadow: false })))
                return { code: "object.with", context: { main: t3.key.key, mainWithLabel: d.keysToLabels(e4, t3.key.key), peer: i2.key, peerWithLabel: d.keysToLabels(e4, i2.key) } };
          }, without(e4, t3, r2, s2, n2) {
            const a2 = d.isPresent(t3.options);
            for (const i2 of t3.peers)
              if (a2(i2.resolve(r2, s2, n2, null, { shadow: false })))
                return { code: "object.without", context: { main: t3.key.key, mainWithLabel: d.keysToLabels(e4, t3.key.key), peer: i2.key, peerWithLabel: d.keysToLabels(e4, i2.key) } };
          }, xor(e4, t3, r2, s2, n2) {
            const a2 = [], i2 = d.isPresent(t3.options);
            for (const e5 of t3.peers)
              i2(e5.resolve(r2, s2, n2, null, { shadow: false })) && a2.push(e5.key);
            if (1 === a2.length)
              return;
            const o2 = { peers: t3.paths, peersWithLabels: d.keysToLabels(e4, t3.paths) };
            return 0 === a2.length ? { code: "object.missing", context: o2 } : (o2.present = a2, o2.presentWithLabels = d.keysToLabels(e4, a2), { code: "object.xor", context: o2 });
          } }, d.keysToLabels = function(e4, t3) {
            return Array.isArray(t3) ? t3.map((t4) => e4.$_mapLabels(t4)) : e4.$_mapLabels(t3);
          }, d.isPresent = function(e4) {
            return "function" == typeof e4.isPresent ? e4.isPresent : (e5) => void 0 !== e5;
          }, d.rename = function(e4, t3, r2, s2, n2) {
            const a2 = {};
            for (const i2 of e4.$_terms.renames) {
              const o2 = [], l2 = "string" != typeof i2.from;
              if (l2)
                for (const e5 in t3) {
                  if (void 0 === t3[e5] && i2.options.ignoreUndefined)
                    continue;
                  if (e5 === i2.to)
                    continue;
                  const r3 = i2.from.exec(e5);
                  r3 && o2.push({ from: e5, to: i2.to, match: r3 });
                }
              else
                !Object.prototype.hasOwnProperty.call(t3, i2.from) || void 0 === t3[i2.from] && i2.options.ignoreUndefined || o2.push(i2);
              for (const c2 of o2) {
                const o3 = c2.from;
                let u2 = c2.to;
                if (u2 instanceof h && (u2 = u2.render(t3, r2, s2, c2.match)), o3 !== u2) {
                  if (!i2.options.multiple && a2[u2] && (n2.push(e4.$_createError("object.rename.multiple", t3, { from: o3, to: u2, pattern: l2 }, r2, s2)), s2.abortEarly))
                    return false;
                  if (Object.prototype.hasOwnProperty.call(t3, u2) && !i2.options.override && !a2[u2] && (n2.push(e4.$_createError("object.rename.override", t3, { from: o3, to: u2, pattern: l2 }, r2, s2)), s2.abortEarly))
                    return false;
                  void 0 === t3[o3] ? delete t3[u2] : t3[u2] = t3[o3], a2[u2] = true, i2.options.alias || delete t3[o3];
                }
              }
            }
            return true;
          }, d.unknown = function(e4, t3, r2, s2, n2, a2) {
            if (e4.$_terms.patterns) {
              let i2 = false;
              const o2 = e4.$_terms.patterns.map((e5) => {
                if (e5.matches)
                  return i2 = true, [];
              }), l2 = [t3, ...n2.ancestors];
              for (const i3 of r2) {
                const c2 = t3[i3], u2 = [...n2.path, i3];
                for (let f2 = 0; f2 < e4.$_terms.patterns.length; ++f2) {
                  const h2 = e4.$_terms.patterns[f2];
                  if (h2.regex) {
                    const e5 = h2.regex.test(i3);
                    if (n2.mainstay.tracer.debug(n2, "rule", `pattern.${f2}`, e5 ? "pass" : "error"), !e5)
                      continue;
                  } else if (!h2.schema.$_match(i3, n2.nest(h2.schema, `pattern.${f2}`), a2))
                    continue;
                  r2.delete(i3);
                  const d2 = n2.localize(u2, l2, { schema: h2.rule, key: i3 }), m = h2.rule.$_validate(c2, d2, a2);
                  if (m.errors) {
                    if (a2.abortEarly)
                      return { value: t3, errors: m.errors };
                    s2.push(...m.errors);
                  }
                  if (h2.matches && o2[f2].push(i3), t3[i3] = m.value, !h2.fallthrough)
                    break;
                }
              }
              if (i2)
                for (let r3 = 0; r3 < o2.length; ++r3) {
                  const i3 = o2[r3];
                  if (!i3)
                    continue;
                  const c2 = e4.$_terms.patterns[r3].matches, f2 = n2.localize(n2.path, l2, c2), h2 = c2.$_validate(i3, f2, a2);
                  if (h2.errors) {
                    const r4 = u.details(h2.errors, { override: false });
                    r4.matches = i3;
                    const o3 = e4.$_createError("object.pattern.match", t3, r4, n2, a2);
                    if (a2.abortEarly)
                      return { value: t3, errors: o3 };
                    s2.push(o3);
                  }
                }
            }
            if (r2.size && (e4.$_terms.keys || e4.$_terms.patterns)) {
              if (a2.stripUnknown && !e4._flags.unknown || a2.skipFunctions) {
                const e5 = !(!a2.stripUnknown || true !== a2.stripUnknown && !a2.stripUnknown.objects);
                for (const s3 of r2)
                  e5 ? (delete t3[s3], r2.delete(s3)) : "function" == typeof t3[s3] && r2.delete(s3);
              }
              if (!l.default(e4._flags.unknown, a2.allowUnknown))
                for (const i2 of r2) {
                  const r3 = n2.localize([...n2.path, i2], []), o2 = e4.$_createError("object.unknown", t3[i2], { child: i2 }, r3, a2, { flags: false });
                  if (a2.abortEarly)
                    return { value: t3, errors: o2 };
                  s2.push(o2);
                }
            }
          }, d.Dependency = class {
            constructor(e4, t3, r2, s2, n2) {
              this.rel = e4, this.key = t3, this.peers = r2, this.paths = s2, this.options = n2;
            }
            describe() {
              const e4 = { rel: this.rel, peers: this.paths };
              return null !== this.key && (e4.key = this.key.key), "." !== this.peers[0].separator && (e4.options = { ...e4.options, separator: this.peers[0].separator }), this.options.isPresent && (e4.options = { ...e4.options, isPresent: this.options.isPresent }), e4;
            }
          }, d.Keys = class extends Array {
            concat(e4) {
              const t3 = this.slice(), r2 = /* @__PURE__ */ new Map();
              for (let e5 = 0; e5 < t3.length; ++e5)
                r2.set(t3[e5].key, e5);
              for (const s2 of e4) {
                const e5 = s2.key, n2 = r2.get(e5);
                void 0 !== n2 ? t3[n2] = { key: e5, schema: t3[n2].schema.concat(s2.schema) } : t3.push(s2);
              }
              return t3;
            }
          };
        }, 8785: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8068), a = r(8160), i = r(3292), o = r(6354), l = {};
          e3.exports = n.extend({ type: "link", properties: { schemaChain: true }, terms: { link: { init: null, manifest: "single", register: false } }, args: (e4, t3) => e4.ref(t3), validate(e4, t3) {
            let { schema: r2, state: n2, prefs: a2 } = t3;
            s(r2.$_terms.link, "Uninitialized link schema");
            const i2 = l.generate(r2, e4, n2, a2), o2 = r2.$_terms.link[0].ref;
            return i2.$_validate(e4, n2.nest(i2, `link:${o2.display}:${i2.type}`), a2);
          }, generate: (e4, t3, r2, s2) => l.generate(e4, t3, r2, s2), rules: { ref: { method(e4) {
            s(!this.$_terms.link, "Cannot reinitialize schema"), e4 = i.ref(e4), s("value" === e4.type || "local" === e4.type, "Invalid reference type:", e4.type), s("local" === e4.type || "root" === e4.ancestor || e4.ancestor > 0, "Link cannot reference itself");
            const t3 = this.clone();
            return t3.$_terms.link = [{ ref: e4 }], t3;
          } }, relative: { method() {
            let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return this.$_setFlag("relative", e4);
          } } }, overrides: { concat(e4) {
            s(this.$_terms.link, "Uninitialized link schema"), s(a.isSchema(e4), "Invalid schema object"), s("link" !== e4.type, "Cannot merge type link with another link");
            const t3 = this.clone();
            return t3.$_terms.whens || (t3.$_terms.whens = []), t3.$_terms.whens.push({ concat: e4 }), t3.$_mutateRebuild();
          } }, manifest: { build: (e4, t3) => (s(t3.link, "Invalid link description missing link"), e4.ref(t3.link)) } }), l.generate = function(e4, t3, r2, s2) {
            let n2 = r2.mainstay.links.get(e4);
            if (n2)
              return n2._generate(t3, r2, s2).schema;
            const a2 = e4.$_terms.link[0].ref, { perspective: i2, path: o2 } = l.perspective(a2, r2);
            l.assert(i2, "which is outside of schema boundaries", a2, e4, r2, s2);
            try {
              n2 = o2.length ? i2.$_reach(o2) : i2;
            } catch (t4) {
              l.assert(false, "to non-existing schema", a2, e4, r2, s2);
            }
            return l.assert("link" !== n2.type, "which is another link", a2, e4, r2, s2), e4._flags.relative || r2.mainstay.links.set(e4, n2), n2._generate(t3, r2, s2).schema;
          }, l.perspective = function(e4, t3) {
            if ("local" === e4.type) {
              for (const { schema: r2, key: s2 } of t3.schemas) {
                if ((r2._flags.id || s2) === e4.path[0])
                  return { perspective: r2, path: e4.path.slice(1) };
                if (r2.$_terms.shared) {
                  for (const t4 of r2.$_terms.shared)
                    if (t4._flags.id === e4.path[0])
                      return { perspective: t4, path: e4.path.slice(1) };
                }
              }
              return { perspective: null, path: null };
            }
            return "root" === e4.ancestor ? { perspective: t3.schemas[t3.schemas.length - 1].schema, path: e4.path } : { perspective: t3.schemas[e4.ancestor] && t3.schemas[e4.ancestor].schema, path: e4.path };
          }, l.assert = function(e4, t3, r2, n2, a2, i2) {
            e4 || s(false, `"${o.label(n2._flags, a2, i2)}" contains link reference "${r2.display}" ${t3}`);
          };
        }, 3832: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8068), a = r(8160), i = { numberRx: /^\s*[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:e([+-]?\d+))?\s*$/i, precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/, exponentialPartRegex: /[eE][+-]?\d+$/, leadingSignAndZerosRegex: /^[+-]?(0*)?/, dotRegex: /\./, trailingZerosRegex: /0+$/ };
          e3.exports = n.extend({ type: "number", flags: { unsafe: { default: false } }, coerce: { from: "string", method(e4, t3) {
            let { schema: r2, error: s2 } = t3;
            if (!e4.match(i.numberRx))
              return;
            e4 = e4.trim();
            const n2 = { value: parseFloat(e4) };
            if (0 === n2.value && (n2.value = 0), !r2._flags.unsafe)
              if (e4.match(/e/i)) {
                if (i.extractSignificantDigits(e4) !== i.extractSignificantDigits(String(n2.value)))
                  return n2.errors = s2("number.unsafe"), n2;
              } else {
                const t4 = n2.value.toString();
                if (t4.match(/e/i))
                  return n2;
                if (t4 !== i.normalizeDecimal(e4))
                  return n2.errors = s2("number.unsafe"), n2;
              }
            return n2;
          } }, validate(e4, t3) {
            let { schema: r2, error: s2, prefs: n2 } = t3;
            if (e4 === 1 / 0 || e4 === -1 / 0)
              return { value: e4, errors: s2("number.infinity") };
            if (!a.isNumber(e4))
              return { value: e4, errors: s2("number.base") };
            const i2 = { value: e4 };
            if (n2.convert) {
              const e5 = r2.$_getRule("precision");
              if (e5) {
                const t4 = Math.pow(10, e5.args.limit);
                i2.value = Math.round(i2.value * t4) / t4;
              }
            }
            return 0 === i2.value && (i2.value = 0), !r2._flags.unsafe && (e4 > Number.MAX_SAFE_INTEGER || e4 < Number.MIN_SAFE_INTEGER) && (i2.errors = s2("number.unsafe")), i2;
          }, rules: { compare: { method: false, validate(e4, t3, r2, s2) {
            let { limit: n2 } = r2, { name: i2, operator: o, args: l } = s2;
            return a.compare(e4, n2, o) ? e4 : t3.error("number." + i2, { limit: l.limit, value: e4 });
          }, args: [{ name: "limit", ref: true, assert: a.isNumber, message: "must be a number" }] }, greater: { method(e4) {
            return this.$_addRule({ name: "greater", method: "compare", args: { limit: e4 }, operator: ">" });
          } }, integer: { method() {
            return this.$_addRule("integer");
          }, validate: (e4, t3) => Math.trunc(e4) - e4 == 0 ? e4 : t3.error("number.integer") }, less: { method(e4) {
            return this.$_addRule({ name: "less", method: "compare", args: { limit: e4 }, operator: "<" });
          } }, max: { method(e4) {
            return this.$_addRule({ name: "max", method: "compare", args: { limit: e4 }, operator: "<=" });
          } }, min: { method(e4) {
            return this.$_addRule({ name: "min", method: "compare", args: { limit: e4 }, operator: ">=" });
          } }, multiple: { method(e4) {
            return this.$_addRule({ name: "multiple", args: { base: e4 } });
          }, validate(e4, t3, r2, s2) {
            let { base: n2 } = r2;
            return e4 * (1 / n2) % 1 == 0 ? e4 : t3.error("number.multiple", { multiple: s2.args.base, value: e4 });
          }, args: [{ name: "base", ref: true, assert: (e4) => "number" == typeof e4 && isFinite(e4) && e4 > 0, message: "must be a positive number" }], multi: true }, negative: { method() {
            return this.sign("negative");
          } }, port: { method() {
            return this.$_addRule("port");
          }, validate: (e4, t3) => Number.isSafeInteger(e4) && e4 >= 0 && e4 <= 65535 ? e4 : t3.error("number.port") }, positive: { method() {
            return this.sign("positive");
          } }, precision: { method(e4) {
            return s(Number.isSafeInteger(e4), "limit must be an integer"), this.$_addRule({ name: "precision", args: { limit: e4 } });
          }, validate(e4, t3, r2) {
            let { limit: s2 } = r2;
            const n2 = e4.toString().match(i.precisionRx);
            return Math.max((n2[1] ? n2[1].length : 0) - (n2[2] ? parseInt(n2[2], 10) : 0), 0) <= s2 ? e4 : t3.error("number.precision", { limit: s2, value: e4 });
          }, convert: true }, sign: { method(e4) {
            return s(["negative", "positive"].includes(e4), "Invalid sign", e4), this.$_addRule({ name: "sign", args: { sign: e4 } });
          }, validate(e4, t3, r2) {
            let { sign: s2 } = r2;
            return "negative" === s2 && e4 < 0 || "positive" === s2 && e4 > 0 ? e4 : t3.error(`number.${s2}`);
          } }, unsafe: { method() {
            let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return s("boolean" == typeof e4, "enabled must be a boolean"), this.$_setFlag("unsafe", e4);
          } } }, cast: { string: { from: (e4) => "number" == typeof e4, to: (e4, t3) => e4.toString() } }, messages: { "number.base": "{{#label}} must be a number", "number.greater": "{{#label}} must be greater than {{#limit}}", "number.infinity": "{{#label}} cannot be infinity", "number.integer": "{{#label}} must be an integer", "number.less": "{{#label}} must be less than {{#limit}}", "number.max": "{{#label}} must be less than or equal to {{#limit}}", "number.min": "{{#label}} must be greater than or equal to {{#limit}}", "number.multiple": "{{#label}} must be a multiple of {{#multiple}}", "number.negative": "{{#label}} must be a negative number", "number.port": "{{#label}} must be a valid port", "number.positive": "{{#label}} must be a positive number", "number.precision": "{{#label}} must have no more than {{#limit}} decimal places", "number.unsafe": "{{#label}} must be a safe number" } }), i.extractSignificantDigits = function(e4) {
            return e4.replace(i.exponentialPartRegex, "").replace(i.dotRegex, "").replace(i.trailingZerosRegex, "").replace(i.leadingSignAndZerosRegex, "");
          }, i.normalizeDecimal = function(e4) {
            return (e4 = e4.replace(/^\+/, "").replace(/\.0*$/, "").replace(/^(-?)\.([^\.]*)$/, "$10.$2").replace(/^(-?)0+([0-9])/, "$1$2")).includes(".") && e4.endsWith("0") && (e4 = e4.replace(/0+$/, "")), "-0" === e4 ? "0" : e4;
          };
        }, 8966: (e3, t2, r) => {
          "use strict";
          const s = r(7824);
          e3.exports = s.extend({ type: "object", cast: { map: { from: (e4) => e4 && "object" == typeof e4, to: (e4, t3) => new Map(Object.entries(e4)) } } });
        }, 7417: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(5380), a = r(1745), i = r(9959), o = r(6064), l = r(9926), c = r(5752), u = r(8068), f = r(8160), h = { tlds: l instanceof Set && { tlds: { allow: l, deny: null } }, base64Regex: { true: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}==|[\w\-]{3}=)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/ }, false: { true: /^(?:[\w\-]{2}[\w\-]{2})*(?:[\w\-]{2}(==)?|[\w\-]{3}=?)?$/, false: /^(?:[A-Za-z0-9+\/]{2}[A-Za-z0-9+\/]{2})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/ } }, dataUriRegex: /^data:[\w+.-]+\/[\w+.-]+;((charset=[\w-]+|base64),)?(.*)$/, hexRegex: /^[a-f0-9]+$/i, ipRegex: i.regex({ cidr: "forbidden" }).regex, isoDurationRegex: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?$/, guidBrackets: { "{": "}", "[": "]", "(": ")", "": "" }, guidVersions: { uuidv1: "1", uuidv2: "2", uuidv3: "3", uuidv4: "4", uuidv5: "5" }, guidSeparators: /* @__PURE__ */ new Set([void 0, true, false, "-", ":"]), normalizationForms: ["NFC", "NFD", "NFKC", "NFKD"] };
          e3.exports = u.extend({ type: "string", flags: { insensitive: { default: false }, truncate: { default: false } }, terms: { replacements: { init: null } }, coerce: { from: "string", method(e4, t3) {
            let { schema: r2, state: s2, prefs: n2 } = t3;
            const a2 = r2.$_getRule("normalize");
            a2 && (e4 = e4.normalize(a2.args.form));
            const i2 = r2.$_getRule("case");
            i2 && (e4 = "upper" === i2.args.direction ? e4.toLocaleUpperCase() : e4.toLocaleLowerCase());
            const o2 = r2.$_getRule("trim");
            if (o2 && o2.args.enabled && (e4 = e4.trim()), r2.$_terms.replacements)
              for (const t4 of r2.$_terms.replacements)
                e4 = e4.replace(t4.pattern, t4.replacement);
            const l2 = r2.$_getRule("hex");
            if (l2 && l2.args.options.byteAligned && e4.length % 2 != 0 && (e4 = `0${e4}`), r2.$_getRule("isoDate")) {
              const t4 = h.isoDate(e4);
              t4 && (e4 = t4);
            }
            if (r2._flags.truncate) {
              const t4 = r2.$_getRule("max");
              if (t4) {
                let a3 = t4.args.limit;
                if (f.isResolvable(a3) && (a3 = a3.resolve(e4, s2, n2), !f.limit(a3)))
                  return { value: e4, errors: r2.$_createError("any.ref", a3, { ref: t4.args.limit, arg: "limit", reason: "must be a positive integer" }, s2, n2) };
                e4 = e4.slice(0, a3);
              }
            }
            return { value: e4 };
          } }, validate(e4, t3) {
            let { schema: r2, error: s2 } = t3;
            if ("string" != typeof e4)
              return { value: e4, errors: s2("string.base") };
            if ("" === e4) {
              const t4 = r2.$_getRule("min");
              if (t4 && 0 === t4.args.limit)
                return;
              return { value: e4, errors: s2("string.empty") };
            }
          }, rules: { alphanum: { method() {
            return this.$_addRule("alphanum");
          }, validate: (e4, t3) => /^[a-zA-Z0-9]+$/.test(e4) ? e4 : t3.error("string.alphanum") }, base64: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return f.assertOptions(e4, ["paddingRequired", "urlSafe"]), e4 = { urlSafe: false, paddingRequired: true, ...e4 }, s("boolean" == typeof e4.paddingRequired, "paddingRequired must be boolean"), s("boolean" == typeof e4.urlSafe, "urlSafe must be boolean"), this.$_addRule({ name: "base64", args: { options: e4 } });
          }, validate(e4, t3, r2) {
            let { options: s2 } = r2;
            return h.base64Regex[s2.paddingRequired][s2.urlSafe].test(e4) ? e4 : t3.error("string.base64");
          } }, case: { method(e4) {
            return s(["lower", "upper"].includes(e4), "Invalid case:", e4), this.$_addRule({ name: "case", args: { direction: e4 } });
          }, validate(e4, t3, r2) {
            let { direction: s2 } = r2;
            return "lower" === s2 && e4 === e4.toLocaleLowerCase() || "upper" === s2 && e4 === e4.toLocaleUpperCase() ? e4 : t3.error(`string.${s2}case`);
          }, convert: true }, creditCard: { method() {
            return this.$_addRule("creditCard");
          }, validate(e4, t3) {
            let r2 = e4.length, s2 = 0, n2 = 1;
            for (; r2--; ) {
              const t4 = e4.charAt(r2) * n2;
              s2 += t4 - 9 * (t4 > 9), n2 ^= 3;
            }
            return s2 > 0 && s2 % 10 == 0 ? e4 : t3.error("string.creditCard");
          } }, dataUri: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return f.assertOptions(e4, ["paddingRequired"]), e4 = { paddingRequired: true, ...e4 }, s("boolean" == typeof e4.paddingRequired, "paddingRequired must be boolean"), this.$_addRule({ name: "dataUri", args: { options: e4 } });
          }, validate(e4, t3, r2) {
            let { options: s2 } = r2;
            const n2 = e4.match(h.dataUriRegex);
            if (n2) {
              if (!n2[2])
                return e4;
              if ("base64" !== n2[2])
                return e4;
              if (h.base64Regex[s2.paddingRequired].false.test(n2[3]))
                return e4;
            }
            return t3.error("string.dataUri");
          } }, domain: { method(e4) {
            e4 && f.assertOptions(e4, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            const t3 = h.addressOptions(e4);
            return this.$_addRule({ name: "domain", args: { options: e4 }, address: t3 });
          }, validate(e4, t3, r2, s2) {
            let { address: a2 } = s2;
            return n.isValid(e4, a2) ? e4 : t3.error("string.domain");
          } }, email: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            f.assertOptions(e4, ["allowFullyQualified", "allowUnicode", "ignoreLength", "maxDomainSegments", "minDomainSegments", "multiple", "separator", "tlds"]), s(void 0 === e4.multiple || "boolean" == typeof e4.multiple, "multiple option must be an boolean");
            const t3 = h.addressOptions(e4), r2 = new RegExp(`\\s*[${e4.separator ? o(e4.separator) : ","}]\\s*`);
            return this.$_addRule({ name: "email", args: { options: e4 }, regex: r2, address: t3 });
          }, validate(e4, t3, r2, s2) {
            let { options: n2 } = r2, { regex: i2, address: o2 } = s2;
            const l2 = n2.multiple ? e4.split(i2) : [e4], c2 = [];
            for (const e5 of l2)
              a.isValid(e5, o2) || c2.push(e5);
            return c2.length ? t3.error("string.email", { value: e4, invalids: c2 }) : e4;
          } }, guid: { alias: "uuid", method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            f.assertOptions(e4, ["version", "separator"]);
            let t3 = "";
            if (e4.version) {
              const r3 = [].concat(e4.version);
              s(r3.length >= 1, "version must have at least 1 valid version specified");
              const n3 = /* @__PURE__ */ new Set();
              for (let e5 = 0; e5 < r3.length; ++e5) {
                const a2 = r3[e5];
                s("string" == typeof a2, "version at position " + e5 + " must be a string");
                const i2 = h.guidVersions[a2.toLowerCase()];
                s(i2, "version at position " + e5 + " must be one of " + Object.keys(h.guidVersions).join(", ")), s(!n3.has(i2), "version at position " + e5 + " must not be a duplicate"), t3 += i2, n3.add(i2);
              }
            }
            s(h.guidSeparators.has(e4.separator), 'separator must be one of true, false, "-", or ":"');
            const r2 = void 0 === e4.separator ? "[:-]?" : true === e4.separator ? "[:-]" : false === e4.separator ? "[]?" : `\\${e4.separator}`, n2 = new RegExp(`^([\\[{\\(]?)[0-9A-F]{8}(${r2})[0-9A-F]{4}\\2?[${t3 || "0-9A-F"}][0-9A-F]{3}\\2?[${t3 ? "89AB" : "0-9A-F"}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`, "i");
            return this.$_addRule({ name: "guid", args: { options: e4 }, regex: n2 });
          }, validate(e4, t3, r2, s2) {
            let { regex: n2 } = s2;
            const a2 = n2.exec(e4);
            return a2 ? h.guidBrackets[a2[1]] !== a2[a2.length - 1] ? t3.error("string.guid") : e4 : t3.error("string.guid");
          } }, hex: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return f.assertOptions(e4, ["byteAligned"]), e4 = { byteAligned: false, ...e4 }, s("boolean" == typeof e4.byteAligned, "byteAligned must be boolean"), this.$_addRule({ name: "hex", args: { options: e4 } });
          }, validate(e4, t3, r2) {
            let { options: s2 } = r2;
            return h.hexRegex.test(e4) ? s2.byteAligned && e4.length % 2 != 0 ? t3.error("string.hexAlign") : e4 : t3.error("string.hex");
          } }, hostname: { method() {
            return this.$_addRule("hostname");
          }, validate: (e4, t3) => n.isValid(e4, { minDomainSegments: 1 }) || h.ipRegex.test(e4) ? e4 : t3.error("string.hostname") }, insensitive: { method() {
            return this.$_setFlag("insensitive", true);
          } }, ip: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            f.assertOptions(e4, ["cidr", "version"]);
            const { cidr: t3, versions: r2, regex: s2 } = i.regex(e4), n2 = e4.version ? r2 : void 0;
            return this.$_addRule({ name: "ip", args: { options: { cidr: t3, version: n2 } }, regex: s2 });
          }, validate(e4, t3, r2, s2) {
            let { options: n2 } = r2, { regex: a2 } = s2;
            return a2.test(e4) ? e4 : n2.version ? t3.error("string.ipVersion", { value: e4, cidr: n2.cidr, version: n2.version }) : t3.error("string.ip", { value: e4, cidr: n2.cidr });
          } }, isoDate: { method() {
            return this.$_addRule("isoDate");
          }, validate(e4, t3) {
            let { error: r2 } = t3;
            return h.isoDate(e4) ? e4 : r2("string.isoDate");
          } }, isoDuration: { method() {
            return this.$_addRule("isoDuration");
          }, validate: (e4, t3) => h.isoDurationRegex.test(e4) ? e4 : t3.error("string.isoDuration") }, length: { method(e4, t3) {
            return h.length(this, "length", e4, "=", t3);
          }, validate(e4, t3, r2, s2) {
            let { limit: n2, encoding: a2 } = r2, { name: i2, operator: o2, args: l2 } = s2;
            const c2 = !a2 && e4.length;
            return f.compare(c2, n2, o2) ? e4 : t3.error("string." + i2, { limit: l2.limit, value: e4, encoding: a2 });
          }, args: [{ name: "limit", ref: true, assert: f.limit, message: "must be a positive integer" }, "encoding"] }, lowercase: { method() {
            return this.case("lower");
          } }, max: { method(e4, t3) {
            return h.length(this, "max", e4, "<=", t3);
          }, args: ["limit", "encoding"] }, min: { method(e4, t3) {
            return h.length(this, "min", e4, ">=", t3);
          }, args: ["limit", "encoding"] }, normalize: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "NFC";
            return s(h.normalizationForms.includes(e4), "normalization form must be one of " + h.normalizationForms.join(", ")), this.$_addRule({ name: "normalize", args: { form: e4 } });
          }, validate(e4, t3, r2) {
            let { error: s2 } = t3, { form: n2 } = r2;
            return e4 === e4.normalize(n2) ? e4 : s2("string.normalize", { value: e4, form: n2 });
          }, convert: true }, pattern: { alias: "regex", method(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            s(e4 instanceof RegExp, "regex must be a RegExp"), s(!e4.flags.includes("g") && !e4.flags.includes("y"), "regex should not use global or sticky mode"), "string" == typeof t3 && (t3 = { name: t3 }), f.assertOptions(t3, ["invert", "name"]);
            const r2 = ["string.pattern", t3.invert ? ".invert" : "", t3.name ? ".name" : ".base"].join("");
            return this.$_addRule({ name: "pattern", args: { regex: e4, options: t3 }, errorCode: r2 });
          }, validate(e4, t3, r2, s2) {
            let { regex: n2, options: a2 } = r2, { errorCode: i2 } = s2;
            return n2.test(e4) ^ a2.invert ? e4 : t3.error(i2, { name: a2.name, regex: n2, value: e4 });
          }, args: ["regex", "options"], multi: true }, replace: { method(e4, t3) {
            "string" == typeof e4 && (e4 = new RegExp(o(e4), "g")), s(e4 instanceof RegExp, "pattern must be a RegExp"), s("string" == typeof t3, "replacement must be a String");
            const r2 = this.clone();
            return r2.$_terms.replacements || (r2.$_terms.replacements = []), r2.$_terms.replacements.push({ pattern: e4, replacement: t3 }), r2;
          } }, token: { method() {
            return this.$_addRule("token");
          }, validate: (e4, t3) => /^\w+$/.test(e4) ? e4 : t3.error("string.token") }, trim: { method() {
            let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return s("boolean" == typeof e4, "enabled must be a boolean"), this.$_addRule({ name: "trim", args: { enabled: e4 } });
          }, validate(e4, t3, r2) {
            let { enabled: s2 } = r2;
            return s2 && e4 !== e4.trim() ? t3.error("string.trim") : e4;
          }, convert: true }, truncate: { method() {
            let e4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return s("boolean" == typeof e4, "enabled must be a boolean"), this.$_setFlag("truncate", e4);
          } }, uppercase: { method() {
            return this.case("upper");
          } }, uri: { method() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            f.assertOptions(e4, ["allowRelative", "allowQuerySquareBrackets", "domain", "relativeOnly", "scheme"]), e4.domain && f.assertOptions(e4.domain, ["allowFullyQualified", "allowUnicode", "maxDomainSegments", "minDomainSegments", "tlds"]);
            const { regex: t3, scheme: r2 } = c.regex(e4), s2 = e4.domain ? h.addressOptions(e4.domain) : null;
            return this.$_addRule({ name: "uri", args: { options: e4 }, regex: t3, domain: s2, scheme: r2 });
          }, validate(e4, t3, r2, s2) {
            let { options: a2 } = r2, { regex: i2, domain: o2, scheme: l2 } = s2;
            if (["http:/", "https:/"].includes(e4))
              return t3.error("string.uri");
            const c2 = i2.exec(e4);
            if (c2) {
              const r3 = c2[1] || c2[2];
              return !o2 || a2.allowRelative && !r3 || n.isValid(r3, o2) ? e4 : t3.error("string.domain", { value: r3 });
            }
            return a2.relativeOnly ? t3.error("string.uriRelativeOnly") : a2.scheme ? t3.error("string.uriCustomScheme", { scheme: l2, value: e4 }) : t3.error("string.uri");
          } } }, manifest: { build(e4, t3) {
            if (t3.replacements)
              for (const { pattern: r2, replacement: s2 } of t3.replacements)
                e4 = e4.replace(r2, s2);
            return e4;
          } }, messages: { "string.alphanum": "{{#label}} must only contain alpha-numeric characters", "string.base": "{{#label}} must be a string", "string.base64": "{{#label}} must be a valid base64 string", "string.creditCard": "{{#label}} must be a credit card", "string.dataUri": "{{#label}} must be a valid dataUri string", "string.domain": "{{#label}} must contain a valid domain name", "string.email": "{{#label}} must be a valid email", "string.empty": "{{#label}} is not allowed to be empty", "string.guid": "{{#label}} must be a valid GUID", "string.hex": "{{#label}} must only contain hexadecimal characters", "string.hexAlign": "{{#label}} hex decoded representation must be byte aligned", "string.hostname": "{{#label}} must be a valid hostname", "string.ip": "{{#label}} must be a valid ip address with a {{#cidr}} CIDR", "string.ipVersion": "{{#label}} must be a valid ip address of one of the following versions {{#version}} with a {{#cidr}} CIDR", "string.isoDate": "{{#label}} must be in iso format", "string.isoDuration": "{{#label}} must be a valid ISO 8601 duration", "string.length": "{{#label}} length must be {{#limit}} characters long", "string.lowercase": "{{#label}} must only contain lowercase characters", "string.max": "{{#label}} length must be less than or equal to {{#limit}} characters long", "string.min": "{{#label}} length must be at least {{#limit}} characters long", "string.normalize": "{{#label}} must be unicode normalized in the {{#form}} form", "string.token": "{{#label}} must only contain alpha-numeric and underscore characters", "string.pattern.base": "{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}", "string.pattern.name": "{{#label}} with value {:[.]} fails to match the {{#name}} pattern", "string.pattern.invert.base": "{{#label}} with value {:[.]} matches the inverted pattern: {{#regex}}", "string.pattern.invert.name": "{{#label}} with value {:[.]} matches the inverted {{#name}} pattern", "string.trim": "{{#label}} must not have leading or trailing whitespace", "string.uri": "{{#label}} must be a valid uri", "string.uriCustomScheme": "{{#label}} must be a valid uri with a scheme matching the {{#scheme}} pattern", "string.uriRelativeOnly": "{{#label}} must be a valid relative uri", "string.uppercase": "{{#label}} must only contain uppercase characters" } }), h.addressOptions = function(e4) {
            if (!e4)
              return e4;
            if (s(void 0 === e4.minDomainSegments || Number.isSafeInteger(e4.minDomainSegments) && e4.minDomainSegments > 0, "minDomainSegments must be a positive integer"), s(void 0 === e4.maxDomainSegments || Number.isSafeInteger(e4.maxDomainSegments) && e4.maxDomainSegments > 0, "maxDomainSegments must be a positive integer"), false === e4.tlds)
              return e4;
            if (true === e4.tlds || void 0 === e4.tlds)
              return s(h.tlds, "Built-in TLD list disabled"), Object.assign({}, e4, h.tlds);
            s("object" == typeof e4.tlds, "tlds must be true, false, or an object");
            const t3 = e4.tlds.deny;
            if (t3)
              return Array.isArray(t3) && (e4 = Object.assign({}, e4, { tlds: { deny: new Set(t3) } })), s(e4.tlds.deny instanceof Set, "tlds.deny must be an array, Set, or boolean"), s(!e4.tlds.allow, "Cannot specify both tlds.allow and tlds.deny lists"), h.validateTlds(e4.tlds.deny, "tlds.deny"), e4;
            const r2 = e4.tlds.allow;
            return r2 ? true === r2 ? (s(h.tlds, "Built-in TLD list disabled"), Object.assign({}, e4, h.tlds)) : (Array.isArray(r2) && (e4 = Object.assign({}, e4, { tlds: { allow: new Set(r2) } })), s(e4.tlds.allow instanceof Set, "tlds.allow must be an array, Set, or boolean"), h.validateTlds(e4.tlds.allow, "tlds.allow"), e4) : e4;
          }, h.validateTlds = function(e4, t3) {
            for (const r2 of e4)
              s(n.isValid(r2, { minDomainSegments: 1, maxDomainSegments: 1 }), `${t3} must contain valid top level domain names`);
          }, h.isoDate = function(e4) {
            if (!f.isIsoDate(e4))
              return null;
            /.*T.*[+-]\d\d$/.test(e4) && (e4 += "00");
            const t3 = new Date(e4);
            return isNaN(t3.getTime()) ? null : t3.toISOString();
          }, h.length = function(e4, t3, r2, n2, a2) {
            return s(!a2 || false, "Invalid encoding:", a2), e4.$_addRule({ name: t3, method: "length", args: { limit: r2, encoding: a2 }, operator: n2 });
          };
        }, 8826: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8068), a = {};
          a.Map = class extends Map {
            slice() {
              return new a.Map(this);
            }
          }, e3.exports = n.extend({ type: "symbol", terms: { map: { init: new a.Map() } }, coerce: { method(e4, t3) {
            let { schema: r2, error: s2 } = t3;
            const n2 = r2.$_terms.map.get(e4);
            return n2 && (e4 = n2), r2._flags.only && "symbol" != typeof e4 ? { value: e4, errors: s2("symbol.map", { map: r2.$_terms.map }) } : { value: e4 };
          } }, validate(e4, t3) {
            let { error: r2 } = t3;
            if ("symbol" != typeof e4)
              return { value: e4, errors: r2("symbol.base") };
          }, rules: { map: { method(e4) {
            e4 && !e4[Symbol.iterator] && "object" == typeof e4 && (e4 = Object.entries(e4)), s(e4 && e4[Symbol.iterator], "Iterable must be an iterable or object");
            const t3 = this.clone(), r2 = [];
            for (const n2 of e4) {
              s(n2 && n2[Symbol.iterator], "Entry must be an iterable");
              const [e5, a2] = n2;
              s("object" != typeof e5 && "function" != typeof e5 && "symbol" != typeof e5, "Key must not be of type object, function, or Symbol"), s("symbol" == typeof a2, "Value must be a Symbol"), t3.$_terms.map.set(e5, a2), r2.push(a2);
            }
            return t3.valid(...r2);
          } } }, manifest: { build: (e4, t3) => (t3.map && (e4 = e4.map(t3.map)), e4) }, messages: { "symbol.base": "{{#label}} must be a symbol", "symbol.map": "{{#label}} must be one of {{#map}}" } });
        }, 8863: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(738), i = r(9621), o = r(8160), l = r(6354), c = r(493), u = { result: Symbol("result") };
          t2.entry = function(e4, t3, r2) {
            let n2 = o.defaults;
            r2 && (s(void 0 === r2.warnings, "Cannot override warnings preference in synchronous validation"), s(void 0 === r2.artifacts, "Cannot override artifacts preference in synchronous validation"), n2 = o.preferences(o.defaults, r2));
            const a2 = u.entry(e4, t3, n2);
            s(!a2.mainstay.externals.length, "Schema with external rules must use validateAsync()");
            const i2 = { value: a2.value };
            return a2.error && (i2.error = a2.error), a2.mainstay.warnings.length && (i2.warning = l.details(a2.mainstay.warnings)), a2.mainstay.debug && (i2.debug = a2.mainstay.debug), a2.mainstay.artifacts && (i2.artifacts = a2.mainstay.artifacts), i2;
          }, t2.entryAsync = async function(e4, t3, r2) {
            let s2 = o.defaults;
            r2 && (s2 = o.preferences(o.defaults, r2));
            const n2 = u.entry(e4, t3, s2), a2 = n2.mainstay;
            if (n2.error)
              throw a2.debug && (n2.error.debug = a2.debug), n2.error;
            if (a2.externals.length) {
              let e5 = n2.value;
              for (const { method: t4, path: n3, label: o2 } of a2.externals) {
                let a3, l2, c3 = e5;
                n3.length && (a3 = n3[n3.length - 1], l2 = i(e5, n3.slice(0, -1)), c3 = l2[a3]);
                try {
                  const s3 = await t4(c3, { prefs: r2 });
                  if (void 0 === s3 || s3 === c3)
                    continue;
                  l2 ? l2[a3] = s3 : e5 = s3;
                } catch (e6) {
                  throw s2.errors.label && (e6.message += ` (${o2})`), e6;
                }
              }
              n2.value = e5;
            }
            if (!s2.warnings && !s2.debug && !s2.artifacts)
              return n2.value;
            const c2 = { value: n2.value };
            return a2.warnings.length && (c2.warning = l.details(a2.warnings)), a2.debug && (c2.debug = a2.debug), a2.artifacts && (c2.artifacts = a2.artifacts), c2;
          }, u.entry = function(e4, r2, s2) {
            const { tracer: n2, cleanup: a2 } = u.tracer(r2, s2), i2 = { externals: [], warnings: [], tracer: n2, debug: s2.debug ? [] : null, links: r2._ids._schemaChain ? /* @__PURE__ */ new Map() : null }, o2 = r2._ids._schemaChain ? [{ schema: r2 }] : null, f = new c([], [], { mainstay: i2, schemas: o2 }), h = t2.validate(e4, r2, f, s2);
            a2 && r2.$_root.untrace();
            const d = l.process(h.errors, e4, s2);
            return { value: h.value, error: d, mainstay: i2 };
          }, u.tracer = function(e4, t3) {
            return e4.$_root._tracer ? { tracer: e4.$_root._tracer._register(e4) } : t3.debug ? (s(e4.$_root.trace, "Debug mode not supported"), { tracer: e4.$_root.trace()._register(e4), cleanup: true }) : { tracer: u.ignore };
          }, t2.validate = function(e4, t3, r2, s2) {
            let n2 = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
            if (t3.$_terms.whens && (t3 = t3._generate(e4, r2, s2).schema), t3._preferences && (s2 = u.prefs(t3, s2)), t3._cache && s2.cache) {
              const s3 = t3._cache.get(e4);
              if (r2.mainstay.tracer.debug(r2, "validate", "cached", !!s3), s3)
                return s3;
            }
            const a2 = (n3, a3, i3) => t3.$_createError(n3, e4, a3, i3 || r2, s2), i2 = { original: e4, prefs: s2, schema: t3, state: r2, error: a2, errorsArray: u.errorsArray, warn: (e5, t4, s3) => r2.mainstay.warnings.push(a2(e5, t4, s3)), message: (n3, a3) => t3.$_createError("custom", e4, a3, r2, s2, { messages: n3 }) };
            r2.mainstay.tracer.entry(t3, r2);
            const l2 = t3._definition;
            if (l2.prepare && void 0 !== e4 && s2.convert) {
              const t4 = l2.prepare(e4, i2);
              if (t4) {
                if (r2.mainstay.tracer.value(r2, "prepare", e4, t4.value), t4.errors)
                  return u.finalize(t4.value, [].concat(t4.errors), i2);
                e4 = t4.value;
              }
            }
            if (l2.coerce && void 0 !== e4 && s2.convert && (!l2.coerce.from || l2.coerce.from.includes(typeof e4))) {
              const t4 = l2.coerce.method(e4, i2);
              if (t4) {
                if (r2.mainstay.tracer.value(r2, "coerced", e4, t4.value), t4.errors)
                  return u.finalize(t4.value, [].concat(t4.errors), i2);
                e4 = t4.value;
              }
            }
            const c2 = t3._flags.empty;
            c2 && c2.$_match(u.trim(e4, t3), r2.nest(c2), o.defaults) && (r2.mainstay.tracer.value(r2, "empty", e4, void 0), e4 = void 0);
            const f = n2.presence || t3._flags.presence || (t3._flags._endedSwitch ? null : s2.presence);
            if (void 0 === e4) {
              if ("forbidden" === f)
                return u.finalize(e4, null, i2);
              if ("required" === f)
                return u.finalize(e4, [t3.$_createError("any.required", e4, null, r2, s2)], i2);
              if ("optional" === f) {
                if (t3._flags.default !== o.symbols.deepDefault)
                  return u.finalize(e4, null, i2);
                r2.mainstay.tracer.value(r2, "default", e4, {}), e4 = {};
              }
            } else if ("forbidden" === f)
              return u.finalize(e4, [t3.$_createError("any.unknown", e4, null, r2, s2)], i2);
            const h = [];
            if (t3._valids) {
              const n3 = t3._valids.get(e4, r2, s2, t3._flags.insensitive);
              if (n3)
                return s2.convert && (r2.mainstay.tracer.value(r2, "valids", e4, n3.value), e4 = n3.value), r2.mainstay.tracer.filter(t3, r2, "valid", n3), u.finalize(e4, null, i2);
              if (t3._flags.only) {
                const n4 = t3.$_createError("any.only", e4, { valids: t3._valids.values({ display: true }) }, r2, s2);
                if (s2.abortEarly)
                  return u.finalize(e4, [n4], i2);
                h.push(n4);
              }
            }
            if (t3._invalids) {
              const n3 = t3._invalids.get(e4, r2, s2, t3._flags.insensitive);
              if (n3) {
                r2.mainstay.tracer.filter(t3, r2, "invalid", n3);
                const a3 = t3.$_createError("any.invalid", e4, { invalids: t3._invalids.values({ display: true }) }, r2, s2);
                if (s2.abortEarly)
                  return u.finalize(e4, [a3], i2);
                h.push(a3);
              }
            }
            if (l2.validate) {
              const t4 = l2.validate(e4, i2);
              if (t4 && (r2.mainstay.tracer.value(r2, "base", e4, t4.value), e4 = t4.value, t4.errors)) {
                if (!Array.isArray(t4.errors))
                  return h.push(t4.errors), u.finalize(e4, h, i2);
                if (t4.errors.length)
                  return h.push(...t4.errors), u.finalize(e4, h, i2);
              }
            }
            return t3._rules.length ? u.rules(e4, h, i2) : u.finalize(e4, h, i2);
          }, u.rules = function(e4, t3, r2) {
            const { schema: s2, state: n2, prefs: a2 } = r2;
            for (const i2 of s2._rules) {
              const l2 = s2._definition.rules[i2.method];
              if (l2.convert && a2.convert) {
                n2.mainstay.tracer.log(s2, n2, "rule", i2.name, "full");
                continue;
              }
              let c2, f = i2.args;
              if (i2._resolve.length) {
                f = Object.assign({}, f);
                for (const t4 of i2._resolve) {
                  const r3 = l2.argsByName.get(t4), i3 = f[t4].resolve(e4, n2, a2), u2 = r3.normalize ? r3.normalize(i3) : i3, h2 = o.validateArg(u2, null, r3);
                  if (h2) {
                    c2 = s2.$_createError("any.ref", i3, { arg: t4, ref: f[t4], reason: h2 }, n2, a2);
                    break;
                  }
                  f[t4] = u2;
                }
              }
              c2 = c2 || l2.validate(e4, r2, f, i2);
              const h = u.rule(c2, i2);
              if (h.errors) {
                if (n2.mainstay.tracer.log(s2, n2, "rule", i2.name, "error"), i2.warn) {
                  n2.mainstay.warnings.push(...h.errors);
                  continue;
                }
                if (a2.abortEarly)
                  return u.finalize(e4, h.errors, r2);
                t3.push(...h.errors);
              } else
                n2.mainstay.tracer.log(s2, n2, "rule", i2.name, "pass"), n2.mainstay.tracer.value(n2, "rule", e4, h.value, i2.name), e4 = h.value;
            }
            return u.finalize(e4, t3, r2);
          }, u.rule = function(e4, t3) {
            return e4 instanceof l.Report ? (u.error(e4, t3), { errors: [e4], value: null }) : Array.isArray(e4) && e4[o.symbols.errors] ? (e4.forEach((e5) => u.error(e5, t3)), { errors: e4, value: null }) : { errors: null, value: e4 };
          }, u.error = function(e4, t3) {
            return t3.message && e4._setTemplate(t3.message), e4;
          }, u.finalize = function(e4, t3, r2) {
            t3 = t3 || [];
            const { schema: n2, state: a2, prefs: i2 } = r2;
            if (t3.length) {
              const s2 = u.default("failover", void 0, t3, r2);
              void 0 !== s2 && (a2.mainstay.tracer.value(a2, "failover", e4, s2), e4 = s2, t3 = []);
            }
            if (t3.length && n2._flags.error)
              if ("function" == typeof n2._flags.error) {
                t3 = n2._flags.error(t3), Array.isArray(t3) || (t3 = [t3]);
                for (const e5 of t3)
                  s(e5 instanceof Error || e5 instanceof l.Report, "error() must return an Error object");
              } else
                t3 = [n2._flags.error];
            if (void 0 === e4) {
              const s2 = u.default("default", e4, t3, r2);
              a2.mainstay.tracer.value(a2, "default", e4, s2), e4 = s2;
            }
            if (n2._flags.cast && void 0 !== e4) {
              const t4 = n2._definition.cast[n2._flags.cast];
              if (t4.from(e4)) {
                const s2 = t4.to(e4, r2);
                a2.mainstay.tracer.value(a2, "cast", e4, s2, n2._flags.cast), e4 = s2;
              }
            }
            if (n2.$_terms.externals && i2.externals && false !== i2._externals)
              for (const { method: e5 } of n2.$_terms.externals)
                a2.mainstay.externals.push({ method: e5, path: a2.path, label: l.label(n2._flags, a2, i2) });
            const o2 = { value: e4, errors: t3.length ? t3 : null };
            return n2._flags.result && (o2.value = "strip" === n2._flags.result ? void 0 : r2.original, a2.mainstay.tracer.value(a2, n2._flags.result, e4, o2.value), a2.shadow(e4, n2._flags.result)), n2._cache && false !== i2.cache && !n2._refs.length && n2._cache.set(r2.original, o2), void 0 === e4 || o2.errors || void 0 === n2._flags.artifact || (a2.mainstay.artifacts = a2.mainstay.artifacts || /* @__PURE__ */ new Map(), a2.mainstay.artifacts.has(n2._flags.artifact) || a2.mainstay.artifacts.set(n2._flags.artifact, []), a2.mainstay.artifacts.get(n2._flags.artifact).push(a2.path)), o2;
          }, u.prefs = function(e4, t3) {
            const r2 = t3 === o.defaults;
            return r2 && e4._preferences[o.symbols.prefs] ? e4._preferences[o.symbols.prefs] : (t3 = o.preferences(t3, e4._preferences), r2 && (e4._preferences[o.symbols.prefs] = t3), t3);
          }, u.default = function(e4, t3, r2, s2) {
            const { schema: a2, state: i2, prefs: l2 } = s2, c2 = a2._flags[e4];
            if (l2.noDefaults || void 0 === c2)
              return t3;
            if (i2.mainstay.tracer.log(a2, i2, "rule", e4, "full"), !c2)
              return c2;
            if ("function" == typeof c2) {
              const t4 = c2.length ? [n(i2.ancestors[0]), s2] : [];
              try {
                return c2(...t4);
              } catch (t5) {
                return void r2.push(a2.$_createError(`any.${e4}`, null, { error: t5 }, i2, l2));
              }
            }
            return "object" != typeof c2 ? c2 : c2[o.symbols.literal] ? c2.literal : o.isResolvable(c2) ? c2.resolve(t3, i2, l2) : n(c2);
          }, u.trim = function(e4, t3) {
            if ("string" != typeof e4)
              return e4;
            const r2 = t3.$_getRule("trim");
            return r2 && r2.args.enabled ? e4.trim() : e4;
          }, u.ignore = { active: false, debug: a, entry: a, filter: a, log: a, resolve: a, value: a }, u.errorsArray = function() {
            const e4 = [];
            return e4[o.symbols.errors] = true, e4;
          };
        }, 2036: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(9474), a = r(8160), i = {};
          e3.exports = i.Values = class {
            constructor(e4, t3) {
              this._values = new Set(e4), this._refs = new Set(t3), this._lowercase = i.lowercases(e4), this._override = false;
            }
            get length() {
              return this._values.size + this._refs.size;
            }
            add(e4, t3) {
              a.isResolvable(e4) ? this._refs.has(e4) || (this._refs.add(e4), t3 && t3.register(e4)) : this.has(e4, null, null, false) || (this._values.add(e4), "string" == typeof e4 && this._lowercase.set(e4.toLowerCase(), e4));
            }
            static merge(e4, t3, r2) {
              if (e4 = e4 || new i.Values(), t3) {
                if (t3._override)
                  return t3.clone();
                for (const r3 of [...t3._values, ...t3._refs])
                  e4.add(r3);
              }
              if (r2)
                for (const t4 of [...r2._values, ...r2._refs])
                  e4.remove(t4);
              return e4.length ? e4 : null;
            }
            remove(e4) {
              a.isResolvable(e4) ? this._refs.delete(e4) : (this._values.delete(e4), "string" == typeof e4 && this._lowercase.delete(e4.toLowerCase()));
            }
            has(e4, t3, r2, s2) {
              return !!this.get(e4, t3, r2, s2);
            }
            get(e4, t3, r2, s2) {
              if (!this.length)
                return false;
              if (this._values.has(e4))
                return { value: e4 };
              if ("string" == typeof e4 && e4 && s2) {
                const t4 = this._lowercase.get(e4.toLowerCase());
                if (t4)
                  return { value: t4 };
              }
              if (!this._refs.size && "object" != typeof e4)
                return false;
              if ("object" == typeof e4) {
                for (const t4 of this._values)
                  if (n(t4, e4))
                    return { value: t4 };
              }
              if (t3)
                for (const a2 of this._refs) {
                  const i2 = a2.resolve(e4, t3, r2, null, { in: true });
                  if (void 0 === i2)
                    continue;
                  const o = a2.in && "object" == typeof i2 ? Array.isArray(i2) ? i2 : Object.keys(i2) : [i2];
                  for (const t4 of o)
                    if (typeof t4 == typeof e4) {
                      if (s2 && e4 && "string" == typeof e4) {
                        if (t4.toLowerCase() === e4.toLowerCase())
                          return { value: t4, ref: a2 };
                      } else if (n(t4, e4))
                        return { value: t4, ref: a2 };
                    }
                }
              return false;
            }
            override() {
              this._override = true;
            }
            values(e4) {
              if (e4 && e4.display) {
                const e5 = [];
                for (const t3 of [...this._values, ...this._refs])
                  void 0 !== t3 && e5.push(t3);
                return e5;
              }
              return Array.from([...this._values, ...this._refs]);
            }
            clone() {
              const e4 = new i.Values(this._values, this._refs);
              return e4._override = this._override, e4;
            }
            concat(e4) {
              s(!e4._override, "Cannot concat override set of values");
              const t3 = new i.Values([...this._values, ...e4._values], [...this._refs, ...e4._refs]);
              return t3._override = this._override, t3;
            }
            describe() {
              const e4 = [];
              this._override && e4.push({ override: true });
              for (const t3 of this._values.values())
                e4.push(t3 && "object" == typeof t3 ? { value: t3 } : t3);
              for (const t3 of this._refs.values())
                e4.push(t3.describe());
              return e4;
            }
          }, i.Values.prototype[a.symbols.values] = true, i.Values.prototype.slice = i.Values.prototype.clone, i.lowercases = function(e4) {
            const t3 = /* @__PURE__ */ new Map();
            if (e4)
              for (const r2 of e4)
                "string" == typeof r2 && t3.set(r2.toLowerCase(), r2);
            return t3;
          };
        }, 978: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(1687), i = r(9621), o = {};
          e3.exports = function(e4, t3) {
            let r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            if (s(e4 && "object" == typeof e4, "Invalid defaults value: must be an object"), s(!t3 || true === t3 || "object" == typeof t3, "Invalid source value: must be true, falsy or an object"), s("object" == typeof r2, "Invalid options: must be an object"), !t3)
              return null;
            if (r2.shallow)
              return o.applyToDefaultsWithShallow(e4, t3, r2);
            const i2 = n(e4);
            if (true === t3)
              return i2;
            const l = void 0 !== r2.nullOverride && r2.nullOverride;
            return a(i2, t3, { nullOverride: l, mergeArrays: false });
          }, o.applyToDefaultsWithShallow = function(e4, t3, r2) {
            const l = r2.shallow;
            s(Array.isArray(l), "Invalid keys");
            const c = /* @__PURE__ */ new Map(), u = true === t3 ? null : /* @__PURE__ */ new Set();
            for (let r3 of l) {
              r3 = Array.isArray(r3) ? r3 : r3.split(".");
              const s2 = i(e4, r3);
              s2 && "object" == typeof s2 ? c.set(s2, u && i(t3, r3) || s2) : u && u.add(r3);
            }
            const f = n(e4, {}, c);
            if (!u)
              return f;
            for (const e5 of u)
              o.reachCopy(f, t3, e5);
            const h = void 0 !== r2.nullOverride && r2.nullOverride;
            return a(f, t3, { nullOverride: h, mergeArrays: false });
          }, o.reachCopy = function(e4, t3, r2) {
            for (const e5 of r2) {
              if (!(e5 in t3))
                return;
              const r3 = t3[e5];
              if ("object" != typeof r3 || null === r3)
                return;
              t3 = r3;
            }
            const s2 = t3;
            let n2 = e4;
            for (let e5 = 0; e5 < r2.length - 1; ++e5) {
              const t4 = r2[e5];
              "object" != typeof n2[t4] && (n2[t4] = {}), n2 = n2[t4];
            }
            n2[r2[r2.length - 1]] = s2;
          };
        }, 375: (e3, t2, r) => {
          "use strict";
          const s = r(7916);
          e3.exports = function(e4) {
            if (!e4) {
              for (var t3 = arguments.length, r2 = new Array(t3 > 1 ? t3 - 1 : 0), n = 1; n < t3; n++)
                r2[n - 1] = arguments[n];
              if (1 === r2.length && r2[0] instanceof Error)
                throw r2[0];
              throw new s(r2);
            }
          };
        }, 8571: (e3, t2, r) => {
          "use strict";
          const s = r(9621), n = r(4277), a = r(7043), i = { needsProtoHack: /* @__PURE__ */ new Set([n.set, n.map, n.weakSet, n.weakMap]) };
          e3.exports = i.clone = function(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
            if ("object" != typeof e4 || null === e4)
              return e4;
            let s2 = i.clone, o = r2;
            if (t3.shallow) {
              if (true !== t3.shallow)
                return i.cloneWithShallow(e4, t3);
              s2 = (e5) => e5;
            } else if (o) {
              const t4 = o.get(e4);
              if (t4)
                return t4;
            } else
              o = /* @__PURE__ */ new Map();
            const l = n.getInternalProto(e4);
            if (l === n.buffer)
              return false;
            if (l === n.date)
              return new Date(e4.getTime());
            if (l === n.regex)
              return new RegExp(e4);
            const c = i.base(e4, l, t3);
            if (c === e4)
              return e4;
            if (o && o.set(e4, c), l === n.set)
              for (const r3 of e4)
                c.add(s2(r3, t3, o));
            else if (l === n.map)
              for (const [r3, n2] of e4)
                c.set(r3, s2(n2, t3, o));
            const u = a.keys(e4, t3);
            for (const r3 of u) {
              if ("__proto__" === r3)
                continue;
              if (l === n.array && "length" === r3) {
                c.length = e4.length;
                continue;
              }
              const a2 = Object.getOwnPropertyDescriptor(e4, r3);
              a2 ? a2.get || a2.set ? Object.defineProperty(c, r3, a2) : a2.enumerable ? c[r3] = s2(e4[r3], t3, o) : Object.defineProperty(c, r3, { enumerable: false, writable: true, configurable: true, value: s2(e4[r3], t3, o) }) : Object.defineProperty(c, r3, { enumerable: true, writable: true, configurable: true, value: s2(e4[r3], t3, o) });
            }
            return c;
          }, i.cloneWithShallow = function(e4, t3) {
            const r2 = t3.shallow;
            (t3 = Object.assign({}, t3)).shallow = false;
            const n2 = /* @__PURE__ */ new Map();
            for (const t4 of r2) {
              const r3 = s(e4, t4);
              "object" != typeof r3 && "function" != typeof r3 || n2.set(r3, r3);
            }
            return i.clone(e4, t3, n2);
          }, i.base = function(e4, t3, r2) {
            if (false === r2.prototype)
              return i.needsProtoHack.has(t3) ? new t3.constructor() : t3 === n.array ? [] : {};
            const s2 = Object.getPrototypeOf(e4);
            if (s2 && s2.isImmutable)
              return e4;
            if (t3 === n.array) {
              const e5 = [];
              return s2 !== t3 && Object.setPrototypeOf(e5, s2), e5;
            }
            if (i.needsProtoHack.has(t3)) {
              const e5 = new s2.constructor();
              return s2 !== t3 && Object.setPrototypeOf(e5, s2), e5;
            }
            return Object.create(s2);
          };
        }, 9474: (e3, t2, r) => {
          "use strict";
          const s = r(4277), n = { mismatched: null };
          e3.exports = function(e4, t3, r2) {
            return r2 = Object.assign({ prototype: true }, r2), !!n.isDeepEqual(e4, t3, r2, []);
          }, n.isDeepEqual = function(e4, t3, r2, a) {
            if (e4 === t3)
              return 0 !== e4 || 1 / e4 == 1 / t3;
            const i = typeof e4;
            if (i !== typeof t3)
              return false;
            if (null === e4 || null === t3)
              return false;
            if ("function" === i) {
              if (!r2.deepFunction || e4.toString() !== t3.toString())
                return false;
            } else if ("object" !== i)
              return e4 != e4 && t3 != t3;
            const o = n.getSharedType(e4, t3, !!r2.prototype);
            switch (o) {
              case s.buffer:
                return false;
              case s.promise:
                return e4 === t3;
              case s.regex:
                return e4.toString() === t3.toString();
              case n.mismatched:
                return false;
            }
            for (let r3 = a.length - 1; r3 >= 0; --r3)
              if (a[r3].isSame(e4, t3))
                return true;
            a.push(new n.SeenEntry(e4, t3));
            try {
              return !!n.isDeepEqualObj(o, e4, t3, r2, a);
            } finally {
              a.pop();
            }
          }, n.getSharedType = function(e4, t3, r2) {
            if (r2)
              return Object.getPrototypeOf(e4) !== Object.getPrototypeOf(t3) ? n.mismatched : s.getInternalProto(e4);
            const a = s.getInternalProto(e4);
            return a !== s.getInternalProto(t3) ? n.mismatched : a;
          }, n.valueOf = function(e4) {
            const t3 = e4.valueOf;
            if (void 0 === t3)
              return e4;
            try {
              return t3.call(e4);
            } catch (e5) {
              return e5;
            }
          }, n.hasOwnEnumerableProperty = function(e4, t3) {
            return Object.prototype.propertyIsEnumerable.call(e4, t3);
          }, n.isSetSimpleEqual = function(e4, t3) {
            for (const r2 of Set.prototype.values.call(e4))
              if (!Set.prototype.has.call(t3, r2))
                return false;
            return true;
          }, n.isDeepEqualObj = function(e4, t3, r2, a, i) {
            const { isDeepEqual: o, valueOf: l, hasOwnEnumerableProperty: c } = n, { keys: u, getOwnPropertySymbols: f } = Object;
            if (e4 === s.array) {
              if (!a.part) {
                if (t3.length !== r2.length)
                  return false;
                for (let e5 = 0; e5 < t3.length; ++e5)
                  if (!o(t3[e5], r2[e5], a, i))
                    return false;
                return true;
              }
              for (const e5 of t3)
                for (const t4 of r2)
                  if (o(e5, t4, a, i))
                    return true;
            } else if (e4 === s.set) {
              if (t3.size !== r2.size)
                return false;
              if (!n.isSetSimpleEqual(t3, r2)) {
                const e5 = new Set(Set.prototype.values.call(r2));
                for (const r3 of Set.prototype.values.call(t3)) {
                  if (e5.delete(r3))
                    continue;
                  let t4 = false;
                  for (const s2 of e5)
                    if (o(r3, s2, a, i)) {
                      e5.delete(s2), t4 = true;
                      break;
                    }
                  if (!t4)
                    return false;
                }
              }
            } else if (e4 === s.map) {
              if (t3.size !== r2.size)
                return false;
              for (const [e5, s2] of Map.prototype.entries.call(t3)) {
                if (void 0 === s2 && !Map.prototype.has.call(r2, e5))
                  return false;
                if (!o(s2, Map.prototype.get.call(r2, e5), a, i))
                  return false;
              }
            } else if (e4 === s.error && (t3.name !== r2.name || t3.message !== r2.message))
              return false;
            const h = l(t3), d = l(r2);
            if ((t3 !== h || r2 !== d) && !o(h, d, a, i))
              return false;
            const m = u(t3);
            if (!a.part && m.length !== u(r2).length && !a.skip)
              return false;
            let p = 0;
            for (const e5 of m)
              if (a.skip && a.skip.includes(e5))
                void 0 === r2[e5] && ++p;
              else {
                if (!c(r2, e5))
                  return false;
                if (!o(t3[e5], r2[e5], a, i))
                  return false;
              }
            if (!a.part && m.length - p !== u(r2).length)
              return false;
            if (false !== a.symbols) {
              const e5 = f(t3), s2 = new Set(f(r2));
              for (const n2 of e5) {
                if (!a.skip || !a.skip.includes(n2)) {
                  if (c(t3, n2)) {
                    if (!c(r2, n2))
                      return false;
                    if (!o(t3[n2], r2[n2], a, i))
                      return false;
                  } else if (c(r2, n2))
                    return false;
                }
                s2.delete(n2);
              }
              for (const e6 of s2)
                if (c(r2, e6))
                  return false;
            }
            return true;
          }, n.SeenEntry = class {
            constructor(e4, t3) {
              this.obj = e4, this.ref = t3;
            }
            isSame(e4, t3) {
              return this.obj === e4 && this.ref === t3;
            }
          };
        }, 7916: (e3, t2, r) => {
          "use strict";
          const s = r(8761);
          e3.exports = class extends Error {
            constructor(e4) {
              super(e4.filter((e5) => "" !== e5).map((e5) => "string" == typeof e5 ? e5 : e5 instanceof Error ? e5.message : s(e5)).join(" ") || "Unknown error"), "function" == typeof Error.captureStackTrace && Error.captureStackTrace(this, t2.assert);
            }
          };
        }, 5277: (e3) => {
          "use strict";
          const t2 = {};
          e3.exports = function(e4) {
            if (!e4)
              return "";
            let r = "";
            for (let s = 0; s < e4.length; ++s) {
              const n = e4.charCodeAt(s);
              t2.isSafe(n) ? r += e4[s] : r += t2.escapeHtmlChar(n);
            }
            return r;
          }, t2.escapeHtmlChar = function(e4) {
            return t2.namedHtml.get(e4) || (e4 >= 256 ? "&#" + e4 + ";" : `&#x${e4.toString(16).padStart(2, "0")};`);
          }, t2.isSafe = function(e4) {
            return t2.safeCharCodes.has(e4);
          }, t2.namedHtml = /* @__PURE__ */ new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [34, "&quot;"], [160, "&nbsp;"], [162, "&cent;"], [163, "&pound;"], [164, "&curren;"], [169, "&copy;"], [174, "&reg;"]]), t2.safeCharCodes = function() {
            const e4 = /* @__PURE__ */ new Set();
            for (let t3 = 32; t3 < 123; ++t3)
              (t3 >= 97 || t3 >= 65 && t3 <= 90 || t3 >= 48 && t3 <= 57 || 32 === t3 || 46 === t3 || 44 === t3 || 45 === t3 || 58 === t3 || 95 === t3) && e4.add(t3);
            return e4;
          }();
        }, 6064: (e3) => {
          "use strict";
          e3.exports = function(e4) {
            return e4.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, "\\$&");
          };
        }, 738: (e3) => {
          "use strict";
          e3.exports = function() {
          };
        }, 1687: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(8571), a = r(7043), i = {};
          e3.exports = i.merge = function(e4, t3, r2) {
            if (s(e4 && "object" == typeof e4, "Invalid target value: must be an object"), s(null == t3 || "object" == typeof t3, "Invalid source value: must be null, undefined, or an object"), !t3)
              return e4;
            if (r2 = Object.assign({ nullOverride: true, mergeArrays: true }, r2), Array.isArray(t3)) {
              s(Array.isArray(e4), "Cannot merge array onto an object"), r2.mergeArrays || (e4.length = 0);
              for (let s2 = 0; s2 < t3.length; ++s2)
                e4.push(n(t3[s2], { symbols: r2.symbols }));
              return e4;
            }
            const o = a.keys(t3, r2);
            for (let s2 = 0; s2 < o.length; ++s2) {
              const a2 = o[s2];
              if ("__proto__" === a2 || !Object.prototype.propertyIsEnumerable.call(t3, a2))
                continue;
              const l = t3[a2];
              if (l && "object" == typeof l) {
                if (e4[a2] === l)
                  continue;
                !e4[a2] || "object" != typeof e4[a2] || Array.isArray(e4[a2]) !== Array.isArray(l) || l instanceof Date || l instanceof RegExp ? e4[a2] = n(l, { symbols: r2.symbols }) : i.merge(e4[a2], l, r2);
              } else
                (null != l || r2.nullOverride) && (e4[a2] = l);
            }
            return e4;
          };
        }, 9621: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = {};
          e3.exports = function(e4, t3, r2) {
            if (false === t3 || null == t3)
              return e4;
            "string" == typeof (r2 = r2 || {}) && (r2 = { separator: r2 });
            const a = Array.isArray(t3);
            s(!a || !r2.separator, "Separator option is not valid for array-based chain");
            const i = a ? t3 : t3.split(r2.separator || ".");
            let o = e4;
            for (let e5 = 0; e5 < i.length; ++e5) {
              let a2 = i[e5];
              const l = r2.iterables && n.iterables(o);
              if (Array.isArray(o) || "set" === l) {
                const e6 = Number(a2);
                Number.isInteger(e6) && (a2 = e6 < 0 ? o.length + e6 : e6);
              }
              if (!o || "function" == typeof o && false === r2.functions || !l && void 0 === o[a2]) {
                s(!r2.strict || e5 + 1 === i.length, "Missing segment", a2, "in reach path ", t3), s("object" == typeof o || true === r2.functions || "function" != typeof o, "Invalid segment", a2, "in reach path ", t3), o = r2.default;
                break;
              }
              o = l ? "set" === l ? [...o][a2] : o.get(a2) : o[a2];
            }
            return o;
          }, n.iterables = function(e4) {
            return e4 instanceof Set ? "set" : e4 instanceof Map ? "map" : void 0;
          };
        }, 8761: (e3) => {
          "use strict";
          e3.exports = function() {
            try {
              return JSON.stringify(...arguments);
            } catch (e4) {
              return "[Cannot display object: " + e4.message + "]";
            }
          };
        }, 4277: (e3, t2) => {
          "use strict";
          const r = {};
          t2 = e3.exports = { array: Array.prototype, buffer: false, date: Date.prototype, error: Error.prototype, generic: Object.prototype, map: Map.prototype, promise: Promise.prototype, regex: RegExp.prototype, set: Set.prototype, weakMap: WeakMap.prototype, weakSet: WeakSet.prototype }, r.typeMap = /* @__PURE__ */ new Map([["[object Error]", t2.error], ["[object Map]", t2.map], ["[object Promise]", t2.promise], ["[object Set]", t2.set], ["[object WeakMap]", t2.weakMap], ["[object WeakSet]", t2.weakSet]]), t2.getInternalProto = function(e4) {
            if (Array.isArray(e4))
              return t2.array;
            if (e4 instanceof Date)
              return t2.date;
            if (e4 instanceof RegExp)
              return t2.regex;
            if (e4 instanceof Error)
              return t2.error;
            const s = Object.prototype.toString.call(e4);
            return r.typeMap.get(s) || t2.generic;
          };
        }, 7043: (e3, t2) => {
          "use strict";
          t2.keys = function(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return false !== t3.symbols ? Reflect.ownKeys(e4) : Object.getOwnPropertyNames(e4);
          };
        }, 3652: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = {};
          t2.Sorter = class {
            constructor() {
              this._items = [], this.nodes = [];
            }
            add(e4, t3) {
              const r2 = [].concat((t3 = t3 || {}).before || []), n2 = [].concat(t3.after || []), a = t3.group || "?", i = t3.sort || 0;
              s(!r2.includes(a), `Item cannot come before itself: ${a}`), s(!r2.includes("?"), "Item cannot come before unassociated items"), s(!n2.includes(a), `Item cannot come after itself: ${a}`), s(!n2.includes("?"), "Item cannot come after unassociated items"), Array.isArray(e4) || (e4 = [e4]);
              for (const t4 of e4) {
                const e5 = { seq: this._items.length, sort: i, before: r2, after: n2, group: a, node: t4 };
                this._items.push(e5);
              }
              if (!t3.manual) {
                const e5 = this._sort();
                s(e5, "item", "?" !== a ? `added into group ${a}` : "", "created a dependencies error");
              }
              return this.nodes;
            }
            merge(e4) {
              Array.isArray(e4) || (e4 = [e4]);
              for (const t4 of e4)
                if (t4)
                  for (const e5 of t4._items)
                    this._items.push(Object.assign({}, e5));
              this._items.sort(n.mergeSort);
              for (let e5 = 0; e5 < this._items.length; ++e5)
                this._items[e5].seq = e5;
              const t3 = this._sort();
              return s(t3, "merge created a dependencies error"), this.nodes;
            }
            sort() {
              const e4 = this._sort();
              return s(e4, "sort created a dependencies error"), this.nodes;
            }
            _sort() {
              const e4 = {}, t3 = /* @__PURE__ */ Object.create(null), r2 = /* @__PURE__ */ Object.create(null);
              for (const s3 of this._items) {
                const n3 = s3.seq, a2 = s3.group;
                r2[a2] = r2[a2] || [], r2[a2].push(n3), e4[n3] = s3.before;
                for (const e5 of s3.after)
                  t3[e5] = t3[e5] || [], t3[e5].push(n3);
              }
              for (const t4 in e4) {
                const s3 = [];
                for (const n3 in e4[t4]) {
                  const a2 = e4[t4][n3];
                  r2[a2] = r2[a2] || [], s3.push(...r2[a2]);
                }
                e4[t4] = s3;
              }
              for (const s3 in t3)
                if (r2[s3])
                  for (const n3 of r2[s3])
                    e4[n3].push(...t3[s3]);
              const s2 = {};
              for (const t4 in e4) {
                const r3 = e4[t4];
                for (const e5 of r3)
                  s2[e5] = s2[e5] || [], s2[e5].push(t4);
              }
              const n2 = {}, a = [];
              for (let e5 = 0; e5 < this._items.length; ++e5) {
                let t4 = e5;
                if (s2[e5]) {
                  t4 = null;
                  for (let e6 = 0; e6 < this._items.length; ++e6) {
                    if (true === n2[e6])
                      continue;
                    s2[e6] || (s2[e6] = []);
                    const r3 = s2[e6].length;
                    let a2 = 0;
                    for (let t5 = 0; t5 < r3; ++t5)
                      n2[s2[e6][t5]] && ++a2;
                    if (a2 === r3) {
                      t4 = e6;
                      break;
                    }
                  }
                }
                null !== t4 && (n2[t4] = true, a.push(t4));
              }
              if (a.length !== this._items.length)
                return false;
              const i = {};
              for (const e5 of this._items)
                i[e5.seq] = e5;
              this._items = [], this.nodes = [];
              for (const e5 of a) {
                const t4 = i[e5];
                this.nodes.push(t4.node), this._items.push(t4);
              }
              return true;
            }
          }, n.mergeSort = (e4, t3) => e4.sort === t3.sort ? 0 : e4.sort < t3.sort ? -1 : 1;
        }, 5380: (e3, t2, r) => {
          "use strict";
          const s = r(443), n = r(2178), a = { minDomainSegments: 2, nonAsciiRx: /[^\x00-\x7f]/, domainControlRx: /[\x00-\x20@\:\/\\#!\$&\'\(\)\*\+,;=\?]/, tldSegmentRx: /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, domainSegmentRx: /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/, URL: s.URL || URL };
          t2.analyze = function(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!e4)
              return n.code("DOMAIN_NON_EMPTY_STRING");
            if ("string" != typeof e4)
              throw new Error("Invalid input: domain must be a string");
            if (e4.length > 256)
              return n.code("DOMAIN_TOO_LONG");
            const r2 = !a.nonAsciiRx.test(e4);
            if (!r2) {
              if (false === t3.allowUnicode)
                return n.code("DOMAIN_INVALID_UNICODE_CHARS");
              e4 = e4.normalize("NFC");
            }
            if (a.domainControlRx.test(e4))
              return n.code("DOMAIN_INVALID_CHARS");
            e4 = a.punycode(e4), t3.allowFullyQualified && "." === e4[e4.length - 1] && (e4 = e4.slice(0, -1));
            const s2 = t3.minDomainSegments || a.minDomainSegments, i = e4.split(".");
            if (i.length < s2)
              return n.code("DOMAIN_SEGMENTS_COUNT");
            if (t3.maxDomainSegments && i.length > t3.maxDomainSegments)
              return n.code("DOMAIN_SEGMENTS_COUNT_MAX");
            const o = t3.tlds;
            if (o) {
              const e5 = i[i.length - 1].toLowerCase();
              if (o.deny && o.deny.has(e5) || o.allow && !o.allow.has(e5))
                return n.code("DOMAIN_FORBIDDEN_TLDS");
            }
            for (let e5 = 0; e5 < i.length; ++e5) {
              const t4 = i[e5];
              if (!t4.length)
                return n.code("DOMAIN_EMPTY_SEGMENT");
              if (t4.length > 63)
                return n.code("DOMAIN_LONG_SEGMENT");
              if (e5 < i.length - 1) {
                if (!a.domainSegmentRx.test(t4))
                  return n.code("DOMAIN_INVALID_CHARS");
              } else if (!a.tldSegmentRx.test(t4))
                return n.code("DOMAIN_INVALID_TLDS_CHARS");
            }
            return null;
          }, t2.isValid = function(e4, r2) {
            return !t2.analyze(e4, r2);
          }, a.punycode = function(e4) {
            e4.includes("%") && (e4 = e4.replace(/%/g, "%25"));
            try {
              return new a.URL(`http://${e4}`).host;
            } catch (t3) {
              return e4;
            }
          };
        }, 1745: (e3, t2, r) => {
          "use strict";
          const s = r(9848), n = r(5380), a = r(2178), i = { nonAsciiRx: /[^\x00-\x7f]/, encoder: new (s.TextEncoder || TextEncoder)() };
          t2.analyze = function(e4, t3) {
            return i.email(e4, t3);
          }, t2.isValid = function(e4, t3) {
            return !i.email(e4, t3);
          }, i.email = function(e4) {
            let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if ("string" != typeof e4)
              throw new Error("Invalid input: email must be a string");
            if (!e4)
              return a.code("EMPTY_STRING");
            const r2 = !i.nonAsciiRx.test(e4);
            if (!r2) {
              if (false === t3.allowUnicode)
                return a.code("FORBIDDEN_UNICODE");
              e4 = e4.normalize("NFC");
            }
            const s2 = e4.split("@");
            if (2 !== s2.length)
              return s2.length > 2 ? a.code("MULTIPLE_AT_CHAR") : a.code("MISSING_AT_CHAR");
            const [o, l] = s2;
            if (!o)
              return a.code("EMPTY_LOCAL");
            if (!t3.ignoreLength) {
              if (e4.length > 254)
                return a.code("ADDRESS_TOO_LONG");
              if (i.encoder.encode(o).length > 64)
                return a.code("LOCAL_TOO_LONG");
            }
            return i.local(o, r2) || n.analyze(l, t3);
          }, i.local = function(e4, t3) {
            const r2 = e4.split(".");
            for (const e5 of r2) {
              if (!e5.length)
                return a.code("EMPTY_LOCAL_SEGMENT");
              if (t3) {
                if (!i.atextRx.test(e5))
                  return a.code("INVALID_LOCAL_CHARS");
              } else
                for (const t4 of e5) {
                  if (i.atextRx.test(t4))
                    continue;
                  const e6 = i.binary(t4);
                  if (!i.atomRx.test(e6))
                    return a.code("INVALID_LOCAL_CHARS");
                }
            }
          }, i.binary = function(e4) {
            return Array.from(i.encoder.encode(e4)).map((e5) => String.fromCharCode(e5)).join("");
          }, i.atextRx = /^[\w!#\$%&'\*\+\-/=\?\^`\{\|\}~]+$/, i.atomRx = new RegExp(["(?:[\\xc2-\\xdf][\\x80-\\xbf])", "(?:\\xe0[\\xa0-\\xbf][\\x80-\\xbf])|(?:[\\xe1-\\xec][\\x80-\\xbf]{2})|(?:\\xed[\\x80-\\x9f][\\x80-\\xbf])|(?:[\\xee-\\xef][\\x80-\\xbf]{2})", "(?:\\xf0[\\x90-\\xbf][\\x80-\\xbf]{2})|(?:[\\xf1-\\xf3][\\x80-\\xbf]{3})|(?:\\xf4[\\x80-\\x8f][\\x80-\\xbf]{2})"].join("|"));
        }, 2178: (e3, t2) => {
          "use strict";
          t2.codes = { EMPTY_STRING: "Address must be a non-empty string", FORBIDDEN_UNICODE: "Address contains forbidden Unicode characters", MULTIPLE_AT_CHAR: "Address cannot contain more than one @ character", MISSING_AT_CHAR: "Address must contain one @ character", EMPTY_LOCAL: "Address local part cannot be empty", ADDRESS_TOO_LONG: "Address too long", LOCAL_TOO_LONG: "Address local part too long", EMPTY_LOCAL_SEGMENT: "Address local part contains empty dot-separated segment", INVALID_LOCAL_CHARS: "Address local part contains invalid character", DOMAIN_NON_EMPTY_STRING: "Domain must be a non-empty string", DOMAIN_TOO_LONG: "Domain too long", DOMAIN_INVALID_UNICODE_CHARS: "Domain contains forbidden Unicode characters", DOMAIN_INVALID_CHARS: "Domain contains invalid character", DOMAIN_INVALID_TLDS_CHARS: "Domain contains invalid tld character", DOMAIN_SEGMENTS_COUNT: "Domain lacks the minimum required number of segments", DOMAIN_SEGMENTS_COUNT_MAX: "Domain contains too many segments", DOMAIN_FORBIDDEN_TLDS: "Domain uses forbidden TLD", DOMAIN_EMPTY_SEGMENT: "Domain contains empty dot-separated segment", DOMAIN_LONG_SEGMENT: "Domain contains dot-separated segment that is too long" }, t2.code = function(e4) {
            return { code: e4, error: t2.codes[e4] };
          };
        }, 9959: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(5752);
          t2.regex = function() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            s(void 0 === e4.cidr || "string" == typeof e4.cidr, "options.cidr must be a string");
            const t3 = e4.cidr ? e4.cidr.toLowerCase() : "optional";
            s(["required", "optional", "forbidden"].includes(t3), "options.cidr must be one of required, optional, forbidden"), s(void 0 === e4.version || "string" == typeof e4.version || Array.isArray(e4.version), "options.version must be a string or an array of string");
            let r2 = e4.version || ["ipv4", "ipv6", "ipvfuture"];
            Array.isArray(r2) || (r2 = [r2]), s(r2.length >= 1, "options.version must have at least 1 version specified");
            for (let e5 = 0; e5 < r2.length; ++e5)
              s("string" == typeof r2[e5], "options.version must only contain strings"), r2[e5] = r2[e5].toLowerCase(), s(["ipv4", "ipv6", "ipvfuture"].includes(r2[e5]), "options.version contains unknown version " + r2[e5] + " - must be one of ipv4, ipv6, ipvfuture");
            r2 = Array.from(new Set(r2));
            const a = r2.map((e5) => {
              if ("forbidden" === t3)
                return n.ip[e5];
              const r3 = `\\/${"ipv4" === e5 ? n.ip.v4Cidr : n.ip.v6Cidr}`;
              return "required" === t3 ? `${n.ip[e5]}${r3}` : `${n.ip[e5]}(?:${r3})?`;
            }), i = `(?:${a.join("|")})`, o = new RegExp(`^${i}$`);
            return { cidr: t3, versions: r2, regex: o, raw: i };
          };
        }, 5752: (e3, t2, r) => {
          "use strict";
          const s = r(375), n = r(6064), a = { generate: function() {
            const e4 = {}, t3 = "!\\$&'\\(\\)\\*\\+,;=", r2 = "\\w-\\.~%\\dA-Fa-f" + t3 + ":@", s2 = "[" + r2 + "]", n2 = "(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])";
            e4.ipv4address = "(?:" + n2 + "\\.){3}" + n2;
            const a2 = "[\\dA-Fa-f]{1,4}", i = "(?:" + a2 + ":" + a2 + "|" + e4.ipv4address + ")", o = "(?:" + a2 + ":){6}" + i, l = "::(?:" + a2 + ":){5}" + i, c = "(?:" + a2 + ")?::(?:" + a2 + ":){4}" + i, u = "(?:(?:" + a2 + ":){0,1}" + a2 + ")?::(?:" + a2 + ":){3}" + i, f = "(?:(?:" + a2 + ":){0,2}" + a2 + ")?::(?:" + a2 + ":){2}" + i, h = "(?:(?:" + a2 + ":){0,3}" + a2 + ")?::" + a2 + ":" + i, d = "(?:(?:" + a2 + ":){0,4}" + a2 + ")?::" + i;
            e4.ipv4Cidr = "(?:\\d|[1-2]\\d|3[0-2])", e4.ipv6Cidr = "(?:0{0,2}\\d|0?[1-9]\\d|1[01]\\d|12[0-8])", e4.ipv6address = "(?:" + o + "|" + l + "|" + c + "|" + u + "|" + f + "|" + h + "|" + d + "|(?:(?:[\\dA-Fa-f]{1,4}:){0,5}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}|(?:(?:[\\dA-Fa-f]{1,4}:){0,6}[\\dA-Fa-f]{1,4})?::)", e4.ipvFuture = "v[\\dA-Fa-f]+\\.[\\w-\\.~" + t3 + ":]+", e4.scheme = "[a-zA-Z][a-zA-Z\\d+-\\.]*", e4.schemeRegex = new RegExp(e4.scheme);
            const m = "[\\w-\\.~%\\dA-Fa-f" + t3 + ":]*", p = "(?:\\[(?:" + e4.ipv6address + "|" + e4.ipvFuture + ")\\]|" + e4.ipv4address + "|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=]{1,255})", g = "(?:" + m + "@)?" + p + "(?::\\d*)?", y = "(?:" + m + "@)?(" + p + ")(?::\\d*)?", b = s2 + "+", v = "(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*", _ = "\\/(?:" + b + v + ")?", w = b + v, $ = "[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=@]+" + v;
            return e4.hierPart = "(?:(?:\\/\\/" + g + v + ")|" + _ + "|" + w + "|(?:\\/\\/\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*))", e4.hierPartCapture = "(?:(?:\\/\\/" + y + v + ")|" + _ + "|" + w + ")", e4.relativeRef = "(?:(?:\\/\\/" + g + v + ")|" + _ + "|" + $ + "|)", e4.relativeRefCapture = "(?:(?:\\/\\/" + y + v + ")|" + _ + "|" + $ + "|)", e4.query = "[" + r2 + "\\/\\?]*(?=#|$)", e4.queryWithSquareBrackets = "[" + r2 + "\\[\\]\\/\\?]*(?=#|$)", e4.fragment = "[" + r2 + "\\/\\?]*", e4;
          } };
          a.rfc3986 = a.generate(), t2.ip = { v4Cidr: a.rfc3986.ipv4Cidr, v6Cidr: a.rfc3986.ipv6Cidr, ipv4: a.rfc3986.ipv4address, ipv6: a.rfc3986.ipv6address, ipvfuture: a.rfc3986.ipvFuture }, a.createRegex = function(e4) {
            const t3 = a.rfc3986, r2 = "(?:\\?" + (e4.allowQuerySquareBrackets ? t3.queryWithSquareBrackets : t3.query) + ")?(?:#" + t3.fragment + ")?", i = e4.domain ? t3.relativeRefCapture : t3.relativeRef;
            if (e4.relativeOnly)
              return a.wrap(i + r2);
            let o = "";
            if (e4.scheme) {
              s(e4.scheme instanceof RegExp || "string" == typeof e4.scheme || Array.isArray(e4.scheme), "scheme must be a RegExp, String, or Array");
              const r3 = [].concat(e4.scheme);
              s(r3.length >= 1, "scheme must have at least 1 scheme specified");
              const a2 = [];
              for (let e5 = 0; e5 < r3.length; ++e5) {
                const i2 = r3[e5];
                s(i2 instanceof RegExp || "string" == typeof i2, "scheme at position " + e5 + " must be a RegExp or String"), i2 instanceof RegExp ? a2.push(i2.source.toString()) : (s(t3.schemeRegex.test(i2), "scheme at position " + e5 + " must be a valid scheme"), a2.push(n(i2)));
              }
              o = a2.join("|");
            }
            const l = "(?:" + (o ? "(?:" + o + ")" : t3.scheme) + ":" + (e4.domain ? t3.hierPartCapture : t3.hierPart) + ")", c = e4.allowRelative ? "(?:" + l + "|" + i + ")" : l;
            return a.wrap(c + r2, o);
          }, a.wrap = function(e4, t3) {
            return { raw: e4 = `(?=.)(?!https?:/(?:$|[^/]))(?!https?:///)(?!https?:[^/])${e4}`, regex: new RegExp(`^${e4}$`), scheme: t3 };
          }, a.uriRegex = a.createRegex({}), t2.regex = function() {
            let e4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return e4.scheme || e4.allowRelative || e4.relativeOnly || e4.allowQuerySquareBrackets || e4.domain ? a.createRegex(e4) : a.uriRegex;
          };
        }, 1447: (e3, t2) => {
          "use strict";
          const r = { operators: ["!", "^", "*", "/", "%", "+", "-", "<", "<=", ">", ">=", "==", "!=", "&&", "||", "??"], operatorCharacters: ["!", "^", "*", "/", "%", "+", "-", "<", "=", ">", "&", "|", "?"], operatorsOrder: [["^"], ["*", "/", "%"], ["+", "-"], ["<", "<=", ">", ">="], ["==", "!="], ["&&"], ["||", "??"]], operatorsPrefix: ["!", "n"], literals: { '"': '"', "`": "`", "'": "'", "[": "]" }, numberRx: /^(?:[0-9]*\.?[0-9]*){1}$/, tokenRx: /^[\w\$\#\.\@\:\{\}]+$/, symbol: Symbol("formula"), settings: Symbol("settings") };
          t2.Parser = class {
            constructor(e4) {
              let t3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              if (!t3[r.settings] && t3.constants)
                for (const e5 in t3.constants) {
                  const r2 = t3.constants[e5];
                  if (null !== r2 && !["boolean", "number", "string"].includes(typeof r2))
                    throw new Error(`Formula constant ${e5} contains invalid ${typeof r2} value type`);
                }
              this.settings = t3[r.settings] ? t3 : Object.assign({ [r.settings]: true, constants: {}, functions: {} }, t3), this.single = null, this._parts = null, this._parse(e4);
            }
            _parse(e4) {
              let s = [], n = "", a = 0, i = false;
              const o = (e5) => {
                if (a)
                  throw new Error("Formula missing closing parenthesis");
                const o2 = s.length ? s[s.length - 1] : null;
                if (i || n || e5) {
                  if (o2 && "reference" === o2.type && ")" === e5)
                    return o2.type = "function", o2.value = this._subFormula(n, o2.value), void (n = "");
                  if (")" === e5) {
                    const e6 = new t2.Parser(n, this.settings);
                    s.push({ type: "segment", value: e6 });
                  } else if (i) {
                    if ("]" === i)
                      return s.push({ type: "reference", value: n }), void (n = "");
                    s.push({ type: "literal", value: n });
                  } else if (r.operatorCharacters.includes(n))
                    o2 && "operator" === o2.type && r.operators.includes(o2.value + n) ? o2.value += n : s.push({ type: "operator", value: n });
                  else if (n.match(r.numberRx))
                    s.push({ type: "constant", value: parseFloat(n) });
                  else if (void 0 !== this.settings.constants[n])
                    s.push({ type: "constant", value: this.settings.constants[n] });
                  else {
                    if (!n.match(r.tokenRx))
                      throw new Error(`Formula contains invalid token: ${n}`);
                    s.push({ type: "reference", value: n });
                  }
                  n = "";
                }
              };
              for (const t3 of e4)
                i ? t3 === i ? (o(), i = false) : n += t3 : a ? "(" === t3 ? (n += t3, ++a) : ")" === t3 ? (--a, a ? n += t3 : o(t3)) : n += t3 : t3 in r.literals ? i = r.literals[t3] : "(" === t3 ? (o(), ++a) : r.operatorCharacters.includes(t3) ? (o(), n = t3, o()) : " " !== t3 ? n += t3 : o();
              o(), s = s.map((e5, t3) => "operator" !== e5.type || "-" !== e5.value || t3 && "operator" !== s[t3 - 1].type ? e5 : { type: "operator", value: "n" });
              let l = false;
              for (const e5 of s) {
                if ("operator" === e5.type) {
                  if (r.operatorsPrefix.includes(e5.value))
                    continue;
                  if (!l)
                    throw new Error("Formula contains an operator in invalid position");
                  if (!r.operators.includes(e5.value))
                    throw new Error(`Formula contains an unknown operator ${e5.value}`);
                } else if (l)
                  throw new Error("Formula missing expected operator");
                l = !l;
              }
              if (!l)
                throw new Error("Formula contains invalid trailing operator");
              1 === s.length && ["reference", "literal", "constant"].includes(s[0].type) && (this.single = { type: "reference" === s[0].type ? "reference" : "value", value: s[0].value }), this._parts = s.map((e5) => {
                if ("operator" === e5.type)
                  return r.operatorsPrefix.includes(e5.value) ? e5 : e5.value;
                if ("reference" !== e5.type)
                  return e5.value;
                if (this.settings.tokenRx && !this.settings.tokenRx.test(e5.value))
                  throw new Error(`Formula contains invalid reference ${e5.value}`);
                return this.settings.reference ? this.settings.reference(e5.value) : r.reference(e5.value);
              });
            }
            _subFormula(e4, s) {
              const n = this.settings.functions[s];
              if ("function" != typeof n)
                throw new Error(`Formula contains unknown function ${s}`);
              let a = [];
              if (e4) {
                let t3 = "", n2 = 0, i = false;
                const o = () => {
                  if (!t3)
                    throw new Error(`Formula contains function ${s} with invalid arguments ${e4}`);
                  a.push(t3), t3 = "";
                };
                for (let s2 = 0; s2 < e4.length; ++s2) {
                  const a2 = e4[s2];
                  i ? (t3 += a2, a2 === i && (i = false)) : a2 in r.literals && !n2 ? (t3 += a2, i = r.literals[a2]) : "," !== a2 || n2 ? (t3 += a2, "(" === a2 ? ++n2 : ")" === a2 && --n2) : o();
                }
                o();
              }
              return a = a.map((e5) => new t2.Parser(e5, this.settings)), function(e5) {
                const t3 = [];
                for (const r2 of a)
                  t3.push(r2.evaluate(e5));
                return n.call(e5, ...t3);
              };
            }
            evaluate(e4) {
              const t3 = this._parts.slice();
              for (let s = t3.length - 2; s >= 0; --s) {
                const n = t3[s];
                if (n && "operator" === n.type) {
                  const a = t3[s + 1];
                  t3.splice(s + 1, 1);
                  const i = r.evaluate(a, e4);
                  t3[s] = r.single(n.value, i);
                }
              }
              return r.operatorsOrder.forEach((s) => {
                for (let n = 1; n < t3.length - 1; )
                  if (s.includes(t3[n])) {
                    const s2 = t3[n], a = r.evaluate(t3[n - 1], e4), i = r.evaluate(t3[n + 1], e4);
                    t3.splice(n, 2);
                    const o = r.calculate(s2, a, i);
                    t3[n - 1] = 0 === o ? 0 : o;
                  } else
                    n += 2;
              }), r.evaluate(t3[0], e4);
            }
          }, t2.Parser.prototype[r.symbol] = true, r.reference = function(e4) {
            return function(t3) {
              return t3 && void 0 !== t3[e4] ? t3[e4] : null;
            };
          }, r.evaluate = function(e4, t3) {
            return null === e4 ? null : "function" == typeof e4 ? e4(t3) : e4[r.symbol] ? e4.evaluate(t3) : e4;
          }, r.single = function(e4, t3) {
            if ("!" === e4)
              return !t3;
            const r2 = -t3;
            return 0 === r2 ? 0 : r2;
          }, r.calculate = function(e4, t3, s) {
            if ("??" === e4)
              return r.exists(t3) ? t3 : s;
            if ("string" == typeof t3 || "string" == typeof s) {
              if ("+" === e4)
                return (t3 = r.exists(t3) ? t3 : "") + (r.exists(s) ? s : "");
            } else
              switch (e4) {
                case "^":
                  return Math.pow(t3, s);
                case "*":
                  return t3 * s;
                case "/":
                  return t3 / s;
                case "%":
                  return t3 % s;
                case "+":
                  return t3 + s;
                case "-":
                  return t3 - s;
              }
            switch (e4) {
              case "<":
                return t3 < s;
              case "<=":
                return t3 <= s;
              case ">":
                return t3 > s;
              case ">=":
                return t3 >= s;
              case "==":
                return t3 === s;
              case "!=":
                return t3 !== s;
              case "&&":
                return t3 && s;
              case "||":
                return t3 || s;
            }
            return null;
          }, r.exists = function(e4) {
            return null != e4;
          };
        }, 9926: () => {
        }, 5688: () => {
        }, 9708: () => {
        }, 1152: () => {
        }, 443: () => {
        }, 9848: () => {
        }, 5934: (e3) => {
          "use strict";
          e3.exports = { version: "17.7.0" };
        } }, t = {}, function r(s) {
          var n = t[s];
          if (void 0 !== n)
            return n.exports;
          var a = t[s] = { exports: {} };
          return e2[s](a, a.exports, r), a.exports;
        }(5107);
        var e2, t;
      });
    }
  });

  // node_modules/object-assign/index.js
  var require_object_assign = __commonJS({
    "node_modules/object-assign/index.js"(exports, module) {
      "use strict";
      init_virtual_process_polyfill();
      init_buffer();
      var getOwnPropertySymbols = Object.getOwnPropertySymbols;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var propIsEnumerable = Object.prototype.propertyIsEnumerable;
      function toObject(val) {
        if (val === null || val === void 0) {
          throw new TypeError("Object.assign cannot be called with null or undefined");
        }
        return Object(val);
      }
      function shouldUseNative() {
        try {
          if (!Object.assign) {
            return false;
          }
          var test1 = new String("abc");
          test1[5] = "de";
          if (Object.getOwnPropertyNames(test1)[0] === "5") {
            return false;
          }
          var test2 = {};
          for (var i = 0; i < 10; i++) {
            test2["_" + String.fromCharCode(i)] = i;
          }
          var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
            return test2[n];
          });
          if (order2.join("") !== "0123456789") {
            return false;
          }
          var test3 = {};
          "abcdefghijklmnopqrst".split("").forEach(function(letter) {
            test3[letter] = letter;
          });
          if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
            return false;
          }
          return true;
        } catch (err) {
          return false;
        }
      }
      module.exports = shouldUseNative() ? Object.assign : function(target, source) {
        var from2;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
          from2 = Object(arguments[s]);
          for (var key in from2) {
            if (hasOwnProperty.call(from2, key)) {
              to[key] = from2[key];
            }
          }
          if (getOwnPropertySymbols) {
            symbols = getOwnPropertySymbols(from2);
            for (var i = 0; i < symbols.length; i++) {
              if (propIsEnumerable.call(from2, symbols[i])) {
                to[symbols[i]] = from2[symbols[i]];
              }
            }
          }
        }
        return to;
      };
    }
  });

  // node_modules/vary/index.js
  var require_vary = __commonJS({
    "node_modules/vary/index.js"(exports, module) {
      "use strict";
      init_virtual_process_polyfill();
      init_buffer();
      module.exports = vary;
      module.exports.append = append;
      var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
      function append(header, field) {
        if (typeof header !== "string") {
          throw new TypeError("header argument is required");
        }
        if (!field) {
          throw new TypeError("field argument is required");
        }
        var fields = !Array.isArray(field) ? parse(String(field)) : field;
        for (var j = 0; j < fields.length; j++) {
          if (!FIELD_NAME_REGEXP.test(fields[j])) {
            throw new TypeError("field argument contains an invalid header name");
          }
        }
        if (header === "*") {
          return header;
        }
        var val = header;
        var vals = parse(header.toLowerCase());
        if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
          return "*";
        }
        for (var i = 0; i < fields.length; i++) {
          var fld = fields[i].toLowerCase();
          if (vals.indexOf(fld) === -1) {
            vals.push(fld);
            val = val ? val + ", " + fields[i] : fields[i];
          }
        }
        return val;
      }
      function parse(header) {
        var end = 0;
        var list = [];
        var start = 0;
        for (var i = 0, len = header.length; i < len; i++) {
          switch (header.charCodeAt(i)) {
            case 32:
              if (start === end) {
                start = end = i + 1;
              }
              break;
            case 44:
              list.push(header.substring(start, end));
              start = end = i + 1;
              break;
            default:
              end = i + 1;
              break;
          }
        }
        list.push(header.substring(start, end));
        return list;
      }
      function vary(res, field) {
        if (!res || !res.getHeader || !res.setHeader) {
          throw new TypeError("res argument is required");
        }
        var val = res.getHeader("Vary") || "";
        var header = Array.isArray(val) ? val.join(", ") : String(val);
        if (val = append(header, field)) {
          res.setHeader("Vary", val);
        }
      }
    }
  });

  // node_modules/cors/lib/index.js
  var require_lib = __commonJS({
    "node_modules/cors/lib/index.js"(exports, module) {
      init_virtual_process_polyfill();
      init_buffer();
      (function() {
        "use strict";
        var assign = require_object_assign();
        var vary = require_vary();
        var defaults = {
          origin: "*",
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          preflightContinue: false,
          optionsSuccessStatus: 204
        };
        function isString(s) {
          return typeof s === "string" || s instanceof String;
        }
        function isOriginAllowed(origin, allowedOrigin) {
          if (Array.isArray(allowedOrigin)) {
            for (var i = 0; i < allowedOrigin.length; ++i) {
              if (isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
              }
            }
            return false;
          } else if (isString(allowedOrigin)) {
            return origin === allowedOrigin;
          } else if (allowedOrigin instanceof RegExp) {
            return allowedOrigin.test(origin);
          } else {
            return !!allowedOrigin;
          }
        }
        function configureOrigin(options2, req) {
          var requestOrigin = req.headers.origin, headers = [], isAllowed;
          if (!options2.origin || options2.origin === "*") {
            headers.push([{
              key: "Access-Control-Allow-Origin",
              value: "*"
            }]);
          } else if (isString(options2.origin)) {
            headers.push([{
              key: "Access-Control-Allow-Origin",
              value: options2.origin
            }]);
            headers.push([{
              key: "Vary",
              value: "Origin"
            }]);
          } else {
            isAllowed = isOriginAllowed(requestOrigin, options2.origin);
            headers.push([{
              key: "Access-Control-Allow-Origin",
              value: isAllowed ? requestOrigin : false
            }]);
            headers.push([{
              key: "Vary",
              value: "Origin"
            }]);
          }
          return headers;
        }
        function configureMethods(options2) {
          var methods = options2.methods;
          if (methods.join) {
            methods = options2.methods.join(",");
          }
          return {
            key: "Access-Control-Allow-Methods",
            value: methods
          };
        }
        function configureCredentials(options2) {
          if (options2.credentials === true) {
            return {
              key: "Access-Control-Allow-Credentials",
              value: "true"
            };
          }
          return null;
        }
        function configureAllowedHeaders(options2, req) {
          var allowedHeaders = options2.allowedHeaders || options2.headers;
          var headers = [];
          if (!allowedHeaders) {
            allowedHeaders = req.headers["access-control-request-headers"];
            headers.push([{
              key: "Vary",
              value: "Access-Control-Request-Headers"
            }]);
          } else if (allowedHeaders.join) {
            allowedHeaders = allowedHeaders.join(",");
          }
          if (allowedHeaders && allowedHeaders.length) {
            headers.push([{
              key: "Access-Control-Allow-Headers",
              value: allowedHeaders
            }]);
          }
          return headers;
        }
        function configureExposedHeaders(options2) {
          var headers = options2.exposedHeaders;
          if (!headers) {
            return null;
          } else if (headers.join) {
            headers = headers.join(",");
          }
          if (headers && headers.length) {
            return {
              key: "Access-Control-Expose-Headers",
              value: headers
            };
          }
          return null;
        }
        function configureMaxAge(options2) {
          var maxAge = (typeof options2.maxAge === "number" || options2.maxAge) && options2.maxAge.toString();
          if (maxAge && maxAge.length) {
            return {
              key: "Access-Control-Max-Age",
              value: maxAge
            };
          }
          return null;
        }
        function applyHeaders(headers, res) {
          for (var i = 0, n = headers.length; i < n; i++) {
            var header = headers[i];
            if (header) {
              if (Array.isArray(header)) {
                applyHeaders(header, res);
              } else if (header.key === "Vary" && header.value) {
                vary(res, header.value);
              } else if (header.value) {
                res.setHeader(header.key, header.value);
              }
            }
          }
        }
        function cors2(options2, req, res, next) {
          var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
          if (method === "OPTIONS") {
            headers.push(configureOrigin(options2, req));
            headers.push(configureCredentials(options2, req));
            headers.push(configureMethods(options2, req));
            headers.push(configureAllowedHeaders(options2, req));
            headers.push(configureMaxAge(options2, req));
            headers.push(configureExposedHeaders(options2, req));
            applyHeaders(headers, res);
            if (options2.preflightContinue) {
              next();
            } else {
              res.statusCode = options2.optionsSuccessStatus;
              res.setHeader("Content-Length", "0");
              res.end();
            }
          } else {
            headers.push(configureOrigin(options2, req));
            headers.push(configureCredentials(options2, req));
            headers.push(configureExposedHeaders(options2, req));
            applyHeaders(headers, res);
            next();
          }
        }
        function middlewareWrapper(o) {
          var optionsCallback = null;
          if (typeof o === "function") {
            optionsCallback = o;
          } else {
            optionsCallback = function(req, cb) {
              cb(null, o);
            };
          }
          return function corsMiddleware(req, res, next) {
            optionsCallback(req, function(err, options2) {
              if (err) {
                next(err);
              } else {
                var corsOptions = assign({}, defaults, options2);
                var originCallback = null;
                if (corsOptions.origin && typeof corsOptions.origin === "function") {
                  originCallback = corsOptions.origin;
                } else if (corsOptions.origin) {
                  originCallback = function(origin, cb) {
                    cb(null, corsOptions.origin);
                  };
                }
                if (originCallback) {
                  originCallback(req.headers.origin, function(err2, origin) {
                    if (err2 || !origin) {
                      next(err2);
                    } else {
                      corsOptions.origin = origin;
                      cors2(corsOptions, req, res, next);
                    }
                  });
                } else {
                  next();
                }
              }
            });
          };
        }
        module.exports = middlewareWrapper;
      })();
    }
  });

  // src/index.ts
  init_virtual_process_polyfill();
  init_buffer();

  // node_modules/itty-router/dist/itty-router.min.mjs
  init_virtual_process_polyfill();
  init_buffer();
  function e({ base: t = "", routes: n = [] } = {}) {
    return { __proto__: new Proxy({}, { get: (e2, a, o) => (e3, ...r) => n.push([a.toUpperCase(), RegExp(`^${(t + e3).replace(/(\/?)\*/g, "($1.*)?").replace(/(\/$)|((?<=\/)\/)/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.").replace(/\)\.\?\(([^\[]+)\[\^/g, "?)\\.?($1(?<=\\.)[^\\.")}/*$`), r]) && o }), routes: n, async handle(e2, ...r) {
      let a, o, t2 = new URL(e2.url);
      e2.query = Object.fromEntries(t2.searchParams);
      for (var [p, s, u] of n)
        if ((p === e2.method || "ALL" === p) && (o = t2.pathname.match(s))) {
          e2.params = o.groups;
          for (var c of u)
            if (void 0 !== (a = await c(e2.proxy || e2, ...r)))
              return a;
        }
    } };
  }

  // src/help/convert.ts
  init_virtual_process_polyfill();
  init_buffer();
  var convertObjToJson = async (data) => {
    return JSON.parse(JSON.stringify(data));
  };

  // src/help/response.ts
  init_virtual_process_polyfill();
  init_buffer();
  var corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
  };
  var responseSuccess = async (data, statusCode) => {
    const res = {
      status: statusCode,
      result: data
    };
    return new Response(JSON.stringify(res), {
      status: statusCode,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  };
  var responseError = async (data, statusCode) => {
    const res = {
      status: statusCode,
      error: data
    };
    return new Response(JSON.stringify(res), {
      status: statusCode,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    });
  };

  // src/modules/Product/validate/product.validate.post.ts
  init_virtual_process_polyfill();
  init_buffer();
  var import_joi = __toESM(require_joi_browser_min());
  var Validate = async (payload, schema) => {
    try {
      const params = await payload;
      const { error } = await schema.validate(params);
      if (error) {
        console.log(error);
        console.log("log null");
        return 0;
      } else {
        console.log("check");
        payload = params;
        return params;
      }
    } catch (e2) {
      console.log(e2);
      return await responseError("Wrong Parameter", 407);
    }
  };
  var ValidateTestOnly = import_joi.default.object({
    param: import_joi.default.any()
  });
  var ValidateCheckUser = import_joi.default.object({
    phoneFirebase: import_joi.default.string().required(),
    username: import_joi.default.string().required()
  });

  // src/index.ts
  var import_cors = __toESM(require_lib());
  var router = e();
  var ENV_DEPLOY = ENVIRONMENT;
  console.log("ENV_DEPLOY");
  console.log(ENV_DEPLOY);
  if (ENV_DEPLOY == "production") {
    console.log("production");
  }
  var allowedOrigins = ["*"];
  var options = {
    origin: allowedOrigins
  };
  var deCode = async (req) => {
    var data;
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          data = await req.json();
          return resolve(data);
        } catch (error) {
          console.log(error);
          return reject(error);
        }
      })();
    });
  };
  router.use((0, import_cors.default)(options));
  router.get("/Temp/hell", async (request) => {
    const data = {
      "status": 200,
      "message": "hello"
    };
    return await responseSuccess(data, 200);
  });
  router.post("/Temp/hellpost", async (request) => {
    const req = deCode(request);
    const datacheck = await Validate(req, ValidateTestOnly);
    const payload = await convertObjToJson(datacheck);
    console.log(payload);
    const data = {
      "status": 200,
      "message": "hello",
      "data": payload
    };
    return await responseSuccess(data, 200);
  });
  addEventListener(
    "fetch",
    (event) => event.respondWith(router.handle(event.request))
  );
})();
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=index.js.map
