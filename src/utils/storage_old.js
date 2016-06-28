/* eslint object-shorthand: 0 */

const browserStore = {
  localStoreSupport: function () {
    try {
      return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
      return false;
    }
  },
  set: function (name, value, days) {
    let expires = '';
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toGMTString();
    } else {
      expires = '';
    }
    
    if (this.localStoreSupport()) {
      localStorage.setItem(name, value);
    } else {
      document.cookie = name + '=' + value + expires + '; path=/';
    }
  },
  setJson: function (name, value, days) {
    let val = value;
    if (typeof value === 'object') {
      val = JSON.stringify(value);
    }
    
    this.set(name, val, days);
  },
  get: function (name) {
    if (this.localStoreSupport()) {
      const ret = localStorage.getItem(name);
      switch (ret) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return ret;
      }
    } else {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          var ret = c.substring(nameEQ.length, c.length);
          switch (ret) {
            case 'true':
              return true;
            case 'false':
              return false;
            default:
              return ret;
          }
        }
      }
      return null;
    }
  },
  getJson: function (name) {
    const value = this.get(name);
    return value && JSON.parse(value);
  },
  del: function (name) {
    if (this.localStoreSupport()) {
      localStorage.removeItem(name);
    } else {
      this.set(name, '', -1);
    }
  },
};

export default browserStore;
