var NepaliFunctions = (function () {
  "use strict";
  var e = [
      "MM-DD-YYYY",
      "MM/DD/YYYY",
      "YYYY-MM-DD",
      "YYYY/MM/DD",
      "DD-MM-YYYY",
      "DD/MM/YYYY"
    ],
    t = "YYYY-MM-DD",
    n = "MM/DD/YYYY";
  function r() {
    var e = [],
      t = { year: 2e3, month: 9, day: 17 },
      r = { year: 1944, month: 1, day: 1 };
    (e[1970] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1971] = [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30]),
      (e[1972] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[1973] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[1974] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1975] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[1976] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[1977] = [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31]),
      (e[1978] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1979] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[1980] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[1981] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
      (e[1982] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1983] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[1984] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[1985] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
      (e[1986] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1987] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[1988] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[1989] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1990] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1991] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
      (e[1992] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[1993] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1994] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1995] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
      (e[1996] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[1997] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1998] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[1999] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2e3] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2001] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2002] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2003] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2004] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2005] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2006] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2007] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2008] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]),
      (e[2009] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2010] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2011] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2012] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
      (e[2013] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2014] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2015] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2016] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
      (e[2017] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2018] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2019] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2020] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2021] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2022] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
      (e[2023] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2024] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2025] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2026] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2027] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2028] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2029] = [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30]),
      (e[2030] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2031] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2032] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2033] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2034] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2035] = [30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]),
      (e[2036] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2037] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2038] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2039] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
      (e[2040] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2041] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2042] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2043] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
      (e[2044] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2045] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2046] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2047] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2048] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2049] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
      (e[2050] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2051] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2052] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2053] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
      (e[2054] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2055] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2056] = [31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30]),
      (e[2057] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2058] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2059] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2060] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2061] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2062] = [30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31]),
      (e[2063] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2064] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2065] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2066] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31]),
      (e[2067] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2068] = [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2069] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2070] = [31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30]),
      (e[2071] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2072] = [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2073] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]),
      (e[2074] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2075] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2076] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
      (e[2077] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]),
      (e[2078] = [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2079] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30]),
      (e[2080] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30]),
      (e[2081] = [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2082] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2083] = [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2084] = [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2085] = [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30]),
      (e[2086] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2087] = [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30]),
      (e[2088] = [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30]),
      (e[2089] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2090] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2091] = [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30]),
      (e[2092] = [30, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2093] = [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2094] = [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2095] = [31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30]),
      (e[2096] = [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30]),
      (e[2097] = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30]),
      (e[2098] = [31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 29, 31]),
      (e[2099] = [31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30]);
    var a = { year: 1970, month: 1, day: 1 },
      i = { year: 2099, month: 12, day: 30 };
    function o(e) {
      var t = 0;
      return (
        e.forEach(function (e) {
          t += e;
        }),
        t
      );
    }
    function u(e, t) {
      var n = Date.UTC(e.year, e.month - 1, e.day),
        r = Date.UTC(t.year, t.month - 1, t.day);
      return Math.abs((r - n) / 864e5);
    }
    function l(t, n) {
      var r = 0,
        a = 0;
      for (a = t.year; a <= n.year; a += 1) r += o(e[a]);
      for (a = 0; a < t.month; a += 1) r -= e[t.year][a];
      for (r += e[t.year][11], a = n.month - 1; a < 12; a += 1)
        r -= e[n.year][a];
      return (r -= t.day + 1), (r += n.day - 1);
    }
    function s(e, t) {
      var r = new Date(d(e, n));
      return (
        r.setDate(r.getDate() + t),
        { year: r.getFullYear(), month: r.getMonth() + 1, day: r.getDate() }
      );
    }
    function c(t, n) {
      for (t.day += n; t.day > e[t.year][t.month - 1]; )
        (t.day -= e[t.year][t.month - 1]),
          (t.month += 1),
          t.month > 12 && ((t.month = 1), (t.year += 1));
      return { year: t.year, month: t.month, day: t.day };
    }
    return {
      minDate: function () {
        return a;
      },
      maxDate: function () {
        return i;
      },
      countAdDays: u,
      countBsDays: l,
      addBsDays: c,
      addAdDays: s,
      bs2ad: function (e) {
        var n = l(t, e);
        return s(r, n);
      },
      ad2bs: function (e) {
        var n = u(r, e);
        return c(t, n);
      },
      getDaysInMonth: function (t, n) {
        return e[t][n - 1];
      }
    };
  }
  function a(n) {
    return (n = n && e.indexOf(n) > -1 ? n : t);
  }
  function i(e, t) {
    return "string" == typeof e && (e = u(e, (t = a(t)))) && (e.format = t), e;
  }
  function o(e) {
    return e ? (delete e.format, e) : null;
  }
  function u(e, t) {
    if (!e || !t) return null;
    var n = [],
      r = { year: null, month: null, day: null };
    switch (t) {
      case "MM/DD/YYYY":
        3 == (n = e.split("/")).length &&
          (r = { year: Number(n[2]), month: Number(n[0]), day: Number(n[1]) });
        break;
      case "MM-DD-YYYY":
        3 == (n = e.split("-")).length &&
          (r = { year: Number(n[2]), month: Number(n[0]), day: Number(n[1]) });
        break;
      case "YYYY-MM-DD":
        3 == (n = e.split("-")).length &&
          (r = { year: Number(n[0]), month: Number(n[1]), day: Number(n[2]) });
        break;
      case "YYYY/MM/DD":
        3 == (n = e.split("/")).length &&
          (r = { year: Number(n[0]), month: Number(n[1]), day: Number(n[2]) });
        break;
      case "DD-MM-YYYY":
        3 == (n = e.split("-")).length &&
          (r = { year: Number(n[2]), month: Number(n[1]), day: Number(n[0]) });
        break;
      case "DD/MM/YYYY":
        3 == (n = e.split("/")).length &&
          (r = { year: Number(n[2]), month: Number(n[1]), day: Number(n[0]) });
    }
    return (r?.year && r?.month && r?.day) || (r = null), r;
  }
  function d(n, r) {
    var a = "";
    function i(e) {
      return (e = Number(e)) < 10 ? "0" + e : e;
    }
    switch ((r = r && e.indexOf(r) > -1 ? r : t)) {
      case "MM/DD/YYYY":
        a = i(n.month) + "/" + i(n.day) + "/" + n.year;
        break;
      case "MM-DD-YYYY":
        a = i(n.month) + "-" + i(n.day) + "-" + n.year;
        break;
      case "YYYY-MM-DD":
        a = n.year + "-" + i(n.month) + "-" + i(n.day);
        break;
      case "YYYY/MM/DD":
        a = n.year + "/" + i(n.month) + "/" + i(n.day);
        break;
      case "DD-MM-YYYY":
        a = i(n.day) + "-" + i(n.month) + "-" + n.year;
        break;
      case "DD/MM/YYYY":
        a = i(n.day) + "/" + i(n.month) + "/" + n.year;
    }
    return a;
  }
  function l(e, t, n) {
    if (((t = (e = i(e, t))?.format), !e)) return null;
    var o = new r().ad2bs(e);
    return t ? ((t = a(t)), d(o, (n = a(n)))) : o;
  }
  function s(e, t, n) {
    if (((t = (e = i(e, t))?.format), !e)) return null;
    var o = new r().bs2ad(e);
    return t ? ((t = a(t)), d(o, (n = a(n)))) : o;
  }
  function c(e, t) {
    if (((t = (e = i(e, t))?.format), !e)) return !1;
    var n = new r(),
      a = n.minDate(),
      o = n.maxDate(),
      u = e.day + 100 * e.month + 1e4 * e.year,
      d = a.day + 100 * a.month + 1e4 * a.year;
    if (u > o.day + 100 * o.month + 1e4 * o.year || u < d) return !1;
    var l = M(e.year, e.month);
    return e.month > 0 && e.month <= 12 && e.day > 0 && e.day <= l;
  }
  function m(e) {
    var t = new Date();
    t.setHours(t.getHours() + 5), t.setMinutes(t.getMinutes() + 45);
    var n = t.getUTCDate(),
      r = t.getUTCMonth() + 1,
      i = { year: t.getUTCFullYear(), month: r, day: n };
    return e ? d(i, (e = a(e))) : i;
  }
  function f(e) {
    var t = l(m());
    return e ? d(t, (e = a(e))) : t;
  }
  function h() {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  }
  function p() {
    return [
      "Baisakh",
      "Jestha",
      "Ashar",
      "Shrawan",
      "Bhadra",
      "Ashoj",
      "Kartik",
      "Mangsir",
      "Poush",
      "Magh",
      "Falgun",
      "Chaitra"
    ];
  }
  function y() {
    return [
      "बैशाख",
      "जेठ",
      "अषाढ",
      "श्रावण",
      "भाद्र",
      "आश्विन",
      "कार्तिक",
      "मङ्सिर",
      "पौष",
      "माघ",
      "फाल्गुन",
      "चैत्र"
    ];
  }
  function v() {
    return [
      "आइतवार",
      "सोमवार",
      "मङ्गलवार",
      "बुधवार",
      "बिहिवार",
      "शुक्रवार",
      "शनिवार"
    ];
  }
  function b(e) {
    return (
      (e = Number(e)),
      isNaN(e) || e < 0 || e > 6
        ? null
        : [
            "आइतवार",
            "सोमवार",
            "मङ्गलवार",
            "बुधवार",
            "बिहिवार",
            "शुक्रवार",
            "शनिवार"
          ][Number(e)]
    );
  }
  function g() {
    return ["आ", "सो", "मं", "बु", "बि", "शु", "श"];
  }
  function D() {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  }
  function N(e) {
    return (
      (e = Number(e)),
      isNaN(e) || e < 0 || e > 6
        ? null
        : [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ][Number(e)]
    );
  }
  function A() {
    return ["S", "M", "T", "W", "T", "F", "S"];
  }
  function M(e, t) {
    var n = new r(),
      a = n.minDate(),
      i = n.maxDate();
    return (e < a.year || e > i.year) && (t < a.month || t > a.month)
      ? 0
      : n.getDaysInMonth(e, t);
  }
  function B(e) {
    function t(e) {
      switch (e) {
        case "0":
          return "०";
        case "1":
          return "१";
        case "2":
          return "२";
        case "3":
          return "३";
        case "4":
          return "४";
        case "5":
          return "५";
        case "6":
          return "६";
        case "7":
          return "७";
        case "8":
          return "८";
        case "9":
          return "९";
        default:
          return e;
      }
    }
    e = e.toString();
    var n = "",
      r = 0;
    for (r = 0; r < e.length; r += 1) n += t(e[r]);
    return n;
  }
  return {
    AvailableFormats: e,
    Get2DigitNo: function (e) {
      return (e < 10 ? "0" + Number(e) : e).toString();
    },
    ParseDate: function (e) {
      var t = e.indexOf("/") > -1,
        n = e.indexOf("-") > -1,
        r = null;
      if (t) {
        var a = e.split("/");
        3 == a.length && ((r = o(a)).parsedFormat = r.parsedFormat.join("/"));
      } else if (n) {
        var i = e.split("-");
        3 == i.length && ((r = o(i)).parsedFormat = r.parsedFormat.join("-"));
      }
      function o(e) {
        var t = {},
          n = [],
          r = [];
        e.forEach(function (e, t) {
          var n = parseInt(e),
            a = { index: t, value: n, year: !1, month: !1, day: !1 };
          n > 0 && n > 999
            ? (a.year = !0)
            : n > 0 && n > 12
            ? (a.day = !0)
            : n > 0 && n <= 12 && ((a.month = !0), (a.day = !0)),
            r.push(a);
        });
        var a = r.filter(function (e) {
          return 1 == e.year;
        })[0];
        if (a) {
          (t.year = a.value), (n[a.index] = "YYYY");
          var i = r.filter(function (e) {
              return 1 == e.day;
            }),
            o = r.filter(function (e) {
              return 1 == e.month;
            });
          1 == o.length
            ? ((t.month = o[0].value),
              (n[o[0].index] = "MM"),
              1 == i.length
                ? ((t.day = i[0].value), (n[i[0].index] = "DD"))
                : ((i = i.find(function (e) {
                    return !e.month;
                  })),
                  (t.day = i.value),
                  (n[i.index] = "DD")))
            : 2 == o.length &&
              ((t.day = o[0 == a.index ? 1 : 0].value),
              (t.month = o[0 == a.index ? 0 : 1].value),
              (n[o[0].index] = 0 == a.index ? "MM" : "DD"),
              (n[o[1].index] = 0 == a.index ? "DD" : "MM"));
        }
        if (t?.year && t?.month && t?.day) {
          var u = M(t.year, t.month);
          t.day > u && ((t = null), (n = null));
        } else (t = null), (n = null);
        return { parsedDate: t, parsedFormat: n };
      }
      return r;
    },
    ValidateBsDate: c,
    CompareBsDates: function (e, t, n) {
      if (!(e = o((e = i(e, (n = a(n))))))) return null;
      if (!(t = o((t = i(t, n))))) return null;
      if (c(e) && c(t)) {
        (e = this.BS2AD(e)), (t = this.BS2AD(t));
        var r = new Date(e.year, e.month - 1, e.day),
          u = new Date(t.year, t.month - 1, t.day);
        return r.getTime() > u.getTime();
      }
      return (
        1e4 * e.year + 100 * e.month + e.day >
        1e4 * t.year + 100 * t.month + t.day
      );
    },
    BetweenBsDates: function (e, t, r, u, d) {
      if (!(e = o((e = i(e, (u = a(u))))))) return null;
      if (!(t = o((t = i(t, u))))) return null;
      if (!(r = o((r = i(r, u))))) return null;
      if (!c(e) || !c(t) || !c(r)) return null;
      d = !0 === d;
      var l = this.BS2AD(e),
        s = this.BS2AD(t),
        m = this.BS2AD(r),
        f = new Date(this.ConvertDateFormat(l, n)),
        h = new Date(this.ConvertDateFormat(s, n)),
        p = new Date(this.ConvertDateFormat(m, n)),
        y = !1;
      return d ? f >= h && f <= p && (y = !0) : f > h && f < p && (y = !0), y;
    },
    ConvertToDateObject: u,
    ConvertDateFormat: d,
    AD2BS: l,
    BS2AD: s,
    GetCurrentAdDate: m,
    GetCurrentAdYear: function () {
      var e = m();
      return Number(e.year);
    },
    GetCurrentAdMonth: function () {
      var e = m();
      return Number(e.month);
    },
    GetCurrentAdDay: function () {
      var e = m();
      return Number(e.day);
    },
    GetCurrentBsDate: f,
    GetCurrentBsYear: function () {
      var e = f();
      return Number(e.year);
    },
    GetCurrentBsMonth: function () {
      var e = f();
      return Number(e.month);
    },
    GetCurrentBsDay: function () {
      var e = f();
      return Number(e.day);
    },
    GetAdMonths: h,
    GetAdMonth: function (e) {
      return (
        (e = Number(e)),
        isNaN(e) || e < 0 || e > 11
          ? null
          : [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ][e]
      );
    },
    GetBsMonths: p,
    GetBsMonth: function (e) {
      return (
        (e = Number(e)),
        isNaN(e) || e < 0 || e > 11
          ? null
          : [
              "Baisakh",
              "Jestha",
              "Ashar",
              "Shrawan",
              "Bhadra",
              "Ashoj",
              "Kartik",
              "Mangsir",
              "Poush",
              "Magh",
              "Falgun",
              "Chaitra"
            ][e]
      );
    },
    GetBsDaysUnicode: v,
    GetBsDayUnicode: b,
    GetBsDaysUnicodeShort: g,
    GetBsDayUnicodeShort: function (e) {
      return (
        (e = Number(e)),
        isNaN(e) || e < 0 || e > 6
          ? null
          : ["आ", "सो", "मं", "बु", "बि", "शु", "श"][Number(e)]
      );
    },
    GetAdDays: D,
    GetAdDay: N,
    GetAdDaysShort: A,
    GetAdDayShort: function (e) {
      return (
        (e = Number(e)),
        isNaN(e) || e < 0 || e > 6
          ? null
          : ["S", "M", "T", "W", "T", "F", "S"][Number(e)]
      );
    },
    GetBsMonthsInUnicode: y,
    GetBsMonthInUnicode: function (e) {
      return (
        (e = Number(e)),
        isNaN(e) || e < 0 || e > 11
          ? null
          : [
              "बैशाख",
              "जेठ",
              "अषाढ",
              "श्रावण",
              "भाद्र",
              "आश्विन",
              "कार्तिक",
              "मङ्सिर",
              "पौष",
              "माघ",
              "फाल्गुन",
              "चैत्र"
            ][e]
      );
    },
    GetDaysInAdMonth: function (e, t) {
      return new Date(e, t, 0).getDate();
    },
    GetDaysInBsMonth: M,
    AdDatesDiff: function (e, t, n) {
      return (e = i(e, (n = a(n)))) && (t = i(t, n))
        ? new r().countAdDays(e, t)
        : null;
    },
    BsDatesDiff: function (e, t, n) {
      return (e = i(e, (n = a(n)))) && (t = i(t, n))
        ? !(!c(e) || !c(t)) &&
            ((e = o(e)),
            (t = o(t)),
            (e = s(e)),
            (t = s(t)),
            new r().countAdDays(e, t))
        : null;
    },
    BsAddDays: function (e, t, n) {
      if (((n = (e = i(e, n))?.format), !e)) return null;
      e = o(e);
      var r = NepaliFunctions.BS2AD(e);
      return (
        (r = new Date(r.year, r.month - 1, r.day)).setDate(r.getDate() + t),
        (r = {
          year: r.getFullYear(),
          month: r.getMonth() + 1,
          day: r.getDate()
        }),
        (e = NepaliFunctions.AD2BS(r)),
        n ? NepaliFunctions.ConvertDateFormat(e, n) : e
      );
    },
    GetBsFullDate: function (e, t, n) {
      if (!(e = i(e, n))) return null;
      var r = [],
        a = "";
      return (
        t
          ? ((r = [
              "बैशाख",
              "जेठ",
              "अषाढ",
              "श्रावण",
              "भाद्र",
              "आश्विन",
              "कार्तिक",
              "मङ्सिर",
              "पौष",
              "माघ",
              "फाल्गुन",
              "चैत्र"
            ]),
            (a = `${B(e.day)} ${r[e.month - 1]} ${B(e.year)}`))
          : ((r = [
              "Baisakh",
              "Jestha",
              "Ashar",
              "Shrawan",
              "Bhadra",
              "Ashoj",
              "Kartik",
              "Mangsir",
              "Poush",
              "Magh",
              "Falgun",
              "Chaitra"
            ]),
            (a = `${e.day} ${r[e.month - 1]} ${e.year}`)),
        a
      );
    },
    GetAdFullDate: function (e, t) {
      return (e = i(e, t))
        ? `${e.day} ${NepaliFunctions.GetAdMonth(e.month - 1)} ${e.year}`
        : null;
    },
    GetAdFullDay: function (e, t) {
      return (e = i(e, t))
        ? N((e = new Date(e.year, e.month - 1, e.day)).getDay())
        : null;
    },
    GetBsFullDay: function (e, t) {
      if (!(e = o((e = i(e, t))))) return null;
      var n = NepaliFunctions.BS2AD(e);
      return N((n = new Date(n.year, n.month - 1, n.day)).getDay());
    },
    GetBsFullDayInUnicode: function (e, t) {
      if (!(e = o((e = i(e, t))))) return null;
      var n = NepaliFunctions.BS2AD(e);
      return b((n = new Date(n.year, n.month - 1, n.day)).getDay());
    },
    ConvertToUnicode: B,
    ConvertToNumber: function (e) {
      function t(e) {
        switch (e) {
          case "०":
            return 0;
          case "१":
            return 1;
          case "२":
            return 2;
          case "३":
            return 3;
          case "४":
            return 4;
          case "५":
            return 5;
          case "६":
            return 6;
          case "७":
            return 7;
          case "८":
            return 8;
          case "९":
            return 9;
          default:
            return e;
        }
      }
      e = e.toString();
      for (var n = "", r = 0; r < e.length; ) (n += t(e[r])), r++;
      return parseFloat(n);
    },
    NumberToWords: function (e, t) {
      if (((e = e || 0), isNaN(e) || Math.floor(e).toString().length > 13))
        return null;
      var n = "",
        r = 0,
        a = e.toString();
      if (a.indexOf(".") > -1) {
        var i = a.split(".");
        r = Number(i[1]);
      }
      var o = Math.floor(e % 100),
        u = null;
      e.toString().length > 2 &&
        (u = e
          .toString()
          .substring(e.toString().length - 3, e.toString().length - 2));
      var d = Math.floor(e % 1e5);
      d = (d = d.toString()).substring(0, d.length - 3);
      var l = Math.floor(e % 1e7);
      l = (l = l.toString()).substring(0, l.length - 5);
      var s = Math.floor(e % 1e9);
      s = (s = s.toString()).substring(0, s.length - 7);
      var c = Math.floor(e % 1e11);
      c = (c = c.toString()).substring(0, c.length - 9);
      var m = Math.floor(e % 1e13);
      function f(e) {
        var t = {
            0: "",
            1: "One",
            2: "Two",
            3: "Three",
            4: "Four",
            5: "Five",
            6: "Six",
            7: "Seven",
            8: "Eight",
            9: "Nine",
            10: "Ten",
            11: "Eleven",
            12: "Twelve",
            13: "Thirteen",
            14: "Fourteen",
            15: "Fifteen",
            16: "Sixteen",
            17: "Seventeen",
            18: "Eighteen",
            19: "Nineteen",
            20: "Twenty",
            30: "Thirty",
            40: "Forty",
            50: "Fifty",
            60: "Sixty",
            70: "Seventy",
            80: "Eighty",
            90: "Ninety"
          },
          n = (e = Number(e)).toString();
        return e < 20 ? t[e] : t[10 * n[0]] + " " + t[n[1]];
      }
      for (
        (m = (m = m.toString()).substring(0, m.length - 11)) > 0 &&
          (n += f(m) + " Kharab"),
          c > 0 && (n += " " + f(c) + " Arab"),
          s > 0 && (n += " " + f(s) + " Crore"),
          l > 0 && (n += " " + f(l) + " Lakh"),
          d > 0 && (n += " " + f(d) + " Thousand"),
          u > 0 && (n += " " + f(u) + " Hundred"),
          o > 0 && (n += " " + f(o)),
          "" != n.trim() && t && (n += " Rupees"),
          r > 0 && t && (n += " and " + f(r) + " Paisa");
        n.indexOf("  ") > -1;

      )
        n = n.replace("  ", " ");
      return n.trim();
    },
    NumberToWordsUnicode: function (e, t) {
      if (((e = e || 0), isNaN(e) || Math.floor(e).toString().length > 13))
        return null;
      var n = [
          "सुन्य",
          "एक",
          "दुई",
          "तीन",
          "चार",
          "पाँच",
          "छ",
          "सात",
          "आठ",
          "नौ",
          "दस",
          "एघार",
          "बाह्र",
          "तेह्र",
          "चौध",
          "पन्ध्र",
          "सोह्र",
          "सत्र",
          "अठाह्र",
          "उन्नाइस",
          "बीस",
          "एकाइस",
          "बाइस",
          "तेइस",
          "चौबीस",
          "पचीस",
          "छब्बीस",
          "सत्ताइस",
          "अठ्ठाइस",
          "उनन्तीस",
          "तीस",
          "एकतीस",
          "बतीस",
          "तेतीस",
          "चौतीस",
          "पैतीस",
          "छतीस",
          "सरतीस",
          "अरतीस",
          "उननचालीस",
          "चालीस",
          "एकचालीस",
          "बयालिस",
          "तीरचालीस",
          "चौवालिस",
          "पैंतालिस",
          "छयालिस",
          "सरचालीस",
          "अरचालीस",
          "उननचास",
          "पचास",
          "एकाउन्न",
          "बाउन्न",
          "त्रिपन्न",
          "चौवन्न",
          "पच्पन्न",
          "छपन्न",
          "सन्ताउन्न",
          "अन्ठाउँन्न",
          "उनान्न्साठी ",
          "साठी",
          "एकसाठी",
          "बासाठी",
          "तीरसाठी",
          "चौंसाठी",
          "पैसाठी",
          "छैसठी",
          "सत्सठ्ठी",
          "अर्सठ्ठी",
          "उनन्सत्तरी",
          "सतरी",
          "एकहत्तर",
          "बहत्तर",
          "त्रिहत्तर",
          "चौहत्तर",
          "पचहत्तर",
          "छहत्तर",
          "सत्हत्तर",
          "अठ्हत्तर",
          "उनास्सी",
          "अस्सी",
          "एकासी",
          "बयासी",
          "त्रीयासी",
          "चौरासी",
          "पचासी",
          "छयासी",
          "सतासी",
          "अठासी",
          "उनान्नब्बे",
          "नब्बे",
          "एकान्नब्बे",
          "बयान्नब्बे",
          "त्रियान्नब्बे",
          "चौरान्नब्बे",
          "पंचान्नब्बे",
          "छयान्नब्बे",
          "सन्तान्‍नब्बे",
          "अन्ठान्नब्बे",
          "उनान्सय"
        ],
        r = "",
        a = 0,
        i = "";
      if (-1 != (e = e.toString()).indexOf(".")) {
        var o = e.split(".");
        e = o[0];
        var u = (a = o[1]).substring(0, 2).toString();
        1 == u.length && (u = u.toString() + "0"),
          (i = n[parseInt(u)].toString() + " पैसा");
      }
      if (!(e.length > 13)) {
        var d = Math.floor(e % 100),
          l = "";
        e.toString().length > 2 &&
          (l = e
            .toString()
            .substring(e.toString().length - 3, e.toString().length - 2));
        var s = Math.floor(e % 1e5);
        s = (s = s.toString()).substring(0, s.length - 3);
        var c = Math.floor(e % 1e7);
        c = (c = c.toString()).substring(0, c.length - 5);
        var m = Math.floor(e % 1e9);
        m = (m = m.toString()).substring(0, m.length - 7);
        var f = Math.floor(e % 1e11);
        f = (f = f.toString()).substring(0, f.length - 9);
        var h = Math.floor(e % 1e13);
        return (
          (h = (h = h.toString()).substring(0, h.length - 11)) > 0 &&
            (r += n[h] + " खरब"),
          f > 0 && (r += " " + n[f] + " अरब"),
          m > 0 && (r += " " + n[m] + " करोड"),
          c > 0 && (r += " " + n[c] + " लाख"),
          s > 0 && (r += " " + n[s] + " हजार"),
          l > 0 && (r += " " + n[l] + " सय"),
          d > 0 && (r += " " + n[d]),
          "" != r.trim() && t && (r += " रुपैंया"),
          a > 0 && t && (r += ("" != r.trim() ? " " : "") + i),
          r.trim()
        );
      }
      alert("Number greater than kharab not supported");
    }
  };
})();
!(function () {
  "use strict";
  var e = !1,
    t = !1,
    n = [],
    r = null;
  function a() {
    t = !0;
  }
  function i() {
    t = !1;
  }
  function o(t) {
    var n = document.getElementById("ndp-nepali-box");
    n && n.remove(), (e = !1);
  }
  function u(t) {
    var n = {};
    if (e) o();
    else {
      var u = document.getElementById(t);
      !(function (e) {
        if (!document.getElementById("ndp-nepali-box")) {
          var t = m(e);
          document
            .querySelector(t.container)
            .insertAdjacentElement("beforeend", p(t));
          var n = document.getElementById("ndp-nepali-box");
          n.addEventListener("mouseenter", a),
            n.addEventListener("mouseleave", i);
        }
      })(t),
        (n = m(t)),
        (r = t);
      var l = u.value;
      n.unicodeDate && (l = NepaliFunctions.ConvertToNumber(l));
      var s = "";
      l
        ? (s = NepaliFunctions.ConvertToDateObject(l, n.dateFormat))
        : ((s = NepaliFunctions.GetCurrentBsDate()),
          n.disableAfter &&
            NepaliFunctions.CompareBsDates(s, n.disableAfter) &&
            (s = n.disableAfter));
      var c = null;
      null == s
        ? ((s = NepaliFunctions.GetCurrentBsDate()), (c = ""))
        : (c = NepaliFunctions.ConvertDateFormat(s, "YYYY-MM-DD")),
        d(s.year, s.month, c),
        (function (e) {
          var t = (function (e) {
              if ("body" != m().container) {
                var t = e.getBoundingClientRect();
                return { x: t.x, y: t.y };
              }
              var n = 0,
                r = 0;
              return (
                (n += (function (e) {
                  var t = 0;
                  for (; e; ) (t += e.offsetLeft), (e = e.offsetParent);
                  return (t += document.firstChild.offsetLeft || 0);
                })(e)),
                (r += (function (e) {
                  var t = 0;
                  for (; e; ) (t += e.offsetTop), (e = e.offsetParent);
                  return (t += document.firstChild.offsetTop || 0);
                })(e)),
                { x: n, y: r }
              );
            })(e),
            n = (function (e) {
              var t =
                window.pageYOffset ||
                (
                  document.documentElement ||
                  document.body.parentNode ||
                  document.body
                ).scrollTop;
              return e.y - t;
            })(t),
            r = (function (e, t) {
              var n =
                window.pageYOffset ||
                (
                  document.documentElement ||
                  document.body.parentNode ||
                  document.body
                ).scrollTop;
              return window.innerHeight - t.y - e.offsetHeight + n;
            })(e, t),
            a = document.getElementById("ndp-nepali-box"),
            i = a.offsetHeight,
            o = t.y + e.offsetHeight;
          r < i && r < n && (o = o - i - e.offsetHeight);
          (a.style.top = o + "px"), (a.style.left = t.x + "px");
        })(u),
        (e = !0);
    }
  }
  function d(e, t, n, r) {
    var a = "";
    if (r) {
      var i = document.getElementById(r);
      a = "-" + r;
    } else i = document.getElementById("ndp-nepali-box");
    var o = m(r),
      u = "english" == o.language,
      f = i.getElementsByTagName("table")[0].getElementsByTagName("tbody");
    f.length > 0 && f[0].parentNode.removeChild(f[0]);
    var h = o.ndpYearCount || 0,
      p = document.getElementById("currentMonth" + a);
    p.innerHTML = "";
    var y = document.createElement("SPAN");
    y.innerHTML = " ";
    var v = document.createElement("SPAN");
    v.innerHTML = u
      ? NepaliFunctions.GetBsMonth(t - 1)
      : NepaliFunctions.GetBsMonthInUnicode(t - 1);
    var b = document.createElement("SPAN");
    (b.innerHTML = u ? e : NepaliFunctions.ConvertToUnicode(e)),
      o.ndpMonth && o.ndpYear
        ? (p.appendChild(s(t, e, n, r)), p.appendChild(c(t, e, h, n, r)))
        : o.ndpMonth
        ? (p.appendChild(s(t, e, n, r)), p.appendChild(y), p.appendChild(b))
        : o.ndpYear
        ? (p.appendChild(v), p.appendChild(y), p.appendChild(c(t, e, h, n, r)))
        : (p.appendChild(v), p.appendChild(y), p.appendChild(b));
    var g = (function (e, t) {
        var n = e,
          r = t + 1;
        return r > 12 && ((n += 1), (r = 1)), { year: n, month: r };
      })(e, t),
      D = (function (e, t) {
        var n = e,
          r = t - 1;
        return r < 1 && ((n -= 1), (r = 12)), { year: n, month: r };
      })(e, t),
      N = g.year,
      A = g.month,
      M = D.year,
      B = D.month,
      Y = document.getElementById("ndp-header" + a),
      C = document.getElementById("prev" + a);
    C && C.parentNode.removeChild(C);
    var F = document.getElementById("next" + a);
    F && F.parentNode.removeChild(F);
    var T = !0;
    o.disableBefore &&
      NepaliFunctions.CompareBsDates(o.disableBefore, {
        year: M,
        month: B,
        day: NepaliFunctions.GetDaysInBsMonth(M, B)
      }) &&
      (T = !1);
    var E = document.createElement("SPAN");
    E.setAttribute("class", "ndc-chevron ndc-left");
    var S = document.createElement("A");
    S.setAttribute("id", "prev" + a),
      S.setAttribute("title", "Previous Month"),
      S.setAttribute("class", T ? "ndp-prev" : "ndp-prev ndp-disabled"),
      S.setAttribute("href", "javascript:void(0)"),
      S.appendChild(E),
      T &&
        S.addEventListener("click", function () {
          d(M, B, n, r);
        });
    var I = !0;
    o.disableAfter &&
      NepaliFunctions.CompareBsDates(
        { year: N, month: A, day: 1 },
        o.disableAfter
      ) &&
      (I = !1);
    var x = document.createElement("SPAN");
    x.setAttribute("class", "ndc-chevron ndc-right");
    var w = document.createElement("A");
    w.setAttribute("id", "next" + a),
      w.setAttribute("title", "Next Month"),
      w.setAttribute("class", I ? "ndp-next" : "ndp-next ndp-disabled"),
      w.setAttribute("href", "javascript:void(0)"),
      w.appendChild(x),
      I &&
        w.addEventListener("click", function () {
          d(N, A, n, r);
        }),
      Y.insertBefore(S, Y.firstChild),
      Y.appendChild(w),
      i.getElementsByTagName("table")[0].insertAdjacentElement(
        "beforeend",
        (function (e, t, n, r) {
          var a,
            i,
            o,
            u = m(r),
            d = "english" == u.language;
          if (n) {
            var s = NepaliFunctions.ConvertToDateObject(n, "YYYY-MM-DD");
            (a = s.year), (i = s.month), (o = s.day);
          }
          var c = NepaliFunctions.GetCurrentBsDate(),
            f = c.year,
            h = c.month,
            p = c.day,
            y = NepaliFunctions.GetDaysInBsMonth(e, t),
            v = { year: e, month: t, day: 1 },
            b = NepaliFunctions.BS2AD(v),
            g = b.year,
            D = b.month,
            N = b.day,
            A = new Date(g, D - 1, N).getDay(),
            M = 0,
            B = 0,
            Y = A + y,
            C = "",
            F = "",
            T = 0;
          "object" != typeof u.disableBefore &&
            u.disableBefore &&
            u.dateFormat &&
            (u.disableBefore = NepaliFunctions.ConvertToDateObject(
              u.disableBefore,
              u.dateFormat
            ));
          "object" != typeof u.disableAfter &&
            u.disableAfter &&
            u.dateFormat &&
            (u.disableAfter = NepaliFunctions.ConvertToDateObject(
              u.disableAfter,
              u.dateFormat
            ));
          !u.disableBefore &&
            Number.isInteger(u.disableDaysBefore) &&
            parseInt(u.disableDaysBefore) >= 0 &&
            (u.disableBefore = NepaliFunctions.BsAddDays(
              NepaliFunctions.GetCurrentBsDate(),
              -1 * parseInt(u.disableDaysBefore)
            ));
          !u.disableAfter &&
            Number.isInteger(u.disableDaysAfter) &&
            parseInt(u.disableDaysAfter) >= 0 &&
            (u.disableAfter = NepaliFunctions.BsAddDays(
              NepaliFunctions.GetCurrentBsDate(),
              parseInt(u.disableDaysAfter)
            ));
          var E = document.createElement("TBODY"),
            S = document.createElement("TR"),
            I = document.createElement("TD"),
            x = document.createElement("A");
          for (; B < Y; ) {
            if (
              ((M = B) % 7 == 0 && (S = document.createElement("TR")),
              (T = M - A + 1),
              (F =
                e.toString() +
                "-" +
                NepaliFunctions.Get2DigitNo(t) +
                "-" +
                NepaliFunctions.Get2DigitNo(T)),
              (C = ""),
              (C =
                e === a && t === i && T === o
                  ? "ndp-selected"
                  : e === f && t === h && T === p
                  ? "ndp-current"
                  : "ndp-date"),
              u.isDiv && !u.onDateClick && (C += " ndp-link-disabled"),
              M < A)
            )
              (I = document.createElement("TD")), S.appendChild(I);
            else {
              if (
                ((I = document.createElement("TD")).setAttribute("class", C),
                (u.disableAfter &&
                  NepaliFunctions.CompareBsDates(
                    NepaliFunctions.ConvertToDateObject(F, "YYYY-MM-DD"),
                    u.disableAfter
                  )) ||
                  (u.disableBefore &&
                    NepaliFunctions.CompareBsDates(
                      u.disableBefore,
                      NepaliFunctions.ConvertToDateObject(F, "YYYY-MM-DD")
                    )))
              )
                (x = document.createElement("A")).setAttribute(
                  "class",
                  "ndp-disabled"
                ),
                  x.setAttribute("href", "javascript:void(0)"),
                  x.setAttribute("title", F),
                  (x.innerHTML = d ? T : NepaliFunctions.ConvertToUnicode(T)),
                  I.appendChild(x);
              else {
                var w = NepaliFunctions.ConvertToDateObject(F, "YYYY-MM-DD"),
                  G = NepaliFunctions.ConvertDateFormat(w, u.dateFormat);
                (x = document.createElement("A")).setAttribute(
                  "href",
                  "javascript:void(0)"
                ),
                  x.setAttribute("title", F),
                  x.setAttribute("data-value", G),
                  (x.innerHTML = d ? T : NepaliFunctions.ConvertToUnicode(T)),
                  u.isDiv && u.isDiv
                    ? u.onDateClick &&
                      x.addEventListener("click", function () {
                        var e = this.getAttribute("data-value"),
                          t = NepaliFunctions.ConvertToDateObject(
                            e,
                            "YYYY-MM-DD"
                          );
                        u.onDateClick({
                          bs: NepaliFunctions.ConvertDateFormat(
                            t,
                            "YYYY-MM-DD"
                          ),
                          ad: NepaliFunctions.ConvertDateFormat(
                            NepaliFunctions.BS2AD(t),
                            u.dateFormat
                          ),
                          object: t
                        });
                      })
                    : x.addEventListener("click", function () {
                        l(this);
                      }),
                  I.appendChild(x);
              }
              S.appendChild(I);
            }
            M % 7 == 6 &&
              (E.appendChild(S), (S = document.createElement("TR"))),
              (B += 1);
          }
          S.children.length > 0 && E.appendChild(S);
          return E;
        })(e, t, n, r)
      );
  }
  function l(e) {
    var t = e.getAttribute("data-value"),
      n = m();
    if (!n.isDiv) {
      var a = NepaliFunctions.ConvertToDateObject(t, n.dateFormat);
      n.ndpEnglishInput &&
        (document.getElementById(n.ndpEnglishInput).value =
          NepaliFunctions.ConvertDateFormat(
            NepaliFunctions.BS2AD(a),
            n.dateFormat
          )),
        (document.getElementById(r).value = n.unicodeDate
          ? NepaliFunctions.ConvertToUnicode(t)
          : t),
        n.onChange &&
          n.onChange({
            bs: t,
            ad: NepaliFunctions.ConvertDateFormat(
              NepaliFunctions.BS2AD(a),
              n.dateFormat
            ),
            object: a
          }),
        o();
    }
  }
  function s(e, t, n, r) {
    var a = "";
    r && (a = "-" + r);
    var i = m(),
      o = "english" == i.language,
      u = 1,
      l = 12;
    i.disableBefore && i.disableBefore.year == t && (u = i.disableBefore.month),
      i.disableAfter && i.disableAfter.year == t && (l = i.disableAfter.month);
    var s = o
        ? NepaliFunctions.GetBsMonths()
        : NepaliFunctions.GetBsMonthsInUnicode(),
      c = document.createElement("SELECT");
    return (
      c.setAttribute("id", "ndp-month-select" + a),
      s.forEach(function (t, n) {
        if (n >= u - 1 && n <= l - 1) {
          var r = document.createElement("OPTION");
          r.setAttribute("value", n + 1),
            (r.innerHTML = t),
            n + 1 == e && r.setAttribute("selected", "selected"),
            c.appendChild(r);
        }
      }),
      c.addEventListener("change", function () {
        !(function (e, t, n) {
          var r = "";
          n && (r = "-" + n);
          var a = m(n);
          e = a.ndpYear
            ? parseInt(document.getElementById("ndp-year-select" + r).value)
            : e;
          var i = parseInt(
            document.getElementById("ndp-month-select" + r).value
          );
          d(e, i, t, n);
        })(t, n, r);
      }),
      c
    );
  }
  function c(e, t, n, r, a) {
    var i = "";
    a && (i = "-" + a);
    var o = m(a),
      u = "english" == o.language,
      l = 1970,
      s = 2099;
    o.disableBefore && o.disableBefore.year > l && (l = o.disableBefore.year),
      o.disableAfter && o.disableAfter.year < s && (s = o.disableAfter.year);
    var c = document.createElement("SELECT");
    c.setAttribute("id", "ndp-year-select" + i);
    for (
      var f =
          Math.round(n / 2) > 0 && parseInt(t) - Math.round(n / 2) >= l
            ? parseInt(t) - Math.round(n / 2)
            : l,
        h =
          Math.round(n / 2) > 0 && parseInt(t) + Math.round(n / 2) <= s
            ? parseInt(t) + Math.round(n / 2)
            : s;
      f <= h;

    ) {
      var p = document.createElement("OPTION");
      p.setAttribute("value", f),
        (p.innerHTML = u ? f : NepaliFunctions.ConvertToUnicode(f)),
        t == f && p.setAttribute("selected", "selected"),
        c.appendChild(p),
        (f += 1);
    }
    return (
      c.addEventListener("change", function () {
        !(function (e, t, n) {
          var r = "";
          n && (r = "-" + n);
          var a = m(n),
            i = document.getElementById("ndp-year-select" + r),
            o = document.getElementById("ndp-month-select" + r),
            u = parseInt(i.value);
          e = a.ndpMonth ? parseInt(o.value) : e;
          var l = a.disableDaysBefore,
            s = a.disableDaysAfter;
          l && l.year == u && e <= l.month && (e = l.month);
          s && s.year == u && e >= s.month && (e = s.month);
          d(u, e, t, n);
        })(e, r, a);
      }),
      c
    );
  }
  function m(e) {
    var t = {};
    if ((e || (e = r), e)) {
      var a = n[e],
        i = a.dateFormat || "YYYY-MM-DD",
        o = a.disableBefore
          ? NepaliFunctions.ConvertToDateObject(a.disableBefore, i)
          : { year: 1970, month: 1, day: 1 },
        u = a.disableAfter
          ? NepaliFunctions.ConvertToDateObject(a.disableAfter, i)
          : { year: 2099, month: 12, day: 30 },
        d = a.disableDaysBefore || (0 == a.disableDaysBefore ? 0 : null),
        l = a.disableDaysAfter || (0 == a.disableDaysAfter ? 0 : null);
      Number.isInteger(d) &&
        d >= 0 &&
        (o = NepaliFunctions.BsAddDays(
          NepaliFunctions.GetCurrentBsDate(),
          -1 * d
        )),
        Number.isInteger(l) &&
          l >= 0 &&
          (u = NepaliFunctions.BsAddDays(
            NepaliFunctions.GetCurrentBsDate(),
            l
          )),
        a &&
          (t = {
            ndpTriggerButton: a.ndpTriggerButton || null,
            ndpTriggerButtonClass: a.ndpTriggerButtonClass || null,
            ndpTriggerButtonText: a.ndpTriggerButtonText || null,
            ndpEnglishInput: a.ndpEnglishInput || null,
            ndpYearCount: a.ndpYearCount || null,
            ndpYear: a.ndpYear || null,
            ndpMonth: a.ndpMonth || null,
            disableDaysBefore: d,
            disableDaysAfter: l,
            disableBefore: o,
            disableAfter: u,
            dateFormat: i,
            onChange: a.onChange || null,
            unicodeDate: a.unicodeDate || null,
            readOnlyInput: a.readOnlyInput || !1,
            container: a.container || "body",
            language: a.language || "nepali",
            id: a.id || null,
            isDiv: a.isDiv || !1,
            onDateClick: a.onDateClick
          });
    }
    return t;
  }
  function f() {
    var e = document.activeElement.getAttribute("id");
    o(), u(e);
  }
  function h() {
    var e = document.activeElement;
    if (e.classList.contains("ndp-nepali-calendar")) {
      var t = window.event || arguments.callee.caller.arguments[0];
      (27 != t.which && 9 != t.which) || (o(t.which), t.stopPropagation());
    }
  }
  function p(e) {
    var t = "english" == e.language,
      n = document.createElement("DIV"),
      r = "";
    e.isDiv
      ? ((r = "-" + e.id),
        n.setAttribute("class", "ndp-nepali-box ndp-corner-all"))
      : (n.setAttribute("id", "ndp-nepali-box"),
        n.setAttribute("class", "ndp-corner-all")),
      n.setAttribute("tabindex", "-1"),
      n.addEventListener("keydown", h);
    var a = document.createElement("DIV");
    a.setAttribute("id", "ndp-header" + r),
      a.setAttribute("class", "ndp-corner-all ndp-header");
    var i = document.createElement("SPAN");
    i.setAttribute("id", "currentMonth" + r), a.appendChild(i);
    var o = document.createElement("DIV");
    o.setAttribute("id", "currentMonth" + r);
    var u = document.createElement("TABLE"),
      d = document.createElement("TR");
    d.setAttribute("class", "ndp-days"),
      (t
        ? NepaliFunctions.GetAdDaysShort()
        : NepaliFunctions.GetBsDaysUnicodeShort()
      ).forEach(function (e) {
        var t = document.createElement("TH");
        (t.innerHTML = e), d.appendChild(t);
      });
    var l = document.createElement("THEAD");
    l.appendChild(d);
    var s = document.createElement("TBODY");
    return (
      u.appendChild(l),
      u.appendChild(s),
      o.appendChild(u),
      n.appendChild(a),
      n.appendChild(o),
      n
    );
  }
  (Object.prototype.nepaliDatePicker = function (l) {
    var s = this;
    if ("remove" != l) {
      if (((l = void 0 === l ? {} : l), s.length && s.length > 0))
        for (y = 0; y < s.length; y++) g(s[y], l);
      else g(s, l);
      var c = document.querySelectorAll(".ndp-nepali-calendar");
      if (c.length > 0)
        for (y = 0; y < c.length; y++)
          c[y].addEventListener("mouseenter", a),
            c[y].addEventListener("mouseleave", i);
      window.addEventListener("mouseup", function () {
        N() &&
          ("ndp-click-trigger" == document.activeElement.getAttribute("id") ||
            b());
      });
      var m = !1;
    } else if (s.length && s.length > 0)
      for (var y = 0; y < s.length; y++) v(s[y]);
    else v(s);
    function v(e) {
      if ("INPUT" == e.tagName) {
        e.classList.remove("ndp-nepali-calendar"),
          e.removeAttribute("ndp-calendar-data"),
          e.removeAttribute("readonly"),
          e.removeEventListener("focus", f),
          e.removeEventListener("mouseenter", a),
          e.removeEventListener("mouseleave", i),
          e.removeEventListener("keydown", h);
        var t = e.getAttribute("id");
        delete n[t];
        var r = e.nextSibling;
        r &&
          "BUTTON" == r.tagName &&
          "ndp-click-trigger" == r.getAttribute("id") &&
          r.parentNode.removeChild(r);
      } else
        "DIV" == e.tagName &&
          (removeClass(e, "ndp-nepali-calendar"),
          removeClass(e, "ndp-nepali-calendar-div"),
          (e.innerHTML = ""));
    }
    function b() {
      var n = document.getElementById(r),
        a = document.activeElement,
        i = n == a,
        u = (function (e, t) {
          for (var n = !1; e; )
            e.getAttribute("id") == t && ((n = !0), (e = null)),
              (e = e ? e.offsetParent : null);
          return n;
        })(a, "ndp-nepali-box"),
        d = "ndp-click-trigger" == a.getAttribute("id"),
        l =
          "ndp-month-select" == a.getAttribute("id") ||
          "ndp-year-select" == a.getAttribute("id");
      ("BODY" == a.tagName || u || d) && (i = !0),
        e && ((!t && !l) || (t && !i)) && o();
    }
    function g(e, t) {
      var r = (function (e) {
          return "input" === e.tagName.toLowerCase();
        })(e),
        a = e.getAttribute("id");
      if (null == a) {
        var i = (a = btoa(new Date().toISOString() + Math.random()));
        e.setAttribute("id", i);
      }
      if (
        ((t.id = a),
        e.classList.add("ndp-nepali-calendar"),
        (function (e, t) {
          var r = e.getAttribute("id");
          if (
            ((n[r] = t),
            (n[r].raw = (function (e) {
              if (null == e || "object" != typeof e) return e;
              var t = e.constructor();
              for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
              return t;
            })(t)),
            e?.value)
          ) {
            var a = NepaliFunctions.ParseDate(e.value);
            a &&
              a.parsedFormat &&
              (t.dateFormat = t.dateFormat ? t.dateFormat : a.parsedFormat);
          }
        })(e, t),
        r)
      ) {
        if (
          (t.ndpTriggerButton || e.addEventListener("focus", f),
          e.addEventListener("blur", b),
          e.setAttribute("autocomplete", "off"),
          e.addEventListener("keydown", h),
          t.readOnlyInput && e.setAttribute("readonly", "readonly"),
          t.ndpTriggerButton)
        ) {
          var l =
              t.ndpTriggerButtonClass && "" !== t.ndpTriggerButtonClass
                ? t.ndpTriggerButtonClass
                : "",
            s =
              t.ndpTriggerButtonText && "" !== t.ndpTriggerButtonText
                ? t.ndpTriggerButtonText
                : "Pick Date",
            c = document.createElement("BUTTON");
          c.setAttribute("id", "ndp-click-trigger"),
            c.setAttribute("class", l),
            c.addEventListener("click", function () {
              !(function (e) {
                if (m) return;
                m = !0;
                N() ? o() : u(e);
                m = !1;
              })(a);
            }),
            c.addEventListener("blur", D),
            (c.innerHTML = s),
            e.insertAdjacentElement("afterend", c);
        }
      } else {
        e.classList.add("ndp-nepali-calendar-div"), (t.isDiv = !0);
        var y = p(t);
        e.appendChild(y);
        var v = NepaliFunctions.GetCurrentBsDate(),
          g = v.year,
          A = v.month;
        if (t.disableBefore || t.disableAfter) {
          var M = null;
          t.disableAfter &&
            ((M = NepaliFunctions.ConvertToDateObject(
              t.disableAfter,
              t.dateFormat || "YYYY-MM-DD"
            )),
            NepaliFunctions.CompareBsDates(M, v) ||
              ((g = M.year), (A = M.month)));
        }
        d(g, A, "", t.id);
      }
    }
    function D() {
      b();
    }
    function N() {
      var e = document.getElementById("ndp-nepali-box");
      return e && parseInt(e.style.top) > 0;
    }
  }),
    "undefined" != typeof module && module.hasOwnProperty("exports")
      ? (module.exports = nepaliDatePicker)
      : Object.defineProperty(Object.prototype, "nepaliDatePicker", {
          enumerable: !1,
          value: nepaliDatePicker
        });
})();
