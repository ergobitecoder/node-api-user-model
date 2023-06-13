

var commonFunc = {};

// to validate date 
commonFunc.isValidDate = function (dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regEx) != null;
}
  
// to remove a trailing slash ("/") from a given string
commonFunc.trim_slash = function (str)
{
    return str.replace(/\/$/, "");
}
 
// to check if an object is empty or not.  
commonFunc.isEmptyObject = function ( obj ) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
  
// to clean and format a string for use in a URL
commonFunc.clean_url_string = function(str){
  if(!str){
      return '';
  }
  else{

      str = str.trim().toLowerCase(); // Trim any leading or trailing whitespace and Convert the string to lowercase
      str = str.replace(/[^\w\d-_ ]/g,' '); // Replace any characters that are not letters, digits, hyphens, or underscores with a space 
      str = str.replace(/  +/g, ' '); // Replace multiple consecutive spaces with a single space
      str = str.trim();  
      str = str.replace(/ /g,'-');
      str = str.replace(/--+/g,'-');
      return str;
  }

}

// checks whether a given name is valid based on a regular expression pattern. 
commonFunc.isNameValid = function (name) {
  let name_regx = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;

  if (!name_regx.test(name)) {
    return false;
  }
  else
  {
    return true;
  }
  
}

// checks whether a given number is valid based on a regular expression pattern. 
commonFunc.isNumberValid = function (number) {
  let number_regx=/^[0-9]\d{0,9}(\.\d{1,3})?%?$/;
  if (!number_regx.test(number)) {
    return false;
  }
  else
  {
    return true;
  }

}

// regular expression pattern emailRegex for validating email addresses. 
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

// validates whether a given email address is valid based on given conditions, including using the emailRegex
commonFunc.isEmailValid = function (email) {
  if (!email)
    return false;

  if (email.length > 254)
    return false;

  var valid = emailRegex.test(email);
  if (!valid)
    return false;

  // Further checking of some things regex can't handle
  var parts = email.split("@");
  if (parts[0].length > 64)
    return false;

  var domainParts = parts[1].split(".");
  if (domainParts.some(function (part) { return part.length > 63; }))
    return false;

  return true;
}

// validates whether a given mobile number is valid based on given conditions.
commonFunc.isMobileValid = function (mobile) {
  if (mobile.length < 7) {
    return false;
  }

  var phoneno = /^[0-9]+$/;   
  if (!phoneno.test(mobile)) {     // checks whether a given mobile number consists only of numeric digits
    return false;
  }

  return true;
}


commonFunc.countryCodesnumber = ['+93', '+355', '+213', '+1-684', '+376', '+244', '+1-264', '+672', '+1-268', '+54', '+374', '+297', '+61', '+43', '+994', '+1-242', '+973', '+880', '+1-246', '+375', '+32', '+501', '+229', '+1-441', '+975', '+591', '+387', '+267', '+55', '+246', '+1-284', '+673', '+359', '+226', '+257', '+855', '+237', '+1', '+238', '+1-345', '+236', '+235', '+56', '+86', '+61', '+61', '+57', '+269', '+682', '+506', '+385', '+53', '+599', '+357', '+420', '+243', '+45', '+253', '+1-767', '+1-809,1-829,1-8', '+670', '+593', '+20', '+503', '+240', '+291', '+372', '+251', '+500', '+298', '+679', '+358', '+33', '+689', '+241', '+220', '+995', '+49', '+233', '+350', '+30', '+299', '+1-473', '+1-671', '+502', '+44-1481', '+224', '+245', '+592', '+509', '+504', '+852', '+36', '+354', '+91', '+62', '+98', '+964', '+353', '+44-1624', '+972', '+39', '+225', '+1-876', '+81', '+44-1534', '+962', '+7', '+254', '+686', '+383', '+965', '+996', '+856', '+371', '+961', '+266', '+231', '+218', '+423', '+370', '+352', '+853', '+389', '+261', '+265', '+60', '+960', '+223', '+356', '+692', '+222', '+230', '+262', '+52', '+691', '+373', '+377', '+976', '+382', '+1-664', '+212', '+258', '+95', '+264', '+674', '+977', '+31', '+599', '+687', '+64', '+505', '+227', '+234', '+683', '+850', '+1-670', '+47', '+968', '+92', '+680', '+970', '+507', '+675', '+595', '+51', '+63', '+64', '+48', '+351', '+1-787,1-939', '+974', '+242', '+262', '+40', '+7', '+250', '+590', '+290', '+1-869', '+1-758', '+590', '+508', '+1-784', '+685', '+378', '+239', '+966', '+221', '+381', '+248', '+232', '+65', '+1-721', '+421', '+386', '+677', '+252', '+27', '+82', '+211', '+34', '+94', '+249', '+597', '+47', '+268', '+46', '+41', '+963', '+886', '+992', '+255', '+66', '+228', '+690', '+676', '+1-868', '+216', '+90', '+993', '+1-649', '+688', '+1-340', '+256', '+380', '+971', '+44', '+1', '+598', '+998', '+678', '+379', '+58', '+84', '+681', '+212', '+967', '+260', '+263'];

// validates whether a given country calling code is valid based on several conditions.
commonFunc.isCountryCodeValid = function (countrycode) {
  const regex = RegExp('^[+]([1-9 -])+$');
  if (!regex.test(countrycode)) {
    return false;
  }

  return commonFunc.countryCodesnumber.includes(countrycode);

}
// validates whether a given URL is valid based on a regular expression pattern. 
commonFunc.isUrlValid= function(url) {
  // Create a regular expression to match URLs
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
  if (!urlRegex.test(url)) {
    return false;
  }

  return true;
  // Test the URL against the regex
}


// used to send a response to the client with the specified parameters
commonFunc.send = (res, code, data = {}, msg = "",total='') => {
  let response = {
    error: {},
  };

  response.success = true;

  if (code >= 400 && code < 600) {
    response.success = false;
  }
  response.error.code = code;
  response.error.message = msg;
  response.result = data;
  if(total !='')
  {
    response.total=total;
  }

  res.status(response.error.code).json(response);
};
  
// used to make an asynchronous HTTP request using the https module. 
commonFunc.dohttpRequest = async function (options, data) {

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {

      res.setEncoding('utf8');
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(responseBody));
        } catch (err) {
          console.log("responseBody", responseBody);
          console.log("error in Http Request", err);
          resolve({});
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if( data && !commonFunc.isEmptyObject(data) ) {
      req.write(data);
    }

    req.end();

  });
};

module.exports = commonFunc;