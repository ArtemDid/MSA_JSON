
  function assureNotEmpty(str) {
    if (str) {
      if (str.trim().length > 0) {
        return true;
      }
      else return false;
    }
    else return false;
  };

  function isNumeric(str) {
    return /^\d+$/.test(str);
}

function assureRegLogin(str) {
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(str) == true) {
      return true;
    }
    else return false;
  }

module.exports.assureNotEmpty = assureNotEmpty;
module.exports.isNumeric = isNumeric;
module.exports.assureRegLogin = assureRegLogin;

